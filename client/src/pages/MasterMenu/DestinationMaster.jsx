import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
} from '../../actions/master/destinationActions'
import CustomTable from './common/CustomTable'

const DestinationMaster = () => {
  const items = useSelector(state => state.destinations.payload)
  const isLoading = useSelector(state => state.destinations.isLoading)
  const dispatch = useDispatch()

  return (
    <CustomTable
      items={items}
      isLoading={isLoading}
      dispatch={dispatch}
      tableName="Destination Master"
      getItems={getDestinations}
      createItem={createDestination}
      updateItem={updateDestination}
      deleteItem={deleteDestination}
    />
  )
}

export default DestinationMaster
