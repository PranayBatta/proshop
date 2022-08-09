import React from 'react'
import {Row,Col,Container,ListGroup,Image,Form,Button, Card,FormContainer, ListGroupItem, Alert} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions } from '../store'
import { store } from '../store/store'
import { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'

import { useParams } from 'react-router-dom'

function Order() {
    const {id} =useParams()
    const {userInfo}=useSelector(state=>state.user)
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const [mode, setmode] = useState('none')
    const {message}=useSelector(state=>state.message)

    const{orderInfo}=useSelector(state=>state.orderInfo)

    useEffect(() => {
        const getOrder=()=>{dispatch(actions.getOrder(userInfo.token,id))}
        getOrder()
    }, [])

    const handlerCancel=()=>{
        const cancelOrder=()=>{dispatch(actions.cancelOrder(userInfo.token,id))}
        cancelOrder()
        navigate('/admin/orders')
    }
    if(orderInfo===undefined){
        return (
            <>
            No Order of this ID
            </>
        )
    }
    else{
        console.log(orderInfo)
        const address=orderInfo.order.shippingAddress
        const paymentMethod=orderInfo.order.paymentMethod
        const cart=orderInfo.items
        const user=orderInfo.order.user
        var totalPrice=cart.reduce((sum,item)=>sum+item.item.price*item.quantity,0).toFixed(2)
        return (
            <>
            <Container className='my-3'>
                <Row>
                    <Col md={8}>
                        <ListGroup>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p> 
                                    <strong>Username:</strong>
                                    {user.username}
                                    <br />
                                    <strong>Email:</strong>
                                    {user.email}
                                    <br />
                                    <strong>Address:</strong>
                                    {address.address}, {address.city}, {address.country}
                                </p>
                         
                                    <Row>
                                        <Alert variant={orderInfo.order.isDelivered?'success':'danger'}>
                                                {orderInfo.order.isDelivered?<>Delivered At {(orderInfo.order.deliveredAt).slice(11,19)} on {(orderInfo.order.deliveredAt).slice(0,10)}</>:<>Not Delivered</>}
                                        </Alert>
                                    </Row>
                                    
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method:</strong>
                                    {paymentMethod}
                                </p>
                                <Row>
                                        <Alert variant={orderInfo.order.isPaid?'success':'danger'}>
                                                {orderInfo.order.isPaid?<>Delivered At {(orderInfo.order.paidAt).slice(11,19)} on {(orderInfo.order.paidAt).slice(0,10)}</>:<>Not Paid</>}
                                        </Alert>
                                    </Row>
                            </ListGroup.Item>
                            <ListGroup className='my-4'>
                                <h2>Order Items</h2>
                                {cart.map(e=>(
                                    <ListGroup.Item key={e.item._id}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={`http://127.0.0.1:8000${e.item.image}`} fluid rounded/>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${e.item._id}/`} style={{textDecoration:'none'}}>{e.item.name}</Link>
                                            </Col>
                                            <Col>
                                                $ {e.item.price}
                                            </Col>
                                            <Col>
                                                {e.quantity}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
        
        
                        </ListGroup>
                    </Col>
        
                    <Col md={4}>
                        <Card>
                            <ListGroup>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Item:</Col><Col>${totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping:</Col><Col>${orderInfo.order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax:</Col><Col>${orderInfo.order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total:</Col><Col>${orderInfo.order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                {!orderInfo.order.isDelivered?
                                <>
                                <ListGroup.Item>
                                    <Row>
                                        <Button onClick={()=>{setmode('block')}}>Cancel Order</Button>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item style={{display:mode}}>
                                    <Row>
                                        <Col md={7}>
                                            Sure you want to cancel the order?
                                        </Col>
                                        <Col md={2}>
                                        <Button onClick={handlerCancel}>Yes</Button>
                                        </Col>
                                        <Col className='mx-3' md={2}>
                                        <Button onClick={()=>{setmode('none')}}>No</Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {userInfo.is_superuser && !orderInfo.order.isDelivered?<ListGroup.Item>
                                    <Row>
                                        <Button onClick={()=>{dispatch(actions.Setdelivered(userInfo.token,orderInfo.order._id))}}>Set Delivered</Button>
                                    </Row>
                                </ListGroup.Item>:''}
                                </>
                                
                                
                                
                                :
                                <>
                                {(orderInfo.order.isPaid)?'':
                                <>
                                {userInfo.is_superuser?
                                <ListGroup.Item>
                                <Row>
                                <Button onClick={()=>{dispatch(actions.Setpaid(userInfo.token,orderInfo.order._id))}}>Set Paid</Button>
                                </Row>
                                </ListGroup.Item>
                                :''}
                                
                                </>
                                }
                                {userInfo.username===orderInfo.order.user.username?<ListGroup.Item>
                                    <Row>
                                        <Button>Return Order</Button>
                                    </Row>
                                </ListGroup.Item>:''}
                                </>
                                }
                                
                            </ListGroup>
                            </Card>
                                <Container className='my-2'>
                                    {message?<Alert variant='success' style={{textAlign:'center'}}>
                                    {message}
                                </Alert>:''}
                                
                                </Container>
        
                        
                    </Col>
                </Row>
                </Container>
            </>
          )
    }
   
  
}

export default Order