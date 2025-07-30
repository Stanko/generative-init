# My boilerplate for generative projects

This is a boilerplate I use to start all of [my generative projects](https://muffinman.io/art).

## New project checklist

 - Update `package.json` - replace `@stanko/generative-init`
 - Update `index.html` - change title of the project
 - Define custom controls/options in [src/drawing/options-config.ts](./src/drawing/options-config.ts)

## Features

- Custom controls/options to control the drawing (fully typed)
- Separated compute and render phases
- SVG rendering only
- Save SVG
- Options are stored in URL hash (which enables native navigation)
- Small utils - random, memoization, svg...
- Clipper2ZFactory helpers
- Couple of small touches - for example, each set of options will have their own title and favicon

## TODO

- Fix sizing of the SVG
- Make controls sticky/fixed on desktop
- Vector utils (`Vec2` and `Vec3`)
- Display values for range and dual-range
- Move `Controls` to a separate package
- Remove sass as a dependency
