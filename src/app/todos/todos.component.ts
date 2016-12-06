import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import {TodoService} from "../todo.service";
import {Todo} from "./todo";
import any = jasmine.any;

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
todos: Todo[];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todos = [];
    this.todoService.getTodos()
      .map(res => res.json())
      .subscribe(todos => this.todos = todos);
  }

//  Add a Todo
  addTodo($event, todoText){
    if($event.which === 1){
      var result;
      var newTodo = {
        text: todoText.value,
        IsCompleted : false
      };
      result = this.todoService.saveTodo(newTodo);
      result.subscribe(x=>{
        this.todos.push(newTodo)
        todoText.value ='';
      })
    }
  }

//  Update a Todo
  updateStatus(todo){
    var _todo = {
      _id: todo._id,
      text: todo.text,
      IsCompleted: !todo.IsCompleted
    };
    this.todoService.updateTodo(todo)
      .map(res=> res.json())
      .subscribe( data => {
        todo.IsCompleted = !todo.IsCompleted;
      });
  }

//  Set Todo Edit State
  setEditState(todo, state){
    if(state){
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }

  //  Update Todo
  updateTodoText($event, todo){
    if($event.which === 13){
      todo.text = $event.target.value;
      var _todo = {
        _id: todo._id,
        text: todo.text,
        isCompleted: todo.isCompleted
      };

      this.todoService.updateTodo(_todo)
        .map(res => res.json())
        .subscribe(data => {
          this.setEditState(todo, false);
        });
    }
  }

}
