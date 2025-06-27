export class DataDTO {
    constructor(data) {
        // Идентификатор устройства или сервера — строка, например "server-1"
        this.id = data.id || '';

        // Человекочитаемое имя сервера или устройства, например "Server 1"
        this.name = data.name || 'N/A';

        // Временная метка в формате ISO строки, когда были сняты метрики
        this.timestamp = data.timestamp || new Date().toISOString();

        // Тип устройства (сервер, роутер, коммутатор и т.п.)
        this.deviceType = data.deviceType || 'unknown';

        // Статус устройства: "online", "offline", "degraded" или другое
        this.status = data.status || 'unknown';

        // Время непрерывной работы устройства в минутах — число
        this.uptimeMinutes = data.uptimeMinutes ?? 0;

        // Использование CPU в процентах (среднее по всем ядрам)
        this.cpuUsagePercent = data.cpuUsagePercent ?? 0;

        // Массив значений загрузки для каждого CPU ядра
        this.cpuCoreUsage = data.cpuCoreUsage || [];

        // Температура CPU в градусах Цельсия с дробной частью
        this.cpuTemperatureC = data.cpuTemperatureC ?? 0;

        // Общий объём оперативной памяти в байтах
        this.memoryTotalBytes = data.memoryTotalBytes ?? 0;

        // Использование памяти в процентах (среднее по всей памяти)
        this.memoryUsedPercent = data.memoryUsedPercent ?? 0;

        // Использованная память в байтах, если не задана — считается из общего объёма и процента использования
        this.memoryUsedBytes = data.memoryUsedBytes ?? (this.memoryTotalBytes * this.memoryUsedPercent / 100);

        // Количество байт, занятых кэшем памяти (например, кеш OS)
        this.memoryCacheBytes = data.memoryCacheBytes ?? 0;

        // Общий объём swap памяти в байтах
        this.swapTotalBytes = data.swapTotalBytes ?? 0;

        // Использование swap памяти в процентах
        this.swapUsedPercent = data.swapUsedPercent ?? 0;

        // Использованный swap в байтах (если не задан — вычисляется)
        this.swapUsedBytes = data.swapUsedBytes ?? (this.swapTotalBytes * this.swapUsedPercent / 100);

        // Процент использования дисков по точкам монтирования, объект с ключами, например {'/': 65.4, '/data': 82.1}
        this.diskUsedPercent = data.diskUsedPercent || {};

        // Общий размер всех дисков в байтах
        this.diskTotalBytes = data.diskTotalBytes ?? 0;

        // Используемый размер диска в байтах
        this.diskUsedBytes = data.diskUsedBytes ?? 0;

        // Количество байт, считанных с диска (I/O read)
        this.diskIOReadBytes = data.diskIOReadBytes ?? 0;

        // Количество байт, записанных на диск (I/O write)
        this.diskIOWriteBytes = data.diskIOWriteBytes ?? 0;

        // Среднее время отклика дисковой подсистемы в миллисекундах
        this.diskLatencyMs = data.diskLatencyMs ?? 0;

        // Общее количество inodes на диске (файловая система)
        this.diskInodesTotal = data.diskInodesTotal ?? 0;

        // Свободные inodes (число)
        this.diskInodesFree = data.diskInodesFree ?? 0;

        // Общее количество байт, принятых по сети
        this.networkInBytes = data.networkInBytes ?? 0;

        // Общее количество байт, отправленных по сети
        this.networkOutBytes = data.networkOutBytes ?? 0;

        // Количество потерянных пакетов (dropped)
        this.networkPacketsDropped = data.networkPacketsDropped ?? 0;

        // Количество активных TCP-соединений
        this.tcpConnections = data.tcpConnections ?? 0;

        // Использование пропускной способности по интерфейсам в процентах, например { eth0: 45.2, eth1: 30.1 }
        this.interfaceBandwidthUsagePercent = data.interfaceBandwidthUsagePercent || {};

        // Ошибки интерфейсов в процентах (error rate)
        this.interfaceErrorRatePercent = data.interfaceErrorRatePercent || {};

        // Количество отброшенных пакетов (discards) по интерфейсам
        this.interfaceDiscards = data.interfaceDiscards || {};

        // Статусы BGP пиров, например { peer1: 'Established', peer2: 'Idle' }
        this.bgpStatus = data.bgpStatus || {};

        // Количество соседей OSPF протокола (число)
        this.ospfNeighborsCount = data.ospfNeighborsCount ?? 0;

        // Время DNS-запроса в миллисекундах
        this.dnsQueryTimeMs = data.dnsQueryTimeMs ?? 0;

        // Количество пакетов, отброшенных firewall-ом
        this.firewallDropsCount = data.firewallDropsCount ?? 0;

        // Количество срабатываний IDS/IPS (система обнаружения/предотвращения вторжений)
        this.ipsAlertsCount = data.ipsAlertsCount ?? 0;

        // Общее количество HTTP-запросов
        this.httpRequestsTotal = data.httpRequestsTotal ?? 0;

        // Среднее время ответа HTTP-сервера в миллисекундах
        this.httpResponseTimeMs = data.httpResponseTimeMs ?? 0;

        // Процент ошибок HTTP (например 0-100%)
        this.httpErrorRatePercent = data.httpErrorRatePercent ?? 0;

        // Средняя длительность выполнения запросов к базе данных в миллисекундах
        this.dbQueryDurationMs = data.dbQueryDurationMs ?? 0;

        // Количество активных подключений к базе данных
        this.dbConnectionsCount = data.dbConnectionsCount ?? 0;

        // Задержка репликации базы данных в секундах (lag)
        this.dbReplicationLagSeconds = data.dbReplicationLagSeconds ?? 0;

        // Длина очереди сообщений (например, в брокере)
        this.queueLength = data.queueLength ?? 0;

        // Время обработки сообщения в очереди в миллисекундах
        this.messageProcessingTimeMs = data.messageProcessingTimeMs ?? 0;

        // Задержка потребителя (consumer lag) — сколько сообщений он отстаёт
        this.consumerLag = data.consumerLag ?? 0;

        // Объём трафика (байты) по сетевому потоку
        this.flowBytes = data.flowBytes ?? 0;

        // Количество пакетов в сетевом потоке
        this.flowPackets = data.flowPackets ?? 0;

        // Длительность сетевого потока в секундах
        this.flowDurationSec = data.flowDurationSec ?? 0;

        // Топ источников IP-адресов (массив строк с IP)
        this.topSourceIps = data.topSourceIps || [];

        // Топ назначений IP-адресов (массив строк с IP)
        this.topDestinationIps = data.topDestinationIps || [];

        // Распределение протоколов в процентах, например { TCP: 70, UDP: 25, ICMP: 5 }
        this.protocolDistributionPercent = data.protocolDistributionPercent || {};

        // Количество попыток брутфорса (подбор пароля)
        this.bruteforceAttempts = data.bruteforceAttempts ?? 0;

        // Список IP-адресов, помеченных как вредоносные (массив строк)
        this.maliciousIps = data.maliciousIps || [];

        // Количество сканирований на уязвимости
        this.vulnerabilityScansCount = data.vulnerabilityScansCount ?? 0;

        // Количество неудачных попыток входа в систему
        this.failedLoginsCount = data.failedLoginsCount ?? 0;

        // Количество выявленных попыток повышения привилегий (0 или 1)
        this.privilegeEscalationsCount = data.privilegeEscalationsCount ?? 0;

        // Количество активных сессий пользователей
        this.activeSessionsCount = data.activeSessionsCount ?? 0;

        // Количество вызовов API
        this.apiCallsCount = data.apiCallsCount ?? 0;

        // Количество действий пользователей (например, клики, действия в UI)
        this.userActionsCount = data.userActionsCount ?? 0;

        // Время отклика приложения в миллисекундах
        this.appResponseTimeMs = data.appResponseTimeMs ?? 0;

        // Процент успешных транзакций (например, 95.5%)
        this.transactionSuccessRatePercent = data.transactionSuccessRatePercent ?? 0;
    }
}
