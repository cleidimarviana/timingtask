import React, { Component } from 'react';
import { Button, Card, Dropdown } from 'react-bootstrap';
import './../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faEllipsisV, faPause, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import 'moment-timezone';
import moment from 'moment';

class CardTask extends Component {

    colors = ['#DF5250', '#FFA356', '#FFD874', '#AAA'];

    constructor(props, context) {
        super(props, context);
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

        let task = this.props.task;
        let status = this.props.status;

        let buttons = [];

        let btnIniciar = <Button key={"ini"+task.id } variant="link" onClick={() => this.handleIniciar(task)} size="sm"><FontAwesomeIcon icon={faPlay} size="xs"/></Button>;
        let btnPause = <Button key={"pse"+task.id }  onClick={() => this.handlePause(task)} variant="link" size="sm"><FontAwesomeIcon icon={faPause} size="xs" /></Button>;
        let btnStop = <Button key={"sto"+task.id}  onClick={() => this.handleFinish(task)} variant="link" size="sm"><FontAwesomeIcon icon={faThumbsUp} size="xs" /></Button>;

        if (status === 'todo') {
            buttons.push(btnIniciar);
        } else if (status === 'progress') {
            buttons.push(btnPause);
            buttons.push(btnStop);
        }

        return <Card style={{ background: '#FFFAC0', borderColor: this.colors[task.priority - 1] }} variant={this.getPriorityLevelColor(task.priority)}>
            <Card.Body onDoubleClick={() => this.props.handleShow(task)}>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>
                    {task.description}
                </Card.Text>
            </Card.Body>
            <Card.Footer >
                {
                    (buttons.map(element => {
                        return element;
                    }))
                }
                <Dropdown
                    style={{ float: 'right' }}
                    alignRight
                    title="Dropdown right"
                    id="dropdown-menu-align-right" >
                    <Dropdown.Toggle variant="link" size="sm">
                        <FontAwesomeIcon icon={faEllipsisV} size="xs" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                        <Dropdown.Item onClick={() => this.props.handleShow(task)}>
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
export default CardTask;
