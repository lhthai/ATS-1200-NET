import axios from 'axios'
import { toast } from 'react-toastify'
import {
  GET_VENDORS_MASTER,
  GET_VENDORS_MASTER_SUCCESS,
  CREATE_VENDOR_MASTER,
  UPDATE_VENDOR_MASTER,
  DELETE_VENDOR_MASTER,
} from '../action_types'

export const getVendors = () => {
  return async dispatch => {
    dispatch({ type: GET_VENDORS_MASTER })
    try {
      const { data } = await axios.get('/vendor')
      dispatch({ type: GET_VENDORS_MASTER_SUCCESS, payload: data })
    } catch (error) {
      toast.error(
        'Failed to load data from server. Please restart Raspberry Pi',
        { autoClose: false },
      )
    }
  }
}

export const createVendor = vendor => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/vendor', vendor)
      dispatch({ type: CREATE_VENDOR_MASTER, payload: data })
      toast.success('New vendor created successfully!')
    } catch (error) {
      toast.error('There are some errors. Please try again!')
    }
  }
}

export const deleteVendor = id => {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`/vendor/${id}`)
      dispatch({ type: DELETE_VENDOR_MASTER, payload: data })
      toast.success('Vendor deleted successfully!')
    } catch (error) {
      toast.error('There are some errors. Please try again!')
    }
  }
}

export const updateVendor = vendor => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/vendor/${vendor._id}`, vendor)
      dispatch({ type: UPDATE_VENDOR_MASTER, payload: data })
      toast.success('Vendor updated successfully!')
    } catch (error) {
      toast.error('There are some errors. Please try again!')
    }
  }
}
