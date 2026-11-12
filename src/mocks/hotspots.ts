import { HotspotArea } from '../types/report';

export const HOTSPOT_AREAS: HotspotArea[] = [
  {
    id: 'HOT-01',
    ward: 'Ward 111 - Shantala Nagar',
    name: 'MG Road Metro & Anil Kumble Corridor',
    center: [12.9752, 77.6075],
    reportCount: 14,
    criticalCount: 6,
    severityScore: 94,
    topCategory: 'Waterlogging',
    recurringPattern: 'Chronic monsoon flooding: 14 reports in 30 days due to blocked railway culvert intake.'
  },
  {
    id: 'HOT-02',
    ward: 'Ward 80 - Indiranagar',
    name: '100 Feet Road Commercial & School Belt',
    center: [12.9770, 77.6410],
    reportCount: 9,
    criticalCount: 4,
    severityScore: 88,
    topCategory: 'Streetlight',
    recurringPattern: 'Frequent breaker trips & knocked-down poles: 9 reports in 20 days near school zones.'
  },
  {
    id: 'HOT-03',
    ward: 'Ward 151 - Koramangala',
    name: '5th Block Jyoti Nivas College Junction',
    center: [12.9348, 77.6218],
    reportCount: 15,
    criticalCount: 3,
    severityScore: 82,
    topCategory: 'Waste/Garbage',
    recurringPattern: 'Commercial restaurant dumping: 15 reports in 25 days overflowing into stormwater grates.'
  },
  {
    id: 'HOT-04',
    ward: 'Ward 174 - HSR Layout',
    name: '27th Main Arterial Transit Spine',
    center: [12.9116, 77.6389],
    reportCount: 12,
    criticalCount: 5,
    severityScore: 89,
    topCategory: 'Road Damage',
    recurringPattern: 'Deep asphalt craters & sunken utility chambers: 12 reports in 14 days causing rider falls.'
  },
  {
    id: 'HOT-05',
    ward: 'Ward 84 - Hagadur (Whitefield)',
    name: 'ITPL Main Road to ECC Circle',
    center: [12.9790, 77.7390],
    reportCount: 16,
    criticalCount: 7,
    severityScore: 95,
    topCategory: 'Water Supply',
    recurringPattern: 'Aging trunkline ruptures & contamination: 16 reports in 21 days cutting off domestic water.'
  },
  {
    id: 'HOT-06',
    ward: 'Ward 65 - Kadu Malleshwaram',
    name: '8th Cross Market & Margosa Road',
    center: [12.9985, 77.5705],
    reportCount: 8,
    criticalCount: 3,
    severityScore: 84,
    topCategory: 'Drainage',
    recurringPattern: 'Missing cast-iron manhole lids on market footpaths: 8 reports in 18 days.'
  }
];

