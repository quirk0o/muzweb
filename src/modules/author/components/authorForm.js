import React from 'react'
import AuthorService from '../../../services/AuthorService'
import LayoutWithMenu from 'modules/layoutWithMenu/components/layoutWithMenu'
import {Container, Menu, Header, Form, Button, Dropdown} from 'semantic-ui-react'

import './authorForm.scss'

class AuthorForm extends React.Component {

  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: ''
    }

    this.handleCreate = this.handleCreate.bind(this)
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
  }

  handleCreate() {
    const {firstName, lastName} = this.state
    const newArtist = {firstName, lastName}

    AuthorService.createAuthor(newArtist)
    this.props.history.push('/home')
  }

  handleFirstNameChange(event) {
    this.setState({
      firstName: event.target.value
    })
  }

  handleLastNameChange(event) {
    this.setState({
      lastName: event.target.value
    })
  }

  render() {
    return (
      <LayoutWithMenu>
        <div className="authorForm container">
          <Container textAlign={'center'}>
            <Header as="h1" className="authorForm-header">New Artist</Header>
            <Form className="authorForm-form" onSubmit={this.handleCreate}>
              <Form.Field>
                <label className="authorForm-label">First Name</label>
                <input onChange={this.handleFirstNameChange} placeholder='...' />
              </Form.Field>
              <Form.Field>
                <label className="authorForm-label">Last Name</label>
                <input onChange={this.handleLastNameChange} placeholder='...' />
              </Form.Field>
            </Form>
            <Button className="authorForm-button" onClick={this.handleCreate}>Add</Button>
          </Container>
        </div>
      </LayoutWithMenu>
    )
  }

}

export default AuthorForm