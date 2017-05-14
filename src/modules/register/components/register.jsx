import React from 'react'
import PropTypes from 'prop-types'
import {Container, Menu, Header, Form, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import './register.scss'

class Register extends React.Component {

    constructor() {
        super();
        this.credentials = { login: '', password: '' };
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
            <div className="register container">
                <Container textAlign={'center'}>
                    <Header as="h1">Muzweb</Header>
                    <Form className="register-form" onSubmit={this.submit}>
                        <Form.Field>
                            <label className="login-label">Login</label>
                            <input onChange={this.changeLogin} placeholder='Login'/>
                        </Form.Field>
                        <Form.Field>
                            <label className="password-label">Password</label>
                            <input onChange={this.changePassword} placeholder='Password'/>
                        </Form.Field>
                    </Form>
                    <Button className="register-button" onClick={this.submit}>Register</Button>
                    <div>Have an account? <Link to="/">Login</Link>
                    </div>
                </Container>
            </div>
        );
    }

    submit() {
        console.log(this.credentials);
        this.props.history.push('/');
    }

}

export default Register