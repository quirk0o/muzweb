import React from 'react'
import {Route} from 'react-router-dom'

import {Layout} from 'modules/layout'
import {Login} from 'modules/login'
import {Home} from 'modules/home'
import {Register} from 'modules/register'
import TrackForm from 'modules/track/components/trackForm'
import NewsForm from 'modules/news/components/newsForm'
import TrackView from 'modules/track/components/trackView'
import {AuthorForm} from 'modules/author'

const App = () => (
  <Layout>
    <Route exact path="/" component={Login}/>
    <Route path="/register" component={Register} />
    <Route path="/home" component={Home} />
    <Route path="/addTrack" component={TrackForm} />
    <Route path="/addAuthor" component={AuthorForm} />
    <Route path="/addNews" component={NewsForm} />
    <Route path="/track/:id" component={TrackView} />
  </Layout>
);

export default App
