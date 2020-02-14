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
} from '../actions/action_types'

const initialState = {
  weighing: {},
  maxSlipNo: 0,
  stayingTrucks: [],
  measurementData: [],
  isLoading: false,
}

const weighingReducers = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_WEIGHING:
      return {
        ...state,
        weighing: action.payload,
      }
    case UPDATE_WEIGHING:
      return {
        ...state,
        weighing: action.payload,
        stayingTrucks: state.stayingTrucks.filter(
          item => item._id !== action.payload._id,
        ),
      }
    case GET_MAX_SLIPNO:
      return { ...state, maxSlipNo: action.payload }
    case GET_STAYING_TRUCKS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_STAYING_TRUCKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stayingTrucks: action.payload,
      }
    case CREATE_STAYING_TRUCK:
      return {
        ...state,
        stayingTrucks: [...state.stayingTrucks, action.payload],
      }
    case UPDATE_STAYING_TRUCK:
      return {
        ...state,
        stayingTrucks: state.payload.map(item => {
          if (item._id === action.payload._id) return action.payload
          return item
        }),
      }
    case DELETE_STAYING_TRUCK:
      return {
        ...state,
        stayingTrucks: state.stayingTrucks.filter(
          item => item._id !== action.payload._id,
        ),
      }
    case GET_MEASUREMENT_DATA_LIST:
      return { ...state, isLoading: true }
    case GET_MEASUREMENT_DATA_LIST_SUCCESS:
      return { ...state, isLoading: false, measurementData: action.payload }
    case UPDATE_MEASUREMENT_DATA_LIST:
      return {
        ...state,
        measurementData: state.measurementData.map(item => {
          if (item._id === action.payload._id) return action.payload
          return item
        }),
      }
    case DELETE_MEASUREMENT_DATA_LIST:
      return {
        ...state,
        measurementData: state.measurementData.filter(
          item => item._id !== action.payload._id,
        ),
      }
    default:
      return state
  }
}

export default weighingReducers
