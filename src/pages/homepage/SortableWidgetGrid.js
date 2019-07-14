import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import {GetStockWidget} from './StockWidget';
import './SortableWidgetGrid.css';


const WidgetGrid = ({symbols,shouldUpdate})=> {
  return(
    <div className="widgetgrid">
      {symbols.map((value,index)=>(
        <GetStockWidget key={`item-${value}`} symbol={value} index={index}/>
      ))}
    </div>
  );
};

export const SortableWidgetGrid = SortableContainer(WidgetGrid);