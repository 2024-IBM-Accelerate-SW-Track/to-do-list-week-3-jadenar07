import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

class AddTodo extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
      date: "",
      due: null
    };
  }

  handleChange = (event) => {
    this.setState({
      content: event.target.value,
      date: new Date().toLocaleString('en-US')
    });
  };

  handleDueDateChange = (newDate) => {
    this.setState({
      due: new Date(newDate).toLocaleDateString('en-US')
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.content.trim() && this.state.due) {
      this.props.addTodo(this.state);
      this.setState({
        content: "",
        date: "",
        due: null
      });
    }
  };

  render() {
    return (
      <div>
        <TextField
          data-testid="new-item-input" // Added test ID
          label="Add New Item"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.content}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            data-testid="new-item-date" // Added test ID
            label="Due Date"
            value={this.state.due}
            onChange={this.handleDueDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Button
          data-testid="new-item-button" // Added test ID
          style={{ marginLeft: "10px" }}
          onClick={this.handleSubmit}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </div>
    );
  }
}

export default AddTodo;
