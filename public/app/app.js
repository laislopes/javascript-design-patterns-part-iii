import { handleStatus } from './utils/promise-helpers.js'

document
.querySelector('#myButton')
.onclick = () => 
    fetch('http://localhost:3000/invoices')
    .then(handleStatus)
    .then(invoices => console.log(invoices))
    .catch(console.log);