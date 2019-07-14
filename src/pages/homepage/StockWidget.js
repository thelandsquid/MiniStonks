import React from 'react';
import './StockWidget.css';
import up_arrow from './up_arrow.svg';
import down_arrow from './down_arrow.svg';
import { SortableElement } from 'react-sortable-hoc';
import { tsConditionalType } from '@babel/types';

export const GetStockWidget = SortableElement(({ symbol, index }) => <StockWidget symbol={symbol} index={index} />);

class StockWidget extends React.Component {
    pollId;

    constructor(props) {
        super(props);
        this.state = {
            company_name: "",
            current_price: "",
            daily_performance: "",
            open: "",
            high: "",
            low: "",
            arrow_images: [up_arrow, down_arrow],
            arrow_index: 0,
            time_fetched: ""
        };
    }
    componentDidMount() {
        this.fetchData();
        //this.pollId = setInterval(() => this.fetchData(), 5000);
    }
    componentWillUnmount() {
        //clearInterval(this.pollId);
    }
    async fetchData() {
        if (this.props.symbol != null) {
            let upperCaseSymbol = this.props.symbol.toUpperCase();
            if (this.tryLocalStorage(upperCaseSymbol))
                return;
            try {
                const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.props.symbol}&apikey=F41ON15LGCFM4PR7`);
                const data = await response.json();
                const quote = data["Global Quote"];
                quote["10. date"] = this.getDate();
                if (!quote) {
                    this.setDefaultState();
                    return;
                }
                this.setStateWithInfo(quote);
                localStorage.setItem(upperCaseSymbol, JSON.stringify(quote));
            } catch (e) {
                console.error(e);
            }
        }
    }
    setDefaultState() {
        this.setState({
            company_name: this.props.symbol,
            current_price: "Unknown",
            daily_performance: "Unknown",
            open: "Unknown",
            high: "Unknown",
            low: "Unknown",
            arrow_index: 0,
            time_fetched: "None"
        });
    }
    setStateWithInfo(quote) {
        this.setState({
            company_name: quote["01. symbol"],
            current_price: quote["05. price"],
            daily_performance: quote["09. change"] + " " + quote["10. change percent"],
            open: quote["02. open"],
            high: quote["03. high"],
            low: quote["04. low"],
            arrow_index: quote["09. change"].substring(0, 1) === "-" ? 1 : 0,
            time_fetched: quote["10. date"],
        });
    }
    getDate(){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return date+",  "+time;
    }
    tryLocalStorage(symbol) {
        const quote = JSON.parse(localStorage.getItem(symbol));
        if (quote != null && quote !== "") {
            this.setStateWithInfo(quote);
            return true;
        }
        return false;
    }
    render() {
        return (
            <div className="widget">
                <div className="titular_info">
                    <p className="company_name">{this.state.company_name}</p>
                </div>
                <div className="info">
                    <div>{this.state.current_price} USD</div>
                    <div className="daily_performance">
                        <p>{this.state.daily_performance}</p>
                        <img src={this.state.arrow_images[this.state.arrow_index]} />
                    </div>
                    <div className="recentInfo">Open: {this.state.open}</div>
                    <div className="recentInfo">High: {this.state.high}</div>
                    <div className="recentInfo">Low: {this.state.low}</div>
                    <div className="recentInfo">{this.state.time_fetched}</div>
                </div>
            </div>
        );
    }
}