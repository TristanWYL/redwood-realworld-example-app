import { render } from '@redwoodjs/testing/web'

import PostEditor from './PostEditor'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PostEditor', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PostEditor />)
    }).not.toThrow()
  })
})
