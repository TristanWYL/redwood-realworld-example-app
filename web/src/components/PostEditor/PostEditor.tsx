import {
  Form,
  TextField,
  TextAreaField,
  Submit,
  FieldError,
  FormError,
  useForm,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'

const CREATE_ARTICLE = gql`
  mutation CreateArticleMutation($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
    }
  }
`
const UPDATE_ARTICLE = gql`
  mutation UpdateArticleMutation($id: Int!, $input: UpdateArticleInput!) {
    post: updateArticle(id: $id, input: $input) {
      id
      slug
    }
  }
`

const PostEditor = ({ post }) => {
  const formMethods = useForm()
  const { currentUser } = useAuth()
  const [tagSet, setTagSet] = useState(
    new Set(post?.tagList.map((tag) => tag.name))
  )
  const [create, { loading: loadingCreate, error: errorForCreate }] =
    useMutation(CREATE_ARTICLE, {
      onCompleted: () => {
        toast.success('Thank you for creating new article!')
        formMethods.reset()
        setTagSet(new Set())
      },
    })
  const [update, { loading: loadingUpdate, error: errorForUpdate }] =
    useMutation(UPDATE_ARTICLE, {
      onCompleted: (data) => {
        toast.success('Thank you for your updates!')
        // formMethods.reset()
        // setTagSet(new Set())
        navigate(routes.post({ slug: data?.post?.slug }))
      },
    })
  const onSubmit = (input) => {
    input.authorId = currentUser?.id
    input.tagList = [...tagSet]
    if (post) {
      update({ variables: { id: post.id, input } })
    } else {
      create({
        variables: { input },
      })
    }
  }
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <Form
              onSubmit={onSubmit}
              formMethods={formMethods}
              error={errorForCreate || errorForUpdate}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.type !== 'textarea') {
                  e.preventDefault()
                }
              }}
            >
              <FormError
                error={errorForCreate || errorForUpdate}
                wrapperClassName="form-error rw-input-error"
              />
              <fieldset>
                <fieldset className="form-group">
                  <TextField
                    name="title"
                    validation={{ required: true }}
                    errorClassName="form-control form-control-lg rw-input-error"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    defaultValue={post?.title}
                  />
                  <FieldError name="title" className="rw-field-error" />
                </fieldset>

                <fieldset className="form-group">
                  <TextField
                    name="description"
                    validation={{ required: true }}
                    errorClassName="form-control form-control-lg rw-input-error"
                    className="form-control"
                    placeholder="What's this article about?"
                    defaultValue={post?.description}
                  />
                  <FieldError name="description" className="rw-field-error" />
                </fieldset>

                <fieldset className="form-group">
                  <TextAreaField
                    name="body"
                    validation={{ required: true }}
                    errorClassName="form-control form-control-lg rw-input-error"
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    defaultValue={post?.body}
                  ></TextAreaField>
                  <FieldError name="body" className="rw-field-error" />
                </fieldset>

                <fieldset className="form-group">
                  <TextField
                    name="tagList"
                    className="form-control"
                    placeholder="Enter tags"
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        setTagSet(new Set(tagSet.add(e.target.value)))
                        e.target.value = ''
                      }
                    }}
                  />
                  <div className="tag-list">
                    {[...tagSet].map((tag) => (
                      <span className="tag-default tag-pill" key={tag}>
                        <i
                          className="ion-close-round"
                          onKeyUp={() => {}}
                          role="link"
                          tabIndex={0}
                          onClick={() => {
                            tagSet.delete(tag)
                            setTagSet(new Set(tagSet))
                          }}
                        ></i>
                        {tag}
                      </span>
                    ))}
                  </div>
                </fieldset>

                <Submit
                  disabled={loadingCreate || loadingUpdate}
                  className="btn btn-lg pull-xs-right btn-primary"
                >
                  Publish Article
                </Submit>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostEditor
