import { cartTypes } from '../constants/action.types'
import axios from 'axios'
import storeConfig from '../config/storage.config'
import { BACKEND_PORT } from '../config/application.config'
require('dotenv').config();

const BACKEND_HOST = process.env.BACKEND_HOST || 'localhost'

export const setCart = (data) => ({
    type: cartTypes.SET_CART,
    data
})
export const getCart = () => async (dispatch, getState) => {
    let cart = null
    cart = storeConfig.getCart()
    if (cart !== null) {
        dispatch(setCart(cart))
        return
    }
    if (storeConfig.getUser() === null)
        return
    let id_user = storeConfig.getUser().id
    try {
        cart = await axios.get(`http://${BACKEND_HOST}:${BACKEND_PORT}/cart/` + id_user)
    }
    catch (err) {
        console.log(err)
        return
    }
    if (cart.data.data !== null) {
        dispatch(setCart(cart.data.data.products))
    }

}
export const updateProductInCart = (product) => async (dispatch, getState) => {
    if (!getState().userReducers.login.islogin) {
        storeConfig.updateProductInCart(product)
    }
    else {
        try {
            await axios.post(`http://${BACKEND_HOST}:${BACKEND_PORT}/cart/update`, {
                id_user: storeConfig.getUser().id,
                product: product
            })
        }
        catch (err) {
            console.log(err.response)
        }
    }
    dispatch(getCart())
}
export const deteleProductInCart = (id_product) => async (dispatch, getState) => {
    if (!getState().userReducers.login.islogin) {
        storeConfig.deteleProductInCart(id_product)
    } else {
        try {
            await axios.post(`http://${BACKEND_HOST}:${BACKEND_PORT}/cart/delete`, {
                id_user: storeConfig.getUser().id,
                id_product: id_product
            })
        }
        catch (err) {
            console.log(err.response)
        }
    }
    dispatch(getCart())
}


export const paymentSuccess = () => ({
    type: cartTypes.PAYMENT_SUCCESS
})
export const paymentFail = () => ({
    type: cartTypes.PAYMENT_FAIL
})
export const resetPayment = () => ({
    type: cartTypes.RESET_PAYMENT
})
export const payment = (address, phone, name, total) => async (dispatch, getState) => {
    let res = null
    try {
        res = await axios.post(`http://${BACKEND_HOST}:${BACKEND_PORT}/bill/add`, {
            id_user: storeConfig.getUser().id,
            address: address,
            phone: phone,
            name: name,
            total: total,
            email: storeConfig.getUser().email
        })
    }
    catch (err) {
        dispatch(paymentFail())
        console.log(err.response)
        dispatch(resetPayment())
        return
    }
    dispatch(paymentSuccess())
    dispatch(resetPayment())
    dispatch(getCart())

    if (res != null) {
        return res.data.bill
    }
    return null
}