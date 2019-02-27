import React, { Component } from 'react';
import { Button, InputGroup, Form, FormControl, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faStream } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment';
import moment from 'moment';

import 'moment-timezone';

class AddTask extends Component {

    reTaskTitle = '';
    reTaskDescription = '';
    reTaskPriority = 0;
    
    colors = ['#DF5250', '#FFA356', '#FFD874', '#AAA'];

    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false,
            color: this.colors[3],
            descIsHidden: false
        };
        
    }
    addTaskAction = () => {
        if (this.reTaskTitle.value !== '') {

            let arrTask = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

            let data = {
                id: moment().format('YYMMDDHms'),
                title: this.reTaskTitle.value,
                description: this.reTaskDescription.value,
                priority: this.reTaskPriority,
                date_creation: moment().format(),
                date_start: "",
                date_pause: "",
                date_finish: ""
            }
            arrTask.push(data);
            localStorage.setItem('tasks', JSON.stringify(arrTask));

            this.reTaskTitle.value = '';

            if (this.props.origin == 'modal')
                this.props.onHide({ show: false });
            else
                this.props.hiddenC();

            this.props.updateList();
        }
    }
    cancelAdd = () => {
        this.setState({ open: false });
        if (this.props.origin === 'modal')
            this.props.onHide({ show: false });
        else
            this.props.hiddenC();
    }

    keyPressEnter = (e) => {
        if (e.key === 'Enter') {
            this.addTaskAction();
        }
    }

    clickDropdown = (value) => {
        this.reTaskPriority = value;
        if (value === 1)
            this.setState({ color: this.colors[0] })
        else if (value === 2)
            this.setState({ color: this.colors[1] })
        else if (value === 3)
            this.setState({ color: this.colors[2] })
        else if (value === 0)
            this.setState({ color: this.colors[3] })
    }

    render() {

        const { descIsHidden } = this.state;
        return <Form>

            <InputGroup className="mb-3">
                <Form.Control onKeyPress={this.keyPressEnter} type="text" placeholder="Por exemplo: terminar de escrever GMUD" ref={((a) => { this.reTaskTitle = a })} />
                <InputGroup.Prepend>
                    <Button variant="outline-secondary" size="sm">
                        <Moment format="DD MMM"></Moment>
                    </Button>
                </InputGroup.Prepend>
            </InputGroup>

            {this.state.descIsHidden &&
                <InputGroup className="text-description" >
                    <FormControl as="textarea" ref={((a) => { this.reTaskDescription = a })} placeholder="Adicione uma descrição mais tetalhada..." aria-label="With textarea" />
                </InputGroup>
            }

            <div className="actions">
                <Button onClick={this.addTaskAction} className="btnForm" variant="secondary" size="sm" >Adicionar tarefa</Button>
                <Button onClick={this.cancelAdd} className="btnForm" variant="light" size="sm">Cancelar</Button>

                <OverlayTrigger placement="left" overlay={<Tooltip>Descrição</Tooltip>}>
                    <Dropdown.Toggle onClick={() => this.setState({ descIsHidden: !descIsHidden })} style={{ float: 'right' }} variant="light" size="sm">
                        <FontAwesomeIcon icon={faStream} style={{ color: this.state.color }} />
                    </Dropdown.Toggle>
                </OverlayTrigger>

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
                            <Dropdown.Item onClick={() => this.clickDropdown(1)}>
                                <FontAwesomeIcon className="font-awesome-drop" icon={faFlag} style={{ color: this.colors[0] }} /> Alta
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.clickDropdown(2)}>
                                <FontAwesomeIcon className="font-awesome-drop" icon={faFlag} style={{ color: this.colors[1] }} />  Média
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.clickDropdown(3)}>
                                <FontAwesomeIcon className="font-awesome-drop" icon={faFlag} style={{ color: this.colors[2] }} />  Baixa
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.clickDropdown(0)}>
                                <FontAwesomeIcon className="font-awesome-drop" icon={faFlag} style={{ color: this.colors[3] }} />  Relevante
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </OverlayTrigger>

            </div>
        </Form>
    }
}
export default AddTask;
