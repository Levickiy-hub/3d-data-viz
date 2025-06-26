export function generateData(startTime = new Date(), count = 10, serverCount = 3) {
  const metrics = [];
  const addMinutes = (date, minutes) => new Date(date.getTime() + minutes * 60000);
  const deviceTypes = ['server', 'router', 'switch', 'firewall'];

  for (let serverIndex = 1; serverIndex <= serverCount; serverIndex++) {
    const serverId = `server-${serverIndex}`;
    const serverName = `Server ${serverIndex}`;

    // Для каждого сервера выберем случайный тип устройства из deviceTypes
    const deviceType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];

    for (let i = 0; i < count; i++) {
      const timestamp = addMinutes(startTime, i).toISOString();

      const entry = {
        id: serverId,
        name: serverName,
        timestamp,
        device_type: deviceType,
        uptime_minutes: Math.floor(Math.random() * 10000),  // Время непрерывной работы в минутах

        cpu_usage_percent: +(40 + Math.random() * 40).toFixed(2),
        cpu_core_usage: Array.from({ length: 4 }, () => +(40 + Math.random() * 20).toFixed(2)),
        cpu_temperature: +(60 + Math.random() * 10).toFixed(1),

        memory_used_percent: +(60 + Math.random() * 20).toFixed(1),
        swap_usage_percent: +(1 + Math.random() * 5).toFixed(1),
        memory_cache: Math.floor(1500 + Math.random() * 1000),

        disk_used_percent: {
          '/': +(60 + Math.random() * 10).toFixed(1),
          '/data': +(80 + Math.random() * 5).toFixed(1),
        },
        disk_io_read_bytes: Math.floor(10_000_000 + Math.random() * 5_000_000),
        disk_io_write_bytes: Math.floor(5_000_000 + Math.random() * 2_000_000),
        disk_latency: +(3 + Math.random() * 2).toFixed(2),

        network_in_bytes: Math.floor(500_000 + Math.random() * 500_000),
        network_out_bytes: Math.floor(400_000 + Math.random() * 400_000),
        network_packets_dropped: Math.floor(Math.random() * 5),
        tcp_connections: Math.floor(150 + Math.random() * 50),

        interface_bandwidth_usage: {
          eth0: +(30 + Math.random() * 20).toFixed(1),
          eth1: +(20 + Math.random() * 10).toFixed(1),
        },
        interface_error_rate: {
          eth0: +(Math.random() * 0.2).toFixed(2),
          eth1: +(Math.random() * 0.1).toFixed(2),
        },
        interface_discards: {
          eth0: Math.floor(Math.random() * 5),
          eth1: Math.floor(Math.random() * 3),
        },

        bgp_status: {
          peer1: Math.random() > 0.2 ? 'Established' : 'Idle',
          peer2: Math.random() > 0.5 ? 'Established' : 'Idle',
        },
        ospf_neighbors: Math.floor(3 + Math.random() * 3),
        dns_query_time: +(15 + Math.random() * 15).toFixed(2),

        firewall_drops: Math.floor(Math.random() * 15),
        ips_alerts: Math.floor(Math.random() * 5),

        http_requests_total: Math.floor(1500 + Math.random() * 200),
        http_response_time: +(100 + Math.random() * 100).toFixed(1),
        http_error_rate: +(Math.random() * 3).toFixed(2),

        db_query_duration: +(10 + Math.random() * 10).toFixed(2),
        db_connections: Math.floor(30 + Math.random() * 20),
        db_replication_lag: +(Math.random() * 2).toFixed(2),

        queue_length: Math.floor(10 + Math.random() * 20),
        message_processing_time: +(100 + Math.random() * 50).toFixed(2),
        consumer_lag: Math.floor(Math.random() * 10),

        flow_bytes: Math.floor(3_000_000 + Math.random() * 2_000_000),
        flow_packets: Math.floor(7000 + Math.random() * 2000),
        flow_duration: +(5 + Math.random() * 10).toFixed(2),
        top_source_ips: ['192.168.1.5', '10.0.0.3', '172.16.0.7'].slice(0, 2),
        top_destination_ips: ['8.8.8.8', '1.1.1.1', '8.8.4.4'].slice(0, 2),
        protocol_distribution: {
          TCP: Math.floor(60 + Math.random() * 20),
          UDP: Math.floor(20 + Math.random() * 15),
          ICMP: Math.floor(Math.random() * 5),
        },

        bruteforce_attempts: Math.floor(Math.random() * 10),
        malicious_ips: Math.random() > 0.5 ? ['45.55.66.77'] : [],
        vulnerability_scans: Math.floor(Math.random() * 3),

        failed_logins: Math.floor(Math.random() * 15),
        privilege_escalations: Math.random() > 0.8 ? 1 : 0,

        active_sessions: Math.floor(100 + Math.random() * 50),
        api_calls: Math.floor(800 + Math.random() * 100),
        user_actions: Math.floor(1800 + Math.random() * 300),

        app_response_time: +(150 + Math.random() * 100).toFixed(1),
        transaction_success_rate: +(95 + Math.random() * 5).toFixed(2),
      };

      metrics.push(entry);
    }
  }

  return metrics;
}
