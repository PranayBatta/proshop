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

function Checkout() {

  
  const {userInfo}=useSelector(state=>state.user)
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const [address, setaddress] = useState('')
  const [city, setcity] = useState('')
  const [country, setcountry] = useState('')
  const [post, setpost] = useState('')
  const [mode, setmode] = useState('block')
  let cart=useSelector(state=>state.cart)
    cart=cart['cart']
  const {message}=useSelector(state=>state.message)
  const {UserError}=useSelector(state=>state.UserError)
    if (cart===undefined){
        cart=[]
    }

  useEffect(() => {

    if(!cart[0]){
      const setError=()=>{dispatch(actions.SetError("Please Add Your Cart"))}
            setError()
      navigate('/cart')
    }

      const loadAddress=()=>{dispatch(actions.shippingAddress(userInfo.token))}
      loadAddress()

      
  }, [])

  const ClickHandler=(e)=>{
      const SetAddress=()=>{dispatch(actions.set_shippingAddress(e))}
      SetAddress()
      navigate('/payment')
  }


  const SubmitHandler=(e)=>{
    e.preventDefault()
    const CreateAddress=()=>{dispatch(actions.create_shippingAddress(userInfo.token,address,city,country,post))}
      CreateAddress()
      setmode('block')
  }

  let addresses=useSelector(state=>state.address)
    addresses=addresses['addressList']
  return (
    <>
    <CheckoutProgress progress={2}/>
    <Container>
      <Row>
        <Col>
          <h1>Shipping address</h1>
        </Col>
        <Col>
          {message?<Alert style={{textAlign:'center'}} variant='success'>{message}</Alert>:
           UserError?(UserError==='Please Select Your Shipping Address')?<Alert style={{textAlign:'center'}} variant='danger'>{UserError}</Alert>:'':''
          }
        </Col>
      </Row>
    
        <ListGroup variant='flush' style={{display:mode}}>
                    {addresses.map(e=>(
                      <Card key={e._id} onClick={()=>{ClickHandler(e)}}>

                        <ListGroup.Item>
                          
                            <Row>
                              <h3>{e.city},{e.country}</h3>
                            </Row>
                            <Row>
                              <p>{e.address}</p>
                            </Row>
                            
                        </ListGroup.Item>

                        </Card>
                    ))}
        </ListGroup>
        
        <ListGroup.Item>
                        <Row>
                            <Button onClick={()=>{setmode('none')}} style={{display:mode}}>Add New Address</Button>
                        </Row>
                          <Form onSubmit={(e)=>{SubmitHandler(e)}} style={{display:mode==='none'?'block':'none'}}>
                            <Form.Group>
                              <Form.Label>Address</Form.Label>
                              <Form.Control
                              required
                              type='text'
                              placeholder='Enter your Address'
                              value={address}
                              onChange={(e)=>setaddress(e.target.value)}
                              >
                              </Form.Control>
                            </Form.Group>

                            <Form.Group>
                              <Form.Label>City</Form.Label>
                              <Form.Control
                              required
                              type='text'
                              placeholder='Enter your City'
                              value={city}
                              onChange={(e)=>setcity(e.target.value)}
                              >
                              </Form.Control>
                            </Form.Group>

                            <Form.Group>
                              <Form.Label>Country</Form.Label>
                              <Form.Control
                              required
                              type='text'
                              placeholder='Enter your Country'
                              value={country}
                              onChange={(e)=>setcountry(e.target.value)}
                              >
                              </Form.Control>
                            </Form.Group>

                            <Form.Group>
                              <Form.Label>Postal Code</Form.Label>
                              <Form.Control
                              required
                              type='number'
                              placeholder='Enter your Postal Code'
                              value={post}
                              onChange={(e)=>setpost(e.target.value)}
                              >
                              </Form.Control>
                            </Form.Group>
                            <Row>
                            <Button type='submit' variant='primary'>Save Address</Button>
                            </Row>
                          </Form>
        </ListGroup.Item>

    </Container>
    </>
  )
}

export default Checkout