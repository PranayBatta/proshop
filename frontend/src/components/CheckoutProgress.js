import React from 'react'
import { Link } from 'react-router-dom'
import {Row,Col,Container,ListGroup,Image,Form,Button, Card,FormContainer} from 'react-bootstrap'

function CheckoutProgress({progress}) {
  return (
      <>
      <Container>
          <Row className='my-3'>
              <Col md={3} style={{textAlign:'center'}} > <Link className='mx-4' to='/cart/' style={{textDecoration:'none', fontWeight: progress>0?'900':'100',fontSize:'20px'}}>Cart</Link></Col>
              <Col md={3} style={{textAlign:'center'}} > <Link className='mx-4' to='/checkout/' style={{textDecoration:'none',fontWeight: progress>1?'900':'100',fontSize:'20px'}}>Checkout</Link></Col>
              <Col md={3} style={{textAlign:'center'}} >  <Link className='mx-4' to='/payment/' style={{textDecoration:'none',fontWeight: progress>2?'900':'100',fontSize:'20px'}}>Payment</Link></Col>
              <Col md={3} style={{textAlign:'center'}} > <Link className='mx-4' to='/placeOrder' style={{textDecoration:'none',fontWeight: progress>3?'900':'100',fontSize:'20px'}}>Confirm Order</Link></Col>
          </Row>

        <div className="line my-2" style={{height:'6px', width:`${progress*25}%`, backgroundColor:'black',borderRadius:'50px'}}></div>
        </Container>
      </>
  )
}

export default CheckoutProgress