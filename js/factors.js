/* ============================================================
 * Unit Converter BD — THE single conversion-factor table.
 *
 * Every conversion in the app goes through the category's base
 * unit using the "toBase" factor of each unit:
 *
 *     result = value * toBase(fromUnit) / toBase(toUnit)
 *
 * "toBase" means: 1 of this unit = this many BASE units.
 *
 * Chosen standards (also documented in README.md and shown in
 * the app's reference table):
 *  - LAND base = square foot. Dhaka standard is used, honoring the three
 *    nominal identities exactly: 1 bigha = 33 decimal = 14,400 sq ft;
 *    1 katha = 720 sq ft (1/20 bigha); 1 chhatak = 45 sq ft (1/16 katha).
 *    NOTE: these are conventional ROUNDED figures — 33 × 435.6 = 14,374.8,
 *    not 14,400. To keep the nominal identities exact, the decimal is
 *    DERIVED as 14,400/33 = 436.364 sq ft rather than the textbook
 *    acre-based 435.6 sq ft (a ~0.2% difference, documented in the README).
 *    Also note: a "bigha" is not the same size everywhere in Bangladesh —
 *    some districts use larger or smaller bighas. The app converts with
 *    the Dhaka standard and says so.
 *  - GOLD/WEIGHT base = gram. 1 tola = 1 bhori = 11.6638038 g
 *    (the international tola); 1 tola = 16 ana = 96 ratti;
 *    1 maund = 40 seer = 37.32416 kg (so 1 seer = 933.104 g).
 *  - LENGTH base = inch. 1 haat = 18 inches; 1 gaz = 36 in
 *    (= 1 yard). 1 inch = 2.54 cm exactly.
 *  - VOLUME base = litre. The gallon used in Bangladesh is the
 *    Imperial gallon (4.54609 L), not the US gallon.
 * ============================================================ */

const FACTORS = {
  land: {
    base: { en: "square feet", bn: "বর্গফুট" },
    noteKey: "note_land",
    units: {
      bigha:   { en: "Bigha",        bn: "বিঘা",        toBase: 14400 },
      katha:   { en: "Katha",        bn: "কাঠা",        toBase: 720 },           // 1/20 bigha, exact
      decimal: { en: "Decimal",      bn: "ডেসিমাল",    toBase: 436.3636363636 }, // 14,400/33: derived so the nominal identities stay exact (see header note)
      chhatak: { en: "Chhatak",      bn: "ছটাক",        toBase: 45 },            // 1/16 katha, exact
      sqft:    { en: "Square feet",  bn: "বর্গফুট",    toBase: 1 },
      sqm:     { en: "Square meter", bn: "বর্গমিটার",  toBase: 10.7639104167 },
      acre:    { en: "Acre",         bn: "একর",        toBase: 43560 },
    },
  },
  gold: {
    base: { en: "gram", bn: "গ্রাম" },
    noteKey: "note_gold",
    units: {
      bhori: { en: "Bhori", bn: "ভরি", toBase: 11.6638038 },
      tola:  { en: "Tola",  bn: "তোলা", toBase: 11.6638038 },
      ana:   { en: "Ana",   bn: "আনা",  toBase: 0.7289877375 },   // 1/16 tola
      ratti: { en: "Ratti", bn: "রতি",  toBase: 0.12149795625 },  // 1/96 tola
      gram:  { en: "Gram",  bn: "গ্রাম", toBase: 1 },
      maund: { en: "Maund", bn: "মণ",   toBase: 37324.16 },       // 40 seer
      ser:   { en: "Ser",   bn: "সের",  toBase: 933.104 },        // 1/40 maund
      kg:    { en: "Kilogram", bn: "কিলোগ্রাম", toBase: 1000 },
    },
  },
  length: {
    base: { en: "inch", bn: "ইঞ্চি" },
    noteKey: "note_length",
    units: {
      haat:  { en: "Haat",   bn: "হাত",   toBase: 18 },
      gaz:   { en: "Gaz",    bn: "গজ",    toBase: 36 },
      inch:  { en: "Inch",   bn: "ইঞ্চি", toBase: 1 },
      foot:  { en: "Foot",   bn: "ফুট",   toBase: 12 },
      meter: { en: "Meter",  bn: "মিটার", toBase: 39.3700787 },
    },
  },
  volume: {
    base: { en: "litre", bn: "লিটার" },
    noteKey: "note_volume",
    units: {
      gallon: { en: "Gallon", bn: "গ্যালন", toBase: 4.54609 }, // Imperial gallon
      litre:  { en: "Litre",  bn: "লিটার",  toBase: 1 },
    },
  },
};

const DEFAULT_UNITS = {
  land:   { from: "bigha",  to: "decimal" },
  gold:   { from: "bhori",  to: "gram" },
  length: { from: "haat",   to: "inch" },
  volume: { from: "gallon", to: "litre" },
};
