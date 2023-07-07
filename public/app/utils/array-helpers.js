if(!Array.prototype.$flatMap) {
    Array.prototype.$flatMap = function(cb){
        return this.map(cb).reduce((destinationArray, array) => 
            destinationArray.concat(array), []);
    };
}