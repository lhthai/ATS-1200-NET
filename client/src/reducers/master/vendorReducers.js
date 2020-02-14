import {
  GET_VENDORS_MASTER,
  GET_VENDORS_MASTER_SUCCESS,
  CREATE_VENDOR_MASTER,
  UPDATE_VENDOR_MASTER,
  DELETE_VENDOR_MASTER,
} from '../../actions/action_types'

const initialState = {
  payload: [],
  isLoading: false,
}

const vendorReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_VENDORS_MASTER:
      return { ...state, isLoading: true }
    case GET_VENDORS_MASTER_SUCCESS:
      return { ...state, isLoading: false, payload: action.payload }
    case CREATE_VENDOR_MASTER:
      return {
        ...state,
        payload: [...state.payload, action.payload],
      }
    case UPDATE_VENDOR_MASTER:
      return {
        ...state,
        payload: state.payload.map(item => {
          if (item._id === action.payload._id) return action.payload
          return item
        }),
      }
    case DELETE_VENDOR_MASTER:
      return {
        ...state,
        payload: state.payload.filter(item => item._id !== action.payload._id),
      }
    default:
      return state
  }
}

export default vendorReducers
