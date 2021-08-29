import { Component } from "react";
import "./index.css";
import {HashLoader} from 'react-spinners';
import apiLink from "./api";
import { Link } from "react-router-dom";

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
    loading: false,
      courses: [],
    };
    fetch(apiLink+"courses")
    .catch(error => console.log(error))
    .then(response => response.json())
    .then(data => {
        this.setState({
            courses: data,
            loading: false
        });
        console.log(data);
    });
  }

  render() {
    if (this.state.loading || this.state.courses.length === 0) {
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
                Courses
              </h2>
              <div className="overflow-y-scroll w-full">
                {this.state.courses.map((course) => (
                  <div
                    key={course.id}
                    className="h-14 bg-gray-700 mt-4 p-3 rounded-md border-2 border-gray-600"
                  >
                    <div className="flex flex-row justify-between items-center">
                      <div>
                        <font className="text-gray-100 text-xl">
                          {course.id}
                        </font>
                        <font className="text-gray-100 text-xl ml-6">
                          {course.name}
                        </font>
                      </div>

                      <div className="flex justify-end items-center">
                        <Link to={{
                            pathname:"/class",
                        state:{
                            course: course.id,
                        }
                    }}className="text-blue-500 block">
                          Classes
                        </Link>
                        <Link to={{
                            pathname:"/map",
                        state:{
                            course: course.id,
                        }
                    }} className="text-blue-500 block ml-5">
                          See in Map
                        </Link>
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

export default Courses;
