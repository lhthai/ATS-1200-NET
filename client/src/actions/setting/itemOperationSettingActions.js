import axios from 'axios'
import { toast } from 'react-toastify'
import {
  GET_ITEM_OPERATION_SETTING,
  GET_ITEM_OPERATION_SETTING_SUCCESS,
  UPDATE_ITEM_OPERATION_SETTING,
} from '../action_types'

export const getItemsOperationSetting = () => {
  return async dispatch => {
    dispatch({ type: GET_ITEM_OPERATION_SETTING })
    try {
      const { data } = await axios.get('/setting/itemoperationsetting')
      dispatch({ type: GET_ITEM_OPERATION_SETTING_SUCCESS, payload: data[0] })
    } catch (error) {
      toast.error(
        'Failed to load data from server. Please restart Raspberry Pi',
        { autoClose: false },
      )
    }
  }
}

export const updateItemsOperationSetting = itemOperationSetting => {
  return async dispatch => {
    try {
      const { data } = await axios.put(
        `/setting/itemoperationsetting/${itemOperationSetting._id}`,
        itemOperationSetting,
      )
      dispatch({ type: UPDATE_ITEM_OPERATION_SETTING, payload: data })
      toast.success('Settings are updated successfully')
    } catch (error) {
      toast.error(
        'Failed to load data from server. Please restart Raspberry Pi',
        { autoClose: false },
      )
    }
  }
}
