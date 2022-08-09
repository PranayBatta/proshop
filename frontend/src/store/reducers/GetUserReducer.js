const reducer=(state={GetUser:{
    id:'',
    username:'',
    email:'',
    is_superuser:''
}},action)=>{
    if(action.type==='getUser'){
        return {
            GetUser:action.payload
        }
    }
    else{
        return state
    }
}

export default reducer