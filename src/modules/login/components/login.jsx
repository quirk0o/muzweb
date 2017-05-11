import React from 'react'
import {Container, Menu, Header, Form, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import './login.scss'

class Login extends React.Component {

    constructor() {
        super();
        this.credentials = {login: '', password: ''};
        this.changeLogin = this.changeLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.submit = this.submit.bind(this);
    }

    changeLogin(event) {
        this.credentials.login = event.target.value;
    }

    changePassword(event) {
        this.credentials.password = event.target.value;
    }

    render() {
        return (
            <div className="login container">
                <Container textAlign={'center'}>
                    <Header as="h1">Muzweb</Header>
                    <Form className="login-form" onSubmit={this.submit}>
                        <Form.Field>
                            <label className="login-label">Login</label>
                            <input onChange={this.changeLogin} placeholder='Login'/>
                        </Form.Field>
                        <Form.Field>
                            <label className="password-label">Password</label>
                            <input onChange={this.changePassword} placeholder='Password'/>
                        </Form.Field>
                    </Form>
                    <Button className="login-button" onClick={this.submit}>Login</Button>
                    <div>No account? <Link to="/register">Register</Link>
                    </div>
                </Container>
            </div>
        );
    }

    submit() {
        console.log(this.credentials);
        this.props.history.push('/home');

    }

}

export default Login