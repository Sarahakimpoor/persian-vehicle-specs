# Persian Vehicle Specs

A dependency-free library for presenting vehicle specifications in Persian: labels,
localized numbers and units, feature translations, and powertrain-aware sections.
It is an early extraction from an automotive application, prepared as a standalone
library. It is not a vehicle database, unit conversion engine, or comparison scorer.

[راهنمای فارسی](README.fa.md)

## Run locally

Use Node.js 22.18+ (Node.js 24 is recommended for development). No package installation,
API key, database, React, or network connection is needed to build or run the tests.

```sh
npm test
npm run example
```

This package has not been published to npm. To use this checkout from another local
project, build it first and install the local directory or its generated tarball:

```sh
npm run build
npm pack
# In your own project: npm install /absolute/path/to/this/directory
```

The package exports JavaScript ES modules and TypeScript declarations. Browser
consumers can import `dist/index.js` directly after building. Build from source with
Node.js; the generated JavaScript uses ES2022 APIs including `Object.hasOwn` and
requires `Intl.NumberFormat` with Persian locale support.

## Quick example

```js
import { formatSpecValue, getSpecPresentation } from '@sarahakimpoor/persian-vehicle-specs';

formatSpecValue(25.7, null, null, 'kwh'); // '۲۵٫۷ کیلووات‌ساعت'
formatSpecValue(null, 'AWD', null, null); // 'چهار چرخ متحرک'
getSpecPresentation('battery_capacity_usable_kwh').label_fa; // 'ظرفیت قابل استفاده'
```

The library preserves boolean `false` and numeric zero. Missing values, blank text
and non-finite numbers return `null`. Boolean values take precedence; the `text`
formatter prefers nonempty text; otherwise finite numbers precede text. Text is
trimmed and known enums are localized. Unknown text and unit labels are retained.
Formatter/unit choices describe the **supplied value**; no conversion is performed.

## API

| Export | Purpose |
| --- | --- |
| `formatSpecValue(number, text, boolean, unitCode, formatter?)` | Persian scalar display, or `null` |
| `getSpecPresentation(code)` | Fresh metadata for a known spec, or `undefined` |
| `listSpecCodes()` | Supported specification codes |
| `buildDisplaySections(technical, powertrainType)` | Ordered display groups with formatted values |
| `buildNavItems(sections, hasFeatures)` | Navigation labels without duplicate feature groups |
| `featureLabelFa(code, fallback)` | Feature label translation |
| `featureCategoryLabelFa(code, fallback)` | Feature category translation |
| `SECTIONS` | Built-in section labels and order |

`buildDisplaySections` accepts a typed `VehicleTechnical` object containing
`sections` and `features`. Each section has `code`, `label_fa`, `display_order`
and `specs`. Each spec has `code`, `label_fa`, `value_number`, `value_text`,
`value_boolean`, `unit_code`, `data_type` and `display_order`. See
[the synthetic fixture](examples/fixture.mjs) and [types](types/index.d.ts).

Known specification codes use library labels and ordering. Unknown codes retain
caller-supplied labels and section order. Supported powertrains are `ICE`, `MHEV`,
`HEV`, `PHEV` and `BEV`. A null/unknown powertrain omits known restricted specs
while retaining universally applicable specs and caller-defined unknown specs.
Applicability is presentation policy, not a claim that every model has a feature.
Caller records are not mutated, and extra input fields are not copied to output.
This is not an input validator or HTML sanitizer: render returned strings as text.

## Browser demonstration

```sh
npm run build
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/examples/browser.html` and change the powertrain selector.
All demonstration values are synthetic. Do not open the HTML via `file://`, since
browsers restrict module loading there.

## Scope and limitations

- No customer records, orders, pricing, credentials, source scraping, or service integrations.
- Output does not certify vehicle specifications or their source.
- The current taxonomy is curated and incomplete; `EREV` has no dedicated mapping yet.
- Features can be translated, but feature rendering is left to the caller.
- Number formatting follows the host's Intl implementation and rounds to at most two decimals.
- This is version 0.1.0; downstream adoption and public maintenance history are not established.

See [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md) and
[CHANGELOG.md](CHANGELOG.md). Licensed under [MIT](LICENSE).
