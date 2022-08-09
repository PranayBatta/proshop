import React from 'react'
import {Row,Col,Container,ListGroup,Image,Form,Button, Card,FormContainer,Alert} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions } from '../store'
import { store } from '../store/store'
import { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'
import CheckoutProgress from '../components/CheckoutProgress'



function Payment() {
    const {userInfo}=useSelector(state=>state.user)
  const dispatch=useDispatch();
    const [payment, setpayment] = useState('')
    const navigate=useNavigate()
    let cart=useSelector(state=>state.cart)
    cart=cart['cart']

    if (cart===undefined){
        cart=[]
    }
    
    const {address}=useSelector(state=>state.address)
    const {UserError}=useSelector(state=>state.UserError)
    const SubmitHandler=()=>{
        const setPayment=()=>{dispatch(actions.setPayment(payment))}
        setPayment()
        navigate("/placeOrder")   
      }

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
    }, [])

  return (
    <>
    <CheckoutProgress progress={3}/>
    <Container>
      <Row>
        <Col>
        <h1 className='my-4'>
        Select Your Payment Method
        </h1>
        </Col>
        <Col>
        {UserError?(UserError==='Please Select Your Payment Method')?<Alert style={{textAlign:'center'}} variant='danger'>{UserError}</Alert>:'':''}
        </Col>
      </Row>
    
    <Form onSubmit={SubmitHandler}>
                            <Form.Group>
                                <Form.Check
                                required
                                type='radio'
                                label="Online Banking"
                                name='paymentMethod'
                                value='Online Banking'
                                onChange={(e)=>setpayment(e.target.value)}
                                >
                                </Form.Check>

                            <Form.Check
                                required
                                type='radio'
                                label="UPI"
                                value="UPI"
                                name='paymentMethod'
                                onChange={(e)=>setpayment(e.target.value)}
                                >
                                </Form.Check>

                                <Form.Check
                                required
                                type='radio'
                                label="Card"
                                value="Card"
                                name='paymentMethod'
                                onChange={(e)=>setpayment(e.target.value)}
                                >
                                </Form.Check>

                                <Form.Check
                                required
                                type='radio'
                                label="Cash On Delivery"
                                value="Cash On Delivery"
                                name='paymentMethod'
                                onChange={(e)=>setpayment(e.target.value)}
                                >
                                </Form.Check>
                                
                            </Form.Group>

                            <Row>
                            <Button type='submit' variant='primary' className='my-3'>Make Payment</Button>
                            </Row>
                        </Form>
                        </Container>
    </>
  )
}

export default Payment