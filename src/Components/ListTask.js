import React, { Component } from 'react';
import { Button, ListGroup, Dropdown, Row, Col, Card, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faThumbsUp, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import './../App.css';
import EditTask from './EditTask';

class ListTask extends Component {

    colors = ['#DF5250', '#FFA356', '#FFD874', '#AAA'];

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            task: {}
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow(task) {
        this.setState({ show: true, task: task });
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

    handleDuplicate = (item) => {

        let arrTask = this.getLocalData();

        for (var i = 0; i < arrTask.length; i++) {
            if (arrTask[i].id === item.id) {
                let data = {
                    id: moment().format('YYMMDDHms'),
                    title: item.title,
                    description: item.description,
                    priority: item.priority,
                    date_creation: moment().format(),
                    date_start: "",
                    date_pause: "",
                    date_finish: ""
                }
                arrTask.push(data);
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
                                                <Card.Body onDoubleClick={() => this.handleShow(task)}>
                                                    <Card.Title>{task.title}</Card.Title>
                                                    <Card.Text>
                                                        {task.description}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer >
                                                    <Button variant="link" onClick={() => this.handleIniciar(task)} size="sm">
                                                        <FontAwesomeIcon icon={faPlay} size="xs" />
                                                    </Button>
                                                    <Dropdown
                                                        style={{ float: 'right' }}
                                                        alignRight
                                                        title="Dropdown right"
                                                        id="dropdown-menu-align-right" >
                                                        <Dropdown.Toggle variant="link" size="sm">
                                                            <FontAwesomeIcon icon={faEllipsisV} size="xs" />
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu >
                                                            <Dropdown.Item onClick={() => this.handleShow(task)}>
                                                                Editar tarefa
                                                            </Dropdown.Item>
                                                            <Dropdown.Item onClick={() => this.handleDuplicate(task)}>
                                                                Duplicar tarefa
                                                            </Dropdown.Item>
                                                            <Dropdown.Item onClick={() => this.handleRemove(task)}>
                                                                Excluir tarefa
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
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
                                                <Card.Body onDoubleClick={() => this.handleShow(task)}>
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

                                                    <Dropdown
                                                        style={{ float: 'right' }}
                                                        alignRight
                                                        title="Dropdown right"
                                                        id="dropdown-menu-align-right" >
                                                        <Dropdown.Toggle variant="link" size="sm">
                                                            <FontAwesomeIcon icon={faEllipsisV} size="xs" />
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu >
                                                            <Dropdown.Item onClick={() => this.handleModalEditShow(task)}>
                                                                Editar tarefa
                                                            </Dropdown.Item>
                                                            <Dropdown.Item onClick={() => this.handleDuplicate(task)}>
                                                                Duplicar tarefa
                                                            </Dropdown.Item>
                                                            <Dropdown.Item onClick={() => this.handleRemove(task)}>
                                                                Excluir tarefa
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
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
                                                <Card.Body onDoubleClick={() => this.handleShow(task)}>
                                                    <Card.Title>{task.title}</Card.Title>
                                                    <Card.Text>
                                                        {task.description}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer >
                                                    <Dropdown
                                                        style={{ float: 'right' }}
                                                        alignRight
                                                        title="Dropdown right"
                                                        id="dropdown-menu-align-right" >
                                                        <Dropdown.Toggle variant="link" size="sm">
                                                            <FontAwesomeIcon icon={faEllipsisV} size="xs" />
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu >
                                                            <Dropdown.Item onClick={() => this.handleModalEditShow(task)}>
                                                                Editar tarefa
                                                            </Dropdown.Item>
                                                            <Dropdown.Item onClick={() => this.handleDuplicate(task)}>
                                                                Duplicar tarefa
                                                            </Dropdown.Item>
                                                            <Dropdown.Item onClick={() => this.handleRemove(task)}>
                                                                Excluir tarefa
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
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
                <Modal
                    backdrop="static"
                    show={this.state.show}
                    onHide={this.handleClose}>

                    <Modal.Header closeButton>
                        <Modal.Title>Editar Tarefa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditTask handleClose={this.handleClose} task={this.state.task}/>
                    </Modal.Body>
                   
                </Modal>
            </div>
        );
    }
}

export default ListTask;