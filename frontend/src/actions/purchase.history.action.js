import axios from 'axios'
import storeConfig from '../config/storage.config'
import { purchaseHistoryTypes } from '../constants/action.types'
import { BACKEND_PORT } from '../config/application.config'
require('dotenv').config();

const BACKEND_HOST = process.env.BACKEND_HOST || 'localhost'

export const setPurchaseHistory = (data) => ({
    type: purchaseHistoryTypes.SET_PURCHASED_HISTORY,
    data
})
export const getPurchaseHitory = () => async (dispatch, getState) => {
    let res = null
    let user = storeConfig.getUser()
    if (user === null)
        return
    try {
        res = await axios.get(`http://${BACKEND_HOST}:${BACKEND_PORT}/bill/` + user.id)
    }
    catch (err) {
        console.log(err)
        return
    }
    dispatch(setPurchaseHistory(res.data.data))
}
export const deleteBill = (id) => async (dispatch, getState) => {
    let res = null;
    try {
        res = await axios.get(`http://${BACKEND_HOST}:${BACKEND_PORT}/bill/delete/` + id)
    }
    catch (err) {
        console.log(err.response)
    }
    dispatch(getPurchaseHitory())

    return res.data.bill;
}
