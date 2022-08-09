import React from 'react'
import Product from '../components/Product'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Row,Col,Container,Alert} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../store'
import Loader from '../components/Loader'
import InfiniteScroll from 'react-infinite-scroll-component';

function SearchResults() {
    const {item} =useParams()

    const dispatch=useDispatch();

    useEffect(() => {
    
        const getResults=()=>{dispatch(actions.getResults(item))}
        getResults()
        
    }, [item])
    
    

    const {searchProducts}=useSelector(state=>state.productList) //productList is the name of reducer which returns {products=[]}
    const {loading} =useSelector(state=>state.loader)
    const {error} =useSelector(state=>state.error)
    const {message} =useSelector(state=>state.message)
    if(searchProducts===undefined)return(<>No Results</>)
    else{
  return (
      <>
    {message?<Alert style={{textAlign:'center'}} variant='success'>{message}</Alert>:''}
      <Container className='p-5'>
          
          {loading? <Loader/>: error?<h1>{error}</h1>:<>
          {searchProducts.length===0?
          <>
            <h1>No Products to Display</h1>
          </>:
          <>
          <h1>Search Results</h1>
        
          <Row>
            {
                searchProducts.map(product=>(
                  
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                   
                ))
            }
             </Row>
        </>
    }
    </>
    }
      </Container>
      </>
  )
}
}

export default SearchResults