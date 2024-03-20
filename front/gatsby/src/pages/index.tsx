import * as React from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'

const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      <p>
        <Link to="/about/">about</Link>
      </p>
      <p>
        <Link to="/gotodo/">go todo</Link>
      </p>
      <p>I'm making this by following the Gatsby Tutorial.</p>
    </Layout>
  )
}

export const Head = () => (
<>
  <title>Home Page</title>
  <link rel="stylesheet" href="https://fonts.xz.style/serve/inter.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css" />
</>
)

export default IndexPage