import {
  GET_OTHERS_MASTER,
  GET_OTHERS_MASTER_SUCCESS,
  CREATE_OTHER_MASTER,
  UPDATE_OTHER_MASTER,
  DELETE_OTHER_MASTER,
} from '../../actions/action_types'

const initialState = {
  payload: [],
  isLoading: false,
}

const otherReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_OTHERS_MASTER:
      return { ...state, isLoading: true }
    case GET_OTHERS_MASTER_SUCCESS:
      return { ...state, isLoading: false, payload: action.payload }
    case CREATE_OTHER_MASTER:
      return {
        ...state,
        payload: [...state.payload, action.payload],
      }
    case UPDATE_OTHER_MASTER:
      return {
        ...state,
        payload: state.payload.map(item => {
          if (item._id === action.payload._id) return action.payload
          return item
        }),
      }
    case DELETE_OTHER_MASTER:
      return {
        ...state,
        payload: state.payload.filter(item => item._id !== action.payload._id),
      }
    default:
      return state
  }
}

export default otherReducers
