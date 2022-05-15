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

const CREATE_ARTICLE = gql`
  mutation CreateArticleMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const onSubmit = (input) => {
  console.log(input)
}

const EditorPage = () => {
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <Form onSubmit={onSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <TextField
                    name="title"
                    validation={{ required: true }}
                    errorClassName="rw-input rw-input-error"
                    className="form-control form-control-lg rw-input"
                    placeholder="Article Title"
                  />
                  <FieldError name="title" className="rw-field-error" />
                </fieldset>

                <fieldset className="form-group">
                  <TextField
                    name="description"
                    validation={{ required: true }}
                    errorClassName="rw-input rw-input-error"
                    className="form-control rw-input"
                    placeholder="What's this article about?"
                  />
                  <FieldError name="description" className="rw-field-error" />
                </fieldset>

                <fieldset className="form-group">
                  <TextAreaField
                    name="body"
                    validation={{ required: true }}
                    errorClassName="rw-input rw-input-error"
                    className="form-control rw-input"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                  ></TextAreaField>
                  <FieldError name="body" className="rw-field-error" />
                </fieldset>

                <fieldset className="form-group">
                  <TextField
                    name="tagList"
                    className="form-control rw-input"
                    placeholder="Enter tags"
                    errorClassName="rw-input rw-input-error"
                  />
                  <div className="tag-list"></div>
                </fieldset>

                <Submit className="btn btn-lg pull-xs-right btn-primary">
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
