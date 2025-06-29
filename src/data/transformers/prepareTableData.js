import { DataDTO } from "../dto/DataDTO";

export function prepareTableData(rawData) {
  return rawData.map((item) => {
    if (!item.id) {
      return {};
    }

    // Создаем DTO из сырого объекта
    const dto = new DataDTO(item);

    // Форматируем для таблицы
    return {
      id: dto.id,
      name: dto.name,
      status: dto.status,
      deviceType: dto.deviceType,

      // CPU
      cpuLoadPercent: dto.cpuUsagePercent.toFixed(2) + '%',
      cpuCores: dto.cpuCoreUsage.length || 'N/A',
      cpuCoreLoads: dto.cpuCoreUsage.map(val => val.toFixed(1) + '%'),
      temperature: dto.cpuTemperatureC.toFixed(1) + '°C',

      // Memory
      memoryPercent: dto.memoryUsedPercent.toFixed(1) + '%',
      memoryUsed: formatBytes(dto.memoryUsedBytes),
      memoryTotal: formatBytes(dto.memoryTotalBytes),
      memoryCache: formatBytes(dto.memoryCacheBytes),
      memoryUsedTotal: `${formatBytes(dto.memoryUsedBytes)} / ${formatBytes(dto.memoryTotalBytes)}`,

      // Swap
      swapPercent: dto.swapUsedPercent.toFixed(1) + '%',
      swapUsed: formatBytes(dto.swapUsedBytes),
      swapTotal: formatBytes(dto.swapTotalBytes),
      swapUsedTotal: `${formatBytes(dto.swapUsedBytes)} / ${formatBytes(dto.swapTotalBytes)}`,

      // Disk
      diskUsage: Object.entries(dto.diskUsedPercent)
        .map(([mount, percent]) => `${percent.toFixed(1)}%`)
        .join(', '),
      diskLatency: dto.diskLatencyMs.toFixed(2) + ' ms',
      diskIORead: formatBytes(dto.diskIOReadBytes),
      diskIOWrite: formatBytes(dto.diskIOWriteBytes),
      diskUsed: formatBytes(dto.diskUsedBytes),
      diskTotal: formatBytes(dto.diskTotalBytes),
      diskUsedTotal: `${formatBytes(dto.diskUsedBytes)} / ${formatBytes(dto.diskTotalBytes)}`,

      // Network
      networkIn: formatBytes(dto.networkInBytes),
      networkOut: formatBytes(dto.networkOutBytes),
      netDrops: dto.networkPacketsDropped,
      ifaceBandwidth: Object.entries(dto.interfaceBandwidthUsagePercent)
        .map(([iface, usage]) => `${iface}: ${usage.toFixed(1)}%`)
        .join(', '),
      ifaceErrors: Object.entries(dto.interfaceErrorRatePercent)
        .map(([iface, err]) => `${iface}: ${err.toFixed(2)}%`)
        .join(', '),

      // Latency Map
      latencyMap: {}, // если нужна, можно добавить в DTO и сюда

      // Connections / Processes
      tcpConnections: dto.tcpConnections,

      // Учитывайте, что в DTO могут отсутствовать некоторые поля из prepareTableData, их можно добавить в DTO или обработать отдельно

      uptime: formatUptime(dto.uptimeMinutes * 60),
      timestamp: new Date(dto.timestamp).toLocaleString(),
    };
  });
}

// Форматирование байт (как в вашем коде)
function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(2)} ${sizes[i]}`;
}

// Форматирование времени работы (пример)
function formatUptime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
}
