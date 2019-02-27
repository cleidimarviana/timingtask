import React, { Component } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import './../App.css';
import AddTask from './AddTask'

class AddTaskBar extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false,
            color: '#aaa'
        };
    }
    hiddenCollapse = () =>{
        this.setState({ open: false });
        console.log('teste');
    }

    render() {
        const { open } = this.state;
        return (
            <>
                {/* <div style={{ padding: '8px' }}>
                    <Button variant="light" size="sm"
                        onClick={() => this.setState({ open: !open })}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        + Adicionar Tarefa
                </Button>
                    <Collapse in={this.state.open} style={{ marginTop: '8px' }} >
                        <div>
                            <AddTask updateList={ this.props.updateList }  hiddenC={this.hiddenCollapse}></AddTask>
                        </div>
                    </Collapse>
                </div> */}
            </>
        );
    }
}

export default AddTaskBar;
