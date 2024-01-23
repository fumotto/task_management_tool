import * as React from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'

const AboutPage = () => {
    return (
        <Layout pageTitle="About Me">
            <Link to="/">Back to Home</Link>
            <p>Hi there! I'm the proud creator of this site, which I built with Gatsby.</p>
        </Layout>
    )
}

export const Head = () => (
    <>
        <title>About Me</title>
        <link rel="stylesheet" href="https://fonts.xz.style/serve/inter.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css" />
    </>
)

export default AboutPage