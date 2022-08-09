import React from 'react'
import {Row,Col,Container,ListGroup,Image,Form,Button, Card,Alert} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions } from '../store'
import { store } from '../store/store'
import { useEffect } from 'react'
import CheckoutProgress from '../components/CheckoutProgress'

function Cart() {

    const {userInfo}=useSelector(state=>state.user)
    const {message}=useSelector(state=>state.message)
    const {UserError}=useSelector(state=>state.UserError)
    const dispatch=useDispatch();


    useEffect(() => {
        const loadCart=()=>{dispatch(actions.loadcart(userInfo.token))}
        loadCart()
        
    }, [])

    
    let cart=useSelector(state=>state.cart)
    cart=cart['cart']

    if (cart===undefined){
        cart=[]
    }
    

  return (

    <Container>
    {userInfo.token?
        <Row>
            {cart.length===0?<h1 className='my-3'>Your cart is empty</h1>:
            <>
            <CheckoutProgress progress={1}/>
            <Col md={8}>
                
                
                <Row>
                    <Col>
                        <h1>Your Cart</h1>
                    </Col>
                    <Col>
                    {UserError?(UserError==='Please Add Your Cart')?<Alert style={{textAlign:'center'}} variant='danger'>{UserError}</Alert>:'':''}
                    </Col>
                </Row>
                
                <ListGroup variant='flush'>
                    {cart.map(e=>(
                        <ListGroup.Item key={e.item._id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={`http://127.0.0.1:8000${e.item.image}`} fluid/>
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${e.id}`} style={{textDecoration:'none'}}>{e.item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${e.item.price}
                                </Col>
                                <Col md={3}>
                                    <Form.Control as="select" value={e.quantity} onChange={(element)=>dispatch(actions.addtocart(e.item._id,(element.target.value),userInfo.token))}>
                                        {
                                            (e.arryOfStock).map((x)=>(
                                                <option key={x} value={x}>
                                                    {x}
                                                </option>
                                            ))
                                            
                                        }
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button style={{color:'white'}} onClick={()=>dispatch(actions.removefromcart(e.item._id,userInfo.token))}>Delete</Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                

            </Col>
           
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                    <ListGroup.Item variant='flush'>
                        
                        <h2>{cart.reduce((sum,e)=>sum+parseInt(e.quantity),0)/*Means iterate through cart as item and take variable sum whole initail value will be 0*/ } Items</h2>
                        
                        <>Subtotal: ${cart.reduce((sum,e)=>sum+e.quantity*e.item.price,0).toFixed(2) /*Means answer fixed to 2 decimal places*/ }</>
                    </ListGroup.Item>
                    </ListGroup>
                    
                    <ListGroup.Item>
                        <Row>
                            <Button><Link to='/checkout' style={{color:'white',textDecoration:'none'}}>Checkout</Link></Button>
                        </Row>
                    </ListGroup.Item>
                </Card>
                {message?<Alert style={{textAlign:'center'}} variant='success'>{message}</Alert>:''}
            </Col>
            </>}
        </Row>
            :<h1 className='my-3'>Please Login</h1>}
        </Container>
    
  )
}

export default Cart