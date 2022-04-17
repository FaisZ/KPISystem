import { result } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';

export default function UnsurSelector({
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

  class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //use this when the selected can be chosen from the Select component
            //selectedOption: {label: this.props.label, value: this.props.value},
            selectedOption: {label: 'Tidak Ada', value: null},
            structure: getSctructure(this.props.options,null)
        };
        //console.log(this.state.selectedOption);
    }
    handleChange = (selectedOption) => {
        //this.setState({selectedOption});
        this.setState({structure: getSctructure(this.props.options,selectedOption.value)})
        //console.log(selectedOption.parent_id);
    }

    render() {
      return (
        <div>
            <div>
                Visualisasi Struktur
            </div>
            <div className="p-6 bg-white border-b border-gray-200">
                <p>{this.state.structure} - <b>Unsur Baru</b></p>
            </div>
            <div className="p-2">
                Merupakan Sub Unsur dari
                <Select options={ this.props.options } /*defaultValue={this.state.selectedOption}*/  placeholder={'Tidak Ada'} onChange={this.handleChange} name={this.props.name} />
            </div>
        </div>
        );
    }
  }
  