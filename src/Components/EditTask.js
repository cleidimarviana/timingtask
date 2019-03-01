import React, { Component } from 'react';
import { Button, Dropdown, Form, InputGroup, FormControl, Tooltip, OverlayTrigger, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import './../App.css';

export default class EditTask extends Component {

    colors = ['#DF5250', '#FFA356', '#FFD874', '#AAA'];

    constructor(props) {
        super(props)
        
        this.state = {
            task: this.props.task
        }        
    }

    render() {
        let task = this.props.task;
        return (
            <div>
                <Form>
                    <InputGroup className="mb-3">
                        <Form.Control type="text" defaultValue={task.title} placeholder="Por exemplo: terminar de escrever GMUD" />
                    </InputGroup>
                    <InputGroup className="text-description" >
                        <FormControl as="textarea" defaultValue={task.description} placeholder="Adicione uma descrição mais tetalhada..." aria-label="With textarea" />
                    </InputGroup>
                    <Row>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Prioridade</Tooltip>}>
                            <Dropdown title="Dropdown right" id="dropdown-menu-align-right" >
                                <Dropdown.Toggle variant="light" size="sm">
                                    <FontAwesomeIcon icon={faFlag} />
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
                    </Row>
                </Form>
                <Row className="justify-content-end">
                <Button variant="light" size="sm" onClick={this.props.handleClose}>
                            Cancelar
                </Button>
                <Button variant="primary" size="sm">
                    Salvar alterações
                </Button>
                </Row>
            </div>
        );
    }
}
