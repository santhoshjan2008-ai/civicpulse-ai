import { Report } from '../types/report';

export const INITIAL_REPORTS: Report[] = [
  // --- CLUSTER 1: MG ROAD WATERLOGGING & DRAINAGE (Recurring Critical Cluster) ---
  {
    id: 'REP-2026-0101',
    title: 'Severe waterlogging blocking traffic under MG Road Metro',
    description: 'Waist-high water accumulation near MG Road Metro Station exit A. Two cars stalled and pedestrian pathway completely submerged. Traffic backed up for 2 km.',
    aiSummary: 'Critical flood accumulation (3+ feet) disrupting arterial road & metro access.',
    category: 'Waterlogging',
    aiCategory: 'Waterlogging',
    aiCategoryConfidence: 0.98,
    imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 12.9756,
      lng: 77.6067,
      address: 'MG Road Metro Station Pillar 124, Ward 111 (Shantala Nagar)',
    },
    ward: 'Ward 111 - Shantala Nagar',
    priority: 'Critical',
    priorityScore: 96,
    priorityReasons: [
      'Reported 8 times within 90 minutes in this 50m radius',
      'Arterial transit corridor with heavy peak-hour footfall',
      'Life safety risk: submerged electrical utility box spotted',
      'Immediate risk to metro commuters and vehicle stalls'
    ],
    duplicateCount: 7,
    status: 'In Progress',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-11T18:15:00Z', note: 'Reported by commuter' },
      { status: 'Verified', timestamp: '2026-11-11T18:22:00Z', note: 'AI duplicate consolidation verified 7 matching reports', actor: 'AI Civic Engine' },
      { status: 'Assigned', timestamp: '2026-11-11T18:30:00Z', note: 'Dispatched to BBMP Stormwater Drainage Rapid Unit', actor: 'Control Room' },
      { status: 'In Progress', timestamp: '2026-11-11T18:50:00Z', note: 'High-power dewatering suction pump deployed on-site', actor: 'Team Alpha' }
    ],
    assignedDepartment: 'Stormwater Drainage',
    assignedTeam: 'East Zone Rapid Dewatering Team',
    createdAt: '2026-11-11T18:15:00Z',
    updatedAt: '2026-11-11T18:50:00Z',
    citizenName: 'Karthik Rao',
    citizenPhone: '+91 98450 12345'
  },
  {
    id: 'REP-2026-0102',
    title: 'Water flooded across Anil Kumble Circle intersection',
    description: 'Heavy water logging near Anil Kumble junction. Bikes slipping and drain appears totally blocked with plastic debris.',
    aiSummary: 'Junction flooded with severe skid risk for two-wheelers; storm drain clogged.',
    category: 'Waterlogging',
    aiCategory: 'Waterlogging',
    aiCategoryConfidence: 0.96,
    imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 12.9749,
      lng: 77.6080,
      address: 'Anil Kumble Circle, MG Road junction',
    },
    ward: 'Ward 111 - Shantala Nagar',
    priority: 'Critical',
    priorityScore: 92,
    priorityReasons: [
      'Proximity (<150m) to MG Road flood hotspot',
      'Vehicle skid accidents reported on live traffic feed',
      'Recurring issue (reported 14 times this monsoon)'
    ],
    duplicateCount: 4,
    status: 'Assigned',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-11T18:25:00Z' },
      { status: 'Verified', timestamp: '2026-11-11T18:32:00Z' },
      { status: 'Assigned', timestamp: '2026-11-11T18:45:00Z', note: 'Combined with Metro Pillar response team' }
    ],
    assignedDepartment: 'Stormwater Drainage',
    createdAt: '2026-11-11T18:25:00Z',
    updatedAt: '2026-11-11T18:45:00Z',
    citizenName: 'Sneha Patel'
  },
  {
    id: 'REP-2026-0103',
    title: 'Stormwater drain overflowing back onto footpath',
    description: 'Black sludge regurgitating from drain grates outside Cauvery Emporium. Foul stench and pedestrians forced onto road.',
    aiSummary: 'Drain overflow with bio-hazard sludge forcing pedestrians into roadway traffic.',
    category: 'Drainage',
    aiCategory: 'Drainage',
    aiCategoryConfidence: 0.94,
    imageUrl: 'https://images.unsplash.com/photo-1574063413132-355dbfd83e25?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 12.9752,
      lng: 77.6072,
      address: 'Opposite Cauvery Arts & Crafts, MG Road',
    },
    ward: 'Ward 111 - Shantala Nagar',
    priority: 'High',
    priorityScore: 82,
    priorityReasons: [
      'Pedestrian flow disruption on high-density sidewalk',
      'Contaminant overflow risk near dining establishments'
    ],
    duplicateCount: 2,
    status: 'Verified',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-11T19:05:00Z' },
      { status: 'Verified', timestamp: '2026-11-11T19:12:00Z' }
    ],
    assignedDepartment: 'Stormwater Drainage',
    createdAt: '2026-11-11T19:05:00Z',
    updatedAt: '2026-11-11T19:12:00Z',
    citizenName: 'Rahul Verma'
  },
  {
    id: 'REP-2026-0104',
    title: 'Water stagnation near Trinity Circle ramp',
    description: 'Ponding water 1.5 ft deep on left turning lane towards Trinity circle. Vehicles hydroplaning.',
    aiSummary: 'Deep water stagnation at highway curve creating hydroplaning risk.',
    category: 'Waterlogging',
    aiCategory: 'Waterlogging',
    aiCategoryConfidence: 0.95,
    location: {
      lat: 12.9729,
      lng: 77.6180,
      address: 'Trinity Metro ramp junction, Old Airport Rd turn',
    },
    ward: 'Ward 111 - Shantala Nagar',
    priority: 'High',
    priorityScore: 78,
    priorityReasons: [
      'High-speed approach zone with hydroplaning hazards',
      'Correlated with MG Road catchment basin failure'
    ],
    duplicateCount: 1,
    status: 'Submitted',
    statusHistory: [{ status: 'Submitted', timestamp: '2026-11-11T19:40:00Z' }],
    createdAt: '2026-11-11T19:40:00Z',
    updatedAt: '2026-11-11T19:40:00Z',
    citizenName: 'Vikram Menon'
  },

  // --- CLUSTER 2: INDIRANAGAR 100 FT ROAD LIGHTING & SAFETY HAZARDS ---
  {
    id: 'REP-2026-0201',
    title: 'Exposed live wire hanging from broken streetlight pole',
    description: 'Streetlight pole #IND-44 knocked down by a truck. Exposed wiring sparking in light rain right opposite National Public School gate.',
    aiSummary: 'Critical electrocution hazard: live exposed wiring sparking near school gate.',
    category: 'Streetlight',
    aiCategory: 'Streetlight',
    aiCategoryConfidence: 0.99,
    imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 12.9784,
      lng: 77.6408,
      address: '100 Feet Rd, near 12th Main cross, Indiranagar',
    },
    ward: 'Ward 80 - Indiranagar',
    priority: 'Critical',
    priorityScore: 98,
    priorityReasons: [
      'Immediate threat to human life: live sparking cable',
      'High vulnerability zone: directly adjacent to primary school entrance',
      'Rainfall increasing electrocution transmission risk',
      '3 distress calls logged in 15 minutes'
    ],
    duplicateCount: 5,
    status: 'In Progress',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-11T17:10:00Z' },
      { status: 'Verified', timestamp: '2026-11-11T17:12:00Z', note: 'AI escalated to Critical based on "live wire + school" match' },
      { status: 'Assigned', timestamp: '2026-11-11T17:15:00Z', note: 'BESCOM emergency grid isolation unit alerted' },
      { status: 'In Progress', timestamp: '2026-11-11T17:35:00Z', note: 'Lineman on site; grid sub-station isolated line' }
    ],
    assignedDepartment: 'Electrical & Streetlights',
    assignedTeam: 'BESCOM Fast Response Unit 4',
    createdAt: '2026-11-11T17:10:00Z',
    updatedAt: '2026-11-11T17:35:00Z',
    citizenName: 'Ananya Deshmukh',
    citizenPhone: '+91 99001 54321'
  },
  {
    id: 'REP-2026-0202',
    title: 'Series of 6 consecutive dark streetlights on 100 Ft Rd',
    description: 'Pitch dark stretch from 6th Main to 10th Main on 100 Feet Road. Women commuters feeling unsafe, and uneven curb led to elderly woman fall.',
    aiSummary: '300m pedestrian corridor completely dark; heightened crime & trip risk.',
    category: 'Streetlight',
    aiCategory: 'Streetlight',
    aiCategoryConfidence: 0.97,
    imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 12.9760,
      lng: 77.6415,
      address: '100 Feet Rd, between 6th & 10th Main, Indiranagar',
    },
    ward: 'Ward 80 - Indiranagar',
    priority: 'High',
    priorityScore: 79,
    priorityReasons: [
      'Multi-lamp failure indicating feeder pillar breaker trip',
      'High-traffic commercial street with late night footfall',
      'Pedestrian injury documented in citizen report'
    ],
    duplicateCount: 3,
    status: 'Assigned',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-11T19:10:00Z' },
      { status: 'Verified', timestamp: '2026-11-11T19:25:00Z' },
      { status: 'Assigned', timestamp: '2026-11-11T20:00:00Z' }
    ],
    assignedDepartment: 'Electrical & Streetlights',
    createdAt: '2026-11-11T19:10:00Z',
    updatedAt: '2026-11-11T20:00:00Z',
    citizenName: 'Meera Nambiar'
  },
  {
    id: 'REP-2026-0203',
    title: 'Flickering high-voltage light making buzzing noise',
    description: 'Streetlight buzzing violently and shorting on 12th Main junction.',
    aiSummary: 'Short-circuiting ballast with audible arcing on residential junction.',
    category: 'Streetlight',
    aiCategory: 'Streetlight',
    aiCategoryConfidence: 0.95,
    location: {
      lat: 12.9772,
      lng: 77.6402,
      address: '12th Main corner, Indiranagar Ward 80',
    },
    ward: 'Ward 80 - Indiranagar',
    priority: 'Medium',
    priorityScore: 61,
    priorityReasons: ['Electrical fire hazard if transformer overload worsens'],
    duplicateCount: 1,
    status: 'Verified',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-11T20:15:00Z' },
      { status: 'Verified', timestamp: '2026-11-11T20:30:00Z' }
    ],
    assignedDepartment: 'Electrical & Streetlights',
    createdAt: '2026-11-11T20:15:00Z',
    updatedAt: '2026-11-11T20:30:00Z',
    citizenName: 'Arjun Swaminathan'
  },

  // --- CLUSTER 3: KORAMANGALA 5TH BLOCK WASTE DUMP (Recurring Sanitation Cluster) ---
  {
    id: 'REP-2026-0301',
    title: 'Overflowing commercial garbage hill spilling into road',
    description: 'Enormous pile of wet and dry waste outside 5th Block park. Restaurants dumping commercial food waste. Stray dogs and cows blocking the road, foul stench reaching nearby apartments.',
    aiSummary: 'Massive commercial waste accumulation blocking lane & breeding vector disease.',
    category: 'Waste/Garbage',
    aiCategory: 'Waste/Garbage',
    aiCategoryConfidence: 0.98,
    imageUrl: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 12.9348,
      lng: 77.6218,
      address: 'Opposite Jyoti Nivas College Rd, 5th Block Koramangala',
    },
    ward: 'Ward 151 - Koramangala',
    priority: 'High',
    priorityScore: 84,
    priorityReasons: [
      'Recurring civic failure: 11th complaint in 30 days at this spot',
      'Severe public health risk: organic decomposition near residential enclave',
      'Stray pack aggression reported by nearby students',
      'Solid waste blocking roadside drainage channel'
    ],
    duplicateCount: 9,
    status: 'Assigned',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-11T08:00:00Z' },
      { status: 'Verified', timestamp: '2026-11-11T08:15:00Z' },
      { status: 'Assigned', timestamp: '2026-11-11T09:00:00Z', note: 'Assigned to Solid Waste Management Tipper Fleet #3' }
    ],
    assignedDepartment: 'Solid Waste Management',
    assignedTeam: 'South Zone Compactors Crew',
    createdAt: '2026-11-11T08:00:00Z',
    updatedAt: '2026-11-11T09:00:00Z',
    citizenName: 'Priya Sundaram',
    citizenPhone: '+91 97412 88990'
  },
  {
    id: 'REP-2026-0302',
    title: 'Dumped medical & plastic waste burning illegally',
    description: 'Someone set fire to the dumped plastic and syringe packaging at the empty lot behind 1st cross. Toxic acrid smoke filling surrounding homes.',
    aiSummary: 'Hazardous plastic & bio-medical waste open burning producing toxic fumes.',
    category: 'Waste/Garbage',
    aiCategory: 'Waste/Garbage',
    aiCategoryConfidence: 0.99,
    imageUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 12.9355,
      lng: 77.6225,
      address: '1st Cross, 5th Block, near Koramangala Club',
    },
    ward: 'Ward 151 - Koramangala',
    priority: 'Critical',
    priorityScore: 94,
    priorityReasons: [
      'Hazardous air toxicity: burning PVC and hazardous waste materials',
      'Proximity to pediatric clinic within 100 meters',
      'Fire spreading danger to adjacent tree canopy'
    ],
    duplicateCount: 4,
    status: 'In Progress',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-11T16:20:00Z' },
      { status: 'Verified', timestamp: '2026-11-11T16:24:00Z' },
      { status: 'Assigned', timestamp: '2026-11-11T16:30:00Z' },
      { status: 'In Progress', timestamp: '2026-11-11T16:45:00Z', note: 'Fire tender summoned and water dousing active' }
    ],
    assignedDepartment: 'Environmental Health & Safety',
    createdAt: '2026-11-11T16:20:00Z',
    updatedAt: '2026-11-11T16:45:00Z',
    citizenName: 'Aditya Sen'
  },
  {
    id: 'REP-2026-0303',
    title: 'Garbage bins overturned across 4th cross lane',
    description: 'Three heavy municipal bins turned upside down, rubbish strewn over 40 meters of road.',
    aiSummary: 'Overturned municipal dumpsters blocking secondary access lane.',
    category: 'Waste/Garbage',
    aiCategory: 'Waste/Garbage',
    aiCategoryConfidence: 0.93,
    location: {
      lat: 12.9339,
      lng: 77.6205,
      address: '4th Cross, 5th Block Koramangala',
    },
    ward: 'Ward 151 - Koramangala',
    priority: 'Medium',
    priorityScore: 58,
    priorityReasons: ['Local lane obstruction', 'Nuisance to morning walkers'],
    duplicateCount: 1,
    status: 'Verified',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-11T11:00:00Z' },
      { status: 'Verified', timestamp: '2026-11-11T11:20:00Z' }
    ],
    assignedDepartment: 'Solid Waste Management',
    createdAt: '2026-11-11T11:00:00Z',
    updatedAt: '2026-11-11T11:20:00Z',
    citizenName: 'Divya Krishnan'
  },

  // --- CLUSTER 4: HSR LAYOUT ROAD DAMAGE & CRATERS ---
  {
    id: 'REP-2026-0401',
    title: 'Deep crater pothole causing motorcycle accidents',
    description: 'Massive 2-foot deep trench/pothole in middle of 27th Main. Saw two delivery boys crash their bikes this evening. Water hides its depth when raining.',
    aiSummary: 'Critical road subsidence crater (2ft) actively causing vehicular accidents.',
    category: 'Road Damage',
    aiCategory: 'Road Damage',
    aiCategoryConfidence: 0.99,
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 12.9116,
      lng: 77.6389,
      address: '27th Main Rd, Sector 1, HSR Layout near CPWD Complex',
    },
    ward: 'Ward 174 - HSR Layout',
    priority: 'Critical',
    priorityScore: 95,
    priorityReasons: [
      'Two documented two-wheeler casualty crashes in past 4 hours',
      'Hidden submerged trench on high-speed arterial stretch',
      'Pavement foundation collapsed below asphalt layer'
    ],
    duplicateCount: 8,
    status: 'In Progress',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-11T15:00:00Z' },
      { status: 'Verified', timestamp: '2026-11-11T15:10:00Z' },
      { status: 'Assigned', timestamp: '2026-11-11T15:25:00Z' },
      { status: 'In Progress', timestamp: '2026-11-11T16:00:00Z', note: 'Emergency asphalt cold-mix barricades deployed' }
    ],
    assignedDepartment: 'Road Infrastructure',
    assignedTeam: 'Road Maintenance Quick Strike Unit',
    createdAt: '2026-11-11T15:00:00Z',
    updatedAt: '2026-11-11T16:00:00Z',
    citizenName: 'Rohan Gupta',
    citizenPhone: '+91 99801 33445'
  },
  {
    id: 'REP-2026-0402',
    title: 'Sunken manhole cover sticking 6 inches above asphalt',
    description: 'Manhole ring protruding dangerously after recent resurfacing work. Cars scraping underbody.',
    aiSummary: 'Uneven metal manhole lip causing severe vehicle underbody damage.',
    category: 'Road Damage',
    aiCategory: 'Road Damage',
    aiCategoryConfidence: 0.96,
    imageUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 12.9090,
      lng: 77.6430,
      address: '14th Main Rd, Sector 7, HSR Layout',
    },
    ward: 'Ward 174 - HSR Layout',
    priority: 'High',
    priorityScore: 76,
    priorityReasons: [
      'Sudden braking obstacle on dense commuter connector',
      'Structural misalignment between BWSSB chamber and road grade'
    ],
    duplicateCount: 3,
    status: 'Assigned',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-11T12:30:00Z' },
      { status: 'Verified', timestamp: '2026-11-11T12:50:00Z' },
      { status: 'Assigned', timestamp: '2026-11-11T13:30:00Z' }
    ],
    assignedDepartment: 'Road Infrastructure',
    createdAt: '2026-11-11T12:30:00Z',
    updatedAt: '2026-11-11T13:30:00Z',
    citizenName: 'Deepa Hegde'
  },
  {
    id: 'REP-2026-0403',
    title: 'Asphalt peeling off freshly laid road after rain',
    description: 'The top tar layer has turned into loose gravel only 2 weeks after laying. Fly-gravel hitting pedestrians.',
    aiSummary: 'Bitumen failure and loose gravel spray posing pedestrian risk.',
    category: 'Road Damage',
    aiCategory: 'Road Damage',
    aiCategoryConfidence: 0.91,
    location: {
      lat: 12.9140,
      lng: 77.6410,
      address: 'Sector 2 Park Perimeter Rd, HSR Layout',
    },
    ward: 'Ward 174 - HSR Layout',
    priority: 'Medium',
    priorityScore: 54,
    priorityReasons: ['Premature surface degradation under contractor warranty'],
    duplicateCount: 1,
    status: 'Verified',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-10T14:15:00Z' },
      { status: 'Verified', timestamp: '2026-11-10T15:00:00Z' }
    ],
    assignedDepartment: 'Road Infrastructure',
    createdAt: '2026-11-10T14:15:00Z',
    updatedAt: '2026-11-10T15:00:00Z',
    citizenName: 'Sunil Bhat'
  },

  // --- CLUSTER 5: WHITEFIELD MAIN ROAD WATER SUPPLY & PIPE BURST ---
  {
    id: 'REP-2026-0501',
    title: 'Major main water pipe burst flooding road and wasting thousands of liters',
    description: 'Cauvery water supply trunk line burst open with a 15-foot geyser. Potable water flooding the ITPL main road and homes in adjacent layout have zero water supply.',
    aiSummary: 'Potable water trunkline rupture wasting high volume & cutting neighborhood supply.',
    category: 'Water Supply',
    aiCategory: 'Water Supply',
    aiCategoryConfidence: 0.99,
    imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 12.9865,
      lng: 77.7315,
      address: 'Near ITPL Main Gate, Whitefield Main Road',
    },
    ward: 'Ward 84 - Hagadur (Whitefield)',
    priority: 'Critical',
    priorityScore: 93,
    priorityReasons: [
      'Massive loss of treated municipal drinking water (>50k liters/hr)',
      'Subsurface soil erosion threatening road foundation',
      'Affected supply to 12,000+ residents in surrounding apartment complexes'
    ],
    duplicateCount: 6,
    status: 'In Progress',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-11T06:30:00Z' },
      { status: 'Verified', timestamp: '2026-11-11T06:40:00Z' },
      { status: 'Assigned', timestamp: '2026-11-11T07:00:00Z' },
      { status: 'In Progress', timestamp: '2026-11-11T07:45:00Z', note: 'Valve shut off upstream; excavation team arriving' }
    ],
    assignedDepartment: 'Water Supply & Sewerage',
    assignedTeam: 'BWSSB Emergency Pipeline Division',
    createdAt: '2026-11-11T06:30:00Z',
    updatedAt: '2026-11-11T07:45:00Z',
    citizenName: 'Naveen Kumar',
    citizenPhone: '+91 94480 67890'
  },
  {
    id: 'REP-2026-0502',
    title: 'Contaminated brown muddy water coming from taps',
    description: 'All residential taps in ECC Road are pumping sewage-mixed brown water for past 24 hours. Multiple children vomiting.',
    aiSummary: 'Sewage contamination in domestic drinking water pipeline causing illness.',
    category: 'Water Supply',
    aiCategory: 'Water Supply',
    aiCategoryConfidence: 0.97,
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 12.9720,
      lng: 77.7480,
      address: 'ECC Road, Inner Circle, Whitefield',
    },
    ward: 'Ward 84 - Hagadur (Whitefield)',
    priority: 'Critical',
    priorityScore: 97,
    priorityReasons: [
      'Active water-borne disease outbreak risk: gastroenteritis reported',
      'Cross-contamination between broken sewage conduit and water supply',
      'Children and elderly directly impacted'
    ],
    duplicateCount: 7,
    status: 'Verified',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-11T14:00:00Z' },
      { status: 'Verified', timestamp: '2026-11-11T14:15:00Z', note: 'Emergency health alert triggered to Chief Medical Officer' }
    ],
    assignedDepartment: 'Water Supply & Sewerage',
    createdAt: '2026-11-11T14:00:00Z',
    updatedAt: '2026-11-11T14:15:00Z',
    citizenName: 'Dr. Shalini George'
  },
  {
    id: 'REP-2026-0503',
    title: 'Low water pressure for 5 straight days in Nallurahalli',
    description: 'Almost no pressure in line, taking 3 hours to fill a single bucket.',
    aiSummary: 'Severe persistent pressure drop in distribution branch.',
    category: 'Water Supply',
    aiCategory: 'Water Supply',
    aiCategoryConfidence: 0.90,
    location: {
      lat: 12.9690,
      lng: 77.7220,
      address: 'Nallurahalli Main Rd, Whitefield',
    },
    ward: 'Ward 84 - Hagadur (Whitefield)',
    priority: 'Medium',
    priorityScore: 50,
    priorityReasons: ['Continuous basic utility shortage affecting 40 households'],
    duplicateCount: 2,
    status: 'Submitted',
    statusHistory: [{ status: 'Submitted', timestamp: '2026-11-10T10:00:00Z' }],
    createdAt: '2026-11-10T10:00:00Z',
    updatedAt: '2026-11-10T10:00:00Z',
    citizenName: 'Manjunath Gowda'
  },

  // --- CLUSTER 6: MALLESHWARAM OPEN MANHOLES & PEDESTRIAN SAFETY ---
  {
    id: 'REP-2026-0601',
    title: 'Missing manhole cover on crowded 8th Cross market street',
    description: 'Open 10-foot deep storm sewer manhole with no warning barricade. Pedestrians shopping for festival nearly stepped right inside. Extremely hazardous after dark.',
    aiSummary: 'Unguarded 10ft open sewer drop on high-density commercial footpath.',
    category: 'Drainage',
    aiCategory: 'Drainage',
    aiCategoryConfidence: 0.99,
    imageUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 12.9982,
      lng: 77.5714,
      address: '8th Cross Market Road, Malleshwaram',
    },
    ward: 'Ward 65 - Kadu Malleshwaram',
    priority: 'Critical',
    priorityScore: 97,
    priorityReasons: [
      'Fatal fall hazard: 10-foot vertical drop directly on pedestrian line',
      'Dense market area with thousands of shoppers and children',
      'No barricade or safety lighting present'
    ],
    duplicateCount: 6,
    status: 'Assigned',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-11T13:10:00Z' },
      { status: 'Verified', timestamp: '2026-11-11T13:18:00Z' },
      { status: 'Assigned', timestamp: '2026-11-11T13:40:00Z', note: 'Emergency barricade van dispatched' }
    ],
    assignedDepartment: 'Stormwater Drainage',
    assignedTeam: 'North Zone Safety Patrol',
    createdAt: '2026-11-11T13:10:00Z',
    updatedAt: '2026-11-11T13:40:00Z',
    citizenName: 'Padma Sridhar',
    citizenPhone: '+91 98860 11223'
  },
  {
    id: 'REP-2026-0602',
    title: 'Broken stone footpath slabs wobbling over open drain',
    description: 'Footpath slabs shattered by heavy parked vehicles. Senior citizens having to walk on fast traffic road.',
    aiSummary: 'Collapsed footpath slabs exposing pedestrian trench hazard.',
    category: 'Road Damage',
    aiCategory: 'Road Damage',
    aiCategoryConfidence: 0.92,
    location: {
      lat: 12.9995,
      lng: 77.5695,
      address: '15th Cross, Margosa Road, Malleshwaram',
    },
    ward: 'Ward 65 - Kadu Malleshwaram',
    priority: 'Medium',
    priorityScore: 59,
    priorityReasons: ['Pedestrian slip and fall hazard', 'Forced roadway diversion'],
    duplicateCount: 2,
    status: 'Verified',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-10T16:00:00Z' },
      { status: 'Verified', timestamp: '2026-11-10T17:00:00Z' }
    ],
    assignedDepartment: 'Road Infrastructure',
    createdAt: '2026-11-10T16:00:00Z',
    updatedAt: '2026-11-10T17:00:00Z',
    citizenName: 'Girish Kulkarni'
  },

  // --- RESOLVED REPORTS (To demonstrate resolution tracking & speed KPIs) ---
  {
    id: 'REP-2026-0080',
    title: 'Fallen tree branch blocking residential street after storm',
    description: 'Large banyan branch snapped and blocked two-way traffic on 5th Main Jayamahal.',
    aiSummary: 'Fallen tree obstructing residential road successfully cleared.',
    category: 'Other',
    aiCategory: 'Other',
    aiCategoryConfidence: 0.94,
    imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 12.9920,
      lng: 77.5990,
      address: '5th Main, Jayamahal Extension',
    },
    ward: 'Ward 92 - Jayamahal',
    priority: 'High',
    priorityScore: 75,
    priorityReasons: ['Complete road block', 'Resolved within 3.2 hours of report'],
    duplicateCount: 3,
    status: 'Resolved',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-09T09:00:00Z' },
      { status: 'Verified', timestamp: '2026-11-09T09:15:00Z' },
      { status: 'Assigned', timestamp: '2026-11-09T09:40:00Z' },
      { status: 'In Progress', timestamp: '2026-11-09T10:30:00Z' },
      { status: 'Resolved', timestamp: '2026-11-09T12:15:00Z', note: 'Forestry chainsaw crew removed timber; thoroughfare restored.' }
    ],
    assignedDepartment: 'Forest & Parks Cell',
    assignedTeam: 'Quick Green Response Unit',
    createdAt: '2026-11-09T09:00:00Z',
    updatedAt: '2026-11-09T12:15:00Z',
    citizenName: 'Anil Vasudevan'
  },
  {
    id: 'REP-2026-0081',
    title: 'Streetlight pole timer malfunctioning on 4th T Block Jayanagar',
    description: 'Lights remained on at 2 PM, wasting electricity.',
    aiSummary: 'Automatic photo-cell relay repaired; energy waste stopped.',
    category: 'Streetlight',
    aiCategory: 'Streetlight',
    aiCategoryConfidence: 0.93,
    location: {
      lat: 12.9240,
      lng: 77.5850,
      address: '4th T Block, Jayanagar near Shopping Complex',
    },
    ward: 'Ward 169 - Jayanagar',
    priority: 'Low',
    priorityScore: 28,
    priorityReasons: ['Non-hazardous timer relay misconfiguration'],
    duplicateCount: 0,
    status: 'Resolved',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-08T14:00:00Z' },
      { status: 'Verified', timestamp: '2026-11-08T14:30:00Z' },
      { status: 'Assigned', timestamp: '2026-11-08T16:00:00Z' },
      { status: 'Resolved', timestamp: '2026-11-09T11:00:00Z', note: 'Timer switch replaced on distribution box' }
    ],
    assignedDepartment: 'Electrical & Streetlights',
    createdAt: '2026-11-08T14:00:00Z',
    updatedAt: '2026-11-09T11:00:00Z',
    citizenName: 'Bina Nair'
  },
  {
    id: 'REP-2026-0082',
    title: 'Pothole patch completed on Outer Ring Road Bellandur',
    description: 'Rough crater filled with asphalt cold mix after multiple citizen flags.',
    aiSummary: 'Road pothole leveled and compacted with asphalt.',
    category: 'Road Damage',
    aiCategory: 'Road Damage',
    aiCategoryConfidence: 0.95,
    location: {
      lat: 12.9290,
      lng: 77.6740,
      address: 'Outer Ring Road, near Ecospace flyover',
    },
    ward: 'Ward 150 - Bellandur',
    priority: 'High',
    priorityScore: 78,
    priorityReasons: ['Heavy commuter corridor', 'Restored to smooth traffic flow'],
    duplicateCount: 5,
    status: 'Resolved',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-07T08:30:00Z' },
      { status: 'Verified', timestamp: '2026-11-07T09:00:00Z' },
      { status: 'Assigned', timestamp: '2026-11-07T10:15:00Z' },
      { status: 'In Progress', timestamp: '2026-11-07T14:00:00Z' },
      { status: 'Resolved', timestamp: '2026-11-08T04:30:00Z', note: 'Night-shift road paver completed bitumen leveling' }
    ],
    assignedDepartment: 'Road Infrastructure',
    createdAt: '2026-11-07T08:30:00Z',
    updatedAt: '2026-11-08T04:30:00Z',
    citizenName: 'Varun Reddy'
  },

  // --- ADDITIONAL DISTRIBUTED CITY REPORTS (Low to High) ---
  {
    id: 'REP-2026-0701',
    title: 'Graffiti defacing public park heritage boundary wall',
    description: 'Vandals spray-painted offensive slogans on the stone wall of Cubbon Park.',
    aiSummary: 'Public property vandalism at heritage park enclosure.',
    category: 'Other',
    aiCategory: 'Other',
    aiCategoryConfidence: 0.90,
    location: {
      lat: 12.9730,
      lng: 77.5920,
      address: 'Kasturba Road Gate, Cubbon Park',
    },
    ward: 'Ward 111 - Shantala Nagar',
    priority: 'Low',
    priorityScore: 22,
    priorityReasons: ['Aesthetic vandalism with no immediate hazard'],
    duplicateCount: 0,
    status: 'Submitted',
    statusHistory: [{ status: 'Submitted', timestamp: '2026-11-11T12:00:00Z' }],
    createdAt: '2026-11-11T12:00:00Z',
    updatedAt: '2026-11-11T12:00:00Z',
    citizenName: 'Tara Iyengar'
  },
  {
    id: 'REP-2026-0702',
    title: 'Damaged speed breaker with exposed metal reinforcement rebar',
    description: 'Plastic speed bump dislodged, leaving 4 sharp 3-inch steel bolts sticking vertically out of the tarmac. Tire blowouts reported.',
    aiSummary: 'Exposed metal bolts on dislodged speed bump puncturing vehicle tires.',
    category: 'Road Damage',
    aiCategory: 'Road Damage',
    aiCategoryConfidence: 0.97,
    imageUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 12.9390,
      lng: 77.5810,
      address: '11th Main, 4th Block Jayanagar',
    },
    ward: 'Ward 169 - Jayanagar',
    priority: 'Critical',
    priorityScore: 89,
    priorityReasons: [
      'Sharp metal spikes causing catastrophic tire punctures at speed',
      'Cyclists and children on skateboards at acute risk'
    ],
    duplicateCount: 3,
    status: 'Verified',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-11T16:15:00Z' },
      { status: 'Verified', timestamp: '2026-11-11T16:35:00Z' }
    ],
    assignedDepartment: 'Road Infrastructure',
    createdAt: '2026-11-11T16:15:00Z',
    updatedAt: '2026-11-11T16:35:00Z',
    citizenName: 'Prakash Rao'
  },
  {
    id: 'REP-2026-0703',
    title: 'Dry tree bough cracked and dangling over auto-rickshaw stand',
    description: 'Heavy 8-meter limb hanging precariously by thin bark fibers directly above parked auto-rickshaws.',
    aiSummary: 'Imminent falling tree bough directly over transit stand.',
    category: 'Other',
    aiCategory: 'Other',
    aiCategoryConfidence: 0.94,
    location: {
      lat: 12.9610,
      lng: 77.6390,
      address: 'Near Domlur Flyover Underpass, Domlur',
    },
    ward: 'Ward 112 - Domlur',
    priority: 'High',
    priorityScore: 81,
    priorityReasons: ['High wind gust predicted; collapse could crush commuters'],
    duplicateCount: 2,
    status: 'Assigned',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-11T14:40:00Z' },
      { status: 'Verified', timestamp: '2026-11-11T15:00:00Z' },
      { status: 'Assigned', timestamp: '2026-11-11T15:30:00Z' }
    ],
    assignedDepartment: 'Forest & Parks Cell',
    createdAt: '2026-11-11T14:40:00Z',
    updatedAt: '2026-11-11T15:30:00Z',
    citizenName: 'M. Siddique'
  },
  {
    id: 'REP-2026-0704',
    title: 'Illegal dumping of construction debris on footpath',
    description: 'Truck unloaded two piles of concrete blocks and cement dust on pedestrian walkway overnight.',
    aiSummary: 'Construction debris blocking footpath and causing dust hazard.',
    category: 'Waste/Garbage',
    aiCategory: 'Waste/Garbage',
    aiCategoryConfidence: 0.92,
    location: {
      lat: 12.9210,
      lng: 77.6110,
      address: 'Tavarekere Main Rd, BTM 1st Stage',
    },
    ward: 'Ward 176 - BTM Layout',
    priority: 'Medium',
    priorityScore: 57,
    priorityReasons: ['Footpath blockage forcing pedestrians onto main road'],
    duplicateCount: 1,
    status: 'Submitted',
    statusHistory: [{ status: 'Submitted', timestamp: '2026-11-11T10:15:00Z' }],
    createdAt: '2026-11-11T10:15:00Z',
    updatedAt: '2026-11-11T10:15:00Z',
    citizenName: 'Farhan Ali'
  },
  {
    id: 'REP-2026-0705',
    title: 'Public water fountain leaking continuous puddle near park gate',
    description: 'Valve washer failed, clean water running into gutter 24/7.',
    aiSummary: 'Continuous freshwater leak at public fountain.',
    category: 'Water Supply',
    aiCategory: 'Water Supply',
    aiCategoryConfidence: 0.91,
    location: {
      lat: 12.9820,
      lng: 77.5950,
      address: 'Vasanth Nagar, near High Grounds Police Station',
    },
    ward: 'Ward 93 - Vasanth Nagar',
    priority: 'Low',
    priorityScore: 33,
    priorityReasons: ['Minor water wastage, no safety risk'],
    duplicateCount: 0,
    status: 'Submitted',
    statusHistory: [{ status: 'Submitted', timestamp: '2026-11-10T11:45:00Z' }],
    createdAt: '2026-11-10T11:45:00Z',
    updatedAt: '2026-11-10T11:45:00Z',
    citizenName: 'Shashi Kant'
  },
  {
    id: 'REP-2026-0706',
    title: 'Pedestrian signal push-button broken at zebra crossing',
    description: 'Button housing smashed. Blind and elderly citizens unable to trigger safe pedestrian green.',
    aiSummary: 'Disabled pedestrian crossing trigger out of service.',
    category: 'Streetlight',
    aiCategory: 'Streetlight',
    aiCategoryConfidence: 0.88,
    location: {
      lat: 12.9780,
      lng: 77.5890,
      address: 'Ambedkar Veedhi, near Vidhana Soudha',
    },
    ward: 'Ward 111 - Shantala Nagar',
    priority: 'Medium',
    priorityScore: 63,
    priorityReasons: ['High vulnerability crossing for disabled and senior citizens'],
    duplicateCount: 1,
    status: 'Verified',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-11T09:20:00Z' },
      { status: 'Verified', timestamp: '2026-11-11T09:45:00Z' }
    ],
    assignedDepartment: 'Traffic & Infrastructure',
    createdAt: '2026-11-11T09:20:00Z',
    updatedAt: '2026-11-11T09:45:00Z',
    citizenName: 'Dr. Ramesh Prabhu'
  },
  {
    id: 'REP-2026-0707',
    title: 'Sewage backup bubbling into apartment basement',
    description: 'Main municipal sewer line blocked down the road, causing raw sewage to back up through floor drains in basement parking.',
    aiSummary: 'Critical sewer surcharge entering basement parking level.',
    category: 'Drainage',
    aiCategory: 'Drainage',
    aiCategoryConfidence: 0.98,
    imageUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=800&auto=format&fit=crop&q=80',
    location: {
      lat: 12.9295,
      lng: 77.5925,
      address: '2nd Block, Jayanagar',
    },
    ward: 'Ward 169 - Jayanagar',
    priority: 'Critical',
    priorityScore: 91,
    priorityReasons: [
      'Extreme bio-hazard: untreated sewage in enclosed basement',
      'Electrical breaker panels within 5 meters of rising blackwater'
    ],
    duplicateCount: 4,
    status: 'In Progress',
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-11-11T17:00:00Z' },
      { status: 'Verified', timestamp: '2026-11-11T17:15:00Z' },
      { status: 'Assigned', timestamp: '2026-11-11T17:30:00Z' },
      { status: 'In Progress', timestamp: '2026-11-11T18:15:00Z', note: 'Super-sucker jetting truck clearing downstream choke' }
    ],
    assignedDepartment: 'Water Supply & Sewerage',
    assignedTeam: 'BWSSB Sewer Jetting Cell',
    createdAt: '2026-11-11T17:00:00Z',
    updatedAt: '2026-11-11T18:15:00Z',
    citizenName: 'Gayathri Murthy'
  },
  {
    id: 'REP-2026-0708',
    title: 'Crumbling curbstone damaging car tires near bus stop',
    description: 'Concrete border curb broken into sharp shards.',
    aiSummary: 'Broken concrete curbside shard risk to tires and pedestrians.',
    category: 'Road Damage',
    aiCategory: 'Road Damage',
    aiCategoryConfidence: 0.89,
    location: {
      lat: 12.9810,
      lng: 77.6040,
      address: 'Dickenson Road, near Commercial St',
    },
    ward: 'Ward 111 - Shantala Nagar',
    priority: 'Low',
    priorityScore: 35,
    priorityReasons: ['Localized curbstone wear, slow traffic zone'],
    duplicateCount: 0,
    status: 'Submitted',
    statusHistory: [{ status: 'Submitted', timestamp: '2026-11-10T18:00:00Z' }],
    createdAt: '2026-11-10T18:00:00Z',
    updatedAt: '2026-11-10T18:00:00Z',
    citizenName: 'Nandini Joshi'
  }
];

