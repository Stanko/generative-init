interface Point {
  x: number;
  y: number;
}

const getCircle = (center: Point, r: number, props: Record<string, any> = {}) => {
  const attributes = [];

  for (const key in props) {
    const value = props[key];
    attributes.push(`${key}="${value}"`);
  }

  return `<circle cx="${center.x}" cy="${center.y}" r="${r}" ${attributes.join(' ')} />`;
};

const getPath = (path: Point[], isClosed = true, props: Record<string, any> = {}) => {
  const points = path.map((p) => `${p.x} ${p.y}`).join(' L ');

  const d = `M ${points} ${isClosed ? 'Z' : ''}`;
  const attributes = [];

  for (const key in props) {
    const value = props[key];
    attributes.push(`${key}="${value}"`);
  }

  return `<path d="${d}" ${attributes.join(' ')} />`;
};

const getComplexPath = (paths: Point[][], isClosed = true, props: Record<string, any> = {}) => {
  const d = paths
    .map((path) => {
      const points = path.map((p) => `${p.x} ${p.y}`).join(' L ');

      const d = `M ${points} ${isClosed ? 'Z' : ''}`;

      return d;
    })
    .join(' ');

  const attributes = [];

  for (const key in props) {
    const value = props[key];
    attributes.push(`${key}="${value}"`);
  }

  return `<path d="${d}" ${attributes.join(' ')} />`;
};

const svgUtils = {
  getCircle,
  getPath,
  getComplexPath,
};

export default svgUtils;
