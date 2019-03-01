import React, { Component } from 'react';
import Toolbar from './Components/Toolbar'; 

class Relatorios extends Component {

  task = {}
  state = {
    tasks : []
  }

  constructor(props) {
    super(props);
        
    
    this.state.tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

    this.handleUpdateList = this.handleUpdateList.bind(this);
    
  }

  handleUpdateList = () => {
    this.setState({tasks : JSON.parse(localStorage.getItem('tasks'))});
  }

  render() {
    return (
    <div><Toolbar updateList={ this.handleUpdateList }/>
    teste
    </div>);
  }

}

export default Relatorios;
