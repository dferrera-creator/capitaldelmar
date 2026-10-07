import { PrismaClient, AssetType, ProjectStatus, ReturnType } from "@prisma/client";

const prisma = new PrismaClient();

// NOTE: minTicket is 1,000,000 MXN for all projects. This is ILUSTRATIVO.
// Final ticket sizes are subject to legal and financial validation before publication.

async function main() {
  console.log("Seeding projects...");

  await prisma.project.upsert({
    where: { slug: "reserva-san-gregorio" },
    update: {},
    create: {
      slug: "reserva-san-gregorio",
      name: "Reserva San Gregorio by Akasha",
      tagline: "Tierra en reserva natural en Jalisco",
      location: "Concepción de Buenos Aires, Jalisco",
      assetType: AssetType.LAND,
      status: ProjectStatus.OPEN,
      returnType: ReturnType.ESTIMATED,
      returnNote: "ILUSTRATIVO – cifras de referencia sujetas a validación legal y financiera",
      minTicket: 1000000, // ILUSTRATIVO – sujeto a validación
      termMonths: 48,
      availableSlots: 15,
      totalSlots: 15,
      benefits: [
        "Plusvalía estimada del terreno en zona de alta demanda turística",
        "Participación en proyecto de desarrollo de bajo impacto ambiental",
        "Piso referenciado a CETES (ver condiciones)",
        "Comprador de última instancia el primer año (ver condiciones)",
        "Acceso a comunidad de co-inversores Del Mar Capital",
      ],
      protections: [
        "Título de propiedad fideicomitido",
        "Fideicomiso de garantía (condiciones en revisión legal)",
        "Comprador de última instancia año 1 (condiciones en revisión legal)",
        "Contrato de inversión con derechos preferentes",
      ],
      risks: [
        "Pérdida parcial o total del capital si el mercado inmobiliario se contrae.",
        "Liquidez limitada: no existe mercado secundario activo para este instrumento.",
        "Riesgo de desarrollo: permisos o regulaciones pueden retrasar o cancelar el proyecto.",
        "Riesgo ambiental: cambios en regulaciones de uso de suelo o áreas naturales protegidas.",
        "Riesgo de crédito del emisor (DM Boutique Servicios Turísticos S.A.P.I. de C.V.).",
        "Riesgo de concentración geográfica en una sola ubicación.",
      ],
      displayOrder: 1,
    },
  });

  await prisma.project.upsert({
    where: { slug: "campera-sma" },
    update: {},
    create: {
      slug: "campera-sma",
      name: "Campera Hotel Burbuja",
      tagline: "Participación hotelera boutique en San Miguel de Allende",
      location: "San Miguel de Allende, Guanajuato",
      assetType: AssetType.HOTEL_PARTICIPATION,
      status: ProjectStatus.OPEN,
      returnType: ReturnType.ESTIMATED,
      returnNote: "ILUSTRATIVO – cifras de referencia sujetas a validación legal y financiera",
      minTicket: 1000000, // ILUSTRATIVO – sujeto a validación
      termMonths: 36,
      availableSlots: 20,
      totalSlots: 20,
      benefits: [
        "Flujo trimestral de utilidades hoteleras",
        "Participación en una marca boutique de alto perfil en SMA",
        "Piso referenciado a CETES (ver condiciones)",
        "Comprador de última instancia el primer año (ver condiciones)",
        "Reporte de desempeño trimestral",
      ],
      protections: [
        "Contrato de participación en utilidades",
        "Fideicomiso de garantía (condiciones en revisión legal)",
        "Comprador de última instancia año 1 (condiciones en revisión legal)",
        "Auditoría anual de resultados",
      ],
      risks: [
        "Pérdida parcial o total del capital si la operación hotelera falla.",
        "Liquidez limitada: no existe mercado secundario activo para este instrumento.",
        "Riesgo de temporada baja y eventos externos (pandemias, desastres naturales).",
        "Riesgo operativo del operador hotelero.",
        "Riesgo de crédito del emisor (DM Boutique Servicios Turísticos S.A.P.I. de C.V.).",
        "Riesgo de concentración en el sector hospitalidad.",
      ],
      displayOrder: 2,
    },
  });

  await prisma.project.upsert({
    where: { slug: "la-playita" },
    update: {},
    create: {
      slug: "la-playita",
      name: "La Playita Beach Club",
      tagline: "Acciones de negocio en beach club boutique",
      location: "San Miguel de Allende, Guanajuato",
      assetType: AssetType.BUSINESS_SHARES,
      status: ProjectStatus.OPEN,
      returnType: ReturnType.ESTIMATED,
      returnNote: "ILUSTRATIVO – cifras de referencia sujetas a validación legal y financiera",
      minTicket: 1000000, // ILUSTRATIVO – sujeto a validación
      termMonths: 36,
      availableSlots: 10,
      totalSlots: 10,
      benefits: [
        "Participación directa en utilidades del beach club",
        "Acceso preferencial como socio fundador",
        "Piso referenciado a CETES (ver condiciones)",
        "Comprador de última instancia el primer año (ver condiciones)",
        "Voto en decisiones estratégicas del negocio",
      ],
      protections: [
        "Escritura de acciones en sociedad",
        "Fideicomiso de garantía (condiciones en revisión legal)",
        "Comprador de última instancia año 1 (condiciones en revisión legal)",
        "Acuerdo de accionistas con derechos preferentes",
      ],
      risks: [
        "Pérdida parcial o total del capital si el negocio no prospera.",
        "Liquidez limitada: las acciones no cotizan en bolsa.",
        "Riesgo operativo: dependencia del equipo directivo y la ubicación.",
        "Riesgo de mercado: variaciones en el turismo local y nacional.",
        "Riesgo de crédito del emisor (DM Boutique Servicios Turísticos S.A.P.I. de C.V.).",
        "Riesgo regulatorio: cambios en licencias, permisos o zonificación.",
      ],
      displayOrder: 3,
    },
  });

  await prisma.project.upsert({
    where: { slug: "monte-rocella" },
    update: {},
    create: {
      slug: "monte-rocella",
      name: "Monte Rocella",
      tagline: "Flujo de administración en Los Cabos",
      location: "El Tezal, Los Cabos",
      assetType: AssetType.MANAGEMENT_FLOW,
      status: ProjectStatus.OPEN,
      returnType: ReturnType.ESTIMATED,
      returnNote: "ILUSTRATIVO – cifras de referencia sujetas a validación legal y financiera",
      minTicket: 1000000, // ILUSTRATIVO – sujeto a validación
      termMonths: 36,
      availableSlots: 20,
      totalSlots: 20,
      benefits: [
        "Flujo trimestral de administración en zona de alta plusvalía",
        "Exposición al mercado premium de Los Cabos",
        "Piso referenciado a CETES (ver condiciones)",
        "Comprador de última instancia el primer año (ver condiciones)",
        "Reporte de desempeño operativo trimestral",
      ],
      protections: [
        "Contrato de participación en flujo de administración",
        "Fideicomiso de garantía (condiciones en revisión legal)",
        "Comprador de última instancia año 1 (condiciones en revisión legal)",
        "Respaldo en activo inmobiliario subyacente",
      ],
      risks: [
        "Pérdida parcial o total del capital si la operación del activo subyacente falla.",
        "Liquidez limitada: no existe mercado secundario activo para este instrumento.",
        "Riesgo operativo del administrador del activo.",
        "Riesgo de mercado: variaciones en ocupación hotelera en Los Cabos.",
        "Riesgo de crédito del emisor (DM Boutique Servicios Turísticos S.A.P.I. de C.V.).",
        "Riesgo regulatorio: cambios legales pueden afectar la estructura.",
      ],
      displayOrder: 4,
    },
  });

  await prisma.project.upsert({
    where: { slug: "bravante" },
    update: {},
    create: {
      slug: "bravante",
      name: "Bravante",
      tagline: "Flujo de administración en Guadalajara",
      location: "Guadalajara, Jalisco",
      assetType: AssetType.MANAGEMENT_FLOW,
      status: ProjectStatus.OPEN,
      returnType: ReturnType.ESTIMATED,
      returnNote: "ILUSTRATIVO – cifras de referencia sujetas a validación legal y financiera",
      minTicket: 1000000, // ILUSTRATIVO – sujeto a validación
      termMonths: 36,
      availableSlots: 20,
      totalSlots: 20,
      benefits: [
        "Flujo trimestral de administración",
        "Piso referenciado a CETES (ver condiciones)",
        "Comprador de última instancia el primer año (ver condiciones)",
        "Exposición al mercado boutique de Guadalajara",
        "Reporte de desempeño trimestral",
      ],
      protections: [
        "Contrato de participación",
        "Fideicomiso de garantía (condiciones en revisión legal)",
        "Comprador de última instancia año 1 (condiciones en revisión legal)",
      ],
      risks: [
        "Pérdida parcial o total del capital si la operación del activo subyacente falla.",
        "Liquidez limitada: no existe mercado secundario activo para este instrumento.",
        "Riesgo operativo del operador del activo.",
        "Riesgo de crédito del emisor (DM Boutique Servicios Turísticos S.A.P.I. de C.V.).",
        "Riesgo regulatorio: cambios legales pueden afectar la estructura.",
      ],
      displayOrder: 5,
    },
  });

  await prisma.project.upsert({
    where: { slug: "habitat-azul" },
    update: {},
    create: {
      slug: "habitat-azul",
      name: "Hábitat Azul",
      tagline: "Flujo de administración en Centro Histórico de Guadalajara",
      location: "Centro Histórico, Guadalajara",
      assetType: AssetType.MANAGEMENT_FLOW,
      status: ProjectStatus.OPEN,
      returnType: ReturnType.ESTIMATED,
      returnNote: "ILUSTRATIVO – cifras de referencia sujetas a validación legal y financiera",
      minTicket: 1000000, // ILUSTRATIVO – sujeto a validación
      termMonths: 36,
      availableSlots: 15,
      totalSlots: 15,
      benefits: [
        "Flujo trimestral en propiedad boutique patrimonial",
        "Ubicación premium en Centro Histórico con alta demanda turística",
        "Piso referenciado a CETES (ver condiciones)",
        "Comprador de última instancia el primer año (ver condiciones)",
        "Potencial de plusvalía en zona de renovación urbana",
      ],
      protections: [
        "Contrato de participación en flujo de administración",
        "Fideicomiso de garantía (condiciones en revisión legal)",
        "Comprador de última instancia año 1 (condiciones en revisión legal)",
        "Respaldo en activo inmobiliario patrimonial",
      ],
      risks: [
        "Pérdida parcial o total del capital si la operación del activo subyacente falla.",
        "Liquidez limitada: no existe mercado secundario activo para este instrumento.",
        "Riesgo operativo del administrador del activo.",
        "Riesgo patrimonial: restricciones legales en inmuebles históricos.",
        "Riesgo de crédito del emisor (DM Boutique Servicios Turísticos S.A.P.I. de C.V.).",
        "Riesgo regulatorio: normas de protección del patrimonio histórico.",
      ],
      displayOrder: 6,
    },
  });

  await prisma.project.upsert({
    where: { slug: "canadian-resorts" },
    update: {},
    create: {
      slug: "canadian-resorts",
      name: "Canadian Resorts",
      tagline: "Intercambio hotelero en Nuevo Vallarta y Huatulco",
      location: "Nuevo Vallarta y Huatulco",
      assetType: AssetType.HOTEL_TRADE,
      status: ProjectStatus.OPEN,
      returnType: ReturnType.ESTIMATED,
      returnNote: "ILUSTRATIVO – cifras de referencia sujetas a validación legal y financiera",
      minTicket: 1000000, // ILUSTRATIVO – sujeto a validación
      termMonths: 60,
      availableSlots: 25,
      totalSlots: 25,
      benefits: [
        "Acceso a portafolio de propiedades en dos destinos de playa premium",
        "Ingresos por intercambio y ocupación garantizada (ver condiciones)",
        "Diversificación geográfica dentro de México",
        "Piso referenciado a CETES (ver condiciones)",
        "Comprador de última instancia el primer año (ver condiciones)",
      ],
      protections: [
        "Contrato de intercambio hotelero",
        "Fideicomiso de garantía (condiciones en revisión legal)",
        "Comprador de última instancia año 1 (condiciones en revisión legal)",
        "Auditoría anual de ocupación y resultados",
      ],
      risks: [
        "Pérdida parcial o total del capital si la operación hotelera falla.",
        "Liquidez limitada: no existe mercado secundario activo para este instrumento.",
        "Riesgo de temporada y variaciones en el turismo internacional.",
        "Riesgo operativo de dos ubicaciones geográficas distintas.",
        "Riesgo de crédito del emisor (DM Boutique Servicios Turísticos S.A.P.I. de C.V.).",
        "Riesgo cambiario si los ingresos están denominados en divisas extranjeras.",
      ],
      displayOrder: 7,
    },
  });

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
