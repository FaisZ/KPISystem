import React from 'react';

export default function ShowAktivitasSelector({
    type = 'text',
    name,
    options,
    value,
    defaultValue,
    label,
    activityName,
}) {
    return (
        <Board options = {options} value={value} label={label} name={name} defaultValue={defaultValue} activityName={activityName}/>
    );
}
function getSctructure(options,currentId){
    if(currentId==null || currentId==0)
        return '';
    else{
        var res = options.find(option => {
            return option.value === currentId;
          });
        if( res!=null && (res.parent_id==null ||res.parent_id==0))
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
            selectedOption: this.props.defaultValue,
            structure: getSctructure(this.props.options,this.props.defaultValue.value)
        };
        //console.log(this.state.selectedOption);
    }
    render() {
      return (
        <div>
            <div>
                Aktivitas
            </div>
            <div>
                <p>{this.state.structure} - <b>{this.props.activityName}</b></p>
            </div>
        </div>
        );
    }
  }
  