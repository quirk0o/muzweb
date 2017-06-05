import React, {PropTypes} from 'react'
import AuthorService from '../../../services/AuthorService'
import {Link} from 'react-router-dom'
import {Container, Header, Button, Rating, Popup, Grid, List} from 'semantic-ui-react'
import LayoutWithMenu from 'modules/layoutWithMenu/components/layoutWithMenu'

import './authorView.scss'

class AuthorView extends React.Component {
  constructor() {
    super()
    this.state = {
      author: {}
    }
  }

  componentWillMount() {
    const {id} = this.props.match.params
    AuthorService.getOne(id).then(author => this.setState({author}))
  }

  componentWillReceiveProps(nextProps) {
    const {id} = this.props.match.params
    const nextId = nextProps.match.params.id
    if (nextId !== id) {
      AuthorService.getOne(nextId).then(author => this.setState({author}))
    }
  }

  render() {
    const {author} = this.state
    const authorName = author.firstName + ' ' + (author.lastName || '')
    return (
      <LayoutWithMenu>
        <div className="authorView container">
          <Container className="authorView-main" textAlign={'center'}>
            <Header as="h3" className="authorView-header">{authorName}</Header>
            {author.albumList
              ? <List divided animated selection ordered>
                  {author.albumList.map(
                    album => (
                      <List.Item icon="note" as={Link} to={`/albums/${album.id}`}>{album.name}</List.Item>
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

export default AuthorView