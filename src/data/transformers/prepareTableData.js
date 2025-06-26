export function prepareTableData(rawData) {
    return rawData.map((item) => ({
      id: item.id,
      name: item.name || 'N/A',
      status: item.status,
      temperature: item.metrics?.temperature?.toFixed(2),
      pressure: item.metrics?.pressure?.toFixed(2),
      timestamp: new Date(item.timestamp).toLocaleString()
    }));
  }
  