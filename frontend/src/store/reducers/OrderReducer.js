const reducer=(state={orderInfo:{}},action)=>{
    if(action.type==='setOrder'){
        return {
            orderInfo:action.payload
        }
    }
    else{
        return state
    }
}


export default reducer