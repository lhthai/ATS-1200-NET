import axios from 'axios'
import { toast } from 'react-toastify'

export const autoCompleteMasterData = async (e, item, state, setState) => {
  const { name, value } = e.target
  setState({ ...state, [name]: value })
  if (value === '') {
    setState({ ...state, [name]: value, [item]: '' })
  } else {
    try {
      const { data } = await axios.get(`/${item}/${value}`)
      if (data.length > 0) {
        setState({
          ...state,
          [name]: value,
          [item]: data[0].name,
        })
      }
    } catch (error) {
      toast.error(
        'Failed to load data from server. Please restart Raspberry Pi',
        { autoClose: false },
      )
    }
  }
}

export const autoCompleteTruckMasterData = async (
  e,
  state,
  setState,
  initialState,
) => {
  const { name, value } = e.target
  setState({ ...state, [name]: value })
  if (value === '') {
    setState(initialState)
  } else {
    try {
      const { data } = await axios.get(`/truck/${value}`)
      if (data.length > 0) {
        const { emptyWeight, ...truckMaster } = data[0]
        setState({
          ...state,
          ...truckMaster,
        })
      }
    } catch (error) {
      toast.error(
        'Failed to load data from server. Please restart Raspberry Pi',
        { autoClose: false },
      )
    }
  }
}
