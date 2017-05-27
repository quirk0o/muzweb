import React from 'react'
import PropTypes from 'prop-types'
import {Container, Menu, Header, Search} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
import TrackService from '../../../services/TrackService'

import './home.scss'
import LayoutWithMenu from '../../layoutWithMenu/components/layoutWithMenu'

class Home extends React.Component {

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
    this.props.history.push(`/track/${data.id}`)
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
          <Header as="h1">Muzweb</Header>
          <LayoutWithMenu/>
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
