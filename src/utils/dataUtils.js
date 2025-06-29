/**
 * Нормализует значение из одного диапазона в другой
 * @param {number} value - Исходное значение
 * @param {number} minInput - Минимальное значение входного диапазона
 * @param {number} maxInput - Максимальное значение входного диапазона
 * @param {number} minOutput - Минимальное значение выходного диапазона
 * @param {number} maxOutput - Максимальное значение выходного диапазона
 * @returns {number} Нормализованное значение
 */
export function normalizeValue(value, minInput, maxInput, minOutput, maxOutput) {
  // Обработка крайних случаев
  if (value <= minInput) return minOutput;
  if (value >= maxInput) return maxOutput;
  
  // Вычисление позиции в диапазоне (0-1)
  const position = (value - minInput) / (maxInput - minInput);
  
  // Интерполяция в новый диапазон
  return minOutput + position * (maxOutput - minOutput);
}

/**
 * Возвращает тип геометрии Three.js на основе типа устройства
 * @param {string} deviceType - Тип устройства (сервер, роутер и т.д.)
 * @returns {string} Тип геометрии для Three.js
 */
export function getGeometryType(deviceType) {
  const type = deviceType.toLowerCase();
  
  const geometryMap = {
    'server': 'crystal',
    'database': 'crystal',
    'router': 'crystal',
    'switch': 'crystal',
    'firewall': 'crystal',
    'loadbalancer': 'crystal',
    'workstation': 'crystal',
    'vm': 'crystal',
    'container': 'crystal',
    'accesspoint': 'crystal'
  };
  
  return geometryMap[type] || 'sphere';
}

/**
 * Возвращает цвет в зависимости от температуры
 * @param {number} temperature - Температура в °C
 * @param {number} maxTemp - Максимальная температура (по умолчанию 90°C)
 * @returns {string} Цвет в формате HSL
 */
export function getTemperatureColor(temperature, maxTemp = 90) {
  // Ограничиваем температуру до maxTemp
  const normalizedTemp = Math.min(temperature, maxTemp);
  
  // Рассчитываем hue: от зеленого (120°) к красному (0°)
  const hue = 120 - (normalizedTemp / maxTemp) * 120;
  
  return `hsl(${hue}, 100%, 50%)`;
}

/**
 * Возвращает цвет в зависимости от статуса устройства
 * @param {string} status - Статус устройства
 * @returns {string} HEX-код цвета
 */
export function getStatusColor(status) {
  const statusColors = {
    'online': '#00ff00',      // Зеленый
    'active': '#00ff00',      // Зеленый
    'offline': '#ff0000',     // Красный
    'inactive': '#ff0000',    // Красный
    'degraded': '#ffff00',    // Желтый
    'warning': '#ffa500',     // Оранжевый
    'critical': '#ff00ff',    // Пурпурный
    'maintenance': '#00ffff', // Голубой
    'unknown': '#aaaaaa'      // Серый
  };
  
  return statusColors[status.toLowerCase()] || '#cccccc';
}

/**
 * Рассчитывает уровень безопасности для анимации
 * @param {DataDTO} item - Объект данных устройства
 * @returns {number} Уровень безопасности от 0 до 1
 */
export function calculateSecurityAlertLevel(item) {
  let level = 0;
  
  // Брутфорс-атаки
  if (item.bruteforceAttempts > 0) {
    level += Math.min(item.bruteforceAttempts / 10, 0.4);
  }
  
  // Срабатывания фаервола
  if (item.firewallDropsCount > 1000) {
    level += Math.min(item.firewallDropsCount / 5000, 0.4);
  }
  
  // Попытки повышения привилегий
  if (item.privilegeEscalationsCount > 0) {
    level += Math.min(item.privilegeEscalationsCount * 0.5, 0.4);
  }
  
  // IDS/IPS срабатывания
  if (item.ipsAlertsCount > 0) {
    level += Math.min(item.ipsAlertsCount / 5, 0.3);
  }
  
  return Math.min(level, 1);
}