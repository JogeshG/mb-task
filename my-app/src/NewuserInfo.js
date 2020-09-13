import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";

export default class NewuserInfo extends Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.addressRef = React.createRef();
    this.genderRef = React.createRef();
    this.birthdateRef = React.createRef();
    this.collegeRef = React.createRef();
    this.hobbiesRef = React.createRef();
    this.formRef=React.createRef();
    this.onsubmituserData = this.onsubmituserData.bind(this);
    this.selectGender = this.selectGender.bind(this);
    this.selectHobbies = this.selectHobbies.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      collegeOptions: [],
      gender: "Male",
      hobbies:[{name:"Reading",checkedValue:false},{name:"Gaming",checkedValue:false} ,{name:"Traveling",checkedValue:false}, {name:"Drawing",checkedValue:false},{name:"Other",checkedValue:false}],
      selectedHobbie:false,
      
    };
  }
  componentDidMount() {
    axios
      .get("http://universities.hipolabs.com/search?country=india")
      .then((res) => {
        // console.log(res.data)
        this.setState({
          collegeOptions: res.data,
        });
        // console.log(this.state.collegeOptions)
      });
  }

  onsubmituserData(event) {  
     event.preventDefault();
    let hobbie=[];
    console.log(this.state.selectedHobbie)
    // newcode
    const checkboxes = document.querySelectorAll('input[name="hobbie"]:checked');
    checkboxes.forEach((checkbox) => {
      if(checkbox.value!="Other")
      {
          hobbie.push(checkbox.value);
      }
    });
    
    /*new*/
    if(this.state.selectedHobbie)
    {
        hobbie=[...hobbie,this.hobbiesRef.current.value];
    }
   
    /*new end*/
    const newUsrdata ={id:this.props.lastuserIndex+1,name:this.nameRef.current.value,address:this.addressRef.current.value,college:this.collegeRef.current.value,gender:this.state.gender,birthdate:this.birthdateRef.current.value,hobbies:hobbie}
    this.props.toggleModal();
    this.props.submitNewData(newUsrdata);

    this.formRef.current.reset();
    
    this.setState({
        selectedHobbie:false
    })
  }
  selectGender(e) {
    console.log(e.currentTarget.value);
    this.setState({
      gender: e.currentTarget.value,
    });
  }
  
  closeModal() {
    this.props.toggleModal();
  }
  selectHobbies(e){
    /*new */
       if(e.currentTarget.value=="Other"){          
           this.setState({
               selectedHobbie:e.currentTarget.checked
           })
       }   
   }
  
  render() {
    const collegeOptions = this.state.collegeOptions.map((item, key) => {
      return <option key={key}>{item.name}</option>;
    });

    /*new end*/
    const hobbiesOptions=
    this.state.hobbies.map((item,key)=>{
        return(
            <div className="form-check">
                <input className="form-check-input" value={item.name} name="hobbie" onChange={(e) => this.selectHobbies(e)} type="checkbox" id={item.name+"checkN"} />
                <label className="form-check-label" for={item.name+"checkN"}>
                    {item.name}
                </label>
                </div>
            )
    })   /*new end*/ 
    return (
      <div
        id="ModalLoginForm"
        className={this.props.modalShow ? "modal showUodateModal" : "modal"}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">New User information</h3>
              <i
                type="button"
                onClick={this.closeModal}
                className="close"
                aria-label="Close"
                title="Close"
              >
                <span aria-hidden="true">&times;</span>
              </i>
            </div>
            <div className="modal-body">
              <form ref={this.formRef} onSubmit={this.onsubmituserData}>
                <div className="form-group">
                  <label htmlFor="name" className="control-label">
                    Name
                  </label>
                  <input
                    id="name"
                    ref={this.nameRef}
                    type="text"
                    className="form-control input-lg"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address" className="control-label">
                    Address
                  </label>

                  <input
                    id="address"
                    ref={this.addressRef}
                    type="text"
                    className="form-control input-lg"
                    name="email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="college">Select College:</label>
                  <select
                    className="form-control"
                    id="college"
                    ref={this.collegeRef}
                    required
                  >
                    {collegeOptions}
                  </select>
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value="Male"
                        name="optradio"
                        onChange={this.selectGender}
                        checked
                      />
                      Male
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value="Female"
                        onChange={this.selectGender}
                        name="optradio"
                      />
                      Female
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="birthdate" className="control-label">
                    Birthdate
                  </label>

                  <input
                    id="birthdate"
                    ref={this.birthdateRef}
                    type="date"
                    className="form-control input-lg"
                    name="password_confirmation"
                    required
                  />
                </div>

                { /*new */}
                    <div class="form-group">
                    <label htmlFor="hobbies">Select Hobbies:</label>
                       {hobbiesOptions}
                         {this.state.selectedHobbie?<input placeholder="Enter your Hobbies" className="form-control input-lg" ref={this.hobbiesRef} type="text" required />:null}
                    </div>
                {/* /*new end*/ }

                  
                <div className="form-group">
                  <div>
                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
