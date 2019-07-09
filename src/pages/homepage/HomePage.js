import React from 'react';
import logo from '../../logo.svg';
import './HomePage.css';
import { StockWidget } from './StockWidget';

export class HomePage extends React.Component {
    render() {
        return (
            <body className="App-body">
                <StockWidget symbol="JCP"/>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
            </a>
            </body>
        );
    }
}