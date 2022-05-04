import { result } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import Input from '@/Components/Input';
import Button from './Button';

export default function BuktiFisikInputHandler({
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
        if(this.props.buktiFisikData!=null){
            var idString;
            for (var i = 0; i <= 3; i++) {
                idString = 'bukti[]';
                this.state.rows.push(<div  key={i} style={{marginLeft:'10px',marginBottom:'2px'}}><Input name={idString} /></div>);
                this.state.index++;
            }
        }
        //console.log(this.state.selectedOption);
    }
    addBukties = () => {
        var newRow = [];
        var idString = 'bukti[]';
            newRow.push(<div  key={this.state.index} style={{marginLeft:'10px',marginBottom:'2px'}}><Input name={idString} /></div>);
        this.setState(prevState => ({
            rows: [...prevState.rows, newRow]
          }))
    }

    handleChange = () => {
        this.setState({index: this.state.index + 1})
        this.addBukties()
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
  