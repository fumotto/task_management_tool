import * as React from 'react'
import Layout from '../components/layout'
import TodoList from './tasks/todo/todoList'
import { Link } from 'gatsby'

const AboutPage = () => {
    return (
        <>
            <Link to="/">Back to Home</Link>
            <TodoList></TodoList>
        </>
    )
}

export const Head = () => (
    <>
        <title>TODO</title>
        <link rel="stylesheet" href="https://fonts.xz.style/serve/inter.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css" />
    </>
)

export default AboutPage