import { Link, routes } from '@redwoodjs/router'
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
import { toast, Toaster } from '@redwoodjs/web/toast'
import slugify from 'slugify'

const CREATE_ARTICLE = gql`
  mutation CreateArticleMutation($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
    }
  }
`

const EditorPage = () => {
  const formMethods = useForm()
  const [create, { loading, error }] = useMutation(CREATE_ARTICLE, {
    onCompleted: () => {
      toast.success('Thank you for your article!')
      formMethods.reset()
    },
  })
  const onSubmit = (input) => {
    // TODO: update the authorId here
    input.authorId = 1
    input.slug = `${slugify(input.title)}-${input.authorId}`
    delete input.tagList
    create({
      variables: { input: input },
    })
    console.log(input)
  }
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <Toaster />
            <Form onSubmit={onSubmit} formMethods={formMethods} error={error}>
              <FormError
                error={error}
                wrapperClassName="form-error rw-input-error"
              />
              <fieldset>
                <fieldset className="form-group">
                  <TextField
                    name="title"
                    validation={{ required: true }}
                    errorClassName="rw-input rw-input-error"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                  />
                  <FieldError name="title" className="rw-field-error" />
                </fieldset>

                <fieldset className="form-group">
                  <TextField
                    name="description"
                    validation={{ required: true }}
                    errorClassName="rw-input rw-input-error"
                    className="form-control"
                    placeholder="What's this article about?"
                  />
                  <FieldError name="description" className="rw-field-error" />
                </fieldset>

                <fieldset className="form-group">
                  <TextAreaField
                    name="body"
                    validation={{ required: true }}
                    errorClassName="rw-input rw-input-error"
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                  ></TextAreaField>
                  <FieldError name="body" className="rw-field-error" />
                </fieldset>

                <fieldset className="form-group">
                  <TextField
                    name="tagList"
                    className="form-control"
                    placeholder="Enter tags"
                    errorClassName="rw-input rw-input-error"
                  />
                  <div className="tag-list"></div>
                </fieldset>

                <Submit
                  disabled={loading}
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

export default EditorPage
