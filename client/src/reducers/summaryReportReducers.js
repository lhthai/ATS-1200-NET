import {
  GET_SUMMARY_REPORT,
  GET_SUMMARY_REPORT_SUCCESS,
} from '../actions/action_types'

const initialState = {
  payload: [],
  isLoading: false,
}

const summaryReportReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUMMARY_REPORT:
      return { ...state, isLoading: true }
    case GET_SUMMARY_REPORT_SUCCESS:
      return { ...state, isLoading: false, payload: action.payload }
    default:
      return state
  }
}

export default summaryReportReducers
