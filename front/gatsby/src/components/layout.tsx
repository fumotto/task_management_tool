import * as React from 'react'
import { Link } from 'gatsby'
import Login from './loginview'

const Layout = ({ pageTitle, children }: { pageTitle: string, children: any }) => {
    return (
        <div>
            <Login></Login>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
            <main>
                <h1>{pageTitle}</h1>
                {children}
            </main>
        </div>
    )
}

export default Layout