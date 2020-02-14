import {
  GET_ITEM_OPERATION_SETTING,
  GET_ITEM_OPERATION_SETTING_SUCCESS,
  UPDATE_ITEM_OPERATION_SETTING,
} from '../../actions/action_types'

const initialState = {
  payload: {
    _id: '',
    item1: {},
    item2: {},
    item3: {},
    item4: {},
    item5: {},
    item6: {},
  },
  isLoading: false,
}

const itemOperationSettingReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM_OPERATION_SETTING:
      return { ...state, isLoading: true }
    case GET_ITEM_OPERATION_SETTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        payload: {
          ...state.payload,
          _id: action.payload._id,
          item1: action.payload.item1,
          item2: action.payload.item2,
          item3: action.payload.item3,
          item4: action.payload.item4,
          item5: action.payload.item5,
          item6: action.payload.item6,
        },
      }
    case UPDATE_ITEM_OPERATION_SETTING:
      return {
        ...state,
        payload: action.payload,
      }
    default:
      return state
  }
}

export default itemOperationSettingReducers
