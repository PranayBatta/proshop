import axios from 'axios'
import { useSelector } from 'react-redux'
import { store } from '../store'

export const listUsers =(token)=> async (dispatch)=>{

    try{
        dispatch({
            type:'message'
        })
        dispatch({
            type:'UserError'
        })
        dispatch({
            type:'loadingstart',
            payload:true
        })
        const config={
            headers:{
                'Content-type':'application/json',
                'Authorization':'Bearer '+token
            }
        }
        const {data}= await axios.get('http://127.0.0.1:8000/api/users',config)
            dispatch({
                type:'listUsers',
                payload:data
            })
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })

    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }
    
    }

    export const getUser =(token,id)=> async (dispatch)=>{

        try{
            dispatch({
                type:'message'
            })
            dispatch({
                type:'UserError'
            })
            dispatch({
                type:'loadingstart',
                payload:true
            })
            const config={
                headers:{
                    'Content-type':'application/json',
                    'Authorization':'Bearer '+token
                }
            }
            const {data}= await axios.get('http://127.0.0.1:8000/api/users/get/'+id,config)
        
            dispatch({
                type:'getUser',
                payload:data
            })

                dispatch({
                    type:'loadingdone',
                    payload:false
                })
                dispatch({
                    type:'error',
                    payload:''
                })
    
        }catch(error){
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
            })
        }
        
        }

        export const editUser =(token,id,username,email,admin)=> async (dispatch)=>{

            try{
                dispatch({
                    type:'message'
                })
                dispatch({
                    type:'UserError'
                })
                dispatch({
                    type:'loadingstart',
                    payload:true
                })
                const config={
                    headers:{
                        'Content-type':'application/json',
                        'Authorization':'Bearer '+token
                    }
                }
                const {response}= await axios.put('http://127.0.0.1:8000/api/users/edit/'+id,{'username':username,'email':email,'admin':admin},config)
    
                    dispatch({
                        type:'loadingdone',
                        payload:false
                    })
                    dispatch({
                        type:'error',
                        payload:''
                    })
                    dispatch({
                        type:'message',
                        payload:'User Edited'
                    })
        
            }catch(error){
                dispatch({
                    type:'loadingdone',
                    payload:false
                })
                dispatch({
                    type:'error',
                    payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
                })
            }
            
            }

    export const deleteUser =(token,id)=> async (dispatch)=>{

        try{
            dispatch({
                type:'message'
            })
            dispatch({
                type:'UserError'
            })
            dispatch({
                type:'loadingstart',
                payload:true
            })
            const config={
                headers:{
                    'Content-type':'application/json',
                    'Authorization':'Bearer '+token
                }
            }
            const {response}= await axios.get('http://127.0.0.1:8000/api/users/delete/'+id,config)
            
            const {data}= await axios.get('http://127.0.0.1:8000/api/users',config)
            dispatch({
                type:'listUsers',
                payload:data
            })

                dispatch({
                    type:'loadingdone',
                    payload:false
                })
                dispatch({
                    type:'error',
                    payload:''
                })
                dispatch({
                    type:'message',
                    payload:'User Deleted'
                })
    
        }catch(error){
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
            })
        }
        
        }

