import axios from 'axios'
import { toast } from 'react-toastify'
import {
  GET_BRANDS_MASTER,
  GET_BRANDS_MASTER_SUCCESS,
  CREATE_BRAND_MASTER,
  UPDATE_BRAND_MASTER,
  DELETE_BRAND_MASTER,
} from '../action_types'

export const getBrands = () => {
  return async dispatch => {
    dispatch({ type: GET_BRANDS_MASTER })
    try {
      const { data } = await axios.get('/brand')
      dispatch({ type: GET_BRANDS_MASTER_SUCCESS, payload: data })
    } catch (error) {
      toast.error(
        'Failed to load data from server. Please restart Raspberry Pi',
        { autoClose: false },
      )
    }
  }
}

export const createBrand = brand => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/brand', brand)
      dispatch({ type: CREATE_BRAND_MASTER, payload: data })
      toast.success('New brand created successfully!')
    } catch (error) {
      toast.error('There are some errors. Please try again!')
    }
  }
}

export const deleteBrand = id => {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`/brand/${id}`)
      dispatch({ type: DELETE_BRAND_MASTER, payload: data })
      toast.success('Brand deleted successfully!')
    } catch (error) {
      toast.error('There are some errors. Please try again!')
    }
  }
}

export const updateBrand = brand => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/brand/${brand._id}`, brand)
      dispatch({ type: UPDATE_BRAND_MASTER, payload: data })
      toast.success('Brand updated successfully!')
    } catch (error) {
      toast.error('There are some errors. Please try again!')
    }
  }
}
