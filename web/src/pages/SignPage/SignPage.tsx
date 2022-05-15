import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const SignPage = () => {
  return (
    <>
      <MetaTags title="Sign" description="Sign page" />

      <h1>SignPage</h1>
      <p>
        Find me in <code>./web/src/pages/SignPage/SignPage.tsx</code>
      </p>
      <p>
        My default route is named <code>sign</code>, link to me with `
        <Link to={routes.sign()}>Sign</Link>`
      </p>
    </>
  )
}

export default SignPage
