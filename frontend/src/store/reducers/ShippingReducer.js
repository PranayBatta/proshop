const reducer=(state={address:{address:'',city:'',country:'',postalCode:''},addressList:[]},action)=>{
    if(action.type==='LoadAddress'){

        return {
            address:{address:'',city:'',country:'',postalCode:''},
            addressList:action.payload
        }
    }
    if(action.type==='SetAddress'){

        return {
            address:action.payload,
            addressList:[]
        }
    }
    else{
        return state
    }
}



export default reducer