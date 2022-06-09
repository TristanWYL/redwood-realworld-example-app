import { render } from '@redwoodjs/testing/web'

import CommentCard from './CommentCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CommentCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CommentCard />)
    }).not.toThrow()
  })
})
