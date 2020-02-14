import { combineReducers } from 'redux'
import brandReducers from './master/brandReducers'
import vendorReducers from './master/vendorReducers'
import destinationReducers from './master/destinationReducers'
import otherReducers from './master/otherReducers'
import truckReducers from './master/truckReducers'
import stayingTruckReducers from './stayingTruckReducers'
import itemOperationSettingReducers from './setting/itemOperationSettingReducers'
import measurementDataListReducers from './measurementDataListReducers'
import weighingReducers from './weighingReducers'
import weighingOperationSettingReducers from './setting/weighingOperationSettingReducers'
import summaryReportReducers from './summaryReportReducers'
import backupReducers from './setting/backupReducers'

const rootReducer = combineReducers({
  brands: brandReducers,
  vendors: vendorReducers,
  destinations: destinationReducers,
  others: otherReducers,
  trucks: truckReducers,
  stayingTrucks: stayingTruckReducers,
  itemOperationSetting: itemOperationSettingReducers,
  measurementDataList: measurementDataListReducers,
  weighing: weighingReducers,
  weighingOperationSetting: weighingOperationSettingReducers,
  summaryReport: summaryReportReducers,
  backup: backupReducers,
})

export default rootReducer
