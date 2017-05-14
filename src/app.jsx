import React from 'react'
import {Route} from 'react-router-dom'

import {Layout} from 'modules/layout'
import {Login} from 'modules/login'
import {Home} from 'modules/home'
import {Register} from 'modules/register'
import {Component} from 'modules/example'

const App = () => (
  <Layout>
    <Route exact path="/" component={Login}/>
    <Route path="/register" component={Register} />
    <Route path="/home" component={Home} />
  </Layout>
);

export default App
