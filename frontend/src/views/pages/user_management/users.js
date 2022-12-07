import axios from 'axios';
import { useEffect, useState } from 'react';
import NotificationAlert from 'react-notification-alert';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import React from 'react';
import {
    Card,
    CardHeader,
    UncontrolledTooltip,
    Button,
    Container,
    Row,
    Col,
    Form,
    Input,
    Modal,
    Label,
    FormGroup
} from 'reactstrap';
import SimpleHeader from 'components/Headers/SimpleHeader.js';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

const { REACT_APP_API_URL } = process.env;

function UsersSetup() {
    const [addModalshow, setAddModal] = React.useState(false);
    const [users, setUsers] = useState([]);
    const notificationAlertRef = React.useRef(false);
    const [inputs, setInputs] = useState({});
    const [roleList, setRoleslist] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    useEffect(() => {
        getRoles();
        getUsers();
        getUserId();
    }, []);

    const getRoles = () => {
        axios
            .get(`${REACT_APP_API_URL}/roles.php/getroles`)
            .then((response) => {
                const { data } = response;
                if (response.status === 200) {
                    //check the api call is success by stats code 200,201 ...etc
                    setRoleslist(data);
                } else {
                    //error handle section
                }
            })
            .catch((error) => console.log(error));
    };

    function getUserId(id) {
        axios
            .get(`${REACT_APP_API_URL}/povertystats.php/povertystat/${id}`)
            .then(function (response) {
                console.log(response.data);
                setInputs(response.data);
            });
    }

    function getUsers() {
        axios
            .get(`${REACT_APP_API_URL}/users-list.php/users`)
            .then(function (response) {
                console.log(response.data);
                setUsers(response.data);
            });
    }

    const addHandleSubmit = () => {
        axios
            .post(`${REACT_APP_API_URL}/users-list.php/users/save`, inputs)
            .then(function (response) {
                console.log(response.data);
                getUsers(response.data);
            });
    };

    const updateNotify = (type) => {
        let options = {
            place: 'tc',
            message: (
                <div className="alert-text">
                    <span className="alert-title" data-notify="title">
                        {' '}
                        User role successfully updated!
                    </span>
                </div>
            ),
            type: type,
            icon: 'ni ni-check-bold',
            autoDismiss: 4
        };
        notificationAlertRef.current.notificationAlert(options);
    };

    const updateStatus = (type) => {
        let options = {
            place: 'tc',
            message: (
                <div className="alert-text">
                    <span className="alert-title" data-notify="title">
                        {' '}
                        User status updated!
                    </span>
                </div>
            ),
            type: type,
            icon: 'ni ni-check-bold',
            autoDismiss: 4
        };
        notificationAlertRef.current.notificationAlert(options);
    };

    const addnotify = (type) => {
        let options = {
            place: 'tc',
            message: (
                <div className="alert-text">
                    <span className="alert-title" data-notify="title">
                        {' '}
                        Successfully Added!
                    </span>
                    <span data-notify="message">
                        Entry Added on Poverty Statistics
                    </span>
                </div>
            ),
            type: type,
            icon: 'ni ni-check-bold',
            autoDismiss: 4
        };
        notificationAlertRef.current.notificationAlert(options);
    };

    const componentRef = React.useRef(null);

    const pagination = paginationFactory({
        page: 1,
        alwaysShowAllBtns: true,
        showTotal: true,
        withFirstAndLast: true,
        sizePerPageRenderer: ({
            options,
            currSizePerPage,
            onSizePerPageChange
        }) => (
            <div className="dataTables_length" id="datatable-basic_length">
                <label>
                    Show{' '}
                    {
                        <select
                            name="datatable-basic_length"
                            aria-controls="datatable-basic"
                            className="form-control form-control-sm"
                            onChange={(e) =>
                                onSizePerPageChange(e.target.value)
                            }>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    }{' '}
                    entries.
                </label>
            </div>
        )
    });

    const onAfterSaveCell = (id) => {
        axios
            .put(`${REACT_APP_API_URL}/users-list.php/users/${id}/edit`)
            .then(function (response) {
                console.log(response.data);
            });
        updateNotify('success');
    };

    function afterFilter(newResult, newFilters) {
        console.log(newResult);
        console.log(newFilters);
    }

    function columnHeadFormat(
        column,
        colIndex,
        { sortElement, filterElement }
    ) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {column.text}
                {sortElement}
                {filterElement}
            </div>
        );
    }

    return (
        <>
            {alert}
            <div className="rna-wrapper">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <SimpleHeader />
            <Container className="mt--6" fluid>
                <Row>
                    <div className="col">
                        <Card>
                            <CardHeader className="border-0">
                                <Row>
                                    <Col xs="6">
                                        <h3 className="mb-0">Users</h3>
                                    </Col>
                                    <Col className="text-right" xs="6">
                                        <Button
                                            className="btn-round btn-icon"
                                            color="primary"
                                            id="tooltip443412080"
                                            onClick={() => setAddModal(true)}
                                            size="sm">
                                            <span className="btn-inner--icon mr-1">
                                                <i className="fas fa-user-plus" />
                                            </span>
                                            <span className="btn-inner--text">
                                                Add Users
                                            </span>
                                        </Button>
                                        <UncontrolledTooltip
                                            delay={0}
                                            target="tooltip443412080">
                                            Add new Users
                                        </UncontrolledTooltip>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <ToolkitProvider
                                data={users}
                                keyField="id"
                                columns={[
                                    {
                                        dataField: 'name',
                                        text: 'Full name',
                                        sort: true,
                                        align: 'center',
                                        headerAlign: 'center',
                                        editable: false
                                    },
                                    {
                                        dataField: 'type',
                                        text: 'Role Types',
                                        editor: {
                                            type: Type.SELECT,
                                            options: roleList.map((item) => ({
                                                value: item.roles_title,
                                                label: item.roles_title
                                            }))
                                        },
                                        filter: selectFilter({
                                            options: roleList.map((item) => ({
                                                value: item.roles_title,
                                                label: item.roles_title
                                            })),
                                            withoutEmptyOption: false
                                        }),
                                        sort: true,
                                        align: 'center',
                                        headerAlign: 'center',
                                        headerFormatter: columnHeadFormat,
                                        title: () => `Double click to edit`
                                    },
                                    {
                                        dataField: 'email',
                                        text: 'email',
                                        sort: true,
                                        align: 'center',
                                        headerAlign: 'center',
                                        editable: false
                                    },
                                    {
                                        dataField: 'status',
                                        text: 'Active',
                                        csvExport: false,
                                        formatter: (status) => {
                                            return (
                                                <center>
                                                    <label className="custom-toggle mr-1">
                                                        <input
                                                            defaultChecked
                                                            type="checkbox"
                                                            onClick={() => {
                                                                updateStatus(
                                                                    'success'
                                                                );
                                                            }}
                                                        />
                                                        <span
                                                            className="custom-toggle-slider rounded-circle"
                                                            data-label-off="No"
                                                            data-label-on="Yes"
                                                        />
                                                    </label>
                                                </center>
                                            );
                                        },
                                        align: 'center',
                                        headerAlign: 'center',
                                        editable: false
                                    }
                                ]}
                                search>
                                {(props) => (
                                    <div className="py-4 table-responsive">
                                        <BootstrapTable
                                            ref={componentRef}
                                            {...props.baseProps}
                                            bootstrap4={true}
                                            pagination={pagination}
                                            hover
                                            loading={true}
                                            id="react-bs-table"
                                            keyField="id"
                                            striped
                                            data={users}
                                            cellEdit={cellEditFactory({
                                                mode: 'dbclick',
                                                blurToSave: true,
                                                afterSaveCell: onAfterSaveCell
                                            })}
                                            noDataIndication="No available data"
                                            filter={filterFactory({
                                                afterFilter
                                            })}
                                        />
                                    </div>
                                )}
                            </ToolkitProvider>
                        </Card>
                    </div>
                </Row>
            </Container>
            {/* START - Adding new data  */}
            <Modal
                className="modal-dialog-centered"
                isOpen={addModalshow}
                toggle={() => setAddModal(false)}>
                <div className="modal-header">
                    <h6 className="modal-title" id="modal-title-default">
                        Add new Users
                    </h6>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => setAddModal(false)}>
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <Form>
                        <FormGroup className="row">
                            <Label
                                className="form-control-label"
                                htmlFor="example-text-input"
                                md="2">
                                Full Name
                            </Label>
                            <Col md="10">
                                <Input
                                    placeholder="Fullname"
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label
                                className="form-control-label"
                                htmlFor="example-text-input"
                                md="2">
                                Role Types
                            </Label>
                            <Col md="10">
                                <Input
                                    id="type"
                                    name="type"
                                    type="select"
                                    required
                                    onChange={handleChange}>
                                    <option disabled selected>
                                        Please Select
                                    </option>
                                    {roleList.map((item) => (
                                        <option
                                            key={item.id}
                                            value={item.roles_title}>
                                            {item.roles_title}
                                        </option>
                                    ))}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label
                                className="form-control-label"
                                htmlFor="example-tel-input"
                                md="2">
                                Email
                            </Label>
                            <Col md="10">
                                <Input
                                    placeholder="email"
                                    htmlFor="example-text-input"
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label
                                className="form-control-label"
                                htmlFor="example-tel-input"
                                md="2">
                                Password
                            </Label>
                            <Col md="10">
                                <Input
                                    placeholder="email"
                                    htmlFor="example-text-input"
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label
                                className="form-control-label"
                                htmlFor="example-tel-input"
                                md="2">
                                Confirm Password
                            </Label>
                            <Col md="10">
                                <Input
                                    placeholder="email"
                                    htmlFor="example-text-input"
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                        </FormGroup>
                        <div className="modal-footer">
                            <Button
                                color="primary"
                                onClick={() => {
                                    addHandleSubmit();
                                    addnotify('success');
                                    setAddModal(false);
                                }}>
                                Save
                            </Button>
                            <Button
                                className="ml-auto"
                                color="link"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => setAddModal(false)}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal>
            {/* END - adding new data  */}
        </>
    );
}

export default UsersSetup;
