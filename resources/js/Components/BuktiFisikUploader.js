import { result } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import Input from '@/Components/Input';
import Button from './Button';

export default function BuktiFisikUploader({
    type = 'text',
    name,
    buktiFisikData = null,
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
        <Board options = {options} value={value} label={label} name={name} buktiFisikData={buktiFisikData}/>
    );
}

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rows: [],
            index: 0
        };
        var idString = 'bukti[]';
        if(this.props.buktiFisikData!=null){
            for (var i = 0; i < this.props.buktiFisikData.length; i++) {
                this.state.rows.push(
                    <div  key={i} style={{marginLeft:'10px',marginBottom:'2px'}}>
                        <Input hidden="true" name={'bukti_id[]'} value={this.props.buktiFisikData[i].bukti_id}/>
                        <Input name={idString} defaultValue={this.props.buktiFisikData[i].description}/>
                    </div>
                );
                this.state.index++;
            }
        }
        else{
            this.state.rows.push(<div  key={i} style={{marginLeft:'10px',marginBottom:'2px'}}>
                Bukti Tidak Diperlukan
                </div>);
            this.state.index++;
        }
        //console.log(this.state.selectedOption);
    }
    render() {
      return (
        <>
            {this.state.rows}
        </>
        );
    }
  }
  