export function prepare3DData(rawData) {
    return rawData.map((item) => ({
      id: item.id,
      position: {
        x: item.position?.x || 0,
        y: item.position?.y || 0,
        z: item.position?.z || 0
      },
      color: getStatusColor(item.status),
      size: item.metrics?.temperature || 1
    }));
  }
  
  function getStatusColor(status) {
    switch (status) {
      case 'online': return '#00ff00';
      case 'offline': return '#ff0000';
      case 'error': return '#ffff00';
      default: return '#cccccc';
    }
  }
  