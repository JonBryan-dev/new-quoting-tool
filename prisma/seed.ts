import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "EcoTec Plus 830i",
    brand: "Vaillant",
    category: "boiler",
    type: "combi",
    description: "High-efficiency combi boiler perfect for small to medium homes.",
    basePrice: 1795,
    efficiency: "94%",
    warranty: 5,
    kw: 28,
    features: ["Compact design", "Weather compensation", "Low NOx emissions", "Easy to maintain"],
    popular: false,
  },
  {
    name: "Greenstar 8000 Life",
    brand: "Worcester Bosch",
    category: "boiler",
    type: "combi",
    description: "Premium combi boiler with top-of-the-range efficiency and a sleek modern design.",
    basePrice: 2299,
    efficiency: "94%",
    warranty: 10,
    kw: 30,
    features: ["Smart thermostat ready", "10-year warranty", "Ultra-quiet operation", "Hydrogen blend ready"],
    popular: true,
  },
  {
    name: "Logic Max Combi C35",
    brand: "Ideal",
    category: "boiler",
    type: "combi",
    description: "Powerful combi boiler ideal for larger homes with multiple bathrooms.",
    basePrice: 1999,
    efficiency: "93%",
    warranty: 7,
    kw: 35,
    features: ["High flow rate", "Built-in frost protection", "Easy install", "Compact footprint"],
    popular: false,
  },
  {
    name: "Solar Panel System 5kW",
    brand: "JA Solar",
    category: "solar",
    type: "panel",
    description: "Our most popular solar system. 12 panels delivering 5kW.",
    basePrice: 5999,
    efficiency: "A++",
    warranty: 25,
    kw: 5,
    features: ["12 panels", "25-year warranty", "Free 3D solar design", "Smart monitoring app"],
    popular: true,
  },
  {
    name: "Multi-Split System 5kW",
    brand: "Daikin",
    category: "aircon",
    type: "multi-split",
    description: "Two-room air conditioning system with heating and cooling.",
    basePrice: 3999,
    efficiency: "A+",
    warranty: 5,
    kw: 5,
    features: ["2 indoor units", "Heating & cooling", "Smart app control", "Inverter technology"],
    popular: true,
  },
  {
    name: "Powerwall 3",
    brand: "Tesla",
    category: "battery",
    type: "lithium",
    description: "Tesla's latest home battery with 13.5kWh capacity.",
    basePrice: 6499,
    efficiency: "97.5%",
    warranty: 10,
    kw: 13.5,
    features: ["13.5kWh capacity", "Built-in inverter", "Storm watch", "Tesla app"],
    popular: true,
  },
];

async function main() {
  console.log("Seeding database...");

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.name.toLowerCase().replace(/\s+/g, "-") },
      update: product,
      create: {
        id: product.name.toLowerCase().replace(/\s+/g, "-"),
        ...product,
      },
    });
    console.log(`  Created product: ${product.name}`);
  }

  // Create some pricing rules
  const rules = [
    { category: "boiler", ruleType: "base_install", condition: "{}", adjustment: 500 },
    { category: "boiler", ruleType: "relocation", condition: '{"relocate": true}', adjustment: 350 },
    { category: "solar", ruleType: "base_install", condition: "{}", adjustment: 1200 },
    { category: "aircon", ruleType: "base_install", condition: "{}", adjustment: 800 },
    { category: "battery", ruleType: "base_install", condition: "{}", adjustment: 600 },
  ];

  for (const rule of rules) {
    await prisma.pricingRule.create({ data: rule });
    console.log(`  Created pricing rule: ${rule.category} - ${rule.ruleType}`);
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
