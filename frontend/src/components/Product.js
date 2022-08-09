import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function product({product}) {

  return (
      <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={`http://127.0.0.1:8000${product.image}`}/>
        </Link>
          <Card.Body>
            <Card.Text style={{textDecoration:"none"}}>
              <strong>{product.name}</strong>
            </Card.Text>
            <Card.Text as='div'>
              <div style={{textDecoration:"none"}}>
                  {product.rating} from {product.numReviews} reviews
              </div>
            </Card.Text>
            
          </Card.Body>
        
        <Card.Title as='h2' className='my-4'>
              <strong>${product.price}</strong>
            </Card.Title>
      </Card> 
  )
}
