import { Component } from "react";

import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import apiLink from "./api";

//Session Storage Checking Left

class Login extends Component {
  //Constructor to Initialize the State variables
  constructor(props) {
    super(props);
    window.sessionStorage.clear();
    this.state = {
      username: "",
      name: "",
      message: "",
      loading: false,
    };
  }

  //Function to handle the Username Change
  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  //Function to handle the Name Change
  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  //Function to handle the Login Button Click
  loginOnClick = () => {
    this.setState({
      loading: true,
    });

    //Checking if the Username and Name are not Empty
    if (this.state.username.length === 0 || this.state.name.length === 0) {
      this.setState({
        message: "Please Enter Username and Name",
        loading: false,
      });
      return;
    } else {
      //Fetching the data from the API
      fetch(apiLink+"student/" + this.state.username)
        .catch((err) => {
          setTimeout(() => {
            this.setState({
              message: "Internal Server Error",
              loading: false,
            });
          }, 1500);
        })
        .then((res) => res.json())
        .then((data) => {

          //Checking if the Username is Valid
          if (this.state.name === data.name) {
            window.sessionStorage.setItem("username", this.state.username);
            this.props.history.push("/courses");
          } else {

            //Returning the Invalid Credential Message
            setTimeout(() => {
              this.setState({
                message: "Invalid Credentials",
                loading: false,
              });
              return;
            }, 1500);
            
          }
        });
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="h-screen w-full overflow-hidden">
          <div className="flex flex-col justify-start items-center">
            <div className="h-12 w-full flex justify-center items-center text-center bg-gray-600">
              <text className="text-center text-blue-500 font-extrabold lg:text-4xl text-xl">
                VMate
              </text>
            </div>
            <div className="h-screen w-full overflow-hidden bg-gray-800">
              <div className="flex flex-col justify-center items-center text-center mt-64">
                <HashLoader color={"#2196f3"} loading={true} size={150} />
                <text className="font-bold text-gray-100 lg:text-3xl text-lg mt-5">
                  Logging In ...
                </text>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-screen bg-gray-900">
          <div className="flex flex-col justify-start items-center h-screen">
            <div className="flex justify-center items-center w-full h-12 bg-gray-600">
              <div className="w-full max-w-6xl h-12">
                <div className="flex items-center justify-center">
                  <h1 className="text-blue-400 xl:text-4xl font-extrabold sm:text-xl">
                    VMate
                  </h1>
                </div>
              </div>
            </div>
            <div className="h-1/5"></div>
            <form className="w-full">
              <div className="w-full items-center h-auto">
                <div className="flex flex-col justify-between items-center ">
                  <div className="lg:text-2xl text-lg text-gray-100 font-extrabold">
                    Login
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
                      required
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
                      required
                    />
                  </div>
                  <br></br>
                  <div className="flex justify-between items-center ">
                    <Link
                      to="/register"
                      className="border-2 rounded-md mt-2 w-36 h-12 flex items-center mr-8 justify-center  bg-blue-500 bg-opacity-20 text-gray-100 "
                    >
                      Register
                    </Link>
                    <button
                      onClick={this.loginOnClick}
                      className="border-2 mt-2 rounded-md w-36 h-12 bg-blue-500 text-gray-100"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}
export default Login;
