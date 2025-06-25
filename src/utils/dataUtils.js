export function transformServerData(rawData) {
  const count = rawData.ids.length;
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push({
      id: rawData.ids[i],
      name: rawData.names[i],
      status: getStatusLabel(rawData.statuses[i]),
      load: rawData.loads[i].toFixed(2),
      position: `(${rawData.positions.x[i].toFixed(1)}, ${rawData.positions.y[i].toFixed(1)}, ${rawData.positions.z[i].toFixed(1)})`,
      size: `(${rawData.sizes.x[i].toFixed(1)}, ${rawData.sizes.y[i].toFixed(1)}, ${rawData.sizes.z[i].toFixed(1)})`,
      color: `#${rawData.colors[i].toString(16).padStart(6, '0')}`
    });
  }

  return result;
}

function getStatusLabel(statusByte) {
  switch (statusByte) {
    case 0: return 'Idle';
    case 1: return 'Active';
    case 2: return 'Offline';
    default: return 'Unknown';
  }
}
