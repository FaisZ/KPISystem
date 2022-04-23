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
            rows.push(<div  key={i} className="p-2"><Input name={idString} /></div>);
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
        <div>
            {this.state.rows}
            <button
                type={'button'}
                className={
                    `inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150`
                }
                onClick={this.handleChange}
            >
                Tambah Bukti
            </button>
        </div>
        );
    }
  }
  