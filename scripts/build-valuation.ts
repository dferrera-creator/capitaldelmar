#!/usr/bin/env tsx
/**
 * build-valuation.ts
 * Reads all JSON files from /data/valuation/*.json,
 * validates them, and writes to /public/data/valuation/[slug].json.
 *
 * Usage: npx tsx scripts/build-valuation.ts
 */

import * as fs from 'fs'
import * as path from 'path'

const REQUIRED_FIELDS = [
  'slug',
  'status',
  'version',
  'modelDate',
  'source',
  'currency',
  'reconciled',
  'wacc',
  'irr',
  'moic',
  'paybackMonths',
  'entryPrice',
  'scenarios',
  'methods',
  'checks',
]

const REQUIRED_METHOD_FIELDS = ['id', 'label', 'weight', 'min', 'max', 'base']

const REQUIRED_SCENARIOS = ['bear', 'base', 'bull']

interface ValidationError {
  file: string
  errors: string[]
}

function validateValuation(data: Record<string, unknown>, filename: string): string[] {
  const errors: string[] = []

  // Check required top-level fields
  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === null) {
      errors.push(`Missing required field: ${field}`)
    }
  }

  // Validate status
  if (data.status && !['ILUSTRATIVO', 'REAL'].includes(data.status as string)) {
    errors.push(`Invalid status: ${data.status}. Must be ILUSTRATIVO or REAL`)
  }

  // Validate currency
  if (data.currency && data.currency !== 'MXN') {
    errors.push(`Invalid currency: ${data.currency}. Only MXN is supported`)
  }

  // Validate numeric fields
  const numericFields = ['reconciled', 'wacc', 'irr', 'moic', 'paybackMonths', 'entryPrice']
  for (const field of numericFields) {
    if (data[field] !== undefined && typeof data[field] !== 'number') {
      errors.push(`Field ${field} must be a number, got: ${typeof data[field]}`)
    }
  }

  // Validate scenarios
  if (data.scenarios && typeof data.scenarios === 'object') {
    const scenarios = data.scenarios as Record<string, unknown>
    for (const s of REQUIRED_SCENARIOS) {
      if (!scenarios[s]) {
        errors.push(`Missing scenario: ${s}`)
      } else {
        const scenario = scenarios[s] as Record<string, unknown>
        for (const f of ['label', 'reconciled', 'irr', 'moic']) {
          if (scenario[f] === undefined) {
            errors.push(`Scenario ${s} missing field: ${f}`)
          }
        }
      }
    }
  }

  // Validate methods
  if (data.methods && Array.isArray(data.methods)) {
    const methods = data.methods as Record<string, unknown>[]

    if (methods.length === 0) {
      errors.push('methods array must not be empty')
    }

    // Check each method has required fields
    for (let i = 0; i < methods.length; i++) {
      const m = methods[i]
      for (const field of REQUIRED_METHOD_FIELDS) {
        if (m[field] === undefined || m[field] === null) {
          errors.push(`Method[${i}] (${m.id ?? 'unknown'}) missing required field: ${field}`)
        }
      }

      // min <= base <= max
      if (
        typeof m.min === 'number' &&
        typeof m.max === 'number' &&
        typeof m.base === 'number'
      ) {
        if (m.min > m.max) {
          errors.push(`Method[${i}] (${m.id}): min (${m.min}) > max (${m.max})`)
        }
        if (m.base < m.min || m.base > m.max) {
          errors.push(
            `Method[${i}] (${m.id}): base (${m.base}) is outside [min, max] range [${m.min}, ${m.max}]`
          )
        }
      }
    }

    // Check weights sum to 1.0 (with tolerance)
    const totalWeight = methods.reduce((sum, m) => {
      return sum + (typeof m.weight === 'number' ? m.weight : 0)
    }, 0)
    const weightTolerance = 0.001
    if (Math.abs(totalWeight - 1.0) > weightTolerance) {
      errors.push(
        `Methods weights sum to ${totalWeight.toFixed(4)}, expected 1.0 (tolerance ±${weightTolerance})`
      )
    }
  } else if (data.methods !== undefined) {
    errors.push('methods must be an array')
  }

  // Validate checks array
  if (data.checks && Array.isArray(data.checks)) {
    const checks = data.checks as Record<string, unknown>[]
    for (let i = 0; i < checks.length; i++) {
      const c = checks[i]
      if (!c.id) errors.push(`Check[${i}] missing id`)
      if (typeof c.pass !== 'boolean') errors.push(`Check[${i}] (${c.id}) pass must be boolean`)
      if (!c.message) errors.push(`Check[${i}] (${c.id}) missing message`)
    }
  }

  return errors
}

