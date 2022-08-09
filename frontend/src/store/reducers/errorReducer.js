const reducer=(state={error:''},action)=>{
    if(action.type==='error'){
        return {
            error:action.payload
        }
    }
    else{
        return state
    }
}

export default reducer