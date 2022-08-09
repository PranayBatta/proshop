import { store } from "../store"
// const reducer=(state={cart:[]},action)=>{

//     // var cart=localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
    
//     if(action.type==='AddtoCart'){
        
//         const item={
//                 id:action.payload.id,
//                 name:action.payload.name,
//                 image:action.payload.image,
//                 brand:action.payload.brand,
//                 category:action.payload.category,
//                 description:action.payload.description,
//                 price:action.payload.price,
//                 quantity:action.payload.quantity,
//                 inStock:action.payload.inStock
//             }
//             cart.push(item)
        
//         // localStorage.setItem('cart',JSON.stringify(cart))
//         return {
//             cart:cart
//         }
//     }

//     else if(action.type==='DeletefromCart'){
//         return {cart:cart}
//     }

//     else{
//         return {cart:cart}
//     }
// }



const cartReducer=(state={},action)=>{
    
    if(action.type==='LoadCart'){
        
        const cart=action.payload.cart

        return {
            cart:cart
        }
    }

    else if(action.type==='emptyCart'){
        console.log('in empty Cart')
        return {
            cart:[]
        }
    }

    else{
        return state
    }
}

export default cartReducer
