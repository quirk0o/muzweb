import moment from 'moment'
import React from 'react'
import AlbumService from '../../../services/AlbumService'
import AuthorService from '../../../services/AuthorService'
import LayoutWithMenu from 'modules/layoutWithMenu/components/layoutWithMenu'
import {Container, Menu, Header, Form, Button, Dropdown} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'

import './albumForm.scss'
import 'react-datepicker/dist/react-datepicker.css'

class AlbumForm extends React.Component {

  constructor() {
    super()
    this.state = {
      name: '',
      author: {},
      description: '',
      releaseDate: moment(),
      possibleAuthors: []
    }

    this.handleCreate = this.handleCreate.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleReleaseDateChange = this.handleReleaseDateChange.bind(this)
  }

  componentDidMount() {
    AuthorService.getAll(0, 10).then(authors => this.setState({possibleAuthors: authors}))
  }

  handleCreate() {
    const {name, author, description, releaseDate} = this.state
    const newAlbum = {name, author, description, releaseDate: releaseDate.format('YYYY-MM-DD')}

    AlbumService.createAlbum(newAlbum)
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

  handleReleaseDateChange(date) {
    this.setState({
      releaseDate: date
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
        return {text: fullName, value: el}
      })

    return (
      <LayoutWithMenu>
        <div className="albumForm container">
          <Container textAlign={'center'}>
            <Header as="h1" className="albumForm-header">New Album</Header>
            <Form className="albumForm-form" onSubmit={this.handleCreate}>
              <Form.Field>
                <label className="albumForm-label">Album Name</label>
                <input onChange={this.handleNameChange} placeholder='...' />
                <label className="albumForm-label">Album Description</label>
                <textarea onChange={this.handleDescriptionChange} rows={4} placeholder='...' />
                <label className="albumForm-label">Album Release Date</label>
                <DatePicker
                  selected={this.state.releaseDate}
                  onChange={this.handleReleaseDateChange}
                />
              </Form.Field>
            </Form>
            <div className="albumForm-segment">
              <Dropdown
                className="albumForm-dropdown"
                options={possibleAuthors}
                placeholder="author"
                onChange={this.handleAuthorChange}
              />
              <Button className="albumForm-button" onClick={this.handleCreate}>Add</Button>
            </div>
          </Container>
        </div>
      </LayoutWithMenu>
    )
  }

}

export default AlbumForm