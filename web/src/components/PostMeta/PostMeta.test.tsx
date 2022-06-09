import { render } from '@redwoodjs/testing/web'

import PostMeta from './PostMeta'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PostMeta', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PostMeta />)
    }).not.toThrow()
  })
})
