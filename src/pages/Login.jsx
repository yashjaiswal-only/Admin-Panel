import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { login } from '../redux/apiCalls'
import useForceUpdate from 'use-force-update';
import { CleaningServices } from '@mui/icons-material'
import { CircularProgress } from '@mui/material';

const Container=styled.div`
    width:100vw;
    height:100vh;
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
      background-size:cover;
        display: flex;
        align-items: center;
        justify-content: center;
`
const Wrapper=styled.div`
    padding: 20px;
    width:25%;
    background-color:white;
`
const Title=styled.h1`
    font-size: 24px;
    font-weight: 300;

`
const Form=styled.form`
    display: flex;
    flex-direction:column;
`
const Input=styled.input`
    flex:1;
    min-width:40%;
    margin: 10px 0px;
    padding: 10px;
`

const Button=styled.button`
    width:40%;
    border:none;
    padding: 15px 20px;
    margin-right: 10px;
    background-color:teal;
    color:white;
    cursor:pointer;
    &:disabled{
      color:green;
      cursor:not-allowed;
    }
`
const Link=styled.a`
    margin: 10px 0px;
    font-size: 12px;
    text-decoration:underline;
    cursor:pointer
    `

const Box=styled.div`
    display: flex;
`

const Error=styled.span`
    color:red;
  `
const Login = () => {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const {isFetching ,error} =useSelector(state=>state.user?state.user:null) ;
  /* get these redux variables from redux named user */

  const dispatch =useDispatch();
  const navigate=useNavigate();
  const forceUpdate = useForceUpdate();
  const handleClick=e=>{
      e.preventDefault();
      login(dispatch , {username,password});  
      navigate("/");
  }
  return (
    <Container>
      <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
                <Input placeholder="username"  onChange={e=>setUsername(e.target.value)}/>
                <Input placeholder="password" onChange={e=>setPassword(e.target.value)} type='password'/>
                <Box>
                <Button onClick={handleClick} disabled={isFetching} >LOGIN</Button>
                {isFetching && <CircularProgress/>}
                </Box>
                {error && <Error>Something went wrong....</Error>}
                <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login