export const listProducts = async (dispatch)=>{

    try{
        dispatch({
            type:'message'
        })
        dispatch({
            type:'loadingstart',
            payload:true
        })
        const {data}= await axios.get('http://127.0.0.1:8000/api/products')
            dispatch({
                type:'listProducts',
                payload:data
            })
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })

    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }
    
    }

    export const getResults = (item)=>async (dispatch)=>{

        try{
            dispatch({
                type:'message'
            })
            dispatch({
                type:'loadingstart',
                payload:true
            })
            const {data}= await axios.get('http://127.0.0.1:8000/api/products/search/'+item)
                dispatch({
                    type:'listResults',
                    payload:data
                })
                dispatch({
                    type:'loadingdone',
                    payload:false
                })
                dispatch({
                    type:'error',
                    payload:''
                })
    
        }catch(error){
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
            })
        }
        
        }

    export const getReviews = (token,id)=>async (dispatch)=>{

        try{
            dispatch({
                type:'message'
            })
            dispatch({
                type:'loadingstart',
                payload:true
            })
            const config={
                headers:{
                    'Content-type':'application/json',
                    'Authorization':'Bearer '+token
                }
            }
            const {data}= await axios.get('http://127.0.0.1:8000/api/reviews/get/'+id,config)
                dispatch({
                    type:'listReviews',
                    payload:data
                })
                dispatch({
                    type:'loadingdone',
                    payload:false
                })
                dispatch({
                    type:'error',
                    payload:''
                })
    
        }catch(error){
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
            })
        }
        
        }

        export const addReview =(token,id,rating,comment)=> async (dispatch)=>{

            try{
                dispatch({
                    type:'message'
                })
                dispatch({
                    type:'UserError'
                })
                dispatch({
                    type:'loadingstart',
                    payload:true
                })
                const config={
                    headers:{
                        'Content-type':'application/json',
                        'Authorization':'Bearer '+token
                    }
                }
                const {response}= await axios.post('http://127.0.0.1:8000/api/reviews/create/'+id,{'rating':rating,'comment':comment},config)
                
                const {data}= await axios.get('http://127.0.0.1:8000/api/reviews/get/'+id,config)
                dispatch({
                    type:'listReviews',
                    payload:data
                })
    
                    dispatch({
                        type:'loadingdone',
                        payload:false
                    })
                    dispatch({
                        type:'error',
                        payload:''
                    })
                    dispatch({
                        type:'message',
                        payload:'Review Added'
                    })
        
            }catch(error){
                dispatch({
                    type:'loadingdone',
                    payload:false
                })
                dispatch({
                    type:'error',
                    payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
                })
            }
            
            }

    export const createProduct =(token,formdata)=> async (dispatch)=>{

        try{
            dispatch({
                type:'message'
            })
            dispatch({
                type:'UserError'
            })
            dispatch({
                type:'loadingstart',
                payload:true
            })
            const config={
                headers:{
                    'Content-type':'application/json',
                    'Authorization':'Bearer '+token
                }
            }
            const {response}= await axios.post('http://127.0.0.1:8000/api/products/create/',formdata,config)
            
            const {data}= await axios.get('http://127.0.0.1:8000/api/products')
            dispatch({
                type:'listProducts',
                payload:data
            })

                dispatch({
                    type:'loadingdone',
                    payload:false
                })
                dispatch({
                    type:'error',
                    payload:''
                })
                dispatch({
                    type:'message',
                    payload:'Product Created'
                })
    
        }catch(error){
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
            })
        }
        
        }

    export const editProduct =(token,id,formdata)=> async (dispatch)=>{

        try{
            dispatch({
                type:'message'
            })
            dispatch({
                type:'UserError'
            })
            dispatch({
                type:'loadingstart',
                payload:true
            })
            const config={
                headers:{
                    'Content-type':'application/json',
                    'Authorization':'Bearer '+token
                }
            }
            const {response}= await axios.put('http://127.0.0.1:8000/api/products/edit/'+id,formdata,config)

            const {data}= await axios.get('http://127.0.0.1:8000/api/products')
            dispatch({
                type:'listProducts',
                payload:data
            })
            
                dispatch({
                    type:'loadingdone',
                    payload:false
                })
                dispatch({
                    type:'error',
                    payload:''
                })
                dispatch({
                    type:'message',
                    payload:'Product Edited'
                })
    
        }catch(error){
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
            })
        }
        
        }

