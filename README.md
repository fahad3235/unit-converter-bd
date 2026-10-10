# Unit Converter BD — একক রূপান্তর

## 1. Project name
**unit-converter-bd** — a free, fully offline Bangladesh unit converter web app.

## 2. Problem
Bangladesh still uses traditional units — bigha/katha/chhatak for land, bhori/tola/ana/ratti for gold, maund/ser for bulk goods, haat/gaz for cloth — alongside metric and imperial units. Online converters rarely cover these, and the ones that do need an internet connection and rarely explain which regional standard they use.

## 3. Features
- **Land:** bigha ↔ katha ↔ decimal ↔ chhatak ↔ square feet ↔ square meter ↔ acre (Dhaka standard: 1 bigha = 33 decimal = 14,400 sq ft), with an honest note about regional bigha variation.
- **Gold & Weight:** bhori ↔ tola ↔ ana ↔ ratti ↔ gram ↔ ser ↔ maund ↔ kilogram (1 bhori = 1 tola = 11.6638038 g; 1 maund = 40 ser = 37.32416 kg).
- **Length:** haat ↔ gaz ↔ inch ↔ foot ↔ meter (1 haat = 18 inches; 1 gaz = 36 inches).
- **Volume:** gallon ↔ litre (Imperial gallon, the Bangladesh standard).
- Category tabs, from/to selects, live conversion, swap (⇄) button, decimal-precision control (0–6 places).
- Full **Bangla ⇄ English** UI toggle; per-category reference table of factors; input validation with clear error messages.
- Responsive layout for mobile and desktop; works entirely offline (no external requests).

## 4. Tech stack
HTML5, CSS3, vanilla JavaScript (no libraries, no build step). All conversion factors live in **one** commented table in `js/factors.js`; UI strings in `js/i18n.js`; logic in `js/app.js`.

## 5. Prerequisites
Any modern browser (Chrome, Firefox, Edge, Safari). For the test suite: Python 3 + Playwright with a Chromium build.

## 6. Install
No installation. Open `index.html` directly, or serve the folder:
```bash
cd unit-converter-bd
python3 -m http.server 8000
# open http://localhost:8000/
```

## 7. Dev commands
None — static site, no build, no package manager. Edit the files and reload the browser.

## 8. Environment
None. No API keys, no backend, no `.env`. The app makes zero network requests.

## 9. Testing
Playwright + headless Chromium smoke tests (script kept out of the repo in `/tmp/uc-test/test.py`):
```bash
cd /tmp/uc-test
python3 test.py   # serves ../builds/unit-converter-bd and runs all checks
```
Checks: zero console/page errors; hand-verified conversions (1 bigha = 33 decimal = 14,400 sq ft; 1 bhori = 11.664 g; 1 maund = 37.3242 kg; 1 haat = 18 in); swap reverses units; round-trip a→b→a returns the original within tolerance; empty/text/negative inputs rejected with messages; BN/EN toggle rewrites all labels; 390px mobile viewport has no horizontal overflow.

## 10. Deployment
GitHub Pages compatible: push the folder contents to a repo and enable Pages with branch `main`, folder `/ (root)`.

## 11. Limitations
- **Regional bigha variation:** a bigha is not the same size everywhere in Bangladesh. The app uses the Dhaka standard (1 bigha = 33 decimal = 14,400 sq ft) and states this in the UI and reference note. For official/registration work, confirm the district's local standard.
- **Rounded conventional figures:** 1 bigha = 33 decimal and 1 bigha = 14,400 sq ft are both conventional *rounded* figures — their exact products disagree by ~0.2% (33 × 435.6 = 14,374.8, not 14,400). The converter honors the nominal identities (bigha = 33 decimal = 14,400 sq ft) exactly, so the decimal is derived as 14,400/33 ≈ 436.364 sq ft rather than the textbook acre-based 435.6 sq ft. Derived values therefore differ ~0.2% from textbook exact figures; the app says this in its reference note.
- Volume uses the **Imperial gallon** (4.54609 L), standard in Bangladesh — not the US gallon.
- Traditional gold units use the international tola (11.6638038 g); actual market practices may round.
- No persistent state: inputs reset on reload (nothing worth saving; conversions are instant).

## 12. Status
Working MVP. Tested per section 9; no console errors. Public-domain conversion facts; UI and code original.
