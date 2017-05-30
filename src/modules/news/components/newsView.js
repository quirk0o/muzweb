import React from 'react'
import NewsService from '../../../services/NewsService'
import {Container, Header} from 'semantic-ui-react'
import LayoutWithMenu from 'modules/layoutWithMenu/components/layoutWithMenu'

import './newsView.scss'

class NewsView extends React.Component {

  constructor() {
    super()
    this.state = {
      news: []
    }
  }

  componentDidMount() {
    NewsService.getAll(0, 10).then(news => this.setState({news: news}))
  }

  render() {
    const news = this.state.news.sort((news1, news2)=>{return news1.timestamp < news2.timestamp}).map(function (news) {
      let date = new Date(news.timestamp);
      let dateToPrint = "Date: "+ date.getDate()+"."+date.getMonth()+"."+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()
      return <div className="news-single-view">
        <div className="news-single-header">
          <Header as="h3" className="news-single-title">{news.title}<span className="news-single-timestamp">{dateToPrint}</span></Header>
        </div>
        <div className="news-single-content">{news.content}</div>
      </div>
    })
    return (
      <LayoutWithMenu>
        <div className="newsView container">
          <Container>
            <Header as="h1" className="newsView-header">News</Header>
            <div className="news-all-view">{news}</div>
          </Container>
        </div>
      </LayoutWithMenu>
    )
  }

}

export default NewsView