export const detailProduct= (id)=> async (dispatch)=>{

    try{
        dispatch({
            type:'message'
        })
        dispatch({
            type:'loadingstart',
            payload:true
        })
    
        const url='http://127.0.0.1:8000/api/products/'+id
        const {data}= await axios.get(url)
    
            dispatch({
                type:'detailProduct',
                payload:data
            })
    
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })
    
    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }

    }

    export const deleteProduct =(token,id)=> async (dispatch)=>{

        try{
            dispatch({
                type:'message'
            })
            dispatch({
                type:'UserError'
            })
            dispatch({
                type:'loadingstart',
                payload:true
            })
            const config={
                headers:{
                    'Content-type':'application/json',
                    'Authorization':'Bearer '+token
                }
            }
            const {response}= await axios.get('http://127.0.0.1:8000/api/products/delete/'+id,config)
            
            const {data}= await axios.get('http://127.0.0.1:8000/api/products',config)
            dispatch({
                type:'listProducts',
                payload:data
            })

                dispatch({
                    type:'loadingdone',
                    payload:false
                })
                dispatch({
                    type:'error',
                    payload:''
                })
                dispatch({
                    type:'message',
                    payload:'Product Deleted'
                })
    
        }catch(error){
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
            })
        }
        
        }

export const addtocart=(id,quantity,token)=>async(dispatch)=>{
    try{ 

        dispatch({
            type:'loadingstart',
            payload:true
        })
    
        const url='http://127.0.0.1:8000/api/products/'+id
        const {data}= await axios.get(url)

        const config={
            headers:{
                'Content-type':'application/json',
                'Authorization':'Bearer '+token
            }
        }
        const {response}= await axios.post('http://127.0.0.1:8000/api/cart/add/',{'product':data.name,'quantity':quantity},config)
        
        const cart= await axios.post('http://127.0.0.1:8000/api/cart/get/',{},config)
        dispatch({
            type:'LoadCart',
            payload:{
                cart:cart.data['items'],
            }
        })
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })
    
            dispatch({
                type:'message',
                payload:'Product Added to Cart'
            })
            dispatch({
                type:'UserError',
            })

    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }
}

export const removefromcart=(id,token)=>async (dispatch)=>{
    try{

        dispatch({
            type:'loadingstart',
            payload:true
        })

        const url='http://127.0.0.1:8000/api/products/'+id
        const {data}= await axios.get(url)

        const config={
            headers:{
                'Content-type':'application/json',
                'Authorization':'Bearer '+token
            }
        }

        const {response}= await axios.post('http://127.0.0.1:8000/api/cart/remove/',{'product':data.name},config)
        const cart= await axios.post('http://127.0.0.1:8000/api/cart/get/',{'product':data.name},config)

        dispatch({
            type:'LoadCart',
            payload:{
                cart:cart.data['items'],
            }
        })

            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })
            dispatch({
                type:'message',
                payload:'Product removed from Cart'
            })
    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }

}

export const loadcart=(token)=>async(dispatch)=>{
    try{ 
        dispatch({
            type:'message'
        })
        dispatch({
            type:'loadingstart',
            payload:true
        })
    
        const config={
            headers:{
                'Content-type':'application/json',
                'Authorization':'Bearer '+token
            }
        }
        
        const cart= await axios.post('http://127.0.0.1:8000/api/cart/get/',{},config)

        dispatch({
            type:'LoadCart',
            payload:{
                cart:cart.data['items'],
            }
        })
        
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })
    
    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }
}

export const shippingAddress=(token)=>async(dispatch)=>{
    try{ 
        dispatch({
            type:'message'
        })
        dispatch({
            type:'loadingstart',
            payload:true
        })
    
        const config={
            headers:{
                'Content-type':'application/json',
                'Authorization':'Bearer '+token
            }
        }

        const {data}= await axios.get('http://127.0.0.1:8000/api/shippingaddress/get',config)
        dispatch({
            type:'LoadAddress',
            payload:data
        })
        
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })
    
    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }
}

export const create_shippingAddress=(token,address,city,country,post)=>async(dispatch)=>{
    try{ 

        dispatch({
            type:'loadingstart',
            payload:true
        })
    
        const config={
            headers:{
                'Content-type':'application/json',
                'Authorization':'Bearer '+token
            }
        }

        const {response}=await axios.post('http://127.0.0.1:8000/api/shippingaddress/create',{'address':address,'city':city,'country':country,'postalCode':post},config)

        const {data}= await axios.get('http://127.0.0.1:8000/api/shippingaddress/get',config)
        dispatch({
            type:'LoadAddress',
            payload:data
        })
        
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })
            dispatch({
                type:'message',
                payload:'New Address Added'
            })
    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }
}

export const set_shippingAddress=(address)=>async(dispatch)=>{
    try{ 

        dispatch({
            type:'loadingstart',
            payload:true
        })
    
        dispatch({
            type:'SetAddress',
            payload:address
        })
        
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })
    
    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }
}

export const setPayment=(paymentMethod)=>async(dispatch)=>{
    try{ 

        dispatch({
            type:'loadingstart',
            payload:true
        })
    
        dispatch({
            type:'setPayment',
            payload:paymentMethod
        })
        
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })
    
    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }
}

export const placeOrder=(token,cart,address,paymentMethod,taxPrice,shippingPrice,totalPrice)=>async(dispatch)=>{
    try{ 

        dispatch({
            type:'loadingstart',
            payload:true
        })

        const config={
            headers:{
                'Content-type':'application/json',
                'Authorization':'Bearer '+token
            }
        }

        const {response}=await axios.post('http://127.0.0.1:8000/api/order/create',{
            'address':address,
            'cart':cart,
            'paymentMethod':paymentMethod,
            'taxPrice':taxPrice,
            'shippingPrice':shippingPrice,
            'totalPrice':totalPrice
        },config)

        dispatch({
            type:'emptyCart',
        })
        
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })
            dispatch({
                type:'message',
                payload:'Order Placed'
            })
            
    
    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }
}

export const getOrder=(token,id)=>async(dispatch)=>{
    try{ 
        dispatch({
            type:'message'
        })
        dispatch({
            type:'loadingstart',
            payload:true
        })

        const config={
            headers:{
                'Content-type':'application/json',
                'Authorization':'Bearer '+token
            }
        }
        
        const {data}= await axios.get('http://127.0.0.1:8000/api/order/get/'+id,config)

        dispatch({
            type:'setOrder',
            payload:data
        })
        
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })
    
    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }
}

export const cancelOrder=(token,id)=>async(dispatch)=>{
    try{ 

        dispatch({
            type:'loadingstart',
            payload:true
        })

        const config={
            headers:{
                'Content-type':'application/json',
                'Authorization':'Bearer '+token
            }
        }
        
        const {data}= await axios.get('http://127.0.0.1:8000/api/order/cancel/'+id,config)
        
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })
            dispatch({
                type:'message',
                payload:'Order Canceled'
            })
    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }
}

export const Setdelivered=(token,id)=>async(dispatch)=>{
    try{ 

        dispatch({
            type:'loadingstart',
            payload:true
        })

        console.log(id)

        const config={
            headers:{
                'Content-type':'application/json',
                'Authorization':'Bearer '+token
            }
        }
        
        const {response}= await axios.get('http://127.0.0.1:8000/api/order/delivered/'+id,config)
        
        const {data}= await axios.get('http://127.0.0.1:8000/api/order/get/'+id,config)

        dispatch({
            type:'setOrder',
            payload:data
        })

            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })
            dispatch({
                type:'message',
                payload:'Order Delivered'
            })
    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }
}

export const Setpaid=(token,id)=>async(dispatch)=>{
    try{ 

        dispatch({
            type:'loadingstart',
            payload:true
        })

        console.log(id)

        const config={
            headers:{
                'Content-type':'application/json',
                'Authorization':'Bearer '+token
            }
        }
        
        const {response}= await axios.get('http://127.0.0.1:8000/api/order/paid/'+id,config)
        
        const {data}= await axios.get('http://127.0.0.1:8000/api/order/get/'+id,config)

        dispatch({
            type:'setOrder',
            payload:data
        })

            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })
            dispatch({
                type:'message',
                payload:'Order Paid'
            })
    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }
}

export const getOrders=(token)=>async(dispatch)=>{
    try{ 

        dispatch({
            type:'loadingstart',
            payload:true
        })

        const config={
            headers:{
                'Content-type':'application/json',
                'Authorization':'Bearer '+token
            }
        }
        
        const {data}= await axios.get('http://127.0.0.1:8000/api/orders/get',config)

        dispatch({
            type:'setOrders',
            payload:data
        })
        
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })
    
    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }
}

export const getAdminOrders=(token)=>async(dispatch)=>{
    try{ 

        dispatch({
            type:'loadingstart',
            payload:true
        })

        const config={
            headers:{
                'Content-type':'application/json',
                'Authorization':'Bearer '+token
            }
        }
        
        const {data}= await axios.get('http://127.0.0.1:8000/api/adminorders/get',config)

        dispatch({
            type:'setAdminOrders',
            payload:data
        })
        
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })
    
    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }
}

export const UserSignUp= (username,email,password)=> async (dispatch)=>{

    try{

        dispatch({
            type:'loadingstart',
            payload:true
        })
    
        const url='http://127.0.0.1:8000/api/users/create/'
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data}= await axios.post(url,{'username':username,'email':email,'password':password,'admin':'False'},config)
    
            dispatch({
                type:'UserLogin',
                payload:data
            })

            localStorage.setItem('userInfo',JSON.stringify(data))
    
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })
            dispatch({
                type:'message',
                payload:'New Account Created'
            })
    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }

    }

    export const UserCreate= (username,email,password,admin)=> async (dispatch)=>{

        try{
    
            dispatch({
                type:'loadingstart',
                payload:true
            })
        
            const url='http://127.0.0.1:8000/api/users/create/'
            const config={
                headers:{
                    'Content-type':'application/json'
                }
            }
            const {data}= await axios.post(url,{'username':username,'email':email,'password':password,'admin':admin},config)
        
                dispatch({
                    type:'loadingdone',
                    payload:false
                })
                dispatch({
                    type:'error',
                    payload:''
                })
                dispatch({
                    type:'message',
                    payload:'New Account Created'
                })
        }catch(error){
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
            })
        }
    
        }

export const UserLogin= (username,password)=> async (dispatch)=>{

    try{

        dispatch({
            type:'loadingstart',
            payload:true
        })
    
        const url='http://127.0.0.1:8000/api/users/login/'
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data}= await axios.post(url,{'username':username,'password':password},config)
    
            dispatch({
                type:'UserLogin',
                payload:data
            })

            localStorage.setItem('userInfo',JSON.stringify(data))
    
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:''
            })
            dispatch({
                type:'message',
                payload:'Logged In'
            })
    }catch(error){
        dispatch({
            type:'loadingdone',
            payload:false
        })
        dispatch({
            type:'error',
            payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
        })
    }

    }

    export const UserLogout= ()=> async (dispatch)=>{

        try{
    
            dispatch({
                type:'loadingstart',
                payload:true
            })
            const token=JSON.parse(localStorage.getItem('userInfo'))['token']

            localStorage.setItem('userInfo','')
        
                dispatch({
                    type:'UserLogout'
                })
        
                dispatch({
                    type:'loadingdone',
                    payload:false
                })
                dispatch({
                    type:'error',
                    payload:''
                })
                dispatch({
                    type:'message',
                    payload:'Logged Out'
                })
        }catch(error){
            dispatch({
                type:'loadingdone',
                payload:false
            })
            dispatch({
                type:'error',
                payload:error.response && error.response.data.message?error.response.data.message: error.response.status+" "+error.response.statusText
            })
        }
    
        }

export const SetError=(message)=>(dispatch)=>{
    dispatch({
        type:'UserError',
        payload:message
    })
}