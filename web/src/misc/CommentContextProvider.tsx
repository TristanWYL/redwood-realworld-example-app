import { createContext, useContext } from 'react'

type CommentContextType = {
  refetch: (arg: void) => void
  update?: (arg: CommentContextType) => void
}

const context: CommentContextType = {
  refetch: () => {
    throw new Error(
      'You must register a "refetch" hook via the `CommentContextProvider`'
    )
  },
  update: (arg) => {
    context.refetch = arg.refetch
  },
}

export const CommentContext = createContext<CommentContextType>(context)

export const CommentContextProvider = ({ children }) => {
  return (
    <CommentContext.Provider value={context}>
      {children}
    </CommentContext.Provider>
  )
}
