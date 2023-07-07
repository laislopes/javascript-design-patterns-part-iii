import { handleStatus } from '../utils/promise-helpers.js';
import { partialize, compose} from '../utils/operators.js';
import '../utils/array-helpers.js';

const API = 'http://localhost:3000/invoices';

const getItemsFromInvoices = invoices => invoices.$flatMap(invoice => invoice.items);
const filterItemsByCode = (code, items) => items.filter(item => item.code === code);
const sumItemsValue = items =>  items.reduce((total, item) => total + item.value, 0);
    
export const invoicesService = {

    listAll(){
        return fetch(API)
            .then(handleStatus)
            .catch(error => {
                console.log(error);
                return Promise.reject('Was not possible to get the invoices');
            });
    },

    sumItems(code){
        const filterItems = partialize(filterItemsByCode, code);

        return this.listAll()
                    .then(invoices => 
                        sumItemsValue(
                            filterItems(
                                getItemsFromInvoices(invoices)
                                )
                        )
                    );
    }
};