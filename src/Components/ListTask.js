import React, { Component } from 'react';
import { ListGroup, Row, Col, Modal } from 'react-bootstrap';
import './../App.css';
import EditTask from './EditTask';
import CardTask from './CardTask';

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


    render() {
        let listaTask = this.props.Tasks;

        return (
            <div style={{ paddingTop: '1%' }}>
                <Row>
                    <Col sm className="colstask">
                        <div className='title'>A fazer</div>
                        <div className="bloc">
                            <ListGroup >
                                {
                                    
                                    (listaTask.map((task, idx) => {
                                        if ((task.date_start === "" || task.date_start === undefined) || task.date_pause !== "") {
                                            let status = 'todo';

                                            return <CardTask 
                                                key={idx}
                                                handleShow={() => this.handleShow(task)}
                                                task={task}
                                                status={status}
                                                updateList={this.props.updateList}></CardTask>

                                        } else
                                            return false;
                                        
                                    })
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
                                    (listaTask.map((task, idx) => {
                                        if (task.date_start !== "" && task.date_finish === "" && task.date_pause === "") {
                                            let status = 'progress';
                                            return <CardTask 
                                                key={idx}
                                                handleShow={() => this.handleShow(task)}
                                                task={task}
                                                status={status}
                                                updateList={this.props.updateList}></CardTask>;
                                        } else
                                            return false;
                                    })
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
                                    (listaTask.map((task, idx) => {
                                        if (task.date_finish !== "") {
                                            let status = 'done';
                                            return <CardTask 
                                                key={idx}
                                                handleShow={() => this.handleShow(task)}
                                                task={task}
                                                status={status}
                                                updateList={this.props.updateList}></CardTask>;
                                        } else
                                            return false;
                                    })
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
                        <EditTask handleClose={this.handleClose} task={this.state.task} />
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}

export default ListTask;