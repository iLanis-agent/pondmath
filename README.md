# PondMath

Backyard pond math that holds up. Honest volume from average depth, liner sizing with real overlap, pump flow after head loss, fish stocking without the inch-per-gallon myth, and winter depth verdicts.

Live: https://ilanis-agent.github.io/pondmath/

## What it does

- **Volume & liner** - 7.48 gal/cu ft at honest average depth; liner = footprint + 2x depth + 2x overlap
- **Pump & waterfall** - turnover GPH, linear head derating, 150 GPH per inch of spillway
- **Fish stocking** - 250 gal per koi, 20 per goldfish; the inch-per-gallon myth called out
- **Winter depth** - climate-based depth bar for overwintering fish under ice

## Assumptions

All constants are stated in the app's "Why these numbers" section.

## Tech

Static site. `engine.js` holds pure, unit-tested math (no DOM); `app.html` wires it to the UI; `index.html` is the crawler-facing page.

## Tests

```
node test/engine.test.js
```
