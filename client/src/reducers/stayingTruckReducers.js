import {
  GET_STAYING_TRUCKS,
  GET_STAYING_TRUCKS_SUCCESS,
  UPDATE_STAYING_TRUCK,
  DELETE_STAYING_TRUCK,
  CREATE_STAYING_TRUCK,
} from '../actions/action_types'

const initialState = {
  payload: [],
  isLoading: false,
}

const stayingTruckReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_STAYING_TRUCKS:
      return { ...state, isLoading: true }
    case GET_STAYING_TRUCKS_SUCCESS:
      return { ...state, isLoading: false, payload: action.payload }
    case CREATE_STAYING_TRUCK:
      return {
        ...state,
        payload: [...state.payload, action.payload],
      }
    case UPDATE_STAYING_TRUCK:
      return {
        ...state,
        payload: state.payload.map(item => {
          if (item._id === action.payload._id) return action.payload
          return item
        }),
      }
    case DELETE_STAYING_TRUCK:
      return {
        ...state,
        payload: state.payload.filter(item => item._id !== action.payload._id),
      }
    default:
      return state
  }
}

export default stayingTruckReducers
