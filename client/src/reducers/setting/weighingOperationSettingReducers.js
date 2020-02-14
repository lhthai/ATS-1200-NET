import {
  GET_WEIGHING_OPERATION_SETTING,
  GET_SERIAL_PORTS,
  UPDATE_WEIGHING_OPERATION_SETTING,
  GET_WEIGHING_OPERATION_SETTING_SUCCESS,
} from '../../actions/action_types'

const initialState = {
  isLoading: false,
  payload: {
    _id: '',
    maintenanceDataUpload: {},
    weighingOperationSetting: {},
    slipPrinterSetting: {},
    indicatorSetting: {},
  },
  serialPorts: [],
}

const weighingOperationSettingReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_WEIGHING_OPERATION_SETTING:
      return { ...state, isLoading: true }
    case GET_WEIGHING_OPERATION_SETTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        payload: {
          ...state.payload,
          _id: action.payload._id,
          maintenanceDataUpload: action.payload.maintenanceDataUpload,
          weighingOperationSetting: action.payload.weighingOperationSetting,
          slipPrinterSetting: action.payload.slipPrinterSetting,
          indicatorSetting: action.payload.indicatorSetting,
        },
      }
    case GET_SERIAL_PORTS:
      return {
        ...state,
        serialPorts: action.payload,
      }
    case UPDATE_WEIGHING_OPERATION_SETTING:
      return {
        ...state,
        payload: action.payload,
      }
    default:
      return state
  }
}

export default weighingOperationSettingReducers
