import React from 'react';
import '../App.css';

class DragAndDrop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        {name: 'Block 1', category: 'new', position: 0, bgcolor: 'yellow'},
        {name: 'Block 2', category: 'new', position: 0, bgcolor: 'pink'},
        {name: 'Block 3', category: 'new', position: 0, bgcolor: 'skyblue'},
        {name: 'Block 4', category: 'new', position: 0, bgcolor: 'lightgreen'},
        {name: 'Block 5', category: 'new', position: 0, bgcolor: 'white'}
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
    // if this object is comin from somewhere other than complet it should have a position value of 0
    if (obj.category !== 'complete') {
      obj.position = 0;
    }
    let spotsTaken = [];
    // mmake a list of spots that currently have a task object 
    this.state.tasks.forEach( t => {
      if ( t.category === cat && t.position !== 0 && t.position !== obj.position ) {
       spotsTaken.push(t.position);
      }
    });
    console.log(spotsTaken)
    let tasks = this.state.tasks.filter( task => {
      // see if we have an existing task in that position
      if( task.position === pos) {
        // what spots are available
        if ( spotsTaken.indexOf(1) < 0 ) {
          task.position = 1
        } else if ( spotsTaken.indexOf(2) < 0 ) {
          task.position = 2
        } else if ( spotsTaken.indexOf(3) < 0 ) {
          task.position = 3
        } else if ( spotsTaken.indexOf(4) < 0 ) {
          task.position = 4
        } else if ( spotsTaken.indexOf(5) < 0 ) {
          task.position = 5
        } else {
          console.log( 'No more spots')
        }
      }
      if (task.name === obj.name) {
        task.category = cat;
        task.position = pos;
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
        // we are setting the entire object to the key so it can be accessed later
        <div  key={JSON.stringify(t)}
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
              onDrop={ e => this.onDrop(e, "new", 0) } >
          <span className="task-header">Tasks</span>

          {tasks.new}

        </div>

        <div  className="wip"
              onDragOver={ e => this.onDragOver(e) } 
              onDrop={ e => this.onDrop(e, "wip", 0) } >
          <span className="task-header">In Progress</span>

          {tasks.wip.sort( (a,b) => a.name > b.name ? 1 : -1)}

        </div>
        
        <div className="droppable" >

          <span className="task-header">Completed</span>

          <div  style={{ height: 145, width: 200, borderRadius: 10, border: '4px dashed grey', marginRight: 'auto', marginLeft: 'auto', marginTop: 20, position: 'relative' }}
                onDragOver={ e => this.onDragOver(e) } 
                onDrop={ e => this.onDrop(e, "complete", 1) } >
                {tasks.complete.filter( t => JSON.parse(t.key).position === 1).length ? 
                  tasks.complete.filter( t => JSON.parse(t.key).position === 1) :
                  <span style={{ fontSize: 50, fontWeight: 'bold', position: 'absolute', top: 40, left: 0, right: 0, margin: 'auto' }}>1</span> 
                }
          </div>

          <div  style={{ height: 145, width: 200, borderRadius: 10, border: '4px dashed grey', marginRight: 'auto', marginLeft: 'auto', marginTop: 20, position: 'relative'  }}
                onDragOver={ e => this.onDragOver(e) } 
                onDrop={ e => this.onDrop(e, "complete", 2) } >
                {tasks.complete.filter( t => JSON.parse(t.key).position === 2).length ?
                tasks.complete.filter( t => JSON.parse(t.key).position === 2) :
                <span style={{ fontSize: 50, fontWeight: 'bold', position: 'absolute', top: 40, left: 0, right: 0, margin: 'auto' }}>2</span> 
                }
          </div>

          <div  style={{ height: 145, width: 200, borderRadius: 10, border: '4px dashed grey', marginRight: 'auto', marginLeft: 'auto', marginTop: 20, position: 'relative'  }}
                onDragOver={ e => this.onDragOver(e) } 
                onDrop={ e => this.onDrop(e, "complete", 3) } >
                {tasks.complete.filter( t => JSON.parse(t.key).position === 3).length ?
                  tasks.complete.filter( t => JSON.parse(t.key).position === 3) :
                  <span style={{ fontSize: 50, fontWeight: 'bold', position: 'absolute', top: 40, left: 0, right: 0, margin: 'auto' }}>3</span> 
                }
          </div>

          <div  style={{ height: 145, width: 200, borderRadius: 10, border: '4px dashed grey', marginRight: 'auto', marginLeft: 'auto', marginTop: 20, position: 'relative'  }}
                onDragOver={ e => this.onDragOver(e) } 
                onDrop={ e => this.onDrop(e, "complete", 4) } >
                {tasks.complete.filter( t => JSON.parse(t.key).position === 4).length ? 
                  tasks.complete.filter( t => JSON.parse(t.key).position === 4) :
                  <span style={{ fontSize: 50, fontWeight: 'bold', position: 'absolute', top: 40, left: 0, right: 0, margin: 'auto' }}>4</span> 
                }
          </div>

          <div  style={{ height: 145, width: 200, borderRadius: 10, border: '4px dashed grey', marginRight: 'auto', marginLeft: 'auto', marginTop: 20, position: 'relative'  }}
                onDragOver={ e => this.onDragOver(e) } 
                onDrop={ e => this.onDrop(e, "complete", 5) } >
                {tasks.complete.filter( t => JSON.parse(t.key).position === 5).length ? 
                  tasks.complete.filter( t => JSON.parse(t.key).position === 5) :
                  <span style={{ fontSize: 50, fontWeight: 'bold', position: 'absolute', top: 40, left: 0, right: 0, margin: 'auto' }}>5</span> 
                }
          </div>


        </div>

      </div>
    )
  }
}

export default DragAndDrop;