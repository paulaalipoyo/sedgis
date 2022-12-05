import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import classnames from 'classnames';
import axios from 'axios';
import NotificationAlert from 'react-notification-alert';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
} from 'reactstrap';
import AuthHeader from 'components/Headers/AuthHeader.js';

function Login() {
    const [focusedEmail, setfocusedEmail] = React.useState(false);
    const [focusedPassword, setfocusedPassword] = React.useState(false);
    const notificationAlertRef = React.useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [alert, setalert] = React.useState(false);

    console.log({ email, password });
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleApi = () => {
        console.log({ email, password });
        axios
            .post('https://reqres.in/api/login', {
                email: email,
                password: password
            })
            .then((result) => {
                localStorage.setItem('token', result.data.token);
                console.log(result.data);
                successAlert();
            })
            .catch((error) => {
                notifyFailed('danger');
                console.log(error);
            });
    };

    const successAlert = () => {
        setalert(
            <ReactBSAlert
                custom
                success
                style={{ display: 'block', marginTop: '-100px' }}
                title="Welcome!"
                onConfirm={() => setalert(history.push('/admin'))}
                onCancel={() => setalert(history.push('/admin'))}
                confirmBtnBsStyle="default"
                confirmBtnText="Ok"
                btnSize="">
                Successfully Login
            </ReactBSAlert>
        );
    };
    const notifyFailed = (type) => {
        let options = {
            place: 'tc',
            message: (
                <div className="alert-text">
                    <span className="alert-title" data-notify="title">
                        {' '}
                        Wrong Credentials!
                    </span>
                    <span data-notify="message">
                        Invalid email and password
                    </span>
                </div>
            ),
            type: type,
            icon: 'ni ni-bell-55',
            autoDismiss: 4
        };
        notificationAlertRef.current.notificationAlert(options);
    };
    return (
        <>
            {alert}
            <div className="rna-wrapper">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <AuthHeader />
            <Container className="mt--8 pb-5">
                <Row className="justify-content-center">
                    <Col lg="5" md="7">
                        <Card className="bg-secondary border-0 mb-0">
                            <CardHeader className="bg-transparent pb-5">
                                <div className="text-muted text-center mt-2 mb-3">
                                    <Col
                                        className="collapse-brand center"
                                        xs="5">
                                        <span className="App-logo center"></span>
                                        <img
                                            alt="..."
                                            width={100}
                                            height={100}
                                            src={require('assets/img/brand/argon-react.png')}
                                        />
                                    </Col>
                                </div>
                                <Row className="justify-content-center">
                                    <h2 className="text-blue">
                                        SOCIO ECONOMIC DATABASE
                                    </h2>
                                </Row>
                            </CardHeader>
                            <CardBody className="px-lg-5 py-lg-5">
                                <form role="form">
                                    <FormGroup
                                        className={classnames('mb-3', {
                                            focused: focusedEmail
                                        })}>
                                        <InputGroup className="input-group-merge input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Email"
                                                type="email"
                                                value={email}
                                                onFocus={() =>
                                                    setfocusedEmail(true)
                                                }
                                                onBlur={() =>
                                                    setfocusedEmail(true)
                                                }
                                                required
                                                onChange={handleEmail}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup
                                        className={classnames({
                                            focused: focusedPassword
                                        })}>
                                        <InputGroup className="input-group-merge input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-lock-circle-open" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Password"
                                                value={password}
                                                onFocus={() =>
                                                    setfocusedPassword(true)
                                                }
                                                onBlur={() =>
                                                    setfocusedPassword(true)
                                                }
                                                onChange={handlePassword}
                                                required
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <div className="custom-control custom-control-alternative custom-checkbox">
                                        <input
                                            className="custom-control-input"
                                            id=" customCheckLogin"
                                            type="checkbox"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor=" customCheckLogin">
                                            <span className="text-muted">
                                                Remember me
                                            </span>
                                        </label>
                                    </div>
                                    <div className="text-center">
                                        <Button
                                            className="my-4"
                                            color="primary"
                                            onClick={handleApi}
                                            fullWidth
                                            variant="contained">
                                            Sign in
                                        </Button>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                        <Row className="mt-3"></Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Login;
