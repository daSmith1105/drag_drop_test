import React from 'react';
import '../App.css';

class DragAndDrop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        {name: 'Block 1', category: 'wip', bgcolor: 'yellow'},
        {name: 'Block 2', category: 'wip', bgcolor: 'pink'},
        {name: 'Block 3', category: 'wip', bgcolor: 'skyblue'},
        {name: 'Block 4', category: 'wip', bgcolor: 'lightgreen'},
        {name: 'Block 5', category: 'wip', bgcolor: 'white'}
      ]
    }
  }

  onDragOver = e => {
    e.preventDefault();
  }

  onDragStart = (e, id) => {
    console.log('dragstart: ', id);
    e.dataTransfer.setData("id", id);
  }

  onDrop = (e, cat) => {
    console.log(e)
    let id = e.dataTransfer.getData("id");

    let tasks = this.state.tasks.filter( task => {
      if (task.name === id) {
        task.category = cat;
      };
      return task;
    });

    this.setState({
      ...this.state, tasks
    })
  }

  render() {
    const tasks = {
      wip: [],
      complete: []
    };

    // sort order is determined by the order the state objects are pushe to the tasks array

    this.state.tasks.forEach( t => {
      tasks[t.category].push(
        <div  key={t.name}
              onDragStart={ e => this.onDragStart(e, t.name) }
              draggable
              className="draggable"
              style={{backgroundColor: t.bgcolor}} >
          <p className="task-title">{t.name}</p>
        </div>
      )
    })
    return (
      <div className="container-drag">
        <h1 className="header">Drag and Drop</h1>
        <div  className="wip"
              onDragOver={ e => this.onDragOver(e) } 
              onDrop={ e => this.onDrop(e, "wip") } >
          <span className="task-header">WIP</span>
          {tasks.wip}
        </div>
        
        <div  className="droppable" 
              onDragOver={ e => this.onDragOver(e) } 
              onDrop={ e => this.onDrop(e, "complete") } >
          <span className="task-header">COMPLETED</span>
          {tasks.complete}
        </div>
      </div>
    )
  }
}

export default DragAndDrop;