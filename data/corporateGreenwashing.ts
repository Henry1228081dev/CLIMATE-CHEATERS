
export interface Company {
  id: string;
  company: string;
  sector: string;
  claim: string;
  evidence: string;
  deceptionScore: number;
  hqLocation: {
    lat: number;
    lng: number;
    label: string;
  };
  emissions: {
    year: number;
    co2: number;
  }[];
  pollutionData: {
    aqi: number;
    co2ppm: number;
    wasteDischarge: string;
  };
}

export const corporateGreenwashingData: Company[] = [
  {
    id: "shell-01",
    company: "Shell",
    sector: "Fossil Fuels",
    claim: "We're committed to achieving net-zero emissions by 2050",
    evidence: "Expanded fossil fuel extraction operations by 12.3% in 2023, while green energy investment dropped 8%",
    deceptionScore: 94,
    hqLocation: { lat: 51.5074, lng: -0.1278, label: "London, UK" },
    emissions: [
      { year: 2020, co2: 1670 },
      { year: 2021, co2: 1720 },
      { year: 2022, co2: 1850 },
      { year: 2023, co2: 1870 },
    ],
    pollutionData: {
      aqi: 187,
      co2ppm: 485,
      wasteDischarge: "2.3M t/yr",
    },
  },
  {
    id: "exxon-01",
    company: "ExxonMobil",
    sector: "Fossil Fuels",
    claim: "Leading the industry toward carbon-neutral operations",
    evidence: "Spent $41M lobbying against climate policy (2019-2024) while running green marketing campaigns worth $78M",
    deceptionScore: 97,
    hqLocation: { lat: 32.7767, lng: -96.797, label: "Irving, TX" },
    emissions: [
      { year: 2020, co2: 2100 },
      { year: 2021, co2: 2250 },
      { year: 2022, co2: 2380 },
      { year: 2023, co2: 2420 },
    ],
    pollutionData: {
      aqi: 195,
      co2ppm: 498,
      wasteDischarge: "3.1M t/yr",
    },
  },
  {
    id: "bp-01",
    company: "BP",
    sector: "Fossil Fuels",
    claim: "Beyond Petroleum — reimagining energy for people and planet",
    evidence: "Capital expenditure: 94.7% fossil fuels, 5.3% renewables. Rebranded back to 'petroleum' focus in 2023",
    deceptionScore: 91,
    hqLocation: { lat: 51.5074, lng: -0.1278, label: "London, UK" },
    emissions: [
      { year: 2020, co2: 1580 },
      { year: 2021, co2: 1620 },
      { year: 2022, co2: 1700 },
      { year: 2023, co2: 1750 },
    ],
    pollutionData: {
      aqi: 178,
      co2ppm: 472,
      wasteDischarge: "2.1M t/yr",
    },
  },
  {
    id: "nestle-01",
    company: "Nestlé",
    sector: "Food & Beverage",
    claim: "All our products will be 100% sustainably sourced by 2025",
    evidence: "2023 audit found child labor in 34% of cocoa farms. Extracted 50M gallons/day from drought-stricken aquifers",
    deceptionScore: 88,
    hqLocation: { lat: 46.2, lng: 6.1432, label: "Vevey, Switzerland" },
    emissions: [
      { year: 2020, co2: 92 },
      { year: 2021, co2: 95 },
      { year: 2022, co2: 98 },
      { year: 2023, co2: 101 },
    ],
    pollutionData: {
      aqi: 142,
      co2ppm: 425,
      wasteDischarge: "850K t/yr",
    },
  },
  {
    id: "coca-cola-01",
    company: "Coca-Cola",
    sector: "Beverage",
    claim: "A World Without Waste — collecting and recycling every bottle by 2030",
    evidence: "Ranked #1 global plastic polluter for 6 consecutive years. 3.2M metric tons of virgin plastic produced in 2023",
    deceptionScore: 93,
    hqLocation: { lat: 33.7677, lng: -84.3902, label: "Atlanta, GA" },
    emissions: [
      { year: 2020, co2: 42 },
      { year: 2021, co2: 44 },
      { year: 2022, co2: 47 },
      { year: 2023, co2: 49 },
    ],
    pollutionData: {
      aqi: 156,
      co2ppm: 438,
      wasteDischarge: "3.2M t/yr",
    },
  },
  {
    id: "volkswagen-01",
    company: "Volkswagen",
    sector: "Automotive",
    claim: "CleanDiesel — the most environmentally responsible technology",
    evidence: "Installed defeat devices in 11M vehicles worldwide to cheat emissions tests. Real NOx output 40x legal limits",
    deceptionScore: 99,
    hqLocation: { lat: 52.4127, lng: 10.7865, label: "Wolfsburg, Germany" },
    emissions: [
      { year: 2020, co2: 65 },
      { year: 2021, co2: 70 },
      { year: 2022, co2: 72 },
      { year: 2023, co2: 74 },
    ],
    pollutionData: {
      aqi: 165,
      co2ppm: 447,
      wasteDischarge: "620K t/yr",
    },
  },
  {
    id: "chevron-01",
    company: "Chevron",
    sector: "Fossil Fuels",
    claim: "Advancing a lower carbon future for all",
    evidence: "Ecuadorian operations dumped 16B gallons toxic waste in Amazon. Court-ordered $9.5B cleanup still unpaid",
    deceptionScore: 95,
    hqLocation: { lat: 37.7749, lng: -122.4194, label: "San Francisco, CA" },
    emissions: [
      { year: 2020, co2: 1450 },
      { year: 2021, co2: 1520 },
      { year: 2022, co2: 1590 },
      { year: 2023, co2: 1640 },
    ],
    pollutionData: {
      aqi: 189,
      co2ppm: 491,
      wasteDischarge: "2.8M t/yr",
    },
  },
  {
    id: "amazon-01",
    company: "Amazon",
    sector: "E-commerce/Tech",
    claim: "The Climate Pledge: Net-zero carbon emissions by 2040",
    evidence: "Carbon footprint grew 40% since pledge (2019-2023). Generated 709M lbs of plastic packaging waste in 2023",
    deceptionScore: 86,
    hqLocation: { lat: 47.6062, lng: -122.3321, label: "Seattle, WA" },
    emissions: [
      { year: 2020, co2: 60.64 },
      { year: 2021, co2: 71.54 },
      { year: 2022, co2: 78.88 },
      { year: 2023, co2: 85.2 },
    ],
    pollutionData: {
      aqi: 148,
      co2ppm: 430,
      wasteDischarge: "709M lbs/yr",
    },
  },
  {
    id: "totalenergies-01",
    company: "TotalEnergies",
    sector: "Fossil Fuels",
    claim: "On the path to carbon neutrality by 2050",
    evidence: "Launched 17 new oil/gas projects in Africa (2021-2024). Renewable spending: 4% of total capex vs. promised 25%",
    deceptionScore: 92,
    hqLocation: { lat: 48.8566, lng: 2.3522, label: "Paris, France" },
    emissions: [
      { year: 2020, co2: 1380 },
      { year: 2021, co2: 1440 },
      { year: 2022, co2: 1520 },
      { year: 2023, co2: 1580 },
    ],
    pollutionData: {
      aqi: 184,
      co2ppm: 486,
      wasteDischarge: "2.5M t/yr",
    },
  },
  {
    id: "rwe-01",
    company: "RWE",
    sector: "Energy",
    claim: "Growing Green — Europe's renewable energy leader",
    evidence: "Remains EU's largest CO₂ emitter. Demolished 5 German villages (2020-2023) to expand lignite coal mining",
    deceptionScore: 96,
    hqLocation: { lat: 51.4556, lng: 6.8615, label: "Essen, Germany" },
    emissions: [
      { year: 2020, co2: 85 },
      { year: 2021, co2: 89 },
      { year: 2022, co2: 91 },
      { year: 2023, co2: 94 },
    ],
    pollutionData: {
      aqi: 193,
      co2ppm: 495,
      wasteDischarge: "1.9M t/yr",
    },
  },
  {
    id: "shein-01",
    company: "Shein",
    sector: "Fast Fashion",
    claim: "Making beauty accessible to all through sustainable practice",
    evidence: "Produces 6.3M tons of CO2e annually. 15% of material is plastic derived. 85 hour work weeks in factories.",
    deceptionScore: 98,
    hqLocation: { lat: 1.290270, lng: 103.851959, label: "Singapore" },
    emissions: [{ year: 2023, co2: 150 }],
    pollutionData: { aqi: 130, co2ppm: 410, wasteDischarge: "High Microplastic" }
  },
  {
    id: "zara-01",
    company: "Inditex (Zara)",
    sector: "Fast Fashion",
    claim: "Working towards a sustainable circular economy",
    evidence: "Pumps out 450 million garments a year. Only 1% of recycled textiles used in new clothes.",
    deceptionScore: 89,
    hqLocation: { lat: 43.3015, lng: -8.5133, label: "Arteixo, Spain" },
    emissions: [{ year: 2023, co2: 89 }],
    pollutionData: { aqi: 110, co2ppm: 405, wasteDischarge: "Dye Runoff" }
  },
  {
    id: "glencore-01",
    company: "Glencore",
    sector: "Mining",
    claim: "Responsibly sourcing the commodities for everyday life",
    evidence: "Multiple bribery convictions. Massive toxic lead emissions in Peru and Zambia operations affecting children.",
    deceptionScore: 96,
    hqLocation: { lat: 47.1662, lng: 8.5155, label: "Baar, Switzerland" },
    emissions: [{ year: 2023, co2: 280 }],
    pollutionData: { aqi: 210, co2ppm: 510, wasteDischarge: "Heavy Metals" }
  },
  {
    id: "vale-01",
    company: "Vale",
    sector: "Mining",
    claim: "Mining for a better future",
    evidence: "Responsible for Brumadinho dam disaster killing 270 people. Continued destruction of Brazilian savanna.",
    deceptionScore: 95,
    hqLocation: { lat: -22.9068, lng: -43.1729, label: "Rio de Janeiro, Brazil" },
    emissions: [{ year: 2023, co2: 120 }],
    pollutionData: { aqi: 160, co2ppm: 450, wasteDischarge: "Tailings" }
  },
  {
    id: "cargill-01",
    company: "Cargill",
    sector: "Agriculture",
    claim: "Helping the world thrive",
    evidence: "Largest private company driver of deforestation in Brazil. Supply chain linked to child labor in West Africa.",
    deceptionScore: 92,
    hqLocation: { lat: 44.9778, lng: -93.2650, label: "Minnetonka, MN" },
    emissions: [{ year: 2023, co2: 310 }],
    pollutionData: { aqi: 145, co2ppm: 440, wasteDischarge: "Fertilizer Runoff" }
  },
  {
    id: "jbs-01",
    company: "JBS",
    sector: "Agriculture",
    claim: "Net Zero 2040",
    evidence: "World's largest meat producer. Linked to 100k+ hectares of Amazon deforestation annually.",
    deceptionScore: 97,
    hqLocation: { lat: -23.5505, lng: -46.6333, label: "São Paulo, Brazil" },
    emissions: [{ year: 2023, co2: 420 }],
    pollutionData: { aqi: 175, co2ppm: 480, wasteDischarge: "Methane" }
  },
  {
    id: "gazprom-01",
    company: "Gazprom",
    sector: "Fossil Fuels",
    claim: "Reliable energy supplier",
    evidence: "Responsible for largest methane leaks recorded in history. Zero meaningful transition plan.",
    deceptionScore: 99,
    hqLocation: { lat: 59.9343, lng: 30.3351, label: "St. Petersburg, Russia" },
    emissions: [{ year: 2023, co2: 1200 }],
    pollutionData: { aqi: 180, co2ppm: 550, wasteDischarge: "Methane Leaks" }
  },
  {
    id: "aramco-01",
    company: "Saudi Aramco",
    sector: "Fossil Fuels",
    claim: "Lower carbon energy for the future",
    evidence: "The single largest corporate emitter in history. expanding production capacity to 13M barrels/day.",
    deceptionScore: 98,
    hqLocation: { lat: 26.3927, lng: 50.1396, label: "Dhahran, Saudi Arabia" },
    emissions: [{ year: 2023, co2: 2200 }],
    pollutionData: { aqi: 190, co2ppm: 520, wasteDischarge: "Oil Spills" }
  },
  {
    id: "china-coal-01",
    company: "China Coal Energy",
    sector: "Coal",
    claim: "Clean and efficient energy",
    evidence: "Operating massive open pit mines in Inner Mongolia destroying grasslands and water tables.",
    deceptionScore: 89,
    hqLocation: { lat: 39.9042, lng: 116.4074, label: "Beijing, China" },
    emissions: [{ year: 2023, co2: 950 }],
    pollutionData: { aqi: 250, co2ppm: 600, wasteDischarge: "Coal Dust" }
  },
  {
    id: "bayer-01",
    company: "Bayer (Monsanto)",
    sector: "Chemicals",
    claim: "Science for a better life",
    evidence: "Production of bee-killing neonicotinoids and glyphosate. Extensive soil degradation.",
    deceptionScore: 91,
    hqLocation: { lat: 51.0171, lng: 6.9531, label: "Leverkusen, Germany" },
    emissions: [{ year: 2023, co2: 60 }],
    pollutionData: { aqi: 120, co2ppm: 400, wasteDischarge: "Chemical Runoff" }
  },
  {
    id: "tsmc-01",
    company: "TSMC",
    sector: "Tech",
    claim: "Green manufacturing pioneer",
    evidence: "Consumes 5% of Taiwan's total energy and 63M tons of water annually in drought conditions.",
    deceptionScore: 82,
    hqLocation: { lat: 24.8138, lng: 120.9675, label: "Hsinchu, Taiwan" },
    emissions: [{ year: 2023, co2: 45 }],
    pollutionData: { aqi: 135, co2ppm: 420, wasteDischarge: "Acid Waste" }
  },
  {
    id: "samsung-01",
    company: "Samsung Electronics",
    sector: "Tech",
    claim: "PlanetFirst",
    evidence: "Heavily reliant on coal power in Korea and Vietnam. 80% of supply chain emissions unaddressed.",
    deceptionScore: 85,
    hqLocation: { lat: 37.2636, lng: 127.0286, label: "Suwon, South Korea" },
    emissions: [{ year: 2023, co2: 88 }],
    pollutionData: { aqi: 155, co2ppm: 440, wasteDischarge: "E-Waste" }
  },
  {
    id: "adulterated-fuel",
    company: "Trafigura",
    sector: "Commodities",
    claim: "Responsibly connecting markets",
    evidence: "Exported toxic 'dirty diesel' to African markets containing 200x sulfur limits causing respiratory crises.",
    deceptionScore: 98,
    hqLocation: { lat: 1.2834, lng: 103.8607, label: "Singapore" },
    emissions: [{ year: 2023, co2: 300 }],
    pollutionData: { aqi: 220, co2ppm: 490, wasteDischarge: "Sulfur Dioxide" }
  },
  {
    id: "dupont-01",
    company: "DuPont",
    sector: "Chemicals",
    claim: "Sustainable innovations",
    evidence: "Creator of PFAS 'forever chemicals' contaminating water for 200M+ Americans. Hid toxicity data for decades.",
    deceptionScore: 99,
    hqLocation: { lat: 39.7447, lng: -75.5484, label: "Wilmington, DE" },
    emissions: [{ year: 2023, co2: 70 }],
    pollutionData: { aqi: 140, co2ppm: 410, wasteDischarge: "PFAS" }
  },
  {
    id: "anglo-american",
    company: "Anglo American",
    sector: "Mining",
    claim: "Re-imagining mining to improve people's lives",
    evidence: "Lead poisoning settlement in Zambia. Coal expansion in Australia despite net-zero pledges.",
    deceptionScore: 90,
    hqLocation: { lat: 51.5045, lng: -0.1375, label: "London, UK" },
    emissions: [{ year: 2023, co2: 210 }],
    pollutionData: { aqi: 165, co2ppm: 460, wasteDischarge: "Lead Dust" }
  },
  {
    id: "pepsico-01",
    company: "PepsiCo",
    sector: "Food & Beverage",
    claim: "pep+ (PepsiCo Positive)",
    evidence: "Found in top 3 plastic polluters globally for 5 years. Emissions rose 7% in 2022 despite pledges.",
    deceptionScore: 89,
    hqLocation: { lat: 41.0339, lng: -73.7629, label: "Purchase, NY" },
    emissions: [{ year: 2023, co2: 92 }],
    pollutionData: { aqi: 150, co2ppm: 430, wasteDischarge: "Plastic" }
  },
  {
    id: "danone-01",
    company: "Danone",
    sector: "Food & Beverage",
    claim: "One Planet. One Health",
    evidence: "Sued by environmental groups for plastic pollution. Failing to decouple growth from virgin plastic use.",
    deceptionScore: 84,
    hqLocation: { lat: 48.8566, lng: 2.3522, label: "Paris, France" },
    emissions: [{ year: 2023, co2: 55 }],
    pollutionData: { aqi: 140, co2ppm: 410, wasteDischarge: "Microplastics" }
  },
  {
    id: "unilever-01",
    company: "Unilever",
    sector: "Consumer Goods",
    claim: "Clean Future Strategy",
    evidence: "Sachets sold in Asia flood waterways and cannot be recycled. Continued use of palm oil linked to deforestation.",
    deceptionScore: 87,
    hqLocation: { lat: 51.5074, lng: -0.1278, label: "London, UK" },
    emissions: [{ year: 2023, co2: 78 }],
    pollutionData: { aqi: 145, co2ppm: 420, wasteDischarge: "Sachets" }
  },
  {
    id: "tesla-01",
    company: "Tesla",
    sector: "Automotive",
    claim: "Accelerating the world's transition to sustainable energy",
    evidence: "Ranked poorly on environmental reporting transparency. Lithium sourcing linked to water depletion in Chile.",
    deceptionScore: 78,
    hqLocation: { lat: 30.2672, lng: -97.7431, label: "Austin, TX" },
    emissions: [{ year: 2023, co2: 30 }],
    pollutionData: { aqi: 130, co2ppm: 405, wasteDischarge: "Battery Waste" }
  },
  {
    id: "h-m-01",
    company: "H&M Group",
    sector: "Fast Fashion",
    claim: "Let's close the loop",
    evidence: "96% of claims flagged as misleading by Changing Markets Foundation. Burning unsold clothes in power plants.",
    deceptionScore: 94,
    hqLocation: { lat: 59.3293, lng: 18.0686, label: "Stockholm, Sweden" },
    emissions: [{ year: 2023, co2: 110 }],
    pollutionData: { aqi: 125, co2ppm: 415, wasteDischarge: "Textile Waste" }
  },
  {
    id: "uniqlo-01",
    company: "Fast Retailing (Uniqlo)",
    sector: "Fast Fashion",
    claim: "LifeWear: Made for All",
    evidence: "Slow to phase out coal in supply chain. Linked to forced labor allegations in Xinjiang cotton.",
    deceptionScore: 91,
    hqLocation: { lat: 35.6895, lng: 139.6917, label: "Tokyo, Japan" },
    emissions: [{ year: 2023, co2: 95 }],
    pollutionData: { aqi: 160, co2ppm: 450, wasteDischarge: "Dyes" }
  },
  {
    id: "marathon-01",
    company: "Marathon Petroleum",
    sector: "Fossil Fuels",
    claim: "Challenging ourselves to lead in sustainable energy",
    evidence: "Largest refiner in US. Heavily funds trade groups fighting EV mandates and fuel efficiency standards.",
    deceptionScore: 96,
    hqLocation: { lat: 41.0442, lng: -83.6499, label: "Findlay, OH" },
    emissions: [{ year: 2023, co2: 1800 }],
    pollutionData: { aqi: 185, co2ppm: 490, wasteDischarge: "Refinery Emissions" }
  },
  {
    id: "rio-tinto-01",
    company: "Rio Tinto",
    sector: "Mining",
    claim: "Producing materials essential to human progress",
    evidence: "Blasted 46,000-year-old Juukan Gorge rock shelters. History of toxic spills and community displacement.",
    deceptionScore: 97,
    hqLocation: { lat: -31.9505, lng: 115.8605, label: "Perth, Australia" },
    emissions: [{ year: 2023, co2: 340 }],
    pollutionData: { aqi: 170, co2ppm: 470, wasteDischarge: "Mine Tailings" }
  },
  {
    id: "eni-01",
    company: "Eni",
    sector: "Fossil Fuels",
    claim: "Just Transition",
    evidence: "Advertising banned in UK for misleading claims about 'biodiesel'. Expanding oil drilling in the Arctic.",
    deceptionScore: 93,
    hqLocation: { lat: 41.9028, lng: 12.4964, label: "Rome, Italy" },
    emissions: [{ year: 2023, co2: 1400 }],
    pollutionData: { aqi: 180, co2ppm: 480, wasteDischarge: "Oil Spills" }
  }
];
