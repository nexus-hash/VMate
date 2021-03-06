import { Component } from "react";
import apiLink from "./api";
import {HashLoader} from 'react-spinners';

class classList extends Component{
  constructor(props)
  {
    super(props);
    this.state = {
      classData: [],
      loading: true,
      class:this.props.location.state.course,
    };
    this.handleAddClass = this.handleAddClass.bind(this);
    fetch(apiLink+"classes/"+this.state.class)
    .catch((err) => console.log(err))
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        classData: data,
        loading: false,
      })
    });
  }

  handleAddClass = (id) => {
    this.setState({
      loading: true,
    })
    fetch(apiLink + "class/" + window.sessionStorage.getItem("username"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        classId: id,
      }),
    })
    .catch((err) => console.log(err))
    .then((res) => res.json())
    .then((data) => {
      if (data.output === "Class Added") {
        alert("Class Added Sucessfully");
      } else if (data.output === "Clash") {
        alert("Class Clash");
      }else{
        alert("Internal Server Error");
      }
      this.setState({
        loading: false,
      })
    });
  }

  render(){
    if (this.state.loading) {
      return(<div>
          <div className="h-screen flex-col justify-start items-center overflow-scroll">
            <div className="bg-gray-600 h-12 w-full">
              <div className="flex justify-center items-center h-12 ">
                <font className="text-blue-500 font-extrabold text-lg lg:text-2xl mr-3">
                  VMate Classes For {this.state.class}
                </font>
              </div>
            </div>
            <div className="bg-gray-900 h-full flex justify-center items-center ">
              <HashLoader color={"#2196f3"} loading={true} size={100} />
            </div>
          </div>
        </div>
      );
    } else if (this.state.classData.length === 0 && !this.state.loading) {
      return (
        <div>
          <div className="h-screen flex-col justify-start items-center overflow-scroll">
            <div className="bg-gray-600 h-12 w-full">
              <div className="flex justify-center items-center h-12 ">
                <font className="text-blue-500 font-extrabold text-lg lg:text-2xl mr-3">
                  VMate Classes For {this.state.courseid}
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
    } else {
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
                Course Code : {this.state.classData[0].coursecode}
              </h2>
              <div className="overflow-y-scroll w-full">
                {this.state.classData.map((classDetails) => (
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
                          onClick={() => this.handleAddClass(classDetails.id)}
                          className="text-blue-500 block ml-5"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default classList;