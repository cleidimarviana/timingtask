import React, { Component } from 'react';
import { Button, ListGroup, Dropdown, Form, Row, Col, Card, Modal, InputGroup, FormControl, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faTrashAlt, faThumbsUp, faFlag, faStream } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';

import './../App.css';
import Moment from 'react-moment';

class ListTask extends Component {

    colors = ['#DF5250', '#FFA356', '#FFD874', '#AAA'];

    constructor(props) {
        super(props);

        this.handleModalEditShow = this.handleModalEditShow.bind(this);
        this.handleModalEditClose = this.handleModalEditClose.bind(this);

        this.state = {
            showModalEdit: false,
        };
    }

    handleModalEditClose() {
        this.setState({ showModalEdit: false });
    }

    handleModalEditShow() {
        this.setState({ showModalEdit: true });
    }

    getPriorityLevelColor = (priority) => {
        if (priority === 2) {
            return { borderColor: this.colors[3] };
        } else if (priority === 3) {
            return 'primary';
        } else {
            return 'warning';
        }
    }
    handleIniciar = (item) => {
        console.log(item);

        let arrTask = this.getLocalData();

        for (var i = 0; i < arrTask.length; i++) {
            if (arrTask[i].id === item.id) {
                arrTask[i].date_start = moment().format();
                arrTask[i].date_pause = "";
                break;
            }
        }

        this.setLocalData(arrTask);

        this.props.updateList();
    }

    handlePause = (item) => {

        let arrTask = this.getLocalData();

        for (var i = 0; i < arrTask.length; i++) {
            if (arrTask[i].id === item.id) {
                arrTask[i].date_pause = moment().format();
                break;
            }
        }

        this.setLocalData(arrTask);

        this.props.updateList();
    }
    handleRemove = (item) => {

        let arrTask = this.getLocalData();

        for (var i = 0; i < arrTask.length; i++) {
            if (arrTask[i].id === item.id) {
                arrTask.splice(i, 1)
                break;
            }
        }
        this.setLocalData(arrTask);
        this.props.updateList();
    }

    handleFinish = (item) => {

        let arrTask = this.getLocalData();

        for (var i = 0; i < arrTask.length; i++) {
            if (arrTask[i].id === item.id) {
                arrTask[i].date_finish = moment().format();
                break;
            }
        }

        this.setLocalData(arrTask);

        this.props.updateList();
    }

    getLocalData = () => {
        return JSON.parse(localStorage.getItem('tasks'));
    }
    setLocalData = (arr) => {
        localStorage.setItem('tasks', JSON.stringify(arr));
    }

    handleDetails = (item) => {

    }

