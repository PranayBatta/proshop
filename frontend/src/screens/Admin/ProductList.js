import React from 'react'
import {Row,Col,Container,ListGroup,Image,Form,Button, Card,FormContainer, ListGroupItem, Alert,Table} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions } from '../../store'
import { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'

function ProductList() {

    const {userInfo}=useSelector(state=>state.user)
    const [mode, setmode] = useState('')
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const {message}=useSelector(state=>state.message)
  const {UserError}=useSelector(state=>state.UserError)
    useEffect(() => {
        if(userInfo.token===undefined || !userInfo.is_superuser) navigate('/')
        dispatch(actions.listProducts)
    }, [])
    const {products}=useSelector(state=>state.productList)
    if(!products){
            return (
                <div>Users</div>
            )
        }
        else{

            const DeleteHandler=(id)=>{
                const deleteProduct=()=>{dispatch(actions.deleteProduct(userInfo.token,id))}
                deleteProduct()
            }
            return (
                <>
                <Container>
                {products.length===0?<h1 className='my-3'>No Products</h1>:
                <>  <Row>
                    <Col><h1 className='my-4'>Products:</h1></Col>
                    <Col>{message?<Alert style={{textAlign:'center'}} variant='success'>{message}</Alert>:
           UserError?(UserError==='Please Select Your Shipping Address')?<Alert style={{textAlign:'center'}} variant='danger'>{UserError}</Alert>:'':''
          }</Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                    <Link to='/createProduct'><Button>New Product</Button></Link>
                    </Col>
                </Row>
                    
                    <Table striped hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Count in Stock</th>
                                <th>Added On</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(product=>(
                                    
                                    <tr key={product._id}>
                                        
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>${product.price}</td>
                                        <td>{product.countInStock}</td>
                                        <td>{(product.createdAt).slice(0,10)}</td>
                                        <td><Button onClick={()=>{navigate('/editProduct/'+product._id)}}>Edit</Button></td>
                                        
                                        <th>{mode===`Confirm${product._id}`?<>

                                        <Button onClick={()=>{DeleteHandler(product._id)}} className='mx-2'>Yes</Button>
                                        <Button onClick={()=>{setmode(`Delete${product._id}`)}}>No</Button>
                                        </>
                                                                            
                                            :<Button onClick={()=>{setmode(`Confirm${product._id}`)}}>Delete</Button>}</th>
                                    </tr>
                                    
                                ))
                            }
                        </tbody>
                    </Table>
                </>
        }
        </Container>
                </>
            )
        }
}

export default ProductList