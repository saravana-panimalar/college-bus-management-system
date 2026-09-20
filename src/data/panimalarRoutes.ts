import { Route, Bus } from '../types';

export interface PanimalarRawRoute {
  sNo: number;
  busNo: string;
  source: string;
  destination: string;
  sourceTime: string;
  destinationTime: string;
}

export const rawPanimalarData: PanimalarRawRoute[] = [
  { sNo: 1, busNo: "1", source: "ARCOT", destination: "Panimalar Engineering College", sourceTime: "05:10 AM", destinationTime: "07:15 AM" },
  { sNo: 2, busNo: "2", source: "VANDAVASI", destination: "Panimalar Engineering College", sourceTime: "05:05 AM", destinationTime: "07:15 AM" },
  { sNo: 3, busNo: "3", source: "RCM SCHOOL", destination: "Panimalar Engineering College", sourceTime: "05:10 AM", destinationTime: "07:15 AM" },
  { sNo: 4, busNo: "4", source: "VALPATTARAI", destination: "Panimalar Engineering College", sourceTime: "05:45 AM", destinationTime: "07:15 AM" },
  { sNo: 5, busNo: "5", source: "MILITARY ROAD", destination: "Panimalar Engineering College", sourceTime: "05:45 AM", destinationTime: "07:15 AM" },
  { sNo: 6, busNo: "6", source: "HOUSING BOARD", destination: "Panimalar Engineering College", sourceTime: "05:45 AM", destinationTime: "07:15 AM" },
  { sNo: 7, busNo: "7", source: "KANCHEEPURAM BUS STAND", destination: "Panimalar Engineering College", sourceTime: "06:00 AM", destinationTime: "07:15 AM" },
  { sNo: 8, busNo: "8", source: "YAMAHA SHOWROOM", destination: "Panimalar Engineering College", sourceTime: "06:15 AM", destinationTime: "07:15 AM" },
  { sNo: 9, busNo: "9", source: "CHEKKADU", destination: "Panimalar Engineering College", sourceTime: "06:05 AM", destinationTime: "07:15 AM" },
  { sNo: 10, busNo: "10", source: "PANAPAKKAM", destination: "Panimalar Engineering College", sourceTime: "05:30 AM", destinationTime: "07:15 AM" },
  { sNo: 11, busNo: "11", source: "ARAKONAM BUS STAND", destination: "Panimalar Engineering College", sourceTime: "05:50 AM", destinationTime: "07:15 AM" },
  { sNo: 12, busNo: "12", source: "PERAMBAKKAM", destination: "Panimalar Engineering College", sourceTime: "06:25 AM", destinationTime: "07:15 AM" },
  { sNo: 13, busNo: "13", source: "TIRUTTANI DEPOT", destination: "Panimalar Engineering College", sourceTime: "05:15 AM", destinationTime: "07:30 AM" },
  { sNo: 14, busNo: "14", source: "KG KANDIGAI", destination: "Panimalar Engineering College", sourceTime: "05:10 AM", destinationTime: "07:15 AM" },
  { sNo: 15, busNo: "15", source: "KADAMBATHUR", destination: "Panimalar Engineering College", sourceTime: "06:10 AM", destinationTime: "07:15 AM" },
  { sNo: 16, busNo: "16", source: "UTHUKOTTAI CIRCLE OFFICE", destination: "Panimalar Engineering College", sourceTime: "05:55 AM", destinationTime: "07:15 AM" },
  { sNo: 17, busNo: "17", source: "DHAMBARA MEDU", destination: "Panimalar Engineering College", sourceTime: "05:35 AM", destinationTime: "07:10 AM" },
  { sNo: 18, busNo: "18", source: "CHEKKADU (ROUTE 18)", destination: "Panimalar Engineering College", sourceTime: "06:15 AM", destinationTime: "07:15 AM" },
  { sNo: 19, busNo: "19", source: "THIRUNINDRAVUR (LAKSHMI THEATRE)", destination: "Panimalar Engineering College", sourceTime: "06:35 AM", destinationTime: "07:15 AM" },
  { sNo: 20, busNo: "20", source: "THIRUNINDRAVUR", destination: "Panimalar Engineering College", sourceTime: "06:20 AM", destinationTime: "07:15 AM" },
  { sNo: 21, busNo: "21", source: "AMIR MAHAL", destination: "Panimalar Engineering College", sourceTime: "06:00 AM", destinationTime: "07:15 AM" },
  { sNo: 22, busNo: "22", source: "MUSIC ACADEMY ARYA GOWDA ROAD", destination: "Panimalar Engineering College", sourceTime: "05:55 AM", destinationTime: "07:15 AM" },
  { sNo: 23, busNo: "23", source: "MMDA", destination: "Panimalar Engineering College", sourceTime: "06:25 AM", destinationTime: "07:15 AM" },
  { sNo: 24, busNo: "24", source: "ATHIPATU", destination: "Panimalar Engineering College", sourceTime: "05:30 AM", destinationTime: "07:15 AM" },
  { sNo: 25, busNo: "25", source: "ERNAVUR LIFT GATE", destination: "Panimalar Engineering College", sourceTime: "05:40 AM", destinationTime: "07:15 AM" },
  { sNo: 26, busNo: "26", source: "TOLL GATE", destination: "Panimalar Engineering College", sourceTime: "05:45 AM", destinationTime: "07:00 AM" },
  { sNo: 27, busNo: "27", source: "MANI CYCLE SHOP", destination: "Panimalar Engineering College", sourceTime: "05:55 AM", destinationTime: "07:15 AM" },
  { sNo: 28, busNo: "28", source: "STANLEY", destination: "Panimalar Engineering College", sourceTime: "06:00 AM", destinationTime: "07:15 AM" },
  { sNo: 29, busNo: "29", source: "SHENOY NAGAR PARK", destination: "Panimalar Engineering College", sourceTime: "06:00 AM", destinationTime: "07:15 AM" },
  { sNo: 30, busNo: "30", source: "GEMINI", destination: "Panimalar Engineering College", sourceTime: "06:10 AM", destinationTime: "07:15 AM" },
  { sNo: 31, busNo: "31", source: "PALLAVAKKAM", destination: "Panimalar Engineering College", sourceTime: "05:50 AM", destinationTime: "07:15 AM" },
  { sNo: 32, busNo: "32", source: "MANDHAVELI", destination: "Panimalar Engineering College", sourceTime: "06:00 AM", destinationTime: "07:15 AM" },
  { sNo: 33, busNo: "33", source: "SRINIVASA THEATRE", destination: "Panimalar Engineering College", sourceTime: "06:05 AM", destinationTime: "07:15 AM" },
  { sNo: 34, busNo: "34", source: "MR NAGAR COLLEGE", destination: "Panimalar Engineering College", sourceTime: "05:50 AM", destinationTime: "07:15 AM" },
  { sNo: 35, busNo: "35", source: "TV K NAGAR", destination: "Panimalar Engineering College", sourceTime: "06:10 AM", destinationTime: "07:15 AM" },
  { sNo: 36, busNo: "36", source: "PERAMBUR DON BOSCO SCHOOL", destination: "Panimalar Engineering College", sourceTime: "05:55 AM", destinationTime: "07:15 AM" },
  { sNo: 37, busNo: "37", source: "JAMALIA", destination: "Panimalar Engineering College", sourceTime: "06:00 AM", destinationTime: "07:15 AM" },
  { sNo: 38, busNo: "38", source: "CPCL", destination: "Panimalar Engineering College", sourceTime: "05:50 AM", destinationTime: "07:15 AM" },
  { sNo: 39, busNo: "39", source: "MANALI", destination: "Panimalar Engineering College", sourceTime: "06:00 AM", destinationTime: "07:15 AM" },
  { sNo: 40, busNo: "40", source: "RETTERI", destination: "Panimalar Engineering College", sourceTime: "06:10 AM", destinationTime: "07:15 AM" },
  { sNo: 41, busNo: "41", source: "SIRUVAPURI", destination: "Panimalar Engineering College", sourceTime: "05:05 AM", destinationTime: "07:15 AM" },
  { sNo: 42, busNo: "42", source: "GUMMIDIPOONDI", destination: "Panimalar Engineering College", sourceTime: "05:10 AM", destinationTime: "07:15 AM" },
  { sNo: 43, busNo: "43", source: "VINAYAGAPURAM", destination: "Panimalar Engineering College", sourceTime: "06:10 AM", destinationTime: "07:15 AM" },
  { sNo: 44, busNo: "44", source: "GOLDEN FLATS", destination: "Panimalar Engineering College", sourceTime: "06:25 AM", destinationTime: "07:15 AM" },
  { sNo: 45, busNo: "45", source: "VELLAMMAL HALL", destination: "Panimalar Engineering College", sourceTime: "06:20 AM", destinationTime: "07:15 AM" },
  { sNo: 46, busNo: "46", source: "THIRUMANGALAM", destination: "Panimalar Engineering College", sourceTime: "06:30 AM", destinationTime: "07:15 AM" },
  { sNo: 47, busNo: "47", source: "GANDHI NAGAR POLICE BOOTH", destination: "Panimalar Engineering College", sourceTime: "05:45 AM", destinationTime: "07:15 AM" },
  { sNo: 48, busNo: "48", source: "GANDHI NAGAR POLICE BOOTH (ROUTE 48)", destination: "Panimalar Engineering College", sourceTime: "05:45 AM", destinationTime: "07:15 AM" },
  { sNo: 49, busNo: "49", source: "ORAGADAM BUS STOP", destination: "Panimalar Engineering College", sourceTime: "06:15 AM", destinationTime: "07:15 AM" },
  { sNo: 50, busNo: "50", source: "MUTHA PUDUPETTAI", destination: "Panimalar Engineering College", sourceTime: "06:00 AM", destinationTime: "07:15 AM" },
  { sNo: 51, busNo: "51", source: "VEERAPURAM CAMP", destination: "Panimalar Engineering College", sourceTime: "06:10 AM", destinationTime: "07:15 AM" },
  { sNo: 52, busNo: "52", source: "AVADI CHECK POST", destination: "Panimalar Engineering College", sourceTime: "06:20 AM", destinationTime: "07:15 AM" },
  { sNo: 53, busNo: "53", source: "AMBATTUR O.T", destination: "Panimalar Engineering College", sourceTime: "06:20 AM", destinationTime: "07:15 AM" },
  { sNo: 54, busNo: "54", source: "CHINMAYA NAGAR", destination: "Panimalar Engineering College", sourceTime: "06:10 AM", destinationTime: "07:15 AM" },
  { sNo: 55, busNo: "55", source: "AVICHI SCHOOL", destination: "Panimalar Engineering College", sourceTime: "06:15 AM", destinationTime: "07:15 AM" },
  { sNo: 56, busNo: "56", source: "WEST SAIDAPET", destination: "Panimalar Engineering College", sourceTime: "06:00 AM", destinationTime: "07:15 AM" },
  { sNo: 57, busNo: "57", source: "AMBAL NAGAR", destination: "Panimalar Engineering College", sourceTime: "06:00 AM", destinationTime: "07:15 AM" },
  { sNo: 58, busNo: "58", source: "SRM", destination: "Panimalar Engineering College", sourceTime: "06:00 AM", destinationTime: "07:15 AM" },
  { sNo: 59, busNo: "59", source: "RAJAKILPAKKAM", destination: "Panimalar Engineering College", sourceTime: "05:30 AM", destinationTime: "07:15 AM" },
  { sNo: 60, busNo: "60", source: "BHARATH COLLEGE", destination: "Panimalar Engineering College", sourceTime: "05:50 AM", destinationTime: "07:15 AM" },
  { sNo: 61, busNo: "61", source: "MEDAVAKKAM", destination: "Panimalar Engineering College", sourceTime: "05:50 AM", destinationTime: "07:15 AM" },
  { sNo: 62, busNo: "62", source: "PERUMBAKKAM", destination: "Panimalar Engineering College", sourceTime: "05:30 AM", destinationTime: "07:15 AM" },
  { sNo: 63, busNo: "63", source: "CHEGAN MAL", destination: "Panimalar Engineering College", sourceTime: "05:10 AM", destinationTime: "07:15 AM" },
  { sNo: 64, busNo: "64", source: "POZHICHALUR", destination: "Panimalar Engineering College", sourceTime: "06:30 AM", destinationTime: "07:15 AM" },
  { sNo: 65, busNo: "65", source: "PADAPPAI", destination: "Panimalar Engineering College", sourceTime: "05:50 AM", destinationTime: "07:15 AM" },
  { sNo: 66, busNo: "66", source: "MADURANTHAKAM", destination: "Panimalar Engineering College", sourceTime: "05:30 AM", destinationTime: "07:15 AM" },
  { sNo: 67, busNo: "67", source: "POZHICHALUR (ROUTE 67)", destination: "Panimalar Engineering College", sourceTime: "06:30 AM", destinationTime: "07:15 AM" },
  { sNo: 68, busNo: "68", source: "GOVERNMENT HOSPITAL", destination: "Panimalar Engineering College", sourceTime: "05:55 AM", destinationTime: "07:15 AM" },
  { sNo: 69, busNo: "69", source: "URAPAKKAM TEA SHOP", destination: "Panimalar Engineering College", sourceTime: "06:30 AM", destinationTime: "07:15 AM" },
  { sNo: 70, busNo: "70", source: "AMARAMBEDU", destination: "Panimalar Engineering College", sourceTime: "06:00 AM", destinationTime: "07:15 AM" },
  { sNo: 71, busNo: "71", source: "MOONDRAM KATTALAI", destination: "Panimalar Engineering College", sourceTime: "06:15 AM", destinationTime: "07:15 AM" },
  { sNo: 72, busNo: "72", source: "PORUR", destination: "Panimalar Engineering College", sourceTime: "06:30 AM", destinationTime: "07:15 AM" },
  { sNo: 73, busNo: "73", source: "NOOMBAL X ROAD", destination: "Panimalar Engineering College", sourceTime: "06:50 AM", destinationTime: "07:15 AM" },
  { sNo: 74, busNo: "74", source: "SUN PLUS COLLEGE", destination: "Panimalar Engineering College", sourceTime: "06:20 AM", destinationTime: "07:15 AM" },
  { sNo: 75, busNo: "75", source: "SUNDARAM SUYAPURAM RMK", destination: "Panimalar Engineering College", sourceTime: "06:30 AM", destinationTime: "07:15 AM" },
  { sNo: 76, busNo: "76", source: "KAVALCHERY", destination: "Panimalar Engineering College", sourceTime: "06:30 AM", destinationTime: "07:15 AM" },
  { sNo: 77, busNo: "77", source: "MEPPUR BUS STAND", destination: "Panimalar Engineering College", sourceTime: "06:45 AM", destinationTime: "07:15 AM" }
];

