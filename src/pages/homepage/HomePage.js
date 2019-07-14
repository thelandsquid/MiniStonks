import React from 'react';
import './HomePage.css';
import { SortableWidgetGrid } from './SortableWidgetGrid';

export class HomePage extends React.Component {
    render() {
        return (
            <body className="homepage-body">
                <SortableWidgetGrid
                    axis="xy"
                    helperClass="moving-widget"
                    symbols = {this.props.symbols} 
                    onSortEnd = {this.props.onSortEnd}/>
            </body>
        );
    }
}