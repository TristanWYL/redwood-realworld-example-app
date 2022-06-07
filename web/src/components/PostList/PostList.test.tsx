import { render } from '@redwoodjs/testing/web'

import PostList from './PostList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PostList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PostList />)
    }).not.toThrow()
  })
})
