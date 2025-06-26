class WorkerManager {
    constructor() {
        this.workers = new Map();

        this.initWorker('dataProcessor', '../data/dataProcessor.js');
    }

    initWorker(name, path) {
        const worker = new Worker(new URL(path, import.meta.url), { type: 'module' });

        worker.onmessage = (event) => {
            const { type, payload } = event.data;

            // Отправка обработанных данных в dispatcher
            // dispatcher.emit({ type, payload });
            console.log(type, payload)
        };

        this.workers.set(name, worker);
    }
    /**
     * Основной метод: отправляет данные нужному воркеру
     * @param {string} target - имя воркера
     * @param {Object} message - { type, payload }
    */
    sendToWorker(target, message) {
        const worker = this.workers.get(target);
        if (!worker) {
            console.warn(`[WorkerManager] Worker "${target}" не найден`);
            return;
        }

        worker.postMessage(message);
    }

    /**
     * Обработка входящих метрик — универсальная точка входа
     * @param {Object} rawData - исходные метрики
     */
    processIncoming(rawData) {
        this.sendToWorker('dataProcessor', {
            type: 'process:all',
            payload: rawData,
        });
    }
}

export const workerManager = new WorkerManager();