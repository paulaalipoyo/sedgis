import { Link } from 'react-router-dom';
import React from 'react';
// nodejs library that concatenates classes
import classnames from 'classnames';
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
} from 'reactstrap';
// core components
import AuthHeader from 'components/Headers/AuthHeader.js';

function Login() {
    const [focusedEmail, setfocusedEmail] = React.useState(false);
    const [focusedPassword, setfocusedPassword] = React.useState(false);
    return (
        <>
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
                                <Form role="form">
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
                                                onFocus={() =>
                                                    setfocusedEmail(true)
                                                }
                                                onBlur={() =>
                                                    setfocusedEmail(true)
                                                }
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
                                                type="password"
                                                onFocus={() =>
                                                    setfocusedPassword(true)
                                                }
                                                onBlur={() =>
                                                    setfocusedPassword(true)
                                                }
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
                                            to="/admin"
                                            tag={Link}
                                            type="button">
                                            Sign in
                                        </Button>
                                    </div>
                                </Form>
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
