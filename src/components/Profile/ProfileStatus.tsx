import React from 'react';


type PropsType={
    updateStatus:(newStatus:string)=>void
    status:string
}
type StateType={
    status:string,
    editMode:boolean
}

class ProfileStatus extends React.Component<PropsType,StateType>{


    state={
        editMode:false,
        status:this.props.status
    }

    activateEditMode=()=>{
        this.setState({
            editMode:true
        })
    }
    diactivateEditMode=()=>{
        this.setState({
            editMode:false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange=(e:any)=>{
        this.setState({
            status: e.currentTarget.value
        })
       
    }


    componentDidUpdate(prevProps:PropsType,prevState:StateType){
        if(prevProps.status!==this.props.status){
            this.setState({
                status:this.props.status
            })
        }
    }

    render(){
       return(
        
       <div>
           {!this.state.editMode ? <div><span onDoubleClick={this.activateEditMode}>{this.state.status || "No status"}</span></div> : <div><input onChange={this.onStatusChange}  autoFocus={true} onBlur={this.diactivateEditMode} type="text" value={this.state.status} /></div>}
       </div>)
    }
  
}

export default ProfileStatus;