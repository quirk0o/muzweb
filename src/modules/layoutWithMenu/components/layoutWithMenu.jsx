import React from 'react'
import PropTypes from 'prop-types'
import {Container, Menu, Header, Search} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

import './layoutWithMenu.scss'
import TrackService from '../../../services/TrackService'

class LayoutWithMenu extends React.Component {

  constructor() {
    super()
    this.state = {
      trackPrefix: '',
      tracks: []
    }

    this.onSearchPrefixChange = this.onSearchPrefixChange.bind(this)
    this.onResultSelect = this.onResultSelect.bind(this)
  }

  onSearchPrefixChange(event, prefix) {
    if (prefix === '') return
    TrackService.searchForTrack(prefix).then(tracks => this.setState({tracks}))
  }

  onResultSelect(event, data) {
    console.log(data)
    this.context.router.history.push(`/track/${data.id}`)
  }

  render() {
    const searchResults = this.state.tracks
      .map(el => {
        const authorName = el.author.firstName + ' ' + (el.author.lastName || '')
        return {title: el.name, description: `Author: ${authorName}`, id: el.id}
      })
    return (
      <div className="layout container">
        <Container>
          <Menu color="teal" className="top navbar">
            <Menu.Item as={NavLink} exact to="/home">Muzweb</Menu.Item>
            <Menu.Item as={NavLink} exact to="/addTrack">Add Track</Menu.Item>
            <Menu.Item as={NavLink} exact to="/addAuthor">Add Artist</Menu.Item>
            <div className="menu-right">
              <Search onSearchChange={this.onSearchPrefixChange}
                      results={searchResults}
                      onResultSelect={this.onResultSelect} />
              <Menu.Item as={NavLink} to="/">Logout</Menu.Item>
            </div>
          </Menu>

          {this.props.children}
        </Container>
      </div>
    )
  }
}

LayoutWithMenu.propTypes = {
  children: PropTypes.node
}

LayoutWithMenu.contextTypes = {
  router: PropTypes.object.isRequired
}

export default LayoutWithMenu