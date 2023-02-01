import { useState } from "react";
import "./NewUser.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { register } from "../../redux/apiCalls";

export default function NewUser() {
  const [file,setFile]=useState(null);
  const [inputs,setInputs]=useState({});
  const handleChange=e=>{
    setInputs(prev=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }
  // console.log(inputs)
  console.log(file)
  const handleClick=e=>{
    e.preventDefault();
    const fileName=new Date().getTime()+file.name;  //to make file unique as when any file with same name upload later its gonna overwrite because of same name
    const storage=getStorage(app);
    const storageRef=ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const user = { ...inputs, avatar: downloadURL};
          // console.log(file)
          // console.log(downloadURL)
          // console.log(user)
          register(user);
          
        });
      }
    );
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" >
        <div className="newUserItem">
          <label>Username</label>
          <input name="username" type="text" placeholder="john" onChange={handleChange} required/>
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input name="name" type="text" placeholder="John Smith" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input name="email" type="email" placeholder="john@gmail.com" onChange={handleChange} required/>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input name="password" type="password" placeholder="password" onChange={handleChange} required/>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input name="ph" type="number" placeholder="+1 123 456 78" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input name="address" type="text" placeholder="New York | USA" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="newUserItem">
          <label>Image</label>
          <input type="file" id="file"
           onChange={e=>setFile(e.target.files[0])}/>
        </div>
        <button className="newUserButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}