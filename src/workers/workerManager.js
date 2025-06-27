class WorkerManager {
    constructor() {
        this.workers = new Map();
        this.callbacks = new Map();

        this.initWorker('dataProcessor', '../data/dataProcessor.js');
    }

    initWorker(name, path) {
        const worker = new Worker(new URL(path, import.meta.url), { type: 'module' });

        worker.onmessage = (event) => {
            const { type, payload } = event.data;

            // Отправка обработанных данных в dispatcher
            // dispatcher.emit({ type, payload });
            const callback = this.callbacks.get(type);
            if (callback) {
                callback(payload);
            } else {
                console.warn(`[WorkerManager] No callback for message type: ${type}`);
            }
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

    /**
     * Зарегистрировать callback на сообщение от воркера
     * @param {string} type - тип сообщения (например: 'processed:all')
     * @param {function} callback - функция, вызываемая при получении
     */
    on(type, callback) {
        this.callbacks.set(type, callback);
    }
}

export const workerManager = new WorkerManager();