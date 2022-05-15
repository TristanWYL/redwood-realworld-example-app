import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import ArticleForm from 'src/components/Article/ArticleForm'

const CREATE_ARTICLE_MUTATION = gql`
  mutation CreateArticleMutation($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
    }
  }
`

const NewArticle = () => {
  const [createArticle, { loading, error }] = useMutation(CREATE_ARTICLE_MUTATION, {
    onCompleted: () => {
      toast.success('Article created')
      navigate(routes.articles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, { authorId: parseInt(input.authorId), })
    createArticle({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Article</h2>
      </header>
      <div className="rw-segment-main">
        <ArticleForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewArticle
