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
function getSctructure(options,currentId){
    if(currentId==null || currentId==0)
        return '';
    else{
        var res = options.find(option => {
            return option.value === currentId;
          });
        if(res.parent_id==null ||res.parent_id==0)
            return res.label;
        else
            return ''+getSctructure(options,res.parent_id)+' - '+res.label;
        }
}

function getBukties(){
    var rows = [];
    var idString;
    for (var i = 0; i < 4; i++) {
        idString = 'bukti'+i;
        rows.push(<div className="p-2"><Input key={i} name={idString} /></div>);
    }
    return rows;
}

function addBukties(rows){
    var idString ='tes';
    rows.push(<div className="p-2"><Input name={idString} /></div>);
    return rows;
}

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rows: getBukties()
            
        };
        //console.log(this.state.selectedOption);
    }
    handleChange = (selectedOption) => {
        //this.setState({selectedOption});
        this.setState({rows: addBukties(this.state.rows)})
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
  