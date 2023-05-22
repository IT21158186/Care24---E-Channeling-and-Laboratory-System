import React, { Component } from 'react';
import { QrReader as QrReader } from 'react-qr-reader';
import axios from "axios";
import Swal from "sweetalert2";


class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      qrData: '',
      employeeId: '',
      name: "",
      status: "",
      time_in: "",
      time_out: "",
      time_type: "",
      currentTime: "",
      currentDate: "",

    };

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.getFormattedDateTime();
  }

  getFormattedDateTime() {
    const dateString = new Date();
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    //const seconds = dateObject.getSeconds();

    this.state.currentDate = `${year}-${month}-${day}`;
    this.state.currentTime = `${hours}:${minutes}`;
    console.log(this.state.currentTime)
    console.log(this.state.currentDate);
    //console.log(formattedTime);
  }


  handleChange(e) {
    this.setState({ inputValue: e.target.value });

    // Submit the form after a delay
    setTimeout(() => {
      this.submitForm();
    }, 3000);
  }

  submitForm() {
    // form submission logic goes here
    console.log('Form submitted!', this.state.inputValue);
  }

  handleScan = (data) => {
    if (data) {
      this.setState({
        qrData: data,
      });
    }
  }

  handleError = (error) => {
    console.error(error);
  }

  handleDecode = (result) => {
    if (result) {
      this.setState({
        qrData: result.text, // access text property only
      });
    }
  }

  refreshPage = () => {
    window.location.reload();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.time_type === "Time In") {
      // const newAttendance = {
      //   //name: this.state.name,
      //   employeeId: this.state.qrData,
      //   status: "Present",
      //   date: this.state.currentDate,
      //   time_in: this.state.currentTime,
      //   time_out: "-", //"-"

      // };
      // axios
      //   .post("http://localhost:4500/attendance/add", newAttendance)
      //   .then(() => {
      //     Swal.fire({
      //       icon: "success",
      //       title: "Marked Successfully!",
      //       confirmButtonText: "OK",
      //       onConfirm: () => {
  
      //       },
      //     }).then()
      //   })
      //   .catch((error) => {
      //     alert(error);
      //   });
      const newQrin = {
        status: "Present",
        date: this.state.currentDate,
        time_in: this.state.currentTime,
      }
      axios.put(`http://localhost:4500/attendance/updateAttendance/in/${this.state.qrData}`, newQrin).then(
        Swal.fire({
          icon: "success",
          title: "Marked Successfully!",
          confirmButtonText: "OK",
          onConfirm: () => {

          },
        })).then()
      .catch((error) => {
        alert(error)
      });
    } else if (this.state.time_type === "Time Out") {
      // alert("Time Out if");
      const newQrout = {
        date: this.state.currentDate,
        time_out: this.state.currentTime,
      }
      axios.put(`http://localhost:4500/attendance/updateAttendance/out/${this.state.qrData}`, newQrout).then(() => {
        Swal.fire({
          icon: "success",
          title: "Marked Successfully!",
          confirmButtonText: "OK",
          onConfirm: () => {

          },
        }).then()
      }).catch((error) => {
        alert(error)
      });


    } else {
      Swal.fire({
        icon: "error",
        title: "Error, Please select what's your clock !",
        confirmButtonText: "OK",
        onConfirm: () => {


        },
      });

    }

  };


  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  // };
  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    })
  }

  

  render() {
    const { qrData } = this.state;

    return (
      <div className="dashboard-app container">
        <div width="100%" height="auto">
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          onResult={this.handleDecode}
        />
        </div>
        <br /><br />

        <form className="" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="time_type">Clock-in / Clock-out : </label>&nbsp;
            <select id="time_type" onChange={(e) => { this.setState({ time_type: e.target.value }); }}>
              <option value="" >Not Selected</option>
              <option value="Time In" >Time In</option>
              <option value="Time Out">Time Out</option>
            </select>
          </div>
          <div className="">
            <label className="visually-hidden" for="autoSizingInput">ID</label>
            <input type="text" className="form-control" id="employeeId" placeholder="Please place the QR code" name="employeeId" value={qrData} onChange={this.handleChange} disabled style={{
              color: '#000000', // Change the text color
              backgroundColor: '#f2f2f2', // Change the background color
            }} />
          </div>

          <br /><br />

          <div className="">
            <button type="submit" className="btn btn-primary" style={{padding:'10px', width: '150px'}}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}




export default Attendance;