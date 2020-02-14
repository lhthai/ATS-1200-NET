import {
  GET_TRUCKS_MASTER,
  GET_TRUCKS_MASTER_SUCCESS,
  CREATE_TRUCK_MASTER,
  UPDATE_TRUCK_MASTER,
  DELETE_TRUCK_MASTER,
} from '../../actions/action_types'

const initialState = {
  payload: [],
  isLoading: false,
}

const truckReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRUCKS_MASTER:
      return { ...state, isLoading: true }
    case GET_TRUCKS_MASTER_SUCCESS:
      return { ...state, isLoading: false, payload: action.payload }
    case CREATE_TRUCK_MASTER:
      return {
        ...state,
        payload: [...state.payload, action.payload],
      }
    case UPDATE_TRUCK_MASTER:
      return {
        ...state,
        payload: state.payload.map(item => {
          if (item._id === action.payload._id) return action.payload
          return item
        }),
      }
    case DELETE_TRUCK_MASTER:
      return {
        ...state,
        payload: state.payload.filter(item => item._id !== action.payload._id),
      }
    default:
      return state
  }
}

export default truckReducers
