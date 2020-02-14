import axios from 'axios'
import { toast } from 'react-toastify'
import { GET_USB_DRIVES } from '../action_types'

export const getUSBDrives = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/setting/getusbdrives`)
      dispatch({ type: GET_USB_DRIVES, payload: data })
    } catch (error) {
      toast.error(
        'Failed to load data from server. Please restart Raspberry Pi',
        { autoClose: false },
      )
    }
  }
}

export default getUSBDrives
