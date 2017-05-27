import React, {PropTypes} from 'react'
import TrackService from '../../../services/TrackService'
import {Container, Header, Form, Button, Rating, Segment} from 'semantic-ui-react'
import LayoutWithMenu from 'modules/layoutWithMenu/components/layoutWithMenu'

import './trackView.scss'

class TrackView extends React.Component {

  constructor() {
    super()
    this.state = {
      track: {}
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
    const authorName = !!track.author ? track.author.firstName + ' ' + (track.author.lastName || '') : ''
    return (
      <LayoutWithMenu>
        <div className="trackView container">
          <Container textAlign={'center'}>
            <Header as="h3" className="trackView-header">Title: {track.name}</Header>
            <Header as="h4" className="trackView-header">By {authorName}</Header>
            <div> {track.description} </div>
            <div className="trackView-ratingSegment">
              <span>Rating: {!!track.rating ? track.rating.toFixed(2) : track.rating}</span>
              <Rating className="trackView-rating" icon='star' defaultRating={0} maxRating={10} onRate={this.onRate} />
              <Button className="trackView-button" onClick={this.handleVote}>Vote</Button>
            </div>
          </Container>
        </div>
      </LayoutWithMenu>
    )
  }

}

export default TrackView