import React from 'react';
import './StockWidget.css';
import up_arrow from './up_arrow.svg';
import down_arrow from './down_arrow.svg';

export class StockWidget extends React.Component {
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
            arrow_index: 0
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
        if (this.props.symbol != null)
            try {
                const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.props.symbol}&apikey=F41ON15LGCFM4PR7`);
                const data = await response.json();
                const quote = data["Global Quote"];
                if (!quote) {
                    // alert("BAD DATA");
                    return;
                }
                this.setState({
                    company_name: quote["01. symbol"],
                    current_price: quote["05. price"],
                    daily_performance: quote["09. change"] + " " + quote["10. change percent"],
                    open: quote["02. open"],
                    high: quote["03. high"],
                    low: quote["04. low"],
                    arrow_index: quote["09. change"].substring(0, 1) === "-" ? 1 : 0
                });

            } catch (e) {
                console.error(e);
            }
    }
    render() {
        return (
            <div id="widget">
                <div id="titular_info">
                    <p id="company_name">{this.state.company_name}</p>
                </div>
                <div id="info">
                    <p>{this.state.current_price} USD</p>
                    <div id="daily_performance">
                        <p>{this.state.daily_performance}</p>
                        <img id="per_arrow" src={this.state.arrow_images[this.state.arrow_index]} />
                    </div>
                    <p className="recentInfo">Open: {this.state.open}</p>
                    <p className="recentInfo">High: {this.state.high}</p>
                    <p className="recentInfo">Low: {this.state.low}</p>
                </div>
            </div>
        );
    }
}