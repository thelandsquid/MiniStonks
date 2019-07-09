import React from 'react';
import logo from '../logo.svg';
import './NavigationBar.css';
import '../App.css';
import {Link} from "react-router-dom";

export class NavigationBar extends React.Component {

    render() {
        return (
            <div className="navbar">
                <img src={logo} />
                <ul>
                    <li><Link className="link" to="/">Home</Link></li>
                    <li><Link className="link" to="/find-stock">Find Stock</Link></li>
                    <li><Link className="link" to="/settings">Settings</Link></li>
                </ul>
            </div>
        );
    }
}