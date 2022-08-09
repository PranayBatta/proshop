import React from 'react'
import {Form, Button,Container} from 'react-bootstrap'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { actions } from '../store'
import {useNavigate} from 'react-router-dom'

function Signup() {
  const dispatch=useDispatch();
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [Cpassword, setCpassword] = useState('')
    const navigate=useNavigate()

    const submithandler=(e)=>{
      e.preventDefault()
      const SignUpUser=()=>{dispatch(actions.UserSignUp(username,email,password))}
      SignUpUser()
      navigate("/")        
  }

  return (
    <>
        <Container className='my-5'>

    
<h1>Sign Up</h1>
<Form onSubmit={submithandler}>
    <Form.Group controlId='email'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
        type='text'
        placeholder='Username'
        value={username}
        onChange={(element)=>setusername(element.target.value)}
        ></Form.Control>
    </Form.Group>

    <Form.Group controlId='password' className='my-3'>
        <Form.Label>Email:</Form.Label>
        <Form.Control
        type='email'
        value={email}
        onChange={(element)=>setemail(element.target.value)}
        ></Form.Control>
    </Form.Group>

    <Form.Group controlId='password' className='my-3'>
        <Form.Label>Password:</Form.Label>
        <Form.Control
        type='password'
        value={password}
        onChange={(element)=>setpassword(element.target.value)}
        ></Form.Control>
    </Form.Group>

    <Form.Group controlId='password' className='my-3'>
        <Form.Label> Confirm Password:</Form.Label>
        <Form.Control
        type='password'
        value={Cpassword}
        onChange={(element)=>setCpassword(element.target.value)}
        ></Form.Control>
    </Form.Group>

    <Button type='submit' variant='primary' className='my-3'>Sign Up</Button>
</Form>
</Container>
    </>
  )
}

export default Signup