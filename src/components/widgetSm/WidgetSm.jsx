import { Visibility } from '@mui/icons-material'
import { useEffect } from 'react';
import { useState } from 'react';
import './widgetSm.css'
import {userRequest} from '../../requestMethod'
import { CircularProgress } from '@mui/material';

export default function WidgetSm() {
  const [users,setUsers]=useState([]);

  useEffect(()=>{
    const getUsers=async()=>{
      // console.log('yash');
      try {
        // const res=await userRequest.get('users/?new=true');
        const res=await userRequest.get('users/');
        setUsers(res.data);
        // console.log(res.data)
      } catch (error) { console.log(error) }
    }
    getUsers();
  },[]);
  console.log(users)

  return (
    <div className='widgetSm'>
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.length===0 &&  <CircularProgress/> }
        {users.length && users.map(user=>(
        <li className="widgetSmListItem" key={user._id} >
          <img
            src={user.avatar}
            alt=""
            className="widgetSmImg"
            style={{objectFit:'cover'}}
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
            <span className="widgetSmUserTitle">Entertainer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))
        }

      </ul>
    </div>
  )
}
