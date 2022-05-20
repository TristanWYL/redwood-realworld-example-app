import { configureStore } from '@reduxjs/toolkit'

type Tab = 'global' | 'feed' | 'tag'
type Action = {
  type: string
  payload: any
}
type State = {
  selectedTab: Tab
  tag: string
}
type TabSwitch = (tab: Tab, tag: string) => Action
const initialState: State = { selectedTab: 'global', tag: '#' }
export const tabSwitch: TabSwitch = (tab, tag = '#') => {
  return {
    type: `tab/${tab}`,
    payload: tag,
  }
}

function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'tab/global':
    case 'tab/feed':
      return {
        ...state,
        // and update the copy with the new value
        selectedTab: action.payload,
      }
    case 'tab/tag':
      return {
        ...state,
        // and update the copy with the new value
        selectedTab: 'tag',
        tag: action.payload,
      }
    default:
      return state
  }

  return state
}

// export `store`
export default configureStore({
  reducer,
})
