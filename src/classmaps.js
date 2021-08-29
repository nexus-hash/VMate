import { Tooltip } from "react-leaflet";
import { Component } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import HashLoader from "react-spinners/HashLoader";
import apiLink from "./api";

class mapView extends Component {
  /*

    */
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      courseid: this.props.location.state.course,
    };
    fetch(apiLink + "classes-on-map/" + this.state.courseid)
      .catch((err) => console.log(err))
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          this.setState({
            data: data,
          });
        }, 2500);
      });
  }

  render() {
    if (this.state.data.length === 0) {
      //Showing Loading indicator until Data is Loaded
      return (
        <div>
          <div className="h-screen flex-col justify-start items-center overflow-scroll">
            <div className="bg-gray-600 h-12 w-full">
              <div className="flex justify-center items-center h-12 ">
                <font className="text-blue-500 font-extrabold text-lg lg:text-2xl mr-3">
                  VMate Classes For
                </font>
                <HashLoader color={"#2196f3"} loading={true} size={22} />
              </div>
            </div>
            <div className="bg-gray-900 h-full flex justify-center items-center ">
              <HashLoader color={"#2196f3"} loading={true} size={150} />
            </div>
          </div>
        </div>
      );
    } else {
      //Display Map with Markers after Data is Loaded
      return (
        <div className="h-screen flex-col justify-start items-center overflow-hidden">
          <div className="bg-gray-600 h-12 w-full">
            <div className="flex justify-center items-center h-12  ">
              <text className="text-blue-500 font-extrabold text-lg lg:text-2xl">
                VMate Classes for {this.state.data[0].courseCode}
              </text>
            </div>
          </div>
          <div className="bg-gray-900 h-full overflow-y-scroll ">
            <MapContainer
              center={[12.971790577788005, 79.15940031337333]}
              zoom={16}
              scrollWheelZoom={false}
              className="h-full"
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Parse through each class data and Display Markers for each Class */}
              {this.state.data.map((classData) => (
                <Marker
                  position={[
                    classData.location[0].lat,
                    classData.location[0].lon,
                  ]}
                >
                  <Tooltip>
                    <div className="flex flex-col justify-center items-start">
                      <text>
                        <font className="font-bold">Building:</font>{" "}
                        {classData.building}
                      </text>
                      <text>
                        <font className="font-bold">Course Name:</font>{" "}
                        {classData.course}
                      </text>
                      <text>
                        <font className="font-bold">Faculty:</font>{" "}
                        {classData.faculty}
                      </text>
                      <text>
                        <font className="font-bold">Timings:</font>{" "}
                        {classData.time}
                      </text>
                      <text>
                        <font className="font-bold">Student Registered:</font>{" "}
                        {classData.studentRegistered}
                      </text>
                    </div>
                  </Tooltip>
                </Marker>
              ))}
              {/* End of Markers */}
            </MapContainer>
            {/* End of Map */}
          </div>
        </div>
      );
    }
  }
}

export default mapView;
