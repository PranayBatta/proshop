const reducer=(state={orders:[]},action)=>{
    if(action.type==='setOrders'){
        return {
            orders:action.payload
        }
    }
    else if(action.type==='setAdminOrders'){
        return {
            Adminorders:action.payload
        }
    }
    else{
        return state
    }
}


export default reducer