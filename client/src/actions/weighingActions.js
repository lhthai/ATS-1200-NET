import axios from 'axios'
import { toast } from 'react-toastify'
import {
  CREATE_WEIGHING,
  UPDATE_WEIGHING,
  GET_MAX_SLIPNO,
  GET_STAYING_TRUCKS,
  GET_STAYING_TRUCKS_SUCCESS,
  UPDATE_STAYING_TRUCK,
  DELETE_STAYING_TRUCK,
  CREATE_STAYING_TRUCK,
  GET_MEASUREMENT_DATA_LIST,
  GET_MEASUREMENT_DATA_LIST_SUCCESS,
  UPDATE_MEASUREMENT_DATA_LIST,
  DELETE_MEASUREMENT_DATA_LIST,
} from './action_types'

export const createWeighing = weighing => {
  return async dispatch => {
    try {
      const { data } = await axios.post(`/weighing/`, weighing)
      dispatch({ type: CREATE_WEIGHING, payload: data })
    } catch (error) {
      toast.error('Cannot create Weighing. Please try again!')
    }
  }
}

export const updateWeighing = weighingData => {
  return async dispatch => {
    try {
      const { data } = await axios.put(
        `/weighing/${weighingData._id}`,
        weighingData,
      )
      dispatch({ type: UPDATE_WEIGHING, payload: data })
    } catch (error) {
      toast.error('Cannot update Weighing. Please try again!')
    }
  }
}

export const getMaxSlipNo = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/weighing/getmaxslipno')
      dispatch({ type: GET_MAX_SLIPNO, payload: data })
    } catch (error) {
      toast.error('Cannot load Max SlipNo. Please try again!')
    }
  }
}

// Staying trucks
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

// Measurement Data List
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
