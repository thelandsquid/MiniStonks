import React from 'react';
import logo from '../logo.svg';
import './NavigationBar.css';
import '../App.css';
import { Link } from "react-router-dom";

export class NavigationBar extends React.Component {
    onChange(e){
        if(e.target.checked){
            document.documentElement.setAttribute('data-theme','dark');
        }else{
            document.documentElement.setAttribute('data-theme','light');
        }
    }
    render() {
        return (
            <div className="navbar">
                <img className="logo" src={logo} />
                <ul className="main-nav">
                    <li><Link className="nav-text" to="/">Home</Link></li>
                    <li><Link className="nav-text" to="/find-stock">Find Stock</Link></li>
                    <li><Link className="nav-text" to="/settings">Settings</Link></li>
                    <li class="theme-switch-wrapper">
                        <label class="theme-switch" for="checkbox">
                            <input type="checkbox" id="checkbox" onChange={this.onChange}/>
                            <div class="slider round"></div>
                        </label>
                        <div className="theme-switch-text">Dark Mode</div>
                    </li>
                </ul>
            </div>
        );
    }
}