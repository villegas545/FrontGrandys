import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import {
    ListBox,
    processListBoxDragAndDrop
} from '@progress/kendo-react-listbox';
import products from './products.json';

const CashOut = () => {
    const [state, setState] = React.useState({
        notDiscontinued: products.filter((product) => !product.Discontinued),
        discontinued: products.filter((product) => product.Discontinued),
        draggedItem: {}
    });

    const handleDragStart = (e) => {
        setState({...state, draggedItem: e.dataItem});
    };

    const handleDrop = (e) => {
        const result = processListBoxDragAndDrop(
            state.notDiscontinued,
            state.discontinued,
            state.draggedItem,
            e.dataItem,
            'ProductID'
        );
        setState({
            ...state,
            notDiscontinued: result.listBoxOneData,
            discontinued: result.listBoxTwoData
        });
    };

    return (
        <div className="example">
            <div className="demo-section k-content wide">
                <div>
                    <ListBox
                        data={state.notDiscontinued}
                        textField="ProductName"
                        onDragStart={handleDragStart}
                        onDrop={handleDrop}
                    />
                    <ListBox
                        data={state.discontinued}
                        textField="ProductName"
                        style={{
                            marginLeft: '12px'
                        }}
                        onDragStart={handleDragStart}
                        onDrop={handleDrop}
                    />
                    {JSON.stringify(state.discontinued)}
                </div>
            </div>
        </div>
    );
};
export default CashOut;
