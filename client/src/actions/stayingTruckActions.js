import axios from 'axios'
import { toast } from 'react-toastify'
import {
  GET_STAYING_TRUCKS,
  GET_STAYING_TRUCKS_SUCCESS,
  UPDATE_STAYING_TRUCK,
  DELETE_STAYING_TRUCK,
  CREATE_STAYING_TRUCK,
} from './action_types'

export const getStayingTrucks = () => {
  return async dispatch => {
    dispatch({ type: GET_STAYING_TRUCKS })
    try {
      const { data } = await axios.get('/weighing/stayingtruck')
      dispatch({ type: GET_STAYING_TRUCKS_SUCCESS, payload: data })
    } catch (error) {
      toast.error(
        'Failed to load data from server. Please restart Raspberry Pi',
        { autoClose: false },
      )
    }
  }
}

export const createStayingTrucks = weighingData => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/weighing/', weighingData)
      dispatch({ type: CREATE_STAYING_TRUCK, payload: data })
    } catch (error) {
      toast.error(
        'Failed to load data from server. Please restart Raspberry Pi',
        { autoClose: false },
      )
    }
  }
}

export const deleteStayingTruck = id => {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`/weighing/${id}`)
      dispatch({ type: DELETE_STAYING_TRUCK, payload: data })
      toast.success('Staying truck deleted successfully!')
    } catch (error) {
      toast.error('There are some errors. Please try again!')
    }
  }
}

export const updateStayingTruck = weighingData => {
  return async dispatch => {
    try {
      const { data } = await axios.put(
        `/weighing/${weighingData._id}`,
        weighingData,
      )
      dispatch({ type: UPDATE_STAYING_TRUCK, payload: data })
      toast.success('Staying truck updated successfully!')
    } catch (error) {
      toast.error('There are some errors. Please try again!')
    }
  }
}
