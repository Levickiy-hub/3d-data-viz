import { DataDTO } from './dto/DataDTO';

export function generateData(startTime = new Date(), count = 10, serverCount = 3) {
  const metrics = [];
  const addMinutes = (date, minutes) => new Date(date.getTime() + minutes * 60000);
  const deviceTypes = ['server', 'router', 'switch', 'firewall'];

  for (let serverIndex = 1; serverIndex <= serverCount; serverIndex++) {
    const serverId = `server-${serverIndex}`;
    const serverName = `Server ${serverIndex}`;
    const statusTypes = ['online', 'offline', 'degraded'];

    const deviceType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];

    const totalMemoryMb = 8192 + Math.floor(Math.random() * 8192);
    const totalSwapMb = 2048 + Math.floor(Math.random() * 2048);
    const totalCacheMb = 2048;

    for (let i = 0; i < count; i++) {
      const timestamp = addMinutes(startTime, i).toISOString();
      const status = statusTypes[Math.floor(Math.random() * statusTypes.length)];

      const diskTotalBytes = 500 * 1024 * 1024 * 1024 + Math.floor(Math.random() * 100 * 1024 * 1024 * 1024);
      const diskUsedBytes = Math.floor(diskTotalBytes * (0.2 + Math.random() * 0.5));
      // const availableDiskBytes = diskUsedBytes - Math.floor(Math.random() * (diskUsedBytes * 0.1));
      const diskInodesTotal = 1000000 + Math.floor(Math.random() * 500000);
      const diskInodesFree = Math.floor(diskInodesTotal * (0.1 + Math.random() * 0.8));

      const metric = new DataDTO({
        id: serverId,
        name: serverName,
        timestamp,
        deviceType: deviceType,
        status,
        uptimeMinutes: Math.floor(Math.random() * 10000),

        cpuUsagePercent: +(40 + Math.random() * 40).toFixed(2),
        cpuCoreUsage: Array.from({ length: 4 }, () => +(40 + Math.random() * 20).toFixed(2)),
        cpuTemperatureC: +(60 + Math.random() * 10).toFixed(1),

        memoryTotalBytes: totalMemoryMb * 1024 * 1024,
        swapTotalBytes: totalSwapMb * 1024 * 1024,
        totalCacheBytes: totalCacheMb * 1024 * 1024,

        memoryUsedPercent: +(60 + Math.random() * 20).toFixed(1),
        swapUsedPercent: +(1 + Math.random() * 5).toFixed(1),
        memoryCacheBytes: Math.floor(1500 + Math.random() * 1000),

        diskUsedPercent: {
          '/': +(60 + Math.random() * 10).toFixed(1),
          '/data': +(80 + Math.random() * 5).toFixed(1),
        },
        diskIOReadBytes: Math.floor(10_000_000 + Math.random() * 5_000_000),
        diskIOWriteBytes: Math.floor(5_000_000 + Math.random() * 2_000_000),
        diskLatencyMs: +(3 + Math.random() * 2).toFixed(2),

        diskTotalBytes: diskTotalBytes,
        diskUsedBytes: diskUsedBytes,
        diskInodesTotal: diskInodesTotal,
        diskInodesFree: diskInodesFree,

        networkInBytes: Math.floor(500_000 + Math.random() * 500_000),
        networkOutBytes: Math.floor(400_000 + Math.random() * 400_000),
        networkPacketsDropped: Math.floor(Math.random() * 5),
        tcpConnections: Math.floor(150 + Math.random() * 50),

        interfaceBandwidthUsagePercent: {
          eth0: +(30 + Math.random() * 20).toFixed(1),
          eth1: +(20 + Math.random() * 10).toFixed(1),
        },
        interfaceErrorRatePercent: {
          eth0: +(Math.random() * 0.2).toFixed(2),
          eth1: +(Math.random() * 0.1).toFixed(2),
        },
        interfaceDiscards: {
          eth0: Math.floor(Math.random() * 5),
          eth1: Math.floor(Math.random() * 3),
        },

        bgpStatus: {
          peer1: Math.random() > 0.2 ? 'Established' : 'Idle',
          peer2: Math.random() > 0.5 ? 'Established' : 'Idle',
        },
        ospfNeighborsCount: Math.floor(3 + Math.random() * 3),
        dnsQueryTimeMs: +(15 + Math.random() * 15).toFixed(2),

        firewallDropsCount: Math.floor(Math.random() * 15),
        ipsAlertsCount: Math.floor(Math.random() * 5),

        httpRequestsTotal: Math.floor(1500 + Math.random() * 200),
        httpResponseTimeMs: +(100 + Math.random() * 100).toFixed(1),
        httpErrorRatePercent: +(Math.random() * 3).toFixed(2),

        dbQueryDurationMs: +(10 + Math.random() * 10).toFixed(2),
        dbConnectionsCount: Math.floor(30 + Math.random() * 20),
        dbReplicationLagSeconds: +(Math.random() * 2).toFixed(2),

        queueLength: Math.floor(10 + Math.random() * 20),
        messageProcessingTimeMs: +(100 + Math.random() * 50).toFixed(2),
        consumerLag: Math.floor(Math.random() * 10),

        flowBytes: Math.floor(3_000_000 + Math.random() * 2_000_000),
        flowPackets: Math.floor(7000 + Math.random() * 2000),
        flowDurationSec: +(5 + Math.random() * 10).toFixed(2),
        topSourceIps: ['192.168.1.5', '10.0.0.3', '172.16.0.7'].slice(0, 2),
        topDestinationIps: ['8.8.8.8', '1.1.1.1', '8.8.4.4'].slice(0, 2),
        protocolDistributionPercent: {
          TCP: Math.floor(60 + Math.random() * 20),
          UDP: Math.floor(20 + Math.random() * 15),
          ICMP: Math.floor(Math.random() * 5),
        },

        bruteforceAttempts: Math.floor(Math.random() * 10),
        maliciousIps: Math.random() > 0.5 ? ['45.55.66.77'] : [],
        vulnerabilityScansCount: Math.floor(Math.random() * 3),

        failedLoginsCount: Math.floor(Math.random() * 15),
        privilegeEscalationsCount: Math.random() > 0.8 ? 1 : 0,

        activeSessionsCount: Math.floor(100 + Math.random() * 50),
        apiCallsCount: Math.floor(800 + Math.random() * 100),
        userActionsCount: Math.floor(1800 + Math.random() * 300),

        appResponseTimeMs: +(150 + Math.random() * 100).toFixed(1),
        transactionSuccessRatePercent: +(95 + Math.random() * 5).toFixed(2),
      });

      metrics.push(metric);
    }
  }

  return metrics;
}