    render() {
        return (
            <div style={{ paddingTop: '1%' }}>
                <Row>
                    <Col sm className="colstask">
                        <div className='title'>A fazer</div>
                        <div className="bloc">
                            <ListGroup >
                                {
                                    (this.props.Tasks.filter(function (t) {
                                        return t.dateOfConclusion === undefined;
                                    })).map((task) => {
                                        if ((task.date_start === "" || task.date_start === undefined) || task.date_pause !== "") {
                                            return <Card style={{ borderColor: this.colors[task.priority - 1] }} variant={this.getPriorityLevelColor(task.priority)}>
                                                <Card.Body onClick={this.handleModalEditShow}>
                                                    <Card.Title>{task.title}</Card.Title>
                                                    <Card.Text>
                                                        {task.description}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer >
                                                    <Button variant="link" onClick={() => this.handleIniciar(task)} size="sm">
                                                        <FontAwesomeIcon icon={faPlay} size="xs" />
                                                    </Button>
                                                    <Button className="button-trash" variant="link" onClick={() => this.handleRemove(task)} size="sm">
                                                        <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                                                    </Button>
                                                </Card.Footer>
                                            </Card>
                                        }
                                    }
                                    )
                                }
                            </ListGroup>
                        </div>
                    </Col>
                    <Col sm className="colstask">
                        <div className='title'>Em andamento</div>
                        <div className="bloc">
                            <ListGroup >
                                {
                                    (this.props.Tasks.filter(function (t) {
                                        return t.dateOfConclusion === undefined;
                                    })).map((task) => {
                                        if (task.date_start !== "" && task.date_finish === "" && task.date_pause === "") {
                                            return <Card style={{ background: '#FFFAC0', borderColor: this.colors[task.priority - 1] }} variant={this.getPriorityLevelColor(task.priority)}>
                                                <Card.Body onClick={this.handleModalEditShow}>
                                                    <Card.Title>{task.title}</Card.Title>
                                                    <Card.Text>
                                                        {task.description}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer >
                                                    <Button onClick={() => this.handlePause(task)} variant="link" size="sm">
                                                        <FontAwesomeIcon icon={faPause} size="xs" />
                                                    </Button>
                                                    <Button onClick={() => this.handleFinish(task)} variant="link" size="sm">
                                                        <FontAwesomeIcon icon={faThumbsUp} size="xs" />
                                                    </Button>
                                                    <Button className="button-trash" variant="link" onClick={() => this.handleRemove(task)} size="sm">
                                                        <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                                                    </Button>
                                                </Card.Footer>
                                            </Card>
                                        }
                                    }
                                    )
                                }
                            </ListGroup>
                        </div>
                    </Col>
                    <Col sm className="colstask">
                        <div className='title'>Finalizado</div>
                        <div className="bloc">
                            <ListGroup >
                                {
                                    (this.props.Tasks.filter(function (t) {
                                        return t.dateOfConclusion === undefined;
                                    })).map((task) => {
                                        if (task.date_finish !== "") {
                                            return <Card style={{ borderColor: this.colors[task.priority - 1] }} variant={this.getPriorityLevelColor(task.priority)}>
                                                <Card.Body onClick={this.handleModalEditShow}>
                                                    <Card.Title>{task.title}</Card.Title>
                                                    <Card.Text>
                                                        {task.description}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer >
                                                    <Button className="button-trash" variant="link" onClick={() => this.handleRemove(task)} size="sm">
                                                        <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                                                    </Button>
                                                </Card.Footer>
                                            </Card>
                                        }
                                    }
                                    )
                                }
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
                <Modal show={this.state.showModalEdit} onHide={this.handleModalEditClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Tarefa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <InputGroup className="mb-3">
                                <Form.Control type="text" placeholder="Por exemplo: terminar de escrever GMUD" ref={((a) => { this.reTaskTitle = a })} />
                            </InputGroup>

                            <InputGroup className="text-description" >
                                <FormControl  as="textarea" placeholder="Adicione uma descrição mais tetalhada..." aria-label="With textarea" />
                            </InputGroup>

                            <div className="actions">
                       
                                <OverlayTrigger placement="left" overlay={<Tooltip id="tooltip-disabled">Prioridade</Tooltip>}>
                                    <Dropdown
                                        style={{ float: 'right' }}
                                        alignRight
                                        title="Dropdown right"
                                        id="dropdown-menu-align-right" >
                                        <Dropdown.Toggle variant="light" size="sm">
                                            <FontAwesomeIcon icon={faFlag} style={{ color: this.state.color }} />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu >
                                            <Dropdown.Item >
                                                <FontAwesomeIcon className="font-awesome-drop" icon={faFlag} style={{ color: this.colors[0] }} /> Alta
                                        </Dropdown.Item>
                                            <Dropdown.Item>
                                                <FontAwesomeIcon className="font-awesome-drop" icon={faFlag} style={{ color: this.colors[1] }} />  Média
                                        </Dropdown.Item>
                                            <Dropdown.Item >
                                                <FontAwesomeIcon className="font-awesome-drop" icon={faFlag} style={{ color: this.colors[2] }} />  Baixa
                                        </Dropdown.Item>
                                            <Dropdown.Item >
                                                <FontAwesomeIcon className="font-awesome-drop" icon={faFlag} style={{ color: this.colors[3] }} />  Relevante
                                        </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </OverlayTrigger>

                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" size="sm" onClick={this.handleModalEditClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" size="sm" onClick={this.handleModalEditClose}>
                            Salvar alterações
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ListTask;