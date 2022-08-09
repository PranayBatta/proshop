import React from 'react'
import {Row,Col,Container,ListGroup,Image,Form,Button, Card,FormContainer, ListGroupItem} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions } from '../store'
import { store } from '../store/store'
import { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'
import CheckoutProgress from '../components/CheckoutProgress'



function PlaceOrder() {
    const {userInfo}=useSelector(state=>state.user)
    const dispatch=useDispatch();

    const navigate=useNavigate()
    const {paymentMethod}=useSelector(state=>state.paymentMethod)
    let cart=useSelector(state=>state.cart)
    cart=cart['cart']

    if (cart===undefined){
        cart=[]
    }
    
    const {address}=useSelector(state=>state.address)
    var totalPrice=cart.reduce((sum,item)=>sum+item.item.price*item.quantity,0).toFixed(2)
    var ShippingCost=(totalPrice>100?0:20).toFixed(2)
    var Tax=(0.05*totalPrice).toFixed(2)
    var total=(Number(totalPrice)+Number(ShippingCost)+Number(Tax)).toFixed(2)

    useEffect(() => {
        if(!cart[0]){
            const setError=()=>{dispatch(actions.SetError("Please Add Your Cart"))}
            setError()
            navigate('/cart')
        }
        else if(!address.address || address.address.address===''){
            const setError=()=>{dispatch(actions.SetError("Please Select Your Shipping Address"))}
            setError()  
            navigate('/checkout')
        }
        else if(paymentMethod!='Online Banking' && paymentMethod!='Cash On Delivery' && paymentMethod!='UPI' && paymentMethod!='Card'){
            const setError=()=>{dispatch(actions.SetError("Please Select Your Payment Method"))}
            setError()
            navigate('/payment')
        }
    }, [])
    
    const SubmitHandler=()=>{
        const placeOrder=()=>{dispatch(actions.placeOrder(userInfo.token,cart,address,paymentMethod,Tax,ShippingCost,total))}
        placeOrder()
        navigate('/orders/')
    }

  return (
    <>
    <CheckoutProgress progress={4}/>
    <Container>
        <Row>
            <Col md={8}>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>Shipping Address</h2>
                        <p>
                            <strong>Shipping:</strong>
                            {address.address}, {address.city}, {address.country}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method:</strong>
                            {paymentMethod}
                        </p>
                    </ListGroup.Item>
                    <ListGroup className='my-3'>
                        <h2>Order Items</h2>
                        {cart.map(e=>(
                            <ListGroup.Item key={e.item._id}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={`http://127.0.0.1:8000${e.item.image}`} fluid rounded/>
                                    </Col>
                                    <Col md={7}>
                                        <Link to={`/product/${e.item._id}/`} style={{textDecoration:'none'}}>{e.item.name}</Link>
                                    </Col>
                                    <Col md={2}>
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
                                <Col>Shipping:</Col><Col>${ShippingCost}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col><Col>${Tax}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col><Col>${total}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                            <Button onClick={SubmitHandler} style={{color:'white',textDecoration:'none'}}>Place Order</Button>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>

                </Card>
            </Col>
        </Row>
        </Container>
    </>
  )
}

export default PlaceOrder