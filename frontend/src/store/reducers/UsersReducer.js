const reducer=(state={UsersList:''},action)=>{
    if(action.type==='listUsers'){
        return {
            UsersList:action.payload
        }
    }
    else{
        return state
    }
}

export default reducer