const reducer=(state={paymentMethod:[]},action)=>{
    if(action.type==='setPayment'){
        return {
            paymentMethod:action.payload
        }
    }
    else{
        return state
    }
}



export default reducer