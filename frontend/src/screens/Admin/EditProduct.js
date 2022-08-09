import React from 'react'
import { useParams } from 'react-router-dom'
import {Form, Button,Container,Row,Col,Image} from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { actions } from '../../store'
import {useNavigate} from 'react-router-dom'

function EditProduct() {
  const {id} =useParams()
  const {product}=useSelector(state=>state.detailproduct)
  const {userInfo}=useSelector(state=>state.user)
  const dispatch=useDispatch();
    const [name, setname] = useState('')
    const [description, setdescription] = useState()
    const [brand, setbrand] = useState('')
    const [category, setcategory] = useState('')
    const [price, setprice] = useState('')
    const [countInStock, setcountInStock] = useState('')
    const [image, setimage] = useState('')
    const [imageUrl, setimageUrl] = useState('')
    const navigate=useNavigate()


    const setInitials=()=>{
      setname(product.name)
      setdescription(product.description)
      setbrand(product.brand)
      setcategory(product.category)
      setprice(product.price)
      setcountInStock(product.countInStock)
      setimageUrl(product.image)
    }

    useEffect(() => {
      if(product.id=='' || product._id!=id){
        const detailProduct=()=>{dispatch(actions.detailProduct(id))}
        detailProduct()
      }
      else{
        setInitials()
      }
      
  }, [product, id])
    

    const submithandler=(e)=>{
        e.preventDefault() 
        const formdata=new FormData()
        formdata.append('name',name)
        formdata.append('description',description)
        formdata.append('brand',brand)
        formdata.append('category',category)
        formdata.append('price',price)
        formdata.append('countInStock',countInStock)
        formdata.append('image',image)
        const EditProduct=()=>{dispatch(actions.editProduct(userInfo.token,id,formdata))}
        EditProduct()
        navigate('/products')
    }

  return (
    <>
    <Container className='my-5'>

    
<h1>Edit Product</h1>
<Form onSubmit={submithandler}>
    <Row>
        <Col md={4}>  
        <Image src={`http://127.0.0.1:8000${product.image}`} fluid className='my-3'></Image>
        <Form.Group controlId='email' className='my-1'>
        <Form.Label>New Image:</Form.Label>
        <Form.Control
        type='file'
        onChange={(e)=>{setimage(e.target.files[0])}}
        ></Form.Control>
    </Form.Group>
        </Col>
        <Col md={8}>
        <Form.Group controlId='email'>
        <Form.Label>Name:</Form.Label>
        <Form.Control
        type='text'
        value={name}
        onChange={(element)=>setname(element.target.value)}
        ></Form.Control>
    </Form.Group>

    <Form.Group controlId='email'>
        <Form.Label>Brand:</Form.Label>
        <Form.Control
        type='text'
        value={brand}
        onChange={(element)=>setbrand(element.target.value)}
        ></Form.Control>
    </Form.Group>

    <Form.Group controlId='email'>
        <Form.Label>Category:</Form.Label>
        <Form.Control
        type='text'
        value={category}
        onChange={(element)=>setcategory(element.target.value)}
        ></Form.Control>
    </Form.Group>

    <Form.Group controlId='email'>
        <Form.Label>Price:</Form.Label>
        <Form.Control
        type='number'
        value={price}
        onChange={(element)=>setprice(element.target.value)}
        ></Form.Control>
    </Form.Group>
    <Form.Group controlId='Email' className='my-3'>
        <Form.Label>Count in Stock:</Form.Label>
        <Form.Control
        type='number'
        value={countInStock}
        onChange={(element)=>setcountInStock(element.target.value)}
        ></Form.Control>
    </Form.Group>
        </Col>
    </Row>
    

    <Form.Group controlId='email'>
        <Form.Label>Description:</Form.Label>
        <Form.Control
        as='textarea'
        value={description}
        onChange={(element)=>setdescription(element.target.value)}
        ></Form.Control>
    </Form.Group>

    
    <Button type='submit' variant='primary' className='my-3'>Edit Product</Button>
</Form>
</Container>
    </>
  )
}

export default EditProduct