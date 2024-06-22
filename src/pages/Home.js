import React, { Component } from "react";
import Todos from "../component/todos";
import AddTodo from "../component/AddTodo";
import "../pages/Home.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }


  deleteTodo = (id) => {

    const todos = this.state.todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({
      todos: todos,
    });
  };


  addTodo = (todo) => {
    const exists = this.state.todos.find(t => t.content === todo.content);
    if (exists || (todo.due === "Invalid Date") || (todo.due === null)){ return }

    todo.id = Math.random();
    let new_list = [...this.state.todos, todo];
    this.setState({
      todos: new_list,
    });
  };
  render() {
    return (
      <div className="Home">
        <h1>Todo's </h1>
        {/* When passing the AddTodo component, addTodo is a prop that is used in the 
        AddTodo.js file when handling the submit */}
        <AddTodo addTodo={this.addTodo} />
        {/* When returning the Todos component, todos is a prop passed to the todos.js file
         to format and render the current todo list state */}
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
      </div>
    );
  }
}

export default Home;