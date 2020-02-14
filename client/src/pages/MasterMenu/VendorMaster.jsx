import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getVendors,
  createVendor,
  updateVendor,
  deleteVendor,
} from '../../actions/master/vendorActions'
import CustomTable from './common/CustomTable'

const VendorMaster = () => {
  const items = useSelector(state => state.vendors.payload)
  const isLoading = useSelector(state => state.vendors.isLoading)
  const dispatch = useDispatch()

  return (
    <CustomTable
      items={items}
      isLoading={isLoading}
      dispatch={dispatch}
      tableName="Vendor Master"
      getItems={getVendors}
      createItem={createVendor}
      updateItem={updateVendor}
      deleteItem={deleteVendor}
    />
  )
}

export default VendorMaster
