import React from 'react';
import TrackService from '../../../services/TrackService';
import AuthorService from '../../../services/AuthorService';
import {Container, Menu, Header, Form, Button, Dropdown} from 'semantic-ui-react'

import './trackForm.scss';

class TrackForm extends React.Component {

  constructor() {
    super();
    this.state = {
      name: '',
      author: {},
      possibleAuthors: [],
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
  }

  componentDidMount() {
    AuthorService.getAll(0, 10).then(authors => this.setState({possibleAuthors: authors}));
  }

  handleCreate() {
    const {name, author} = this.state;
    const newTrack = {name, author};

    TrackService.createTrack(newTrack);
    this.props.history.push('/home');
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value,
    })
  }

  handleAuthorChange(event, data) {
    this.setState({
      author: data.value,
    })
  }


  render() {
    const possibleAuthors = this.state.possibleAuthors
                                .map(el => {
                                    const fullName = el.firstName + " " + (el.lastName || '');
                                    console.log(el);
                                    return {text: fullName, value: el}
                                });
    console.log(possibleAuthors);
    return (
      <div className="trackForm container">
        <Container textAlign={'center'}>
          <Header as="h1" className="trackForm-header">New Track</Header>
          <Form className="trackForm-form" onSubmit={this.handleCreate}>
            <Form.Field>
              <label className="trackForm-label">Track Name</label>
              <input onChange={this.handleNameChange} placeholder='...' />
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
    );
  }

}

export default TrackForm;