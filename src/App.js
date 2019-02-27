import React, { Component } from 'react';
import AddTaskBar from './Components/AddTaskBar';
import ListTask from './Components/ListTask';
import Toolbar from './Components/Toolbar'; 

class App extends Component {

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

  adicionarTarefa = () => {
    
    this.task.id = Math.max.apply(Math, this.state.tasks.map(function(o) { return o.id; })) + 1;
    this.task.dateOfConclusion = '2019-02-20'

    this.setState({tasks : JSON.parse(localStorage.getItem('tasks'))});

    this.task = {};    
  }

  render() {
    return (
    <div><Toolbar updateList={ this.handleUpdateList }/>
        <AddTaskBar updateList={ this.handleUpdateList } Task={this.task} />
        <ListTask updateList={ this.handleUpdateList } Tasks={this.state.tasks} />
    </div>);
  }

}

export default App;
