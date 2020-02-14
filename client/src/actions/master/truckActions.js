import axios from 'axios'
import { toast } from 'react-toastify'
import {
  GET_TRUCKS_MASTER,
  GET_TRUCKS_MASTER_SUCCESS,
  CREATE_TRUCK_MASTER,
  UPDATE_TRUCK_MASTER,
  DELETE_TRUCK_MASTER,
} from '../action_types'

export const getTrucks = () => {
  return async dispatch => {
    dispatch({ type: GET_TRUCKS_MASTER })
    try {
      const { data } = await axios.get('/truck')
      dispatch({ type: GET_TRUCKS_MASTER_SUCCESS, payload: data })
    } catch (error) {
      toast.error(
        'Failed to load data from server. Please restart Raspberry Pi',
        { autoClose: false },
      )
    }
  }
}

export const createTruck = truck => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/truck', truck)
      dispatch({ type: CREATE_TRUCK_MASTER, payload: data })
      toast.success('New truck created successfully!')
    } catch (error) {
      toast.error('There are some errors. Please try again!')
    }
  }
}

export const deleteTruck = id => {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`/truck/${id}`)
      dispatch({ type: DELETE_TRUCK_MASTER, payload: data })
      toast.success('Truck deleted successfully!')
    } catch (error) {
      toast.error('There are some errors. Please try again!')
    }
  }
}

export const updateTruck = truck => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/truck/${truck._id}`, truck)
      dispatch({ type: UPDATE_TRUCK_MASTER, payload: data })
      toast.success('Truck updated successfully!')
    } catch (error) {
      toast.error('There are some errors. Please try again!')
    }
  }
}
