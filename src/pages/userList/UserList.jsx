import './userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userRows } from "../../dummyData";
import { userRequest } from '../../requestMethod';
import { CircularProgress } from '@mui/material';


export default function UserList() {
    const [data, setData] = useState(userRows);
    const [users,setUsers]=useState([]);
    const handleDelete = (id) => {
      setData(data.filter((item) => item.id !== id));
    };

    useEffect(()=>{//we can fetch users here or fetch through apicalls and store in redux
      const getUsers=async()=>{
        // console.log('yash');
        try {
          const res=await userRequest.get('users/');
          setUsers(res.data);
          // console.log(res.data)
        } catch (error) { console.log(error) }
      }
      getUsers();
    },[]);
    console.log('list')
    console.log(users);

    const columns = [
      { field: "_id", headerName: "ID", width: 200 },
      {
        field: "user",
        headerName: "User",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="userListUser">
              <img className="userListImg" src={params.row.avatar} alt="" />
              {params.row.username}
            </div>
          );
        },
      },
      { field: "email", headerName: "Email", width: 200 },
      {
        field: "status",
        headerName: "Status",
        width: 120,
        renderCell:()=>{
          return(
            <div>Active</div>
          )
        }
      },
      {
        field: "transaction",
        headerName: "Transaction Volume",
        width: 160,
      },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
          return (
            <>
              <Link to={"/user/" + params.row._id}>
                <button className="userListEdit">Edit</button>
              </Link>
              <DeleteOutline
                className="userListDelete"
                onClick={() => handleDelete(params.row.id)}
              />
            </>
          );
        },
      },
    ];
  
    return (
      <div className="userList">
        <Link to="/newUser"> 
            <button className="userAddButton">Create</button>
        </Link>
        {users.length===0 && <CircularProgress/>}
        {users.length &&
        <DataGrid
          rows={users}
          getRowId={row=>row._id}
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          checkboxSelection
        /> }
      </div>
    );
  }