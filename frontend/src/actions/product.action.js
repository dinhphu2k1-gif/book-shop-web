import axios from 'axios'
import { productTypes } from '../constants/action.types'
import storeConfig from '../config/storage.config'
import { BACKEND_PORT } from '../config/application.config'

export const getBookDetail = (id) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get(`http://localhost:8180/detail/book/` + id)
    }
    catch (err) {
        return
    }
    dispatch(setProductDetail(res.data.data))
}

export const getBookRelated = (id) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get(`http://localhost:8180/detail/book/` + id)
    }
    catch (err) {
        return
    }
    dispatch(setBookRelated(res.data.data))
}
export const getNameCategoryByID = (id) => async (dispatch) => {
    let res
    try {
        res = await axios.get(`http://localhost:8180/detail/category/` + id)
    }
    catch (err) {
        return
    }
    dispatch(setNameCategory(res.data.data.name))
    return res
}
export const getNamePubliserByID = (id) => async (dispatch) => {
    let res
    try {
        res = await axios.get(`http://localhost:8180/detail/publisher/` + id)
    }
    catch (err) {
        return
    }

    dispatch(setNamePubliser(res.data.data.name))
    return res
}
export const getNameAuthorByID = (id) => async (dispatch) => {
    let res
    try {
        res = await axios.get(`http://localhost:8180/detail/author/` + id)
    }
    catch (err) {
        return
    }

    dispatch(setNameAuthor(res.data.data.name))
    return res
}
export const setProductDetail = (productDetail) => ({
    type: productTypes.SET_PRODUCT_DETAIL,
    productDetail
})
export const setNameCategory = (name) => ({
    type: productTypes.SET_NAME_CATEGORY,
    name
})
export const setNamePubliser = (name) => ({
    type: productTypes.SET_NAME_PUBLICSHER,
    name
})

export const setBookRelated = (bookrelated) => ({
    type: productTypes.SET_BOOK_RELATED,
    bookrelated
})
export const setNameAuthor = (name) => ({
    type: productTypes.SET_NAME_AUTHOR,
    name
})

export const submitComment = (name, email, comment, id_book) => async (dispatch, getState) => {
    let id = null
    if (storeConfig.getUser() && storeConfig.getUser().id && storeConfig.getUser().id)
        id = storeConfig.getUser().id
    let res
    try {
        res = await axios.post(`http://localhost:${BACKEND_PORT}/comment`, {
            id_user: id,
            id_book: id_book,
            name: name,
            comment: comment
        })
    }
    catch (err) {
        console.log(JSON.stringify(err.response))
        return
    }
    dispatch(getCommentByIDBook(id_book))
}
export const setTotalPage = (totalpage) => ({
    type: productTypes.SET_TOTAL_PAGE,
    totalpage
})
export const setPage = (page) => ({
    type: productTypes.SET_PAGE,
    page
})
export const backPage = () => (dispatch, getState) => {
    let page = getState().productReducers.product.page
    if(page > 1) {
        dispatch(setPage(parseInt(page) - 1))
    }
}

export const nextPage = () => (dispatch, getState) => {
    let page = getState().productReducers.product.page
    let totalpage = getState().productReducers.product.totalpage
    if(page < totalpage) {
        dispatch(setPage(parseInt(page) + 1))
    }
}
export const getCommentByIDBook = (id) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post(`http://localhost:${BACKEND_PORT}/comment/book`, {
             id_book: id,
             page: getState().productReducers.product.page
            })
    }
    catch (err) {
        console.log(JSON.stringify(err.response))
        return
    }
    dispatch(setTotalPage(res.data.totalPage))
    dispatch(setComment(res.data.data))
}
export const setComment = (data) => ({
    type: productTypes.SET_COMMENT,
    data
})

export const addToCart = (product) => async (dispatch, getState) => {
    if (getState().userReducers.login.islogin) {
        let res
        try {
            res = await axios.post(`http://localhost:${BACKEND_PORT}/cart/addtocard`, {
                id_user: storeConfig.getUser().id,
                products: [product]
            })
        }
        catch (err) {
            console.log(JSON.stringify(err.response))
            return
        }
    } else {
        storeConfig.addProductToCart(product)
    }
}
