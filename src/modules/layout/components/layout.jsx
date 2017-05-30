import React from 'react'
import PropTypes from 'prop-types'
import {Container, Menu, Header} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

import './layout.scss'

const Layout = ({children}) => (
    <div className="layout container">
        <Container className="app-container">
            {children}
        </Container>
    </div>
)

Layout.propTypes = {
    children: PropTypes.node
}

export default Layout