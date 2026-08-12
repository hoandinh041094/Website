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
