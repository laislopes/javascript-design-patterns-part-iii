import { log, timeoutPromise, retry } from './utils/promise-helpers.js';
import { invoicesService as service } from './invoice/service.js';
import { takeUntil, debounceTime, pipe, partialize } from './utils/operators.js';
import { EventEmitter } from './utils/event-emitter.js';

const operations = pipe(
    partialize(takeUntil, 3),
    partialize(debounceTime, 500)
);

const action = operations(() => 
    retry(3, 3000, () => timeoutPromise(200, service.sumItems('2143')))
    .then(total => EventEmitter.emit('totalizedItems', total))
    .catch(console.log)
);

document
.querySelector('#myButton')
.onclick = action;

