import { render } from '@redwoodjs/testing/web'

import CommentSubmitBox from './CommentSubmitBox'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CommentSubmitBox', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CommentSubmitBox />)
    }).not.toThrow()
  })
})
