import React, { useState } from 'react'
import { Nav, Navbar, Container,Button,Dropdown,Form } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'

function SearchBox() {

  const [search, setsearch] = useState('')
  const navigate=useNavigate()

  const submitHandler=(e)=>{
    e.preventDefault()
    navigate('/search/item='+search)
    setsearch('')
  }

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Control
        type='text'
        value={search}
        onChange={(element)=>setsearch(element.target.value)}
        style={{width:'60%',display:'inline'}}
        ></Form.Control>
    <Button type='submit' variant='primary' className='mx-2' style={{display:'inline'}}>Search</Button>
      </Form>
    </>
  )
}

export default SearchBox