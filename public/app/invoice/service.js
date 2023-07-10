import { handleStatus } from '../utils/promise-helpers.js';
import { partialize, compose, pipe} from '../utils/operators.js';
import '../utils/array-helpers.js';
import { Maybe } from '../utils/maybe.js';
const API = 'http://localhost:3000/invoices';

const getItemsFromInvoices = invoicesM => invoicesM.map(invoices => invoices.$flatMap(invoice => invoice.items));
const filterItemsByCode = (code, itemsM) => itemsM.map(items => items.filter(item => item.code === code));
const sumItemsValue = itemsM =>  itemsM.map(items => items.reduce((total, item) => total + item.value, 0));
    
export const invoicesService = {

    listAll(){
        return fetch(API)
            .then(handleStatus)
            // .then(invoices => Maybe.of(null))
            .then(invoices => Maybe.of(invoices))
            .catch(error => {
                console.log(error);
                return Promise.reject('Was not possible to get the invoices');
            });
    },

    sumItems(code){
        const filterItems = partialize(filterItemsByCode, code);
        const sumItems = pipe(getItemsFromInvoices, filterItems, sumItemsValue);

        return this.listAll()
                    .then(sumItems)
                    .then(result => result.getOrElse(0));
    }
};