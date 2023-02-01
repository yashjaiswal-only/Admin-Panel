import { Language, NotificationsNone, Settings ,Logout} from '@mui/icons-material'
import { Badge ,Box,Avatar,Menu,MenuItem,ListItemIcon,Tooltip,Divider,IconButton} from '@mui/material'
import React from 'react'
import "./Topbar.css"
import { logoutSuccess } from '../../redux/UserRedux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {

     const [anchorEl, setAnchorEl] = React.useState(null);
     const open = Boolean(anchorEl);
     const handleClick = (event) => {
       setAnchorEl(event.currentTarget);
     };
     const dispatch=useDispatch();
     const navigate=useNavigate();
     const handleClose = () => {
          setAnchorEl(null);
          
     };
     const handleLogout=()=>{
          dispatch(logoutSuccess());
          navigate("/");
          //this navigates to / which renders login component when currentuser is null
     }


  return (
    <div className='topbar'>
        <div className="topbarWrapper">
            <div className="topLeft">
                <span className='logo'>Admin</span>
            </div>
            <div className="topRight">
                <div className="topbarIconContainer">
                <Badge badgeContent={4} color="warning"  >
                     <NotificationsNone fontSize='medium'  />
                </Badge>
                     {/* <span className='topIconBadge'>3</span> */}
                </div>
                <div className="topbarIconContainer">
                <Badge badgeContent={4} color="warning"  > 
                     <Language fontSize='medium'  />
                </Badge>
                     {/* <span className='topIconBadge'>2</span> */}
                </div>
                <div className="topbarIconContainer">
                     <Settings fontSize='medium' />
                </div>

     <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Account settings">
               <IconButton
               onClick={handleClick}
               size="small"
               sx={{ ml: 2 }}
               aria-controls={open ? 'account-menu' : undefined}
               aria-haspopup="true"
               aria-expanded={open ? 'true' : undefined}
               >
               <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
               </IconButton>
          </Tooltip>
     </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem >
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
                {/* <img src="https://as2.ftcdn.net/v2/jpg/04/75/00/99/1000_F_475009987_zwsk4c77x3cTpcI3W1C1LU4pOSyPKaqi.jpg" alt="" className="topAvatar" /> */}
            </div>
        </div>
      
    </div>
  )
}
