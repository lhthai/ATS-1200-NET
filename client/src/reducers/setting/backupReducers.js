import { GET_USB_DRIVES } from '../../actions/action_types'

const initialState = {
  payload: [],
}

const backupReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_USB_DRIVES:
      return { ...state, payload: action.payload }
    default:
      return state
  }
}

export default backupReducers
