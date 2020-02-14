import {
  GET_MEASUREMENT_DATA_LIST,
  GET_MEASUREMENT_DATA_LIST_SUCCESS,
  DELETE_MEASUREMENT_DATA_LIST,
  UPDATE_MEASUREMENT_DATA_LIST,
} from '../actions/action_types'

const initialState = {
  payload: [],
  isLoading: false,
}

const measurementDataListReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEASUREMENT_DATA_LIST:
      return { ...state, isLoading: true }
    case GET_MEASUREMENT_DATA_LIST_SUCCESS:
      return { ...state, isLoading: false, payload: action.payload }
    case UPDATE_MEASUREMENT_DATA_LIST:
      return {
        ...state,
        payload: state.payload.map(item => {
          if (item._id === action.payload._id) return action.payload
          return item
        }),
      }
    case DELETE_MEASUREMENT_DATA_LIST:
      return {
        ...state,
        payload: state.payload.filter(item => item._id !== action.payload._id),
      }
    default:
      return state
  }
}

export default measurementDataListReducers
