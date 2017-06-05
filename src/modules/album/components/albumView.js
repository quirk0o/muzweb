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

    this.onRate = this.onRate.bind(this)
    this.handleVote = this.handleVote.bind(this)
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

  onRate(event, data) {
    this.setState({chosenRating: data.rating})
  }

  handleVote() {
    AlbumService.voteForAlbum(this.state.album.id, this.state.chosenRating)
      .then(res => {
        this.setState({album: res})
      })
  }

  render() {
    const {album} = this.state
    const authorName = !!album.author ? album.author.firstName + ' ' + (album.author.lastName || '') : ''
    return (
      <LayoutWithMenu>
        <div className="albumView container">
          <Container className="albumView-main" textAlign={'center'}>
            <Header as="h3" className="albumView-header">Title: {album.name}<Popup
              trigger={<Button className="albumView-rating-score">Rating: {!!album.rating ? album.rating.toFixed(2) : album.rating}</Button>}
              flowing
              hoverable
            >
              <Grid centered divided columns={1}>
                <Grid.Column textAlign='center'>
                  <div className="albumView-ratingSegment">
                    <div><Rating className="albumView-rating" icon='star' defaultRating={0} maxRating={10} onRate={this.onRate} /></div>
                    <div><Button className="albumView-button" onClick={this.handleVote}>Vote</Button></div>
                  </div>
                </Grid.Column>
              </Grid>
            </Popup></Header>
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