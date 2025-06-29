import {
  normalizeValue,
  getGeometryType,
  getStatusColor,
  getTemperatureColor,
  calculateSecurityAlertLevel
} from "../../utils/dataUtils";

export function prepare3DData(rawData) {
  // Находим максимальные значения для нормализации
  const maxCpu = Math.max(...rawData.map(d => d.cpuUsagePercent), 100);
  const maxMem = Math.max(...rawData.map(d => d.memoryUsedPercent), 100);
  const maxNet = Math.max(...rawData.map(d => d.networkInBytes + d.networkOutBytes), 1e9);

  return rawData.map(item => {
    return {
      id: item.id,
      name: item.name,
      type: item.deviceType,
      position: calculatePosition(item),
      size: {
        width: normalizeValue(item.cpuUsagePercent, 0, maxCpu, 0.8, 1.5),
        height: normalizeValue(item.memoryUsedPercent, 0, maxMem, 0.8, 1.5),
        depth: normalizeValue(item.cpuUsagePercent, 0, maxCpu, 0.8, 1.5),
      },
      color: {
        base: getStatusColor(item.status),
        temperature: getTemperatureColor(item.cpuTemperatureC),
        alert: calculateSecurityAlertLevel(item) > 0.3 ? '#ff0000' : 'transparent'
      },
      animations: {
        rotationSpeed: normalizeValue(item.diskIOReadBytes, 0, 1e8, 0.01, 0.1),
        pulseSpeed: normalizeValue(item.networkInBytes + item.networkOutBytes, 0, maxNet, 0.5, 3),
        flashIntensity: calculateSecurityAlertLevel(item)
      },
      geometryType: getGeometryType(item.deviceType),
      metrics: {
        // Важные метрики для быстрого доступа
        cpu: item.cpuUsagePercent,
        memory: item.memoryUsedPercent,
        temperature: item.cpuTemperatureC,
        network: (item.networkInBytes + item.networkOutBytes) / 1e6, // в MB
        securityLevel: calculateSecurityAlertLevel(item)
      }
    };
  });
}

// Функция для расчета позиции устройства
function calculatePosition(item) {
  // Задаем диапазон для случайного позиционирования
  const rangeX = 10; // по оси X
  const rangeZ = 10; // по оси Z

  return {
    x: (Math.random() - 0.5) * 2 * rangeX, // [-rangeX, rangeX]
    y: -2,
    z: (Math.random() - 0.5) * 2 * rangeZ  // [-rangeZ, rangeZ]
  };
}