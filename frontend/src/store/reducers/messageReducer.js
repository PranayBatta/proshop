const reducer=(state={message:''},action)=>{
    if(action.type==='message'){
        return {
            message:action.payload
        }
    }
    else{
        return state
    }
}

export default reducer