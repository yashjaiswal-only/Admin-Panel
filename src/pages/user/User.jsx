import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
  import { Link, useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethod";
import "./User.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateUser } from "../../redux/apiCalls";
  
  export default function User() {
    const location = useLocation();
    const userid=location.pathname.split('/')[2];
    const [user,setUser]=useState();
    const [file,setFile]=useState();

    const [inputs,setInputs]=useState({});
    const handleChange=e=>{
      setInputs(prev=>{
        return {...prev,[e.target.name]:e.target.value}
      })
    }

    useEffect(()=>{
      const getUser=async()=>{
        try {
          const res=await userRequest.get('users/find/'+userid);
          setUser(res.data);
        } catch (error) { console.log(error) }
      }
      getUser();
    },[userid]);
    // console.log(user);


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
            var updateduser = { ...inputs, avatar: downloadURL};
            console.log(downloadURL)
            updateduser=updateUser(userid,updateduser)            
            console.log(updateduser)
          });
        }
      );
    }

    return (
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          <Link to="/newUser"> 
            <button className="userAddButton">Create</button>
          </Link>
        </div>
        {user==null && <CircularProgress/>}
        { user && 
          <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={user.avatar}
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{user.username}</span>
                <span className="userShowUserTitle">{user.destination || "Entertainer"}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{user.dob || "10.12.1999"}</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{user.ph || "+1 123 456 67"}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">New York | USA</span>
              </div>
            </div>
          </div>
          
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    name="username" onChange={handleChange}
                    type="text"
                    placeholder={user.username}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input name="name" onChange={handleChange}
                    type="text"
                    placeholder={user.username}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input name="email" onChange={handleChange}
                    type="text"
                    placeholder={user.email}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input name="ph" onChange={handleChange}
                    type="text"
                    placeholder="+1 123 456 67"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Address</label>
                  <input name="address" onChange={handleChange}
                    type="text"
                    placeholder="New York | USA"
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={user.avatar}
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} onChange={e=>setFile(e.target.files[0])} />
                </div>
                <button className="userUpdateButton" onClick={handleClick}>Update</button>
              </div>
            </form>
          </div>
        </div>
          }
  
      </div>
    );
  }