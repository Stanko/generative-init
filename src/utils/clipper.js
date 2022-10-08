import * as clipperLib from 'js-angusj-clipper';

// Singleton clipper instance
let clipper;

// Used for clipper, as it works with integers only
const SCALE = 1000;

export async function getClipperInstance() {
  if (!clipper) {
    // create an instance of the library (usually only do this once in your app)
    clipper = await clipperLib.loadNativeClipperLibInstanceAsync(
      // let it autodetect which one to use, but also available WasmOnly and AsmJsOnly
      clipperLib.NativeClipperLibRequestedFormat.WasmWithAsmJsFallback
    );
  }

  return clipper;
}

export function offsetPolygon(polygon, offset) {
  const result = clipper.offsetToPaths({
    delta: offset * SCALE,
    offsetInputs: [
      {
        data: [polygon.map((p) => ({ x: p.x * SCALE, y: p.y * SCALE }))],
        joinType: 'round',
        endType: 'closedPolygon',
      },
    ],
  });

  if (!result[0]) {
    return [];
  }

  const offsetPolygon = result[0].map((p) => ({ x: p.x / SCALE, y: p.y / SCALE }));

  return offsetPolygon;
}
