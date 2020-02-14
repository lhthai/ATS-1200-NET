import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from '../../actions/master/brandActions'
import CustomTable from './common/CustomTable'

const BrandMaster = () => {
  const items = useSelector(state => state.brands.payload)
  const isLoading = useSelector(state => state.brands.isLoading)
  const dispatch = useDispatch()

  return (
    <CustomTable
      items={items}
      isLoading={isLoading}
      dispatch={dispatch}
      tableName="Brand Master"
      getItems={getBrands}
      createItem={createBrand}
      updateItem={updateBrand}
      deleteItem={deleteBrand}
    />
  )
}

export default BrandMaster
