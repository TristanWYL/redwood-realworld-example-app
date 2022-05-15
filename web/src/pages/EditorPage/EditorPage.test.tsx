import { render } from '@redwoodjs/testing/web'

import EditorPage from './EditorPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EditorPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditorPage />)
    }).not.toThrow()
  })
})
