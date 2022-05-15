import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_ARTICLE_MUTATION = gql`
  mutation DeleteArticleMutation($id: Int!) {
    deleteArticle(id: $id) {
      id
    }
  }
`

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Article = ({ article }) => {
  const [deleteArticle] = useMutation(DELETE_ARTICLE_MUTATION, {
    onCompleted: () => {
      toast.success('Article deleted')
      navigate(routes.articles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete article ' + id + '?')) {
      deleteArticle({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Article {article.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{article.id}</td>
            </tr><tr>
              <th>Slug</th>
              <td>{article.slug}</td>
            </tr><tr>
              <th>Title</th>
              <td>{article.title}</td>
            </tr><tr>
              <th>Description</th>
              <td>{article.description}</td>
            </tr><tr>
              <th>Body</th>
              <td>{article.body}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(article.createdAt)}</td>
            </tr><tr>
              <th>Updated at</th>
              <td>{timeTag(article.updatedAt)}</td>
            </tr><tr>
              <th>Author id</th>
              <td>{article.authorId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editArticle({ id: article.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(article.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Article
