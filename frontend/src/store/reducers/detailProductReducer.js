const reducer=(state={product:{}},action)=>{
    if(action.type==='detailProduct'){
        return {
            product:action.payload
        }
    }
    else{
        return state
    }
}

export default reducer