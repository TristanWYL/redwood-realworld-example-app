import { render } from '@redwoodjs/testing/web'

import SettingPage from './SettingPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SettingPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SettingPage />)
    }).not.toThrow()
  })
})
