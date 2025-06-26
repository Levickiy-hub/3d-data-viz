import { prepareTableData } from '../data/transformers/prepareTableData.js';
import { prepare3DData } from '../data/transformers/prepare3DData.js';
import { prepare2DData } from '../data/transformers/prepare2DData.js';

self.onmessage = function (event) {
  const { type, payload } = event.data;
  console.log('payload',payload)
  if (type === 'process:all') {
    const table = prepareTableData(payload);
    const view3D = prepare3DData(payload);
    const view2D = prepare2DData(payload);

    self.postMessage({
      type: 'processed:all',
      payload: {
        table,
        view3D,
        view2D
      }
    });

  } else {
    console.warn('[dataProcessor] Неизвестный тип сообщения:', type);
  }
};