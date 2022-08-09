import React from 'react'
import Product from '../components/Product'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Row,Col,Container,Alert} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../store'
import Loader from '../components/Loader'

function Home() {

    const dispatch=useDispatch();

    useEffect(() => {
    
        dispatch(actions.listProducts)
        
    }, [])
    
    

    const {products}=useSelector(state=>state.productList) //productList is the name of reducer which returns {products=[]}
    const {loading} =useSelector(state=>state.loader)
    const {error} =useSelector(state=>state.error)
    const {message} =useSelector(state=>state.message)
  return (
      <>
    {message?<Alert style={{textAlign:'center'}} variant='success'>{message}</Alert>:''}
      <Container className='p-5'>
          
          {loading? <Loader/>: error?<h1>{error}</h1>:<>
          
          <h1>Latest Products</h1>
        
        <Row>
            {
                products.map(product=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))
            }
        </Row>
    </>
    }
      </Container>
      </>
  )
}

export default Home