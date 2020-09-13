import React from 'react';
class Adduserbutton extends React.Component
{
    render(){
        return( <button className="btn btn-success" onClick={this.props.toggleModal}>Add User</button>
        )
    }
   

}   
export default Adduserbutton;