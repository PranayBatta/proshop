const reducer=(state={UserError:''},action)=>{
    if(action.type==='UserError'){
        return {
            UserError:action.payload
        }
    }
    else{
        return state
    }
}

export default reducer