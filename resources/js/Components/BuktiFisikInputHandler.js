import { result } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import Input from '@/Components/Input';
import Button from './Button';

export default function BuktiFisikInputHandler({
    type = 'text',
    name,
    options,
    value,
    label,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
}) {
    return (
        <Board options = {options} value={value} label={label} name={name}/>
    );
}

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rows: [],
            index: 0
            
        };
        //console.log(this.state.selectedOption);
    }
    addBukties = () => {
        var rows = [];
        var idString;
        for (var i = 0; i <= this.state.index; i++) {
            idString = 'bukti[]';
            rows.push(<div  key={i} style={{marginLeft:'10px',marginBottom:'2px'}}><Input name={idString} /></div>);
        }
        return rows;
    }

    handleChange = () => {
        this.setState({index: this.state.index + 1})
        this.setState({rows: this.addBukties()})
        //console.log(selectedOption.parent_id);
    }

        render() {
      return (
        <>
            {this.state.rows}
            <div>
                <Button
                    style={{marginLeft:'10px', marginTop:'10px'}}
                    type={'button'}
                    onClick={this.handleChange}
                >
                    + Bukti
                </Button>
            </div>
        </>
        );
    }
  }
  