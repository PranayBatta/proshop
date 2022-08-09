const reducer=(state={products:[],searchProducts:[]},action)=>{
    if(action.type==='listProducts'){
        return {
            products:action.payload
        }
    }
    else if(action.type==='listResults'){
        return{
            products:[],
            searchProducts:action.payload
        }
    }
    else{
        return state
    }
}

export default reducer