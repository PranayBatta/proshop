import React from 'react'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import {Row, Col,Image, ListGroup, Button, Card, Container, Form, Alert} from 'react-bootstrap'
import products from '../products'
import { actions } from '../store'
import Loader from '../components/Loader'
import {useNavigate} from 'react-router-dom'

function ProductView() {

    const {id} =useParams()
    const {userInfo}=useSelector(state=>state.user)
    const dispatch=useDispatch();
    const navigate=useNavigate()
    useEffect(() => {
        
        const detailProduct=()=>{dispatch(actions.detailProduct(id))}
        detailProduct()
        const getReviews=()=>{dispatch(actions.getReviews(userInfo.token,id))}
        getReviews()
    }, [])


    const {product}=useSelector(state=>state.detailproduct) //productList is the name of reducer which returns {products=[]}
    const {reviews}=useSelector(state=>state.reviews)
    const [quantityselected, setquantityselected] = useState(1);
    const [rating, setrating] = useState();
    const [comment, setcomment] = useState('');
    const quantity=product.countInStock;
    const quantityarr=[];

    for(var i=1;i<=quantity;i++){
        quantityarr.push(i)
        if(i===10)break
    }

    const addToCartHandler=()=>{
        if(userInfo.token===undefined)navigate('/login/')
        const addCart=()=>{dispatch(actions.addtocart(id,quantityselected,userInfo.token))}
        addCart()
    }

    const submithandler=(e)=>{
        e.preventDefault()
        const addReview=()=>{dispatch(actions.addReview(userInfo.token,id,rating,comment))}
        addReview()
        const detailProduct=()=>{dispatch(actions.detailProduct(id))}
        detailProduct()
        setcomment('')
        setrating('')
    }

    const {loading} =useSelector(state=>state.loader)
    const {error} =useSelector(state=>state.error)
    const {message} =useSelector(state=>state.message)
return (
    <Container>
        <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            
        {loading?<Loader/>:error?<h1>{error}</h1>:
        <>
        <Row>
            <Col md={4} style={{display:'flex',alignItems:'center',justifyContent:"center"}}>
                <Image src={`http://127.0.0.1:8000${product.image}`} fluid></Image>
            </Col>

            <Col className='mx-4' md={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>{product.name}</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h3>{product.rating} from {product.numReviews} reviews</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Price: ${product.price}</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Description: {product.description}
                    </ListGroup.Item>

                </ListGroup>
            </Col>

            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                                <Row>
                                <Col>Price:</Col>
                                <Col><strong>${product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>

                                
                                <Col>Status:</Col>
                                <Col>
                                {product.countInStock>0 ? "In Stock":"Out of Stock"}
                                </Col>
                                </Row>
                            </ListGroup.Item>
                        
                        {quantity>0 && (
                            <ListGroup.Item>
                            <Row>
                                <Col>Quantity:</Col>
                                <Col>
                                    <Form.Control as="select" value={quantityselected} onChange={(element)=>setquantityselected(element.target.value)}>
                                        {
                                            quantityarr.map((x)=>(
                                                <option key={x} value={x}>
                                                    {x}
                                                </option>
                                            ))
                                            
                                        }
                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        )}

                        <ListGroup.Item>
                            <Row>
                                <Button className='btn-block' type='button' disabled={!quantity>0} onClick={addToCartHandler}>Add to Cart</Button>
                            </Row>
                            
                        </ListGroup.Item>
                    </ListGroup>
                    
                </Card>

                {message?<Alert style={{textAlign:'center'}} variant='success'>{message}</Alert>:''}
                
            </Col>
            
        </Row>
        <Row>
            <Col md={8}>
            <Row className='my-4'>
            <h3>Reviews</h3>
            {reviews.length===0?'No Reviews To Display':<>{reviews.map(review=>(
                <ListGroup key={review._id} className='my-2 mx-3'>
                    {review.name} <br/>
                    {review.rating} stars<br/>
                    {review.comment} <br/>
                    {(review.createdAt).slice(0,10)}
                </ListGroup>
            ))}</>}
            
            <h4>Add Review</h4>
            <Form onSubmit={submithandler}>
        <Form.Group controlId='name'>
        <Form.Label>Rating:</Form.Label>
        <Form.Control
        as='select'
        value={rating}
        onChange={(element)=>setrating(element.target.value)}
        >
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </Form.Control>
    </Form.Group>
    
    <Form.Group controlId='name'>
        <Form.Label>Comment:</Form.Label>
        <Form.Control
        as='textarea'
        value={comment}
        onChange={(element)=>setcomment(element.target.value)}
        ></Form.Control>
    </Form.Group>
    <Button type='submit' variant='primary' className='my-3'>Submit Review</Button>
            </Form>
        </Row>
            </Col>
        </Row>
        </>
}
    
    </Container>
  )
}

export default ProductView