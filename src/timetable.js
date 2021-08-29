import { Component } from "react";
import "./index.css";
import { HashLoader } from "react-spinners";
import apiLink from "./api";
import {Redirect} from 'react-router-dom';

class TimeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      classesIn: [],
      notLogin: window.sessionStorage.getItem("username")===null,
    };
    if (!(window.sessionStorage.getItem("username") === null)) {
      fetch(apiLink + "class/" + window.sessionStorage.getItem("username"))
        .catch((error) => console.log(error))
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            classesIn: data,
            loading: false,
          });
        });
    }
  }

  handleDelete = (id) => () => {
    this.setState({
      loading: true,
    })
    fetch(apiLink + "class/" +window.sessionStorage.getItem("username")+"/"+ id, {
      method: "DELETE",
    }).catch((error) => alert("Deletion Failed"))
      .then((response) => response.json())
      .then((data) => {
        if(data.output==="Deleted Successfully"){
          fetch(apiLink + "class/" + window.sessionStorage.getItem("username"))
            .catch((error) => console.log(error))
            .then((response) => response.json())
            .then((data) => {
              this.setState({
                classesIn: data,
                loading: false,
              });
            });
          alert("Deleted Successfully");
        }else{
          this.setState({
            loading: false,
          });
           alert("Deletion Failed");
        }
      });
  }

  render() {
    if(this.state.notLogin){
      return <Redirect to="/login" />
    }
    else if (this.state.loading) {
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
              </div>
            </div>
          </div>
        </div>
      );
    } else if( this.state.classesIn.length === 0 && !this.state.loading){
      return (
        <div>
          <div className="h-screen flex-col justify-start items-center overflow-scroll">
            <div className="bg-gray-600 h-12 w-full">
              <div className="flex justify-center items-center h-12 ">
                <font className="text-blue-500 font-extrabold text-lg lg:text-2xl mr-3">
                  VMate Classes
                </font>
              </div>
            </div>
            <div className="bg-gray-900 h-full flex justify-center items-center ">
              <font className="text-red-600 font-semibold text-2xl">
                No Classes Found
              </font>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="h-screen w-full bg-gray-900">
          <div className="flex flex-col justify-start items-center w-full ">
            <div className="w-full h-12 bg-gray-600">
              <div className="flex items-center justify-center">
                <h1 className="text-blue-400 xl:text-4xl font-extrabold sm:text-xl">
                  VMate
                </h1>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start w-full p-8 overflow-y-scroll">
              <h2 className="text-gray-100 font-semibold lg:text-2xl text-xl mb-4">
                Classes Registered
              </h2>
               <div className="overflow-y-scroll w-full">
                {this.state.classesIn.map((classDetails) => (
                  <div
                    key={classDetails.id}
                    className="h-14 bg-gray-700 mt-4 p-3 rounded-md border-2 border-gray-600"
                  >
                    <div className="flex flex-row justify-between items-center">
                      <div>
                        <font className="text-gray-100 text-xl">
                          {classDetails.facultyname}
                        </font>
                        <font className="text-gray-100 text-xl ml-6">
                          {classDetails.buildingname}
                        </font>
                        <font className="text-gray-100 text-xl ml-6">
                          {classDetails.time}
                        </font>
                      </div>

                      <div className="flex justify-end items-center">
                        <button
                          onClick={this.handleDelete(classDetails.id)}
                          className="text-blue-500 block ml-5"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div></div>
          </div>
        </div>
      );
    }
  }
}

export default TimeTable;
