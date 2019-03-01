import React, { Component } from 'react';
import { Navbar, Button, ButtonToolbar, Modal, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons'
import AddTask from './AddTask';

class Toolbar extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }
    render() {
        return (
            <div>
                <Navbar bg="dark">
                    <Navbar.Brand style={{ color: '#dedede' }} href="/">TimingTask</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">

                        <ButtonToolbar>
                            <Button variant="dark" onClick={this.handleShow} size="sm">
                                <FontAwesomeIcon icon={faPlus} size="lg" />
                            </Button>

                            <Dropdown
                                alignRight
                                title="Dropdown right"
                                id="dropdown-menu-align-right" >
                                <Dropdown.Toggle variant="dark" size="sm">                                   
                                        <FontAwesomeIcon icon={faCog} size="lg" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu >
                                    <Dropdown.Item href="/relatorios">
                                        <FontAwesomeIcon icon={faCog} size="sm" /> Gerar Relatório
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ButtonToolbar>
                    </Navbar.Collapse>
                </Navbar>
                <Modal
                    backdrop="static"
                    show={this.state.show}
                    onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ textSize: "14px" }}>Adicionar Tarefa Rápida</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddTask updateList={this.props.updateList} origin="modal" onHide={this.handleClose}></AddTask>
                    </Modal.Body>

                </Modal>
            </div>
        );
    }

}

export default Toolbar;
