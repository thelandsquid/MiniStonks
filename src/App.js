import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import { NavigationBar } from './pages/NavigationBar'
import { HomePage } from './pages/homepage/HomePage.js';
import arrayMove from 'array-move';
import { FindStockPage } from './pages/find-stock/FindStockPage';
import { LocalStorageUtility } from './utility/LocalStorageUtility';

export class App extends React.Component {
  state = {
    symbols: [],
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ symbols }) => ({
      symbols: arrayMove(symbols, oldIndex, newIndex),
    }));
    LocalStorageUtility.swapSymbols(oldIndex,newIndex);
  };
  componentDidMount() {
    let symbols = [...this.state.symbols];
    let storedSymbols = JSON.parse(LocalStorageUtility.getStoredSymbols());
    for (let i=0;i<storedSymbols.length;i++)
      symbols.push(String(storedSymbols[i]));
    this.setState({
      symbols
    });
  }
  addStock = (stockSymbol) => {
    stockSymbol = stockSymbol.toUpperCase();
    if (LocalStorageUtility.isValidStockSymbol(stockSymbol)) {
      if (LocalStorageUtility.alreadyExists(stockSymbol))
        return;
      let symbols = [...this.state.symbols];
      symbols.push(String(stockSymbol));
      this.setState({
        symbols
      });
      LocalStorageUtility.addSymbolForRefresh(stockSymbol);
    }
    else
      alert("INVALID STOCK SYMBOL");
  }

  render() {
    return (
      <body className="App">
        <BrowserRouter>
          <NavigationBar />
          <Route exact path="/" component={() => <HomePage symbols={this.state.symbols} onSortEnd={this.onSortEnd} />} />
          <Route path="/find-stock" component={() => <FindStockPage symbols={this.state.symbols} addStock={this.addStock} />} />
          <Route path="/settings" component={() => <HomePage symbols={this.state.symbols} onSortEnd={this.onSortEnd} />} />
        </BrowserRouter>
      </body>
    );
  }
}

export default App;
