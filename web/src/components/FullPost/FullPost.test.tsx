import { render } from '@redwoodjs/testing/web'

import FullPost from './FullPost'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FullPost', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FullPost />)
    }).not.toThrow()
  })
})
