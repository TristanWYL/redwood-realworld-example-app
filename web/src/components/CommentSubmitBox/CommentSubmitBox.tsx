import {
  Form,
  TextAreaField,
  Submit,
  FieldError,
  useForm,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
import { useContext } from 'react'
import { CommentContext } from 'src/misc/CommentContextProvider'

const CREATE_COMMENT = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
    }
  }
`
const CommentSubmitBox = ({ article }) => {
  const formMethods = useForm()
  const { currentUser } = useAuth()
  const { refetch } = useContext(CommentContext)
  const [create, { loading, error }] = useMutation(CREATE_COMMENT, {
    onCompleted: () => {
      toast.success('Thank you for your comment!')
      formMethods.reset()
      refetch()
    },
  })
  return (
    <Form
      className="card comment-form"
      formMethods={formMethods}
      error={error}
      onSubmit={(input) => {
        input.articleId = article.id
        create({
          variables: { input },
        })
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && e.target.type !== 'textarea') {
          e.preventDefault()
        }
      }}
    >
      <div className="card-block">
        <TextAreaField
          name="body"
          className="form-control"
          placeholder="Write a comment..."
          rows="3"
          validation={{
            required: { value: true, message: 'Comment cannot be empty!' },
            minLength: {
              value: 10,
              message: 'Comment cannot be less than 10 characters!',
            },
            maxLength: {
              value: 100,
              message: 'Comment cannot be more than 100 characters!',
            },
          }}
        ></TextAreaField>
        <FieldError name="body" className="rw-field-error" />
      </div>
      <div className="card-footer">
        <img
          src={currentUser?.image}
          className="comment-author-img"
          alt="avatar"
        />
        <Submit disabled={loading} className="btn btn-sm btn-primary">
          Post Comment
        </Submit>
      </div>
    </Form>
  )
}

export default CommentSubmitBox
