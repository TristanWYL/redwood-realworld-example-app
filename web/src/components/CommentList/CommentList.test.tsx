import { render } from '@redwoodjs/testing/web'

import CommentList from './CommentList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CommentList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CommentList />)
    }).not.toThrow()
  })
})
