import React from 'react';
import '../App.css';

class DragAndDrop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        {name: 'Block 1', category: 'new', position: 1, bgcolor: 'yellow'},
        {name: 'Block 2', category: 'new', position: 2, bgcolor: 'pink'},
        {name: 'Block 3', category: 'new', position: 3, bgcolor: 'skyblue'},
        {name: 'Block 4', category: 'new', position: 4, bgcolor: 'lightgreen'},
        {name: 'Block 5', category: 'new', position: 5, bgcolor: 'white'}
      ]
    }
  }

  onDragOver = e => {
    e.preventDefault();
  }

  onDragStart = (e, obj) => {
    // convert the object into a string
    let o = JSON.stringify(obj);
    console.log(o)
    // set the string in dataTransfer
    e.dataTransfer.setData("obj", o);
  }

  onDrop = (e, cat, pos) => {
    // pull the dragged object dataTransfer and convert back to object literal from string
    let obj = JSON.parse(e.dataTransfer.getData("obj"));
    let p = pos ? obj.position = pos : obj.position;

    console.log(obj)
    
    let tasks = this.state.tasks.filter( task => {
      if (task.name === obj.name) {
        task.category = cat;
        task.position = p;
      };
      return task;
    });
    this.setState({
      ...this.state,
      tasks
    })
  }

  render() {
    const tasks = {
      new: [],
      wip: [],
      complete: []
    };

    this.state.tasks.forEach( t => {
      tasks[t.category].push(
        <div  key={t.name}
              onDragStart={ e => this.onDragStart(e, t )}
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


        <div  className="new"
              onDragOver={ e => this.onDragOver(e) } 
              onDrop={ e => this.onDrop(e, "new") } >
          <span className="task-header">Tasks</span>

          {tasks.new}

        </div>

        <div  className="wip"
              onDragOver={ e => this.onDragOver(e) } 
              onDrop={ e => this.onDrop(e, "wip") } >
          <span className="task-header">In Progress</span>

          {tasks.wip}

        </div>
        
        <div  className="droppable" 
              onDragOver={ e => this.onDragOver(e) } 
              onDrop={ e => this.onDrop(e, "complete") } >

          <span className="task-header">Completed</span>

          {tasks.complete}

        </div>

      </div>
    )
  }
}

export default DragAndDrop;