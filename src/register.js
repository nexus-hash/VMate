import { Component } from 'react';
import {Link} from 'react-router-dom';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
    };
  }

  handleUsernameChange = (event) => {

    this.setState({
      username: event.target.value,
    });
  };

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  render() {
    return (
      <div className="w-full h-screen bg-gray-800">
        <div className="flex flex-col justify-start items-center h-screen">
          <div className="flex justify-center items-center w-full h-12 bg-gray-700">
            <div className="w-full max-w-6xl h-12">
              <div className="flex items-center justify-center">
                <h1 className="text-blue-400 xl:text-4xl sm:text-xl">VMate</h1>
              </div>
              {/*<img src={srcLogo} alt="" width=""></img>}*/}
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
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                  />
                </div>
                <br></br>
                <div className="flex justify-between items-center ">
                  <button className="border-2 rounded-md w-36 h-12 bg-blue-500 text-gray-100 mr-8">
                    Register
                  </button>
                  <Link
                    to = '/login'
                    className="border-2 rounded-md w-36 h-12 flex justify-center items-center bg-blue-500 bg-opacity-20 text-gray-100 "
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default Register;
