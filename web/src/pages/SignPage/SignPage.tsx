import { Link, routes, navigate } from '@redwoodjs/router'
// import { useMutation } from '@redwoodjs/web'
import {
  Form,
  TextField,
  Submit,
  FieldError,
  FormError,
  PasswordField,
} from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { useEffect, useState } from 'react'
import { toast } from '@redwoodjs/web/toast'

// const CREATE_USER = gql`
//   mutation CreateUserMutation($input: CreateUserInput!) {
//     createUser(input: $input) {
//       id
//     }
//   }
// `

const SignPage = () => {
  const { isAuthenticated, signUp, reauthenticate, currentUser } = useAuth()
  const isSignInPage = window.location.href.includes('login')
  const logIn = async (attributes) => {
    const { email, password } = attributes
    const response = await fetch(global.RWJS_API_DBAUTH_URL, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        method: 'login',
      }),
    })
    const logInResponse = await response.json()
    reauthenticate()
    return logInResponse
  }
  // const [create, { loading, error }] = useMutation(CREATE_USER, {
  //   onCompleted: () => {
  //     navigate(routes.home())
  //   },
  // })
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (isAuthenticated) {
      toast.success(`Welcome, ${currentUser.username}!`)
      navigate(routes.home())
    }
  }, [isAuthenticated])
  let error
  const onSubmit = async (input) => {
    // create({ variables: { input } })
    setLoading(true)
    let response
    if (isSignInPage) {
      response = await logIn(input)
    } else {
      response = await signUp(input)
    }
    if (response.error) {
      toast.error(response.error)
    }
    setLoading(false)
  }
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">
              Sign {isSignInPage ? 'in' : 'up'}
            </h1>
            <p className="text-xs-center">
              <Link to={isSignInPage ? routes.register() : routes.login()}>
                {isSignInPage ? 'Need' : 'Have'} an account?
              </Link>
            </p>

            <Form onSubmit={onSubmit} error={error}>
              <FormError
                error={error}
                wrapperClassName="form-error rw-input-error"
              />
              {!isSignInPage && (
                <fieldset className="form-group">
                  <TextField
                    name="username"
                    validation={{ required: true }}
                    errorClassName="form-control form-control-lg rw-input-error"
                    className="form-control form-control-lg"
                    placeholder="Your Name"
                  />
                  <FieldError name="username" className="rw-field-error" />
                </fieldset>
              )}
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
                />
                <FieldError name="email" className="rw-field-error" />
              </fieldset>
              <fieldset className="form-group">
                <PasswordField
                  name="password"
                  validation={{ required: true }}
                  errorClassName="form-control form-control-lg rw-input-error"
                  className="form-control form-control-lg"
                  placeholder="Password"
                />
                <FieldError name="password" className="rw-field-error" />
              </fieldset>
              <Submit
                disabled={loading}
                className="btn btn-lg pull-xs-right btn-primary"
              >
                Sign {isSignInPage ? 'in' : 'up'}
              </Submit>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignPage
