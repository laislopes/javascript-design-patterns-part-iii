import { log } from './utils/promise-helpers.js';
import { invoicesService as service } from './invoice/service.js';

document
.querySelector('#myButton')
.onclick = () => 
    service
    .sumItems('2143')
    .then(console.log)
    .catch(console.log);