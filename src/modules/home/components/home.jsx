import React from 'react'
import PropTypes from 'prop-types'
import {Container, Menu, Header, Search} from 'semantic-ui-react'

import './home.scss'
import LayoutWithMenu from '../../layoutWithMenu/components/layoutWithMenu'
import NewsView from '../../news/components/newsView'

class Home extends React.Component {

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div className="layout container">
        <Container>
          <Header as="h1">Muzweb</Header>
          <LayoutWithMenu>
            <NewsView/>
          </LayoutWithMenu>
          {this.props.children}
        </Container>
      </div>
    )
  }

}

Home.propTypes = {
  children: PropTypes.node
}

export default Home
