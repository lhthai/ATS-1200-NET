import axios from 'axios'
import { toast } from 'react-toastify'
import { GET_SUMMARY_REPORT, GET_SUMMARY_REPORT_SUCCESS } from './action_types'

export const getSummaryReport = (firstItem, secondItem, fromDate, toDate) => {
  return async dispatch => {
    dispatch({ type: GET_SUMMARY_REPORT })
    try {
      let baseUrl = ''
      if (secondItem !== '') {
        baseUrl = `/weighing/report/${
          firstItem === '' ? 'truckNumber' : firstItem
        }/${secondItem}/${fromDate.toISOString()}/${toDate.toISOString()}`
      } else {
        baseUrl = `/weighing/report/${
          firstItem === '' ? 'truckNumber' : firstItem
        }/${fromDate.toISOString()}/${toDate.toISOString()}`
      }
      const { data } = await axios.get(baseUrl)
      dispatch({ type: GET_SUMMARY_REPORT_SUCCESS, payload: data })
    } catch (error) {
      toast.error(
        'Failed to load data from server. Please restart Raspberry Pi',
        { autoClose: false },
      )
    }
  }
}

export const test = () => {}
