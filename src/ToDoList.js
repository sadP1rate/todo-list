import React, { Component } from 'react';
import './ToDoList.scss';

export default class ToDoList extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            task: '', 
            list: JSON.parse(localStorage.getItem('to-do-list')) || []
        };

        this.handleChange = this.handleChange.bind(this);
        this.AddNewTask = this.AddNewTask.bind(this);
        this.updateDone = this.updateDone.bind(this);
        this.deleteDone = this.deleteDone.bind(this);
    }

    handleChange(event) {
        this.setState({task: event.target.value});
    }

    handleSave = () => {
        localStorage.setItem('to-do-list', JSON.stringify(this.state.list));
    };

    AddNewTask() { 
        if (this.state.task !== '') {
            this.setState((state) => ({
                list: [...state.list, {taskText: state.task, done: false}],
                task: '',
            })
            );
            setTimeout(() => this.handleSave(), 1);
        }
    }

    updateDone(id) {
        const list = [...this.state.list];
        list[id].done = !list[id].done;
        this.setState({list});
        this.handleSave();
    }

    deleteDone() {
        const list = this.state.list.filter((listItem) => !listItem.done);
        this.setState({list});
        setTimeout(() => this.handleSave(), 1);
    }

    render() {
        return (
            <div className="todo">
                <fieldset>
                    <legend>To-Do List</legend>
                    <input type="text" value = {this.state.task} onChange={this.handleChange} className="todo__input" />
                    <button onClick={this.AddNewTask} className="todo__button">Add new task</button>
                    <ul className="todo__list">
                        {this.state.list.map((taskItem, index) => 
                        <li key={index} className={`todo__list-item ${taskItem.done ? 'todo__list-item--done' : ''}`}>
                            <label className="todo__list-task">
                                <input checked={taskItem.done} onChange={() => this.updateDone(index)} type="checkbox" className="todo__checkbox" />
                                 {taskItem.taskText}
                            </label>
                        </li> 
                        )}
                    </ul>
                    <button onClick={() => this.deleteDone()} className="todo__button">Delete</button>
                </fieldset>
            </div>
        )
    }
}
