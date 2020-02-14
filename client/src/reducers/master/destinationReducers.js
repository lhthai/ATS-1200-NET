import {
  GET_DESTINATIONS_MASTER,
  GET_DESTINATIONS_MASTER_SUCCESS,
  CREATE_DESTINATION_MASTER,
  UPDATE_DESTINATION_MASTER,
  DELETE_DESTINATION_MASTER,
} from '../../actions/action_types'

const initialState = {
  payload: [],
  isLoading: false,
}

const destinationReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_DESTINATIONS_MASTER:
      return { ...state, isLoading: true }
    case GET_DESTINATIONS_MASTER_SUCCESS:
      return { ...state, isLoading: false, payload: action.payload }
    case CREATE_DESTINATION_MASTER:
      return {
        ...state,
        payload: [...state.payload, action.payload],
      }
    case UPDATE_DESTINATION_MASTER:
      return {
        ...state,
        payload: state.payload.map(item => {
          if (item._id === action.payload._id) return action.payload
          return item
        }),
      }
    case DELETE_DESTINATION_MASTER:
      return {
        ...state,
        payload: state.payload.filter(item => item._id !== action.payload._id),
      }
    default:
      return state
  }
}

export default destinationReducers
