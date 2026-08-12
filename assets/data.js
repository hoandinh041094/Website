/* Sample datasets for the demo dashboards.
   All figures are fictional — generated for a made-up mid-market retailer,
   "Northwind Outfitters", to demonstrate what a client build looks like. */

const DATA = {
  months: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],

  sales: {
    revenueByRegion: {
      West:    [412, 435, 468, 521, 447, 462, 489, 502, 531, 548, 566, 592],
      Central: [318, 322, 340, 371, 329, 335, 349, 361, 374, 380, 391, 402],
      East:    [365, 351, 384, 428, 372, 366, 381, 377, 392, 388, 401, 396],
    },
    unitsByCategory: {
      Apparel:     [1840, 1910, 2105, 2480, 1950, 2010, 2130, 2240, 2310, 2400, 2470, 2590],
      Footwear:    [1120, 1150, 1290, 1520, 1180, 1210, 1270, 1330, 1390, 1420, 1460, 1510],
      Accessories: [760, 790, 880, 1040, 800, 820, 850, 890, 920, 940, 970, 1000],
    },
    topAccounts: [
      { name: "Summit Sports Group", region: "West", revenue: 486200, growth: 18.4 },
      { name: "Lakeshore Retail Co.", region: "Central", revenue: 391800, growth: 9.2 },
      { name: "Harbor & Main", region: "East", revenue: 344500, growth: -3.1 },
      { name: "Trailhead Outfitters", region: "West", revenue: 302700, growth: 24.6 },
      { name: "Prairie Goods", region: "Central", revenue: 268900, growth: 6.8 },
      { name: "Eastline Collective", region: "East", revenue: 241300, growth: 2.4 },
    ],
  },

  finance: {
    cashIn:  [1180, 1215, 1290, 1435, 1240, 1268, 1322, 1350, 1402, 1428, 1465, 1502],
    cashOut: [1042, 1088, 1121, 1268, 1155, 1147, 1189, 1204, 1236, 1259, 1281, 1310],
    grossMarginPct: [41.2, 41.8, 42.1, 43.4, 41.5, 41.9, 42.6, 42.8, 43.1, 43.5, 43.8, 44.2],
    opexByDept: {
      "Payroll":    [402, 402, 408, 415, 421, 421, 428, 428, 434, 434, 441, 441],
      "Marketing":  [118, 124, 152, 189, 121, 118, 131, 138, 142, 149, 155, 168],
      "Facilities": [64, 64, 66, 66, 68, 68, 68, 70, 70, 70, 72, 72],
      "Software":   [38, 39, 39, 41, 42, 42, 44, 45, 45, 47, 48, 48],
    },
    arAging: [
      { bucket: "Current", amount: 512400 },
      { bucket: "1–30 days", amount: 148200 },
      { bucket: "31–60 days", amount: 63800 },
      { bucket: "61–90 days", amount: 28900 },
      { bucket: "90+ days", amount: 19400 },
    ],
  },

  weekly: {
    // 13 weeks, each label = week ending (Sunday)
    weeks: ["May 17", "May 24", "May 31", "Jun 7", "Jun 14", "Jun 21", "Jun 28",
            "Jul 5", "Jul 12", "Jul 19", "Jul 26", "Aug 2", "Aug 9"],
    revenue: [318, 322, 316, 327, 331, 336, 329, 341, 338, 346, 344, 351, 358],
    orders: [1170, 1185, 1160, 1205, 1218, 1240, 1210, 1256, 1244, 1272, 1266, 1290, 1315],
    marginPct: [43.1, 43.3, 43.0, 43.4, 43.2, 43.6, 43.5, 43.7, 43.6, 43.9, 44.0, 44.1, 44.2],
    onTimePct: [94.2, 93.8, 94.5, 95.1, 94.8, 95.3, 92.1, 94.9, 95.6, 95.8, 96.0, 95.7, 96.2],
    returnsPct: [3.1, 3.0, 3.2, 2.9, 3.0, 2.8, 3.4, 2.9, 2.8, 2.7, 2.8, 2.6, 2.7],
    newCustomers: [284, 291, 275, 302, 296, 311, 289, 322, 316, 330, 327, 341, 356],
    revenueByRegion: {
      West:    [128, 130, 127, 133, 135, 138, 134, 141, 139, 143, 142, 146, 150],
      Central: [93, 94, 92, 95, 97, 98, 96, 99, 98, 101, 100, 102, 104],
      East:    [97, 98, 97, 99, 99, 100, 99, 101, 101, 102, 102, 103, 104],
    },
    regionDetail: [
      { region: "West", revenue: 150, wow: 2.7, vs4wk: 5.6, note: "Trailhead Outfitters reorder landed; promo lift in footwear" },
      { region: "Central", revenue: 104, wow: 2.0, vs4wk: 3.0, note: "Steady; back-to-school starting to show in apparel" },
      { region: "East", revenue: 104, wow: 1.0, vs4wk: 1.7, note: "Flat again — footwear soft for a 6th straight week" },
    ],
    categoryDetail: [
      { category: "Apparel", revenue: 182, wow: 2.3, unitsPerOrder: 1.9 },
      { category: "Footwear", revenue: 108, wow: 1.4, unitsPerOrder: 1.1 },
      { category: "Accessories", revenue: 68, wow: 3.8, unitsPerOrder: 2.4 },
    ],
    warehouseDetail: [
      { site: "Reno, NV", onTime: 97.1, shipHrs: 18, backlog: 42 },
      { site: "Columbus, OH", onTime: 95.8, shipHrs: 21, backlog: 67 },
      { site: "Allentown, PA", onTime: 94.6, shipHrs: 24, backlog: 88 },
    ],
    acquisitionDetail: [
      { channel: "Organic search", newCust: 142, wow: 5.2, cac: 0 },
      { channel: "Paid social", newCust: 118, wow: 3.5, cac: 21.4 },
      { channel: "Email", newCust: 52, wow: 4.0, cac: 2.1 },
      { channel: "Referral", newCust: 44, wow: 7.3, cac: 8.6 },
    ],
  },

  monthlyOps: {
    // aligned to DATA.months (Sep → Aug)
    otifPct: [92.1, 92.4, 91.8, 90.6, 92.9, 93.2, 93.8, 94.1, 94.6, 93.4, 95.3, 95.8],
    shipHours: [26, 25, 27, 30, 26, 25, 24, 24, 23, 25, 22, 21],
    costPerOrder: {
      Labor:     [3.05, 3.02, 3.15, 3.38, 3.08, 3.02, 2.98, 2.94, 2.90, 3.00, 2.84, 2.80],
      Shipping:  [2.62, 2.58, 2.68, 2.82, 2.64, 2.56, 2.52, 2.48, 2.44, 2.46, 2.38, 2.34],
      Packaging: [0.55, 0.55, 0.56, 0.58, 0.55, 0.55, 0.54, 0.54, 0.53, 0.55, 0.53, 0.52],
      Overhead:  [0.83, 0.83, 0.83, 0.83, 0.83, 0.83, 0.84, 0.83, 0.83, 0.83, 0.83, 0.83],
    },
    inventoryTurns: [5.6, 5.7, 5.5, 5.2, 5.8, 5.9, 6.0, 6.1, 6.2, 6.1, 6.4, 6.5],
    stockoutPct: [2.8, 2.6, 3.1, 4.2, 2.9, 2.5, 2.4, 2.2, 2.1, 2.3, 1.9, 1.8],
    defectPct: [1.9, 1.8, 2.0, 2.4, 1.9, 1.8, 1.7, 1.6, 1.6, 1.7, 1.5, 1.4],
    warehouseOtifHeat: {
      rows: ["Reno, NV", "Columbus, OH", "Allentown, PA"],
      values: [
        [93.5, 93.8, 93.2, 92.0, 94.1, 94.5, 95.0, 95.4, 95.9, 96.2, 96.6, 97.0],
        [92.0, 92.3, 91.6, 90.4, 92.7, 93.0, 93.6, 93.9, 94.4, 94.7, 95.1, 95.6],
        [90.8, 91.1, 90.5, 89.2, 91.8, 92.1, 92.7, 93.0, 93.5, 90.2, 94.1, 94.7],
      ],
    },
    inventoryByCategory: [
      { category: "Apparel", daysOnHand: 52, stockoutPct: 1.4, agedPct: 8.2, turns: 7.0 },
      { category: "Footwear", daysOnHand: 68, stockoutPct: 2.6, agedPct: 14.6, turns: 5.4 },
      { category: "Accessories", daysOnHand: 41, stockoutPct: 1.1, agedPct: 5.8, turns: 8.9 },
    ],
    laborDetail: [
      { site: "Reno, NV", uph: 34.2, overtimePct: 4.1, headcount: 46 },
      { site: "Columbus, OH", uph: 31.8, overtimePct: 6.8, headcount: 58 },
      { site: "Allentown, PA", uph: 29.4, overtimePct: 9.6, headcount: 51 },
    ],
    returnReasons: [
      { reason: "Size / fit", sharePct: 38, momPts: -2 },
      { reason: "Changed mind", sharePct: 22, momPts: 1 },
      { reason: "Damaged in transit", sharePct: 14, momPts: -1 },
      { reason: "Quality issue", sharePct: 12, momPts: 0 },
      { reason: "Wrong item shipped", sharePct: 8, momPts: -1 },
      { reason: "Other", sharePct: 6, momPts: 3 },
    ],
  },

  marketing: {
    sessionsByChannel: {
      "Organic":   [48.2, 49.1, 52.4, 58.9, 50.2, 51.8, 54.1, 55.6, 57.2, 58.8, 60.1, 62.4],
      "Paid":      [22.4, 24.8, 31.2, 38.6, 21.9, 22.4, 25.1, 27.8, 29.4, 31.2, 32.8, 35.1],
      "Email":     [12.1, 12.4, 14.8, 18.2, 12.8, 13.1, 13.6, 14.2, 14.8, 15.1, 15.6, 16.2],
    },
    funnel: [
      { stage: "Sessions", value: 113700 },
      { stage: "Product views", value: 61400 },
      { stage: "Add to cart", value: 18960 },
      { stage: "Checkout", value: 9840 },
      { stage: "Purchase", value: 6420 },
    ],
    // conversion rate (%) by weekday x daypart
    convHeat: {
      rows: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      cols: ["6a", "9a", "12p", "3p", "6p", "9p"],
      values: [
        [1.8, 2.4, 2.9, 2.7, 3.4, 3.1],
        [1.7, 2.3, 2.8, 2.6, 3.2, 2.9],
        [1.8, 2.4, 2.9, 2.8, 3.3, 3.0],
        [1.9, 2.5, 3.0, 2.9, 3.6, 3.3],
        [2.0, 2.6, 3.1, 3.0, 3.8, 3.6],
        [2.6, 3.4, 4.2, 4.4, 4.9, 4.6],
        [2.4, 3.1, 3.8, 3.9, 4.4, 4.1],
      ],
    },
    campaigns: [
      { name: "Summer Trail Sale", channel: "Paid", spend: 42800, revenue: 168400, roas: 3.9 },
      { name: "Loyalty Re-engage", channel: "Email", spend: 3400, revenue: 41200, roas: 12.1 },
      { name: "New Arrivals Push", channel: "Paid", spend: 28600, revenue: 84200, roas: 2.9 },
      { name: "Back to School", channel: "Paid", spend: 31200, revenue: 74900, roas: 2.4 },
      { name: "Weekly Digest", channel: "Email", spend: 1800, revenue: 18700, roas: 10.4 },
    ],
  },
};
