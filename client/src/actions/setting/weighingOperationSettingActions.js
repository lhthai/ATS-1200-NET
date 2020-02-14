import axios from 'axios'
import { toast } from 'react-toastify'
import {
  GET_WEIGHING_OPERATION_SETTING,
  GET_WEIGHING_OPERATION_SETTING_SUCCESS,
  GET_SERIAL_PORTS,
  UPDATE_WEIGHING_OPERATION_SETTING,
} from '../action_types'
import socket from '../../helpers/socket'

export const getWeighingOperationSetting = () => {
  return async dispatch => {
    dispatch({ type: GET_WEIGHING_OPERATION_SETTING })
    try {
      const { data } = await axios.get('/setting/operationsetting')
      dispatch({
        type: GET_WEIGHING_OPERATION_SETTING_SUCCESS,
        payload: data[0],
      })
    } catch (error) {
      toast.error(
        'Failed to load data from server. Please restart Raspberry Pi',
        { autoClose: false },
      )
    }
  }
}

export const updateWeighingOperationSetting = operationSetting => {
  return async dispatch => {
    try {
      const { data } = await axios.put(
        `/setting/operationsetting/${operationSetting._id}`,
        operationSetting,
      )
      dispatch({
        type: UPDATE_WEIGHING_OPERATION_SETTING,
        payload: data,
      })
      socket.emit('restartServer')
      toast.success('Settings are updated successfully')
      setTimeout(() => {
        toast.info('Please refresh browser to apply changes!', {
          autoClose: false,
        })
      }, 3000)
    } catch (error) {
      toast.error(
        'Failed to load data from server. Please restart Raspberry Pi',
        { autoClose: false },
      )
    }
  }
}

export const getSerialPorts = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/setting/getserialports')
      dispatch({ type: GET_SERIAL_PORTS, payload: data })
    } catch (error) {
      toast.error(
        'Failed to load data from server. Please restart Raspberry Pi',
        { autoClose: false },
      )
    }
  }
}
