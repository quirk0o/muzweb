import React from 'react'
import NewsService from '../../../services/NewsService'
import LayoutWithMenu from 'modules/layoutWithMenu/components/layoutWithMenu'
import {Container, Menu, Header, Form, Button, Dropdown} from 'semantic-ui-react'

import './newsForm.scss'

class NewsForm extends React.Component {

  constructor() {
    super()
    this.state = {
      title: '',
      content: '',
      timestamp: 0
    }

    this.handleCreate = this.handleCreate.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
  }

  handleCreate() {
    let time = new Date().getTime()
    this.state.timestamp = time
    const {title, content, timestamp} = this.state
    const newNews = {title, content, timestamp}

    NewsService.createNews(newNews)
    this.props.history.push('/home')
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    })
  }

  handleContentChange(event, data) {
    this.setState({
      content: event.target.value
    })
  }

  render() {
    return (
      <LayoutWithMenu>
        <div className="newsForm container">
          <Container textAlign={'center'}>
            <Header as="h1" className="newsForm-header">New News</Header>
            <Form className="newsForm-form" onSubmit={this.handleCreate}>
              <Form.Field>
                <label className="newsForm-label">News Title</label>
                <input onChange={this.handleTitleChange} placeholder='...' />
                <label className="newsForm-label">News Description</label>
                <textarea onChange={this.handleContentChange} rows={4} placeholder='...' />
              </Form.Field>
            </Form>
            <div className="newsForm-segment">
              <Button className="newsForm-button" onClick={this.handleCreate}>Add</Button>
            </div>
          </Container>
        </div>
      </LayoutWithMenu>
    )
  }

}

export default NewsForm