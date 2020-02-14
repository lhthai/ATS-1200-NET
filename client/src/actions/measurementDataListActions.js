import axios from 'axios'
import { toast } from 'react-toastify'
import {
  GET_MEASUREMENT_DATA_LIST,
  GET_MEASUREMENT_DATA_LIST_SUCCESS,
  UPDATE_MEASUREMENT_DATA_LIST,
  DELETE_MEASUREMENT_DATA_LIST,
} from './action_types'

export const getMeasurementDataList = date => {
  return async dispatch => {
    dispatch({ type: GET_MEASUREMENT_DATA_LIST })
    try {
      const { data } = await axios.get(`/weighing/getweighingbydate/${date}`)
      dispatch({ type: GET_MEASUREMENT_DATA_LIST_SUCCESS, payload: data })
    } catch (error) {
      toast.error(
        'Failed to load data from server. Please restart Raspberry Pi',
        { autoClose: false },
      )
    }
  }
}

export const updateMeasurementDataList = weightData => {
  return async dispatch => {
    try {
      const { data } = await axios.put(
        `/weighing/${weightData._id}`,
        weightData,
      )
      dispatch({ type: UPDATE_MEASUREMENT_DATA_LIST, payload: data })
    } catch (error) {
      toast.error(
        'Failed to load data from server. Please restart Raspberry Pi',
        { autoClose: false },
      )
    }
  }
}

export const deleteMeassurementDataList = id => {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`/weighing/${id}`)
      dispatch({ type: DELETE_MEASUREMENT_DATA_LIST, payload: data })
      toast.success('Measurement data deleted successfully!')
    } catch (error) {
      toast.error('There are some errors. Please try again!')
    }
  }
}
