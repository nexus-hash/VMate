import { Component } from 'react';
import {Link} from 'react-router-dom';
import { HashLoader } from 'react-spinners';

class Register extends Component {

  constructor(props) {
    super(props);
    window.sessionStorage.clear();
    this.state = {
      username: "",
      name: "",
      message:"",
      loadMessage:"Registering ...",
      loading: false,
    };
  }

  //Function to handle username change
  handleUsernameChange = (event) => {

    this.setState({
      username: event.target.value,
    });
  };

  //Function to handle name change
  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  onRegisterClick = () => {
    this.setState({
      loading: true
    })

    if(this.state.username === "" || this.state.name === ""){
      this.setState({
        message: "Please fill all the fields",
        loading: false
      })
    }else{
      console.log("Starting fetch");
      fetch("https://vitclassmaps.herokuapp.com/student/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roll: this.state.username,
          name: this.state.name,
        }),
      })
        .catch((error) => {
          this.setState({
            message: "Internal Server Error",
            loading: false,
          });
        })
        .then((res) => res.json())
        .then((data) => {
          
          if (data.output === "Student Alreay exists") {
            this.setState({
              message: "Student Already Exists",
              loading: false,
            });
          } else if (data.output === "Student Added") {
            this.setState({
              loadMessage: "Successfully Registered. Logging In ...",
            });
            window.sessionStorage.setItem("username", this.state.username);
            window.sessionStorage.setItem("name", this.state.name);
            setTimeout(() => {
              this.props.history.push("/courses");
            }, 1500);
          }
        });
    }
  }

  render() {
    if(this.state.loading){
      return (
        <div className="h-screen w-full overflow-hidden">
          <div className="flex flex-col justify-start items-center">
            <div className="h-12 w-full flex justify-center items-center text-center bg-gray-600">
              <text className="text-center text-blue-500 font-extrabold lg:text-4xl text-xl">
                VMate
              </text>
            </div>
            <div className="h-screen w-full overflow-hidden bg-gray-900">
              <div className="flex flex-col justify-center items-center text-center mt-64">
                <HashLoader color={"#2196f3"} loading={true} size={150} />
                <text className="font-bold text-gray-100 lg:text-3xl text-lg mt-5">
                  {this.state.loadMessage}
                </text>
              </div>
            </div>
          </div>
        </div>
      );
    }else{
    return (
      <div className="w-full h-screen bg-gray-900">
        <div className="flex flex-col justify-start items-center h-screen">
          <div className="flex justify-center items-center w-full h-12 bg-gray-600">
            <div className="w-full max-w-6xl h-12">
              <div className="flex items-center justify-center">
                <h1 className="text-blue-500 font-extrabold xl:text-4xl sm:text-xl">VMate</h1>
              </div>
            </div>
          </div>
          <div className="h-1/5"></div>
          <form className="w-full">
            <div className="w-full items-center h-auto">
              <div className="flex flex-col justify-between items-center ">
                <div className="lg:text-2xl text-lg text-gray-100 font-extrabold">
                  Register
                </div>
                <br></br>
                <text className="text-red-700 lg:text-xl text-sm">
                  {this.state.message}
                </text>
                <br></br>
                <div>
                  <label
                    className="text-gray-200 text-sm font-bold block"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="border-2 mt-1 border-blue-400 p-2 w-80 rounded-xl"
                    type="text"
                    placeholder="Username"
                    id="username"
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                  />
                </div>
                <br></br>
                <div>
                  <label
                    className="text-gray-200 text-sm font-bold block"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="border-2 mt-1 border-blue-400 p-2 w-80 rounded-xl"
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                  />
                </div>
                <br></br>
                <div className="flex justify-between items-center ">
                  <button
                    onClick={this.onRegisterClick}
                    className="border-2 rounded-md w-36 h-12 bg-blue-500 text-gray-100 mr-8 mt-2"
                  >
                    Register
                  </button>
                  <Link
                    to="/login"
                    className="border-2 rounded-md w-36 h-12 flex justify-center items-center mt-2 bg-blue-500 bg-opacity-20 text-gray-100 "
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );}
  }
}


export default Register;
