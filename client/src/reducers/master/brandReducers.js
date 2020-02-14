import {
  GET_BRANDS_MASTER,
  GET_BRANDS_MASTER_SUCCESS,
  CREATE_BRAND_MASTER,
  UPDATE_BRAND_MASTER,
  DELETE_BRAND_MASTER,
} from '../../actions/action_types'

const initialState = {
  payload: [],
  isLoading: false,
}

const brandReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_BRANDS_MASTER:
      return { ...state, isLoading: true }
    case GET_BRANDS_MASTER_SUCCESS:
      return { ...state, isLoading: false, payload: action.payload }
    case CREATE_BRAND_MASTER:
      return {
        ...state,
        payload: [...state.payload, action.payload],
      }
    case UPDATE_BRAND_MASTER:
      return {
        ...state,
        payload: state.payload.map(item => {
          if (item._id === action.payload._id) return action.payload
          return item
        }),
      }
    case DELETE_BRAND_MASTER:
      return {
        ...state,
        payload: state.payload.filter(item => item._id !== action.payload._id),
      }
    default:
      return state
  }
}

export default brandReducers