async function main() {
  const projectRoot = path.resolve(__dirname, '..')
  const inputDir = path.join(projectRoot, 'data', 'valuation')
  const outputDir = path.join(projectRoot, 'public', 'data', 'valuation')

  console.log('='.repeat(60))
  console.log('Del Mar Capital — Valuation Build Script')
  console.log('='.repeat(60))
  console.log(`Input:  ${inputDir}`)
  console.log(`Output: ${outputDir}`)
  console.log()

  // Check input directory exists
  if (!fs.existsSync(inputDir)) {
    console.error(`ERROR: Input directory not found: ${inputDir}`)
    process.exit(1)
  }

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
    console.log(`Created output directory: ${outputDir}`)
  }

  // Read all JSON files
  const files = fs
    .readdirSync(inputDir)
    .filter((f) => f.endsWith('.json'))
    .sort()

  if (files.length === 0) {
    console.error(`ERROR: No JSON files found in ${inputDir}`)
    process.exit(1)
  }

  console.log(`Found ${files.length} file(s): ${files.join(', ')}`)
  console.log()

  const allErrors: ValidationError[] = []
  let processed = 0
  let failed = 0

  for (const filename of files) {
    const inputPath = path.join(inputDir, filename)
    console.log(`Processing: ${filename}`)

    // Parse JSON
    let data: Record<string, unknown>
    try {
      const raw = fs.readFileSync(inputPath, 'utf-8')
      data = JSON.parse(raw)
    } catch (err) {
      console.log(`  ✗ Parse error: ${(err as Error).message}`)
      allErrors.push({ file: filename, errors: [`JSON parse error: ${(err as Error).message}`] })
      failed++
      continue
    }

    // Validate
    const errors = validateValuation(data, filename)

    if (errors.length > 0) {
      console.log(`  ✗ Validation failed (${errors.length} error(s)):`)
      errors.forEach((e) => console.log(`    - ${e}`))
      allErrors.push({ file: filename, errors })
      failed++
      continue
    }

    // Slug check: filename slug should match data slug
    const expectedSlug = filename.replace('.json', '')
    if (data.slug !== expectedSlug) {
      const slugError = `Slug mismatch: file is "${expectedSlug}" but data.slug is "${data.slug}"`
      console.log(`  ✗ ${slugError}`)
      allErrors.push({ file: filename, errors: [slugError] })
      failed++
      continue
    }

    // Write output
    const outputPath = path.join(outputDir, filename)
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8')
    console.log(`  ✓ Written to ${outputPath}`)

    // Log check results
    const checks = data.checks as Array<{ id: string; pass: boolean; message: string }>
    checks.forEach((c) => {
      console.log(`  ${c.pass ? '✓' : '⚠'} [${c.id}] ${c.message}`)
    })

    processed++
  }

  console.log()
  console.log('='.repeat(60))
  console.log('Summary')
  console.log('='.repeat(60))
  console.log(`Total files:    ${files.length}`)
  console.log(`Processed:      ${processed}`)
  console.log(`Failed:         ${failed}`)

  if (allErrors.length > 0) {
    console.log()
    console.error('ERRORS:')
    allErrors.forEach(({ file, errors }) => {
      console.error(`  ${file}:`)
      errors.forEach((e) => console.error(`    - ${e}`))
    })
    console.log()
    console.error('Build FAILED. Fix the errors above before deploying.')
    process.exit(1)
  }

  console.log()
  console.log('All validations passed. Build successful.')
}

main().catch((err) => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
