import React from 'react'
import {Row,Col,Container,ListGroup,Image,Form,Button, Card,FormContainer, ListGroupItem, Alert,Table} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions } from '../store'
import { store } from '../store/store'
import { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Users() {

    const {userInfo}=useSelector(state=>state.user)
    const [mode, setmode] = useState('')
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const {message}=useSelector(state=>state.message)
  const {UserError}=useSelector(state=>state.UserError)
    useEffect(() => {
        if(userInfo.token===undefined || !userInfo.is_superuser) navigate('/')
        const loadUsers=()=>{dispatch(actions.listUsers(userInfo.token))}
        loadUsers()
    }, [])
    const {UsersList}=useSelector(state=>state.UsersList)
    if(!UsersList){
            return (
                <div>Users</div>
            )
        }
        else{

            const DeleteHandler=(id)=>{
                const deleteUser=()=>{dispatch(actions.deleteUser(userInfo.token,id))}
                deleteUser()
            }

            return (
                <>
                <Container>
                {UsersList.length===0?<h1 className='my-3'>No Users</h1>:
                <>  <Row>
                    <Col><h1 className='my-4'>Users:</h1></Col>
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
                    <Link to='/createUser'><Button>New User</Button></Link>
                    </Col>
                </Row>
                    
                    <Table striped hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Is Admin</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                UsersList.map(user=>(
                                    
                                    <tr key={user.id}>
                                        
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.is_superuser?'Yes':'No'}</td>
                                        <td><Button onClick={()=>{navigate('/editUser/'+user.id)}}>Edit</Button></td>
                                        
                                        <th>{mode===`Confirm${user.id}`?<>

                                        <Button onClick={()=>{DeleteHandler(user.id)}} className='mx-2'>Yes</Button>
                                        <Button onClick={()=>{setmode(`Delete${user.id}`)}}>No</Button>
                                        </>
                                                                            
                                            :<Button onClick={()=>{setmode(`Confirm${user.id}`)}} disabled={userInfo.id===user.id}>Delete</Button>}</th>
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

export default Users