export const panimalarRoutes: Route[] = rawPanimalarData.map((item) => {
  const padNo = item.busNo.padStart(2, '0');
  const routeId = `R-${padNo}`;
  const busId = `B-${padNo}`;
  
  // Calculate approx minutes between departure and arrival
  const estMinutes = 60 + (item.sNo % 5) * 10;
  const estDistance = 20 + (item.sNo % 8) * 4;

  return {
    id: routeId,
    routeName: `Route ${item.busNo}: ${item.source.trim()}`,
    startingPoint: item.source.trim(),
    destination: item.destination.trim(),
    stops: [
      item.source.trim(),
      `${item.source.trim()} Junction`,
      'Bypass Toll Plaza',
      'Poonamallee Bypass',
      'Panimalar Engineering College'
    ],
    distance: estDistance,
    estimatedTime: estMinutes,
    assignedBusId: busId,
    status: 'Active',
    sourceTime: item.sourceTime,
    destinationTime: item.destinationTime
  };
});

export const panimalarBuses: Bus[] = rawPanimalarData.map((item) => {
  const padNo = item.busNo.padStart(2, '0');
  const routeId = `R-${padNo}`;
  const busId = `B-${padNo}`;
  
  return {
    id: busId,
    busNumber: `Bus ${padNo}`,
    registrationNumber: `TN-02-P-${(1000 + item.sNo).toString()}`,
    model: item.sNo % 2 === 0 ? 'Ashok Leyland Viking 222"' : 'Tata Starbus Ultra 54s',
    capacity: 60,
    routeId: routeId,
    insuranceExpiry: '2027-12-31',
    lastMaintenanceDate: '2026-08-20',
    status: 'Active'
  };
});
