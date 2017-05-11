import React from 'react'
import PropTypes from 'prop-types'
import {Container, Menu, Header} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

import './home.scss'

const Layout = ({children}) => (
    <div className="layout container">
        <Container>
            <Menu color="teal" className="top navbar">
                <Menu.Item as={NavLink} exact to="/home">Home</Menu.Item>
                <Menu.Item as={NavLink} to="/">Logout</Menu.Item>
            </Menu>

            <Header as="h1">Muzweb</Header>
            {children}
        </Container>
    </div>
)

Layout.propTypes = {
    children: PropTypes.node
}

export default Layout