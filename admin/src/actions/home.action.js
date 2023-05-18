import axios from 'axios'
import {homeTypes} from '../constants/action.types'
import { BACKEND_PORT } from '../config/application.config'

export const setTopProduct = (data) => ({
    type: homeTypes.SET_TOP_PRODUCT,
    data
})
export const getTopProduct = () => async (dispatch, getState) => {
    let res = null
    try {
        res = await axios.post(`http://localhost:${BACKEND_PORT}/bill/top/`)
    }
    catch(err) {
        console.log(err)
        return
    }
    dispatch(setTopProduct(res.data.data))
}