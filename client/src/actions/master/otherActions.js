import axios from 'axios'
import { toast } from 'react-toastify'
import {
  GET_OTHERS_MASTER,
  GET_OTHERS_MASTER_SUCCESS,
  CREATE_OTHER_MASTER,
  UPDATE_OTHER_MASTER,
  DELETE_OTHER_MASTER,
} from '../action_types'

export const getOthers = () => {
  return async dispatch => {
    dispatch({ type: GET_OTHERS_MASTER })
    try {
      const { data } = await axios.get('/other')
      dispatch({ type: GET_OTHERS_MASTER_SUCCESS, payload: data })
    } catch (error) {
      toast.error(
        'Failed to load data from server. Please restart Raspberry Pi',
        { autoClose: false },
      )
    }
  }
}

export const createOther = other => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/other', other)
      dispatch({ type: CREATE_OTHER_MASTER, payload: data })
      toast.success('New other created successfully!')
    } catch (error) {
      toast.error('There are some errors. Please try again!')
    }
  }
}

export const deleteOther = id => {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`/other/${id}`)
      dispatch({ type: DELETE_OTHER_MASTER, payload: data })
      toast.success('Other deleted successfully!')
    } catch (error) {
      toast.error('There are some errors. Please try again!')
    }
  }
}

export const updateOther = other => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/other/${other._id}`, other)
      dispatch({ type: UPDATE_OTHER_MASTER, payload: data })
      toast.success('Other updated successfully!')
    } catch (error) {
      toast.error('There are some errors. Please try again!')
    }
  }
}
