const invoices = [
    {
        date: '2017-10-31',
        items: [
            { code: '2143', value: 200 },
            { code: '2111', value: 500 }
        ]
    },
    {
        date: '2017-07-12',
        items: [
            { code: '2222', value: 120 },
            { code: '2143', value: 280 }
        ]
    }, 
    {
        date: '2017-02-02',
        items: [
            { code: '2143', value: 110 },
            { code: '7777', value: 390 }
        ]
    },     
];

module.exports = app => {

    app.get('/invoices', (req, res) => res.json(invoices));
}