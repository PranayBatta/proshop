import { applyMiddleware, createStore } from "redux"
import thunk from 'redux-thunk'
import reducers from "./reducers"

let userInfoFromLocal=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):[]

const initialState={
    cart:[],
    address:{
        address:{address:'',city:'',country:'',postalCode:''},
        addressList:[]
    },
    orderInfo:{
        order:{},
        items:[]
    },
    orders:[],
    GetUser:{
        GetUser:{id:'',
        username:'',
        email:'',
        is_superuser:''}
        
    }
    // userInfo:userInfoFromLocal,
}
export const store=createStore(reducers,initialState,applyMiddleware(thunk))

