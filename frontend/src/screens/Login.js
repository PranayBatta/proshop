import React from 'react'
import {Form, Button,Container} from 'react-bootstrap'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { actions } from '../store'
import {useNavigate} from 'react-router-dom'


function Login() {
    const dispatch=useDispatch();
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const navigate=useNavigate()

    const submithandler=(e)=>{
        e.preventDefault()
        const loginUser=()=>{dispatch(actions.UserLogin(email,password))}
        loginUser()
        navigate("/")        
    }

  return (
    <> 
     <Container className='my-5'>

    
        <h1>Log In</h1>
        <Form onSubmit={submithandler}>
            <Form.Group controlId='email'>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                type='text'
                placeholder='Username'
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

            <Button type='submit' variant='primary' className='my-3'>Log In</Button>
        </Form>
        </Container>
    </>
  )
}

export default Login