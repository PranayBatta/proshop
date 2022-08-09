import {combineReducers} from 'redux'
import listProductReducer from './listProductReducer'
import detailProductReducer from './detailProductReducer'
import loaderReducer from './loaderReducer'
import errorReducer from './errorReducer'
import cartReducer from './cartReducer'
import userReducer from './userReducer'
import ShippingReducer from './ShippingReducer'
import paymentReducer from './paymentReducer'
import OrderReducer from './OrderReducer'
import OrdersReducer from './OrdersReducer'
import messageReducer from './messageReducer'
import UserErrorReducer from './UserErrorReducer'
import UsersReducer from './UsersReducer'
import GetUserReducer from './GetUserReducer'
import reviewsReducer from './reviewsReducer'

const reducers=combineReducers({
    productList:listProductReducer,
    detailproduct:detailProductReducer,
    loader:loaderReducer,
    error:errorReducer,
    UserError:UserErrorReducer,
    cart:cartReducer,
    user:userReducer,
    address:ShippingReducer,
    paymentMethod:paymentReducer,
    orderInfo:OrderReducer,
    orders:OrdersReducer,
    message:messageReducer,
    UsersList:UsersReducer,
    GetUser:GetUserReducer,
    reviews:reviewsReducer
})


export default reducers