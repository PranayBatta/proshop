import React from 'react'
import { useParams } from 'react-router-dom'
import {Form, Button,Container} from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { actions } from '../store'
import {useNavigate} from 'react-router-dom'
import { store } from '../store/store'

function EditUser() {
  const {id} =useParams()
  const {GetUser}=useSelector(state=>state.GetUser)
  const {userInfo}=useSelector(state=>state.user)
  const dispatch=useDispatch();
    const [email, setemail] = useState('')
    const [username, setusername] = useState('')
    const [admin, setadmin] = useState('False')
    const navigate=useNavigate()


    const setInitials=()=>{
      setusername(GetUser.username)
      setemail(GetUser.email)
      if(GetUser.is_superuser===true)setadmin('True')
    }

    useEffect(() => {
      if(GetUser.id=='' || GetUser.id!=id){
      const getUser=()=>{dispatch(actions.getUser(userInfo.token,id))}
      getUser()
      }
      else{
        setInitials()
      }
      
  }, [GetUser, id])
    

    const submithandler=(e)=>{
        e.preventDefault() 
        const EditUser=()=>{dispatch(actions.editUser(userInfo.token,id,username,email,admin))}
        EditUser()
        navigate('/users')
    }

    const toggleAdmin=()=>{
      if(admin==='True')setadmin('False')
      else setadmin('True')
  }
  return (
    <>
    <Container className='my-5'>

    
<h1>Edit User</h1>
<Form onSubmit={submithandler}>
    <Form.Group controlId='email'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
        type='text'
        value={username}
        onChange={(element)=>setusername(element.target.value)}
        ></Form.Control>
    </Form.Group>

    <Form.Group controlId='Email' className='my-3'>
        <Form.Label>Email:</Form.Label>
        <Form.Control
        type='email'
        value={email}
        onChange={(element)=>setemail(element.target.value)}
        ></Form.Control>
    </Form.Group>
    <Form.Check 
        type='checkbox'
        label='Admin Status'
        onChange={()=>{toggleAdmin()}}
        checked={admin==='True'}
      />
    <Button type='submit' variant='primary' className='my-3'>Edit User</Button>
</Form>
</Container>
    </>
  )
}

export default EditUser