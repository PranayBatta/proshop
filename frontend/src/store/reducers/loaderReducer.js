const reducer=(state={loading:false},action)=>{
    if(action.type==='loadingstart'){
        return {
            loading:action.payload
        }
    }
    else if(action.type==='loadingdone'){
        return {
            loading:action.payload
        }
    }
    else{
        return state
    }
}

export default reducer