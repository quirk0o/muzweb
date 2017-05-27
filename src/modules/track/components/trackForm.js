import React from 'react'
import TrackService from '../../../services/TrackService'
import AuthorService from '../../../services/AuthorService'
import LayoutWithMenu from 'modules/layoutWithMenu/components/layoutWithMenu'
import {Container, Menu, Header, Form, Button, Dropdown} from 'semantic-ui-react'

import './trackForm.scss'

class TrackForm extends React.Component {

  constructor() {
    super()
    this.state = {
      name: '',
      author: {},
      description: '',
      possibleAuthors: []
    }

    this.handleCreate = this.handleCreate.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
  }

  componentDidMount() {
    AuthorService.getAll(0, 10).then(authors => this.setState({possibleAuthors: authors}))
  }

  handleCreate() {
    const {name, author, description} = this.state
    const newTrack = {name, author, description}

    TrackService.createTrack(newTrack)
    this.props.history.push('/home')
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    })
  }

  handleAuthorChange(event, data) {
    this.setState({
      author: data.value
    })
  }

  render() {
    const possibleAuthors = this.state.possibleAuthors
      .map(el => {
        const fullName = el.firstName + ' ' + (el.lastName || '')
        console.log(el)
        return {text: fullName, value: el}
      })
    console.log(possibleAuthors)
    return (
      <LayoutWithMenu>
        <div className="trackForm container">
          <Container textAlign={'center'}>
            <Header as="h1" className="trackForm-header">New Track</Header>
            <Form className="trackForm-form" onSubmit={this.handleCreate}>
              <Form.Field>
                <label className="trackForm-label">Track Name</label>
                <input onChange={this.handleNameChange} placeholder='...' />
                <label className="trackForm-label">Track Description</label>
                <textarea onChange={this.handleDescriptionChange} rows={4} placeholder='...' />
              </Form.Field>
            </Form>
            <div className="trackForm-segment">
              <Dropdown
                className="trackForm-dropdown"
                options={possibleAuthors}
                placeholder="author"
                onChange={this.handleAuthorChange}
              />
              <Button className="trackForm-button" onClick={this.handleCreate}>Add</Button>
            </div>
          </Container>
        </div>
      </LayoutWithMenu>
    )
  }

}

export default TrackForm