import React, {PropTypes} from 'react'
import AlbumService from '../../../services/AlbumService'
import {Link} from 'react-router-dom'
import {Container, Header, Button, Rating, Popup, Grid, List} from 'semantic-ui-react'
import LayoutWithMenu from 'modules/layoutWithMenu/components/layoutWithMenu'

import './albumView.scss'

class AlbumView extends React.Component {
  constructor() {
    super()
    this.state = {
      album: {
        author: {},
        name: '',
        description: '',
        releaseDate: '',
        tracks: []
      }
    }
  }

  componentWillMount() {
    const {id} = this.props.match.params
    AlbumService.getOne(id).then(album => this.setState({album}))
  }

  componentWillReceiveProps(nextProps) {
    const {id} = this.props.match.params
    const nextId = nextProps.match.params.id
    if (nextId !== id) {
      AlbumService.getOne(nextId).then(album => this.setState({album}))
    }
  }

  render() {
    const {album} = this.state
    const authorName = !!album.author ? album.author.firstName + ' ' + (album.author.lastName || '') : ''
    return (
      <LayoutWithMenu>
        <div className="albumView container">
          <Container className="albumView-main" textAlign={'center'}>
            <Header as="h3" className="albumView-header">Title: {album.name}</Header>
            <Header as="h4">Author: {authorName}</Header>
            <Header as="h4">Release Date: {album.releaseDate}</Header>
            <div> {album.description} </div>
            {album.tracks
              ? <List divided animated selection ordered>
                  {album.tracks.map(
                    track => (
                      <List.Item icon="note" as={Link} to={`/tracks/${track.id}`}>{track.name}</List.Item>
                    )
                  )}
                </List>
              : null
            }
          </Container>
        </div>
      </LayoutWithMenu>
    )
  }

}

export default AlbumView