export class LocalStorageUtility{
    static checkExistence(){
        if(localStorage.getItem("Symbols")==null)
            localStorage.setItem("Symbols",JSON.stringify([]));
    }
    static addSymbolForRefresh(symbol){
        this.checkExistence();
        let symbolArray = JSON.parse(localStorage.getItem("Symbols"));
        symbolArray.push(symbol);
        localStorage.setItem("Symbols",JSON.stringify(symbolArray));
    }
    static deleteSymbolForRefresh(symbol){
        let symbolArray = JSON.parse(localStorage.getItem("Symbols"));
        symbolArray = symbolArray.filter(function(value, index, arr){
            return value != symbol;
        });
        localStorage.setItem("Symbols",JSON.stringify(symbolArray));
    }
    static swapSymbols(oldIndex, newIndex){
        debugger;
        let newArray = JSON.parse(localStorage.getItem("Symbols"));
        let temp = newArray[oldIndex];
        newArray[oldIndex]=newArray[newIndex];
        newArray[newIndex]=temp;
        localStorage.setItem("Symbols",JSON.stringify(newArray));
    }
    static isValidStockSymbol(symbol){
        symbol = symbol.replace(/\W/g, "");
        return symbol.length <=5 && symbol.length >0;
    }
    static alreadyExists(symbol){
        this.checkExistence();
        let symbolArray = JSON.parse(localStorage.getItem("Symbols"));
        debugger;
        if(!Array.isArray(symbolArray))
            this.resetSymbols();
        let found = symbolArray.find(function(element){
            return element == symbol;
        });
        return found != null;
    }
    static resetSymbols(){
        localStorage.setItem("Symbols",JSON.stringify([]));
    }
    static getStoredSymbols(){
        this.checkExistence();
        return localStorage.getItem("Symbols");
    }
}