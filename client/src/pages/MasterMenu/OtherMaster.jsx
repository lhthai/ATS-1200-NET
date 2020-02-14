import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getOthers,
  createOther,
  updateOther,
  deleteOther,
} from '../../actions/master/otherActions'
import CustomTable from './common/CustomTable'

const OtherMaster = () => {
  const items = useSelector(state => state.others.payload)
  const isLoading = useSelector(state => state.others.isLoading)
  const dispatch = useDispatch()

  return (
    <CustomTable
      items={items}
      isLoading={isLoading}
      dispatch={dispatch}
      tableName="Other Master"
      getItems={getOthers}
      createItem={createOther}
      updateItem={updateOther}
      deleteItem={deleteOther}
    />
  )
}

export default OtherMaster
