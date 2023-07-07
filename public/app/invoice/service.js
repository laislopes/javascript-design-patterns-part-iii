import { handleStatus } from '../utils/promise-helpers.js';
import './utils/array-helpers.js';

const API = 'http://localhost:3000/invoices';

const sumItems = code => invoices => invoices
        .$flatMap(invoice => invoice.items)
        .filter(item => item.code === code)
        .reduce((total, item) => total + item.value, 0);

export const invoicesService = {

    listAll(){
        return fetch(API).then(handleStatus);
    },

    sumItems(code){
        this.listAll().then(sumItems(code));
    }
};