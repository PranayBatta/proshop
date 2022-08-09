const reducer=(state={reviews:[]},action)=>{
    if(action.type==='listReviews'){
        return {
            reviews:action.payload
        }
    }
    else{
        return state
    }
}

export default reducer