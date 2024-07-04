import { Component, OnInit } from '@angular/core';
import { IToDo } from 'src/app/interfaces/globals';
import { IndexDbService } from 'src/app/services/index-db.service';

@Component({
  selector: 'app-ng-to-do',
  templateUrl: './ng-to-do.component.html',
  styleUrls: ['./ng-to-do.component.css']
})
export class NgToDoComponent implements OnInit {

	constructor(private indexDBService: IndexDbService){}

	ngOnInit(): void {
		this.getTodos()
	}

	// ?select todo with hover effect:
	protected selectToDo(id:number){
		console.log(id);
		this.selectedToDoId = id;
	}

	protected addToDo(){
		const _todo: any = { 
			name: this.inputValue, 
			completed: false
		}
		this.indexDBService.addTodo(_todo).subscribe((key:any)=>{
			this.inputValue = '';
			this.getTodos();
		})
	}

	protected getTodos(){
		this.indexDBService.getAllTodos().subscribe((todos:IToDo[]) => this.toDos = todos)
	}

	protected deleteToDo(id:number){
		this.indexDBService.deleteTodoById(id).subscribe(()=>this.getTodos())
	}

	protected toggleTodoCompletion(todo:IToDo){
		todo.completed = !todo.completed;
		this.indexDBService.updateTodo(todo).subscribe()
	}

	protected toDos: IToDo[] = [];
	protected selectedToDoId:number | null = null;
	protected inputValue:string = "";
}
