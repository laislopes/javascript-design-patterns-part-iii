import { log } from './utils/promise-helpers.js';
import { invoicesService as service } from './invoice/service.js';
import { takeUntil, debounceTime } from './utils/operators.js';

const action = debounceTime(500, takeUntil(3, () => 
    service
    .sumItems('2143')
    .then(console.log)
    .catch(console.log)
));


document
.querySelector('#myButton')
.onclick = action;