import React, {PropTypes} from 'react'
import {Link} from 'react-router-dom'
import TrackService from '../../../services/TrackService'
import {Container, Header, Button, Rating, Popup, Grid} from 'semantic-ui-react'
import LayoutWithMenu from 'modules/layoutWithMenu/components/layoutWithMenu'

import './trackView.scss'

class TrackView extends React.Component {

  constructor() {
    super()
    this.state = {
      track: {album: {}}
    }

    this.onRate = this.onRate.bind(this)
    this.handleVote = this.handleVote.bind(this)
  }

  componentDidMount() {
    const {id} = this.props.match.params
    TrackService.getOne(id).then(track => this.setState({track}))
  }

  onRate(event, data) {
    this.setState({chosenRating: data.rating})
  }

  handleVote() {
    TrackService.voteForTrack(this.state.track.id, this.state.chosenRating)
      .then(res => {
        this.setState({track: res})
      })
  }

  render() {
    const {track} = this.state
    const authorName = !!track.author ? track.album.author.firstName + ' ' + (track.album.author.lastName || '') : ''
    return (
      <LayoutWithMenu>
        <div className="trackView container">
          <Container className="trackView-main" textAlign={'center'}>
            <Header as="h3" className="trackView-header">Title: {track.name} <Popup
              trigger={<Button className="trackView-rating-score">Rating: {!!track.rating ? track.rating.toFixed(2) : track.rating}</Button>}
              flowing
              hoverable
            >
              <Grid centered divided columns={1}>
                <Grid.Column textAlign='center'>
                  <div className="trackView-ratingSegment">
                    <div><Rating className="trackView-rating" icon='star' defaultRating={0} maxRating={10} onRate={this.onRate} /></div>
                    <div><Button className="trackView-button" onClick={this.handleVote}>Vote</Button></div>
                  </div>
                </Grid.Column>
              </Grid>
            </Popup></Header>
            <Header as="h4">Author: {authorName}</Header>
            <Header as="h4">Album: <Link to={`/albums/${track.album.id}`}>{track.album.name}</Link></Header>
            <div> {track.description} </div>
          </Container>
        </div>
      </LayoutWithMenu>
    )
  }

}

export default TrackView