import { db } from 'src/lib/db'
import { DbAuthHandler } from '@redwoodjs/api'

export const handler = async (event, context) => {
  const forgotPasswordOptions = {
    // handler() is invoked after verifying that a user was found with the given
    // username. This is where you can send the user an email with a link to
    // reset their password. With the default dbAuth routes and field names, the
    // URL to reset the password will be:
    //
    // https://example.com/reset-password?resetToken=${user.resetToken}
    //
    // Whatever is returned from this function will be returned from
    // the `forgotPassword()` function that is destructured from `useAuth()`
    // You could use this return value to, for example, show the email
    // address in a toast message so the user will know it worked and where
    // to look for the email.
    handler: (user) => {
      return user
    },

    // How long the resetToken is valid for, in seconds (default is 24 hours)
    expires: 60 * 60 * 24,

    errors: {
      // for security reasons you may want to be vague here rather than expose
      // the fact that the email address wasn't found (prevents fishing for
      // valid email addresses)
      usernameNotFound: 'Username not found',
      // if the user somehow gets around client validation
      usernameRequired: 'Username is required',
    },
  }

  const loginOptions = {
    // handler() is called after finding the user that matches the
    // username/password provided at login, but before actually considering them
    // logged in. The `user` argument will be the user in the database that
    // matched the username/password.
    //
    // If you want to allow this user to log in simply return the user.
    //
    // If you want to prevent someone logging in for another reason (maybe they
    // didn't validate their email yet), throw an error and it will be returned
    // by the `logIn()` function from `useAuth()` in the form of:
    // `{ message: 'Error message' }`
    handler: (user) => {
      return user
    },

    errors: {
      usernameOrPasswordMissing: 'Both username and password are required',
      usernameNotFound: 'Username ${username} not found',
      // For security reasons you may want to make this the same as the
      // usernameNotFound error so that a malicious user can't use the error
      // to narrow down if it's the username or password that's incorrect
      incorrectPassword: 'Incorrect password for ${username}',
    },

    // How long a user will remain logged in, in seconds
    expires: 60 * 60 * 24 * 365 * 10,
  }

  const resetPasswordOptions = {
    // handler() is invoked after the password has been successfully updated in
    // the database. Returning anything truthy will automatically logs the user
    // in. Return `false` otherwise, and in the Reset Password page redirect the
    // user to the login page.
    handler: (user) => {
      return user
    },

    // If `false` then the new password MUST be different than the current one
    allowReusedPassword: true,

    errors: {
      // the resetToken is valid, but expired
      resetTokenExpired: 'resetToken is expired',
      // no user was found with the given resetToken
      resetTokenInvalid: 'resetToken is invalid',
      // the resetToken was not present in the URL
      resetTokenRequired: 'resetToken is required',
      // new password is the same as the old password (apparently they did not forget it)
      reusedPassword: 'Must choose a new password',
    },
  }

  const signupOptions = {
    // Whatever you want to happen to your data on new user signup. Redwood will
    // check for duplicate usernames before calling this handler. At a minimum
    // you need to save the `username`, `hashedPassword` and `salt` to your
    // user table. `userAttributes` contains any additional object members that
    // were included in the object given to the `signUp()` function you got
    // from `useAuth()`.
    //
    // If you want the user to be immediately logged in, return the user that
    // was created.
    //
    // If this handler throws an error, it will be returned by the `signUp()`
    // function in the form of: `{ error: 'Error message' }`.
    //
    // If this returns anything else, it will be returned by the
    // `signUp()` function in the form of: `{ message: 'String here' }`.
    handler: async ({ username, hashedPassword, userAttributes }) => {
      const { email } = userAttributes
      const user = await db.user.findUnique({
        where: { email },
      })
      if (user) {
        throw new Error('Your email is already in use.')
      }
      return db.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      })
    },

    errors: {
      // `field` will be either "username" or "password"
      fieldMissing: '${field} is required',
      usernameTaken: 'Username `${username}` already in use',
      emailTaken: 'Email `${email}` already in use',
    },
  }

  const _interopRequireDefault =
    require('@babel/runtime-corejs3/helpers/interopRequireDefault').default
  const _cryptoJs = _interopRequireDefault(require('crypto-js'))
  class MyDbAuthHandler extends DbAuthHandler {
    // To avoid modifying the 'user' table of the db,
    // we remove salt from rw
    _hashPassword(text, salt = null) {
      return [
        _cryptoJs.default
          .PBKDF2(text, 'c7febe9729c37c77595a842b7bbb31f7', {
            keySize: 256 / 32,
          })
          .toString(),
        'c7febe9729c37c77595a842b7bbb31f7',
      ]
    }

    // // return the data in a wanted format
    // _loginResponse(user, statusCode = 200) {
    //   const sessionData = {
    //     id: user[this.options.authFields.id],
    //     username: user[this.options.authFields.username],
    //     email: user.email,
    //     image: user.image,
    //   }
    //   const csrfToken = DbAuthHandler.CSRF_TOKEN
    //   return [
    //     sessionData,
    //     {
    //       'csrf-token': csrfToken,
    //       ...this._createSessionHeader(sessionData, csrfToken),
    //     },
    //     {
    //       statusCode,
    //     },
    //   ]
    // }

    async login() {
      const { email, password } = this.params
      const dbUser = await this.dbAccessor.findUnique({
        where: {
          email,
        },
      })
      if (dbUser == null || dbUser[this.options.authFields.id] == null) {
        throw new Error('Email or password is incorrect.')
      }
      if (
        dbUser[this.options.authFields.hashedPassword] !==
        this._hashPassword(password)[0]
      ) {
        throw new Error('Email or password is incorrect.')
      }
      const handlerUser = await this.options.login.handler(dbUser)
      return this._loginResponse(handlerUser)
    }
  }

  const authHandler = new MyDbAuthHandler(event, context, {
    // Provide prisma db client
    db: db,

    // The name of the property you'd call on `db` to access your user table.
    // ie. if your Prisma model is named `User` this value would be `user`, as in `db.user`
    authModelAccessor: 'user',

    // A map of what dbAuth calls a field to what your database calls it.
    // `id` is whatever column you use to uniquely identify a user (probably
    // something like `id` or `userId` or even `email`)
    authFields: {
      id: 'id',
      username: 'username',
      hashedPassword: 'password',
    },

    // Specifies attributes on the cookie that dbAuth sets in order to remember
    // who is logged in. See https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies
    cookie: {
      HttpOnly: true,
      Path: '/',
      SameSite: 'Strict',
      Secure: process.env.NODE_ENV !== 'development' ? true : false,

      // If you need to allow other domains (besides the api side) access to
      // the dbAuth session cookie:
      // Domain: 'example.com',
    },

    forgotPassword: forgotPasswordOptions,
    login: loginOptions,
    resetPassword: resetPasswordOptions,
    signup: signupOptions,
  })

  return await authHandler.invoke()
}
