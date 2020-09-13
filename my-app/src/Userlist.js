import React, { Component } from "react";
import Card from "react-bootstrap/Card";

export default class Userlist extends Component {
  constructor(props) {
    super(props);
   
    //    console.log(props)
  }
  componentDidMount() {
  
    // console.log(this.props)
  }

  deleteUser = (userInfo) => {
    this.props.deleteUser(userInfo);
  };
  updateDetails = (userDetails) => {
    // console.log(userDetails)
    this.props.userToUpdate(userDetails);
    this.props.toggleupdateModal();
  };
  render() {
    const ulist = this.props.userlist;//.reverse();
//ulist.reverse();
    const users = ulist.map((user) => {
      return (
        <div className="col-md-6 col-sm-12">
          <Card key={user.id}>
            <Card.Header>
              {"# "}
              {user.name}
              <i
                onClick={() => this.deleteUser({ user })}
                className="close"
                aria-label="Close"
                title="Delete User"
              >
                <span aria-hidden="true">&times;</span>
              </i>
            </Card.Header>
            <Card.Body>
              <p>Dob:{user.birthdate}</p>
              <p>Gender:{user.gender}</p>
              <p>Address:{user.address}</p>
              <p>College:{user.college}</p>
              <p>Hobbies:{user.hobbies.toString()}</p>
              <footer>
                <button
                  className="btn btn-primary"
                  onClick={() => this.updateDetails(user)}
                >
                  Update
                </button>
              </footer>
            </Card.Body>
          </Card>
        </div>
      );
    });
    return <div className="row">{users}</div>;
  }
}
