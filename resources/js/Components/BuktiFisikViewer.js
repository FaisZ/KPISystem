import { result } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import Input from '@/Components/Input';
import Button from './Button';
import { Grid } from '@material-ui/core';

export default function BuktiFisikViewer({
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
    const token = document.head.querySelector('meta[name="csrf-token"]').content;
    return (
        <Board options = {options} value={value} label={label} name={name} buktiFisikData={buktiFisikData} token={token}/>
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
                if(this.props.buktiFisikData[i].submitted_bukti_id!=null)
                    this.state.rows.push(
                        <div className="p-1 bg-white border-t border-gray-300" key={i} style={{marginLeft:'10px',marginBottom:'2px'}}>
                            {this.props.buktiFisikData[i].description}

                            <Input hidden="true" name={'bukti_id[]'} value={this.props.buktiFisikData[i].bukti_id}/>
                            {/* <Input name={idString} defaultValue={this.props.buktiFisikData[i].description}/> */}
                            <input type="hidden" name="submitted_bukti_id[]" value={this.props.buktiFisikData[i].submitted_bukti_id} />
                            <Grid container>
                                <Grid item sm={8}> 
                                <form method="POST" action="/pegawai/download" enctype="multipart/form-data">
                                    <input type="hidden" name="_token" value={this.props.token} />
                                    <input type="hidden" name="individual_submitted_bukti_id" value={this.props.buktiFisikData[i].submitted_bukti_id} />
                                    <Button children={this.props.buktiFisikData[i].filename} />
                                </form>
                                </Grid>
                            </Grid>

                        </div>
                    );
                else
                    this.state.rows.push(
                        <div className="p-1 bg-white border-t border-gray-300" key={i} style={{marginLeft:'10px',marginBottom:'2px'}}>
                            {this.props.buktiFisikData[i].description}
                            <Input hidden="true" name={'bukti_id[]'} value={this.props.buktiFisikData[i].bukti_id}/>
                            {/* <Input name={idString} defaultValue={this.props.buktiFisikData[i].description}/> */}
                            <Input name={idString} type={'file'}/>
                            <input type="hidden" name="submitted_bukti_id[]" value={this.props.buktiFisikData[i].submitted_bukti_id} />
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
  