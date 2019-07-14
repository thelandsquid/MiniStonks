import React from 'react';
import './FindStockPage.css';

export class FindStockPage extends React.Component {
    state = {
        stockSymbol: "",
    };
    handleChange(e){
        const stockSymbol = e.target.value;
        this.setState(prevState => {
            return {
                ...prevState,
                stockSymbol ,
            }
        })
    }
    render() {
        return (
            <body className="find-stock-page-body">
                <input type="text" value={this.state.stockSymbol} placeholder="Enter Stock Symbol" onChange={(e)=>this.handleChange(e)}></input>
                <button onClick={()=>{this.props.addStock(this.state.stockSymbol)}}>Add Stock</button>
            </body>
        );
    }
}