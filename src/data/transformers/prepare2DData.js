export function prepare2DData(rawData) {
    return rawData.map((item) => ({
      id: item.id,
      x: item.position?.x || 0,
      y: item.position?.y || 0,
      label: item.name || `Unit-${item.id}`
    }));
  }
  