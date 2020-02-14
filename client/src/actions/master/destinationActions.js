import axios from 'axios'
import { toast } from 'react-toastify'
import {
  GET_DESTINATIONS_MASTER,
  GET_DESTINATIONS_MASTER_SUCCESS,
  CREATE_DESTINATION_MASTER,
  UPDATE_DESTINATION_MASTER,
  DELETE_DESTINATION_MASTER,
} from '../action_types'

export const getDestinations = () => {
  return async dispatch => {
    dispatch({ type: GET_DESTINATIONS_MASTER })
    try {
      const { data } = await axios.get('/destination')
      dispatch({ type: GET_DESTINATIONS_MASTER_SUCCESS, payload: data })
    } catch (error) {
      toast.error(
        'Failed to load data from server. Please restart Raspberry Pi',
        { autoClose: false },
      )
    }
  }
}

export const createDestination = destination => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/destination', destination)
      dispatch({ type: CREATE_DESTINATION_MASTER, payload: data })
      toast.success('New destination created successfully!')
    } catch (error) {
      toast.error('There are some errors. Please try again!')
    }
  }
}

export const deleteDestination = id => {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`/destination/${id}`)
      dispatch({ type: DELETE_DESTINATION_MASTER, payload: data })
      toast.success('Destination deleted successfully!')
    } catch (error) {
      toast.error('There are some errors. Please try again!')
    }
  }
}

export const updateDestination = destination => {
  return async dispatch => {
    try {
      const { data } = await axios.put(
        `/destination/${destination._id}`,
        destination,
      )
      dispatch({ type: UPDATE_DESTINATION_MASTER, payload: data })
      toast.success('Destination updated successfully!')
    } catch (error) {
      toast.error('There are some errors. Please try again!')
    }
  }
}
