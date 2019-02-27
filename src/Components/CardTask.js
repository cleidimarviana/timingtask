import React, { Component } from 'react';
import { Button, InputGroup, Form, FormControl, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faStream } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment';
import moment from 'moment';

import 'moment-timezone';

class CardTask extends Component {

    state = {
        task: {}
    }
    constructor(props, context) {
        super(props, context);

        this.state = {
            task: this.props.task
        }
    }
    
    render() {
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
export default CardTask;
