import { createContext, useContext } from 'react'

type FollowAndLikeContextType = {
  followed?: boolean
  favorited?: boolean
  favoriteCount?: number
  update?: (followed, favorited, favoriteCount) => void
}

const context: FollowAndLikeContextType = {
  followed: undefined,
  favorited: undefined,
  favoriteCount: undefined,
  update: (followed, favorited, favoriteCount) => {
    context.followed = followed
    context.favorited = favorited
    context.favoriteCount = favoriteCount
  },
}

export const setFollowAndLikeContextByPost = (post) => {
  context.followed = post.author.followedByMe
  context.favorited = post.favoritedByMe
  context.favoriteCount = post.favoriteCount
  return context
}

const FollowAndLikeContext = createContext<FollowAndLikeContextType>({
  ...context,
  update: () => {
    throw new Error('FollowAndLikeContext has not be initialized!')
  },
})

export const FollowAndLikeContextProvider = ({ post, children }) => {
  return (
    <FollowAndLikeContext.Provider value={setFollowAndLikeContextByPost(post)}>
      {children}
    </FollowAndLikeContext.Provider>
  )
}

export const useFollowAndLikeContext = () => useContext(FollowAndLikeContext)
