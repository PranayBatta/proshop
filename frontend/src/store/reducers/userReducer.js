const reducer=(state={userInfo:{}},action)=>{
    if(action.type==='UserLogin'){
        return {
            userInfo:action.payload
        }
    }
    if(action.type==='UserLogout'){
        return state
    }
    else{
        let userInfoFromLocal=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):[]
        return {
            userInfo:userInfoFromLocal
        }
    }
}



export default reducer