import { render } from '@redwoodjs/testing/web'

import SignPage from './SignPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SignPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignPage />)
    }).not.toThrow()
  })
})
