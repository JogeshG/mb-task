import React from "react";
import "./App.css";

import Userlist from "./Userlist";
import Adduserbutton from "./Adduserbutton";
import NewuserInfo from "./NewuserInfo";
import Updateuserinfo from "./Updateuserinfo";

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      userlist: [
        {
          id: 1,
          name: "Jogesh",
          birthdate: "14-05-1993",
          address: "Pune",
          gender: "Male",
          college: "TKIET",
          hobbies: "Reading, Gaming, Traveling, Drawing",
        },
        {
          id: 2,
          name: "Ramesh",
          birthdate: "14-05-1993",
          address: "Solapur",
          gender: "Male",
          college: "RIT",
          hobbies: "Cricket",
        },
        {
          id: 3,
          name: "Suresh",
          birthdate: "14-05-1993",
          address: "Satara",
          gender: "Male",
          college: "MIT",
          hobbies: "Reading, Gaming, Traveling, Drawing",
        },
        {
          id: 4,
          name: "Shailesh",
          birthdate: "14-05-1993",
          address: "Mahi",
          gender: "Male",
          college: "COEP",
          hobbies: "Cricket",
        },
      ],
      initialusrDetails: {
        id: 1,
        name: "Jogesh",
        birthdate: "14/05/1993",
        address: "Pune",
        gender: "Male",
        college: "RIT",
        hobbies: "Cricket",
      },
      modalShow: false,
      updateModalShow: false,
      userData: {
        id: 1,
        name: "Jogesh",
        birthdate: "14/05/1993",
        address: "Pune",
        gender: "Male",
        college: "RIT",
        hobbies: "Cricket",
      },
    };

    this.deleteUser = this.deleteUser.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleupdateModal = this.toggleupdateModal.bind(this);
    this.submitNewData = this.submitNewData.bind(this);
    this.userToUpdate = this.userToUpdate.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
  }

  deleteUser = (userInfo) => {
    let deletId = userInfo.user.id;
    let usersList = this.state.userlist;

    const updatedList = usersList.filter((it) => it.id !== deletId);
    //   updatedList.reverse();
    this.setState({
      userlist: updatedList,
    });
  };

  toggleModal() {
    const modlShowprop = this.state.modalShow;
    // console.log(modlShowprop)
    this.setState({
      modalShow: !modlShowprop,
    });
  }
  toggleupdateModal() {
    // console.log("sucesssssss")
    const updatemodlShowprop = this.state.updateModalShow;
    // console.log(modlShowprop)
    this.setState({
      updateModalShow: !updatemodlShowprop,
    });
  }
  userToUpdate(userDetails) {
    console.log("ssdasd");
    console.log(userDetails);
    this.setState({
      userData: userDetails,
    });
  }
  submitNewData(newUsrdata) {
    console.log(newUsrdata);
    let newUserArray = [newUsrdata, ...this.state.userlist];
    // console.log(newUserArray)
    this.setState({
      userlist: newUserArray,
    });
  }
  updateUserData(newUsrdata, id) {
    console.log(newUsrdata + "++" + id);
    const userCurrentData = this.state.userlist;
    userCurrentData.map((item) => {
      if (item.id == id) {
        item["name"] = newUsrdata.name;
        item["college"] = newUsrdata.college;
        item["address"] = newUsrdata.address;
        item["hobbies"] = newUsrdata.hobbies;
        item["gender"] = newUsrdata.gender;
        item["birthdate"] = newUsrdata.birthdate;
      }
    });
    let newUserArray = [...this.state.userlist, newUsrdata];
    // console.log(newUserArray)
    // this.setState({
    //   userlist:newUserArray,

    // })
  }
  render() {
    return (
      <>
        <div className="container register">
          <div className="row">
            <div className="col-md-3 register-left">
              <i className="fa fa-laptop" aria-hidden="true"></i>

              <h3>Welcome</h3>
              <p>Mindbowser - Assignment Task !</p>
              <Adduserbutton toggleModal={this.toggleModal} />
            </div>
            <div className="col-md-9 register-right">
              {/* <PopupExample/> */}
              <div className="row ">
                <h2 className="col-12 text-center">User List</h2>
              </div>
            
                <Updateuserinfo
                  userlist={this.state.userlist}
                  userData={this.state.userData}
                  updateUserData={this.updateUserData}
                  toggleModal={this.toggleupdateModal}
                  updateModalShow={this.state.updateModalShow}
                />

                <Userlist
                  toggleupdateModal={this.toggleupdateModal}
                  updateModalShow={this.state.updateModalShow}
                  userlist={this.state.userlist}
                  deleteUser={this.deleteUser}
                  userToUpdate={this.userToUpdate}
                />
             
            </div>
          </div>
        </div>
        <NewuserInfo
          lastuserIndex={this.state.userlist.length}
          submitNewData={this.submitNewData}
          toggleModal={this.toggleModal}
          modalShow={this.state.modalShow}
        />
      </>
    );
  }
}

export default App;
