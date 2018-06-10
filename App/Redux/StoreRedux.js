import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchStoreDetail: ['storeId'],

  storeSuccess: ['data', 'storeId'],
  storeFailure: null
})

export const StoreTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  stores: {},

  fetching: false,
  error: null
})

/* ------------- Selectors ------------- */

export const StoreSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const request = (state) =>
  state.merge({ ...state, fetching: true, error: null })

export const success = (state, { data, storeId }) => {
  const stores = { ...state.stores }
  stores[storeId] = data

  return state.merge({ stores, fetching: false, error: null }, { deep: true })
}

export const failure = (state, { error }) =>
  state.merge({ ...state, fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_STORE_DETAIL]: request,
  [Types.STORE_SUCCESS]: success,
  [Types.STORE_FAILURE]: failure
})