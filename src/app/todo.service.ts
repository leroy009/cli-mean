import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http'
import 'rxjs/add/operator/map';
import {Todo} from "./todos/todo";

@Injectable()
export class TodoService {

  constructor(public http: Http) {

  }


//  get Todos
  getTodos(){
    return this.http.get('/api/v1/todos');
  }

//  Save Todos
  saveTodo(todo: Todo){
    var hearders = new Headers();
    hearders.append('Content-Type', 'application/json');
    return this.http.post('/api/v1/todos', JSON.stringify(todo),{headers: hearders})
      .map(res => res.json());
  }

  //  Update Todos
  updateTodo(todo){
    var hearders = new Headers();
    hearders.append('Content-Type', 'application/json');
    return this.http.put('/api/v1/todos/'+todo._id, JSON.stringify(todo),{headers: hearders});
  }

//  Delete Todo
  deleteTodo(id){
    return this.http.delete('/api/v1/todos/'+id);
  }

}
