import { Link, routes, navigate } from '@redwoodjs/router'
// import { useMutation } from '@redwoodjs/web'
import {
  Form,
  TextField,
  TextAreaField,
  Submit,
  FieldError,
  FormError,
  PasswordField,
} from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { useEffect, useState } from 'react'
import { toast } from '@redwoodjs/web/toast'
import { useMutation } from '@redwoodjs/web'

const UPDATE_USER = gql`
  mutation UpdateUserProfile($input: UpdateUserInput!) {
    user: updateUser(input: $input) {
      id
    }
  }
`

const SettingPage = () => {
  const { logOut, currentUser, reauthenticate } = useAuth()
  const [update, { loading, error }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      reauthenticate()
      toast.success('Update successfully!')
      navigate(routes.home())
    },
    // onError: (error) => {
    //   toast.error(error.message)
    // },
  })
  const onSubmit = async (input) => {
    update({ variables: { input } })
  }
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <Form onSubmit={onSubmit} error={error}>
              <FormError
                error={error}
                wrapperClassName="form-error rw-input-error"
              />
              <fieldset>
                <fieldset className="form-group">
                  <TextField
                    name="image"
                    className="form-control"
                    placeholder="URL of profile picture"
                    defaultValue={currentUser?.image}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <TextField
                    name="username"
                    validation={{ required: false }}
                    errorClassName="form-control form-control-lg rw-input-error"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    defaultValue={currentUser?.username}
                  />
                  <FieldError name="username" className="rw-field-error" />
                </fieldset>
                <fieldset className="form-group">
                  <TextAreaField
                    name="bio"
                    className="form-control form-control-lg"
                    placeholder="Short bio about you"
                    defaultValue={currentUser?.bio}
                  ></TextAreaField>
                </fieldset>
                <fieldset className="form-group">
                  <TextField
                    name="email"
                    validation={{
                      required: true,
                      pattern: {
                        value:
                          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                        message: 'Email format error',
                      },
                    }}
                    errorClassName="form-control form-control-lg rw-input-error"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    defaultValue={currentUser?.email}
                  />
                  <FieldError name="email" className="rw-field-error" />
                </fieldset>
                <fieldset className="form-group">
                  <PasswordField
                    name="password"
                    validation={{ required: false }}
                    errorClassName="form-control form-control-lg rw-input-error"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    defaultValue=""
                  />
                </fieldset>
                <Submit
                  disabled={loading}
                  className="btn btn-lg pull-xs-right btn-primary"
                >
                  Update Settings
                </Submit>
              </fieldset>
            </Form>
            <hr />
            <button className="btn btn-outline-danger" onClick={logOut}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingPage
