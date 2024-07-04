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
		const _todo: IToDo = {
			id: this.generateNewId(this.toDos), 
			name: this.inputValue, 
			completed: false
		}
		this.indexDBService.addTodo(_todo).subscribe((key:any)=>{
			console.log('to do added, key: ', key);
			this.inputValue = '';
			this.getTodos();
		})
	}

	protected getTodos(){
		this.indexDBService.getAllTodos().subscribe((todos:IToDo[]) => {
			this.toDos = todos;
			console.log('all todos: ', todos);
		})
	}

	protected deleteToDo(id:number){
		this.indexDBService.deleteTodoById(id).subscribe(()=>{
			console.log('Todo deleted');
			this.getTodos();
		})
	}

	protected toggleTodoCompletion(todo:IToDo){
		todo.completed = !todo.completed;
		this.indexDBService.updateTodo(todo).subscribe(()=>{
			console.log('todo updateed');
			// this.getTodos();
		})
	}

	protected generateNewId(items: IToDo[]): number {
		if (items.length === 0) {
		  return 1; // Ha a tömb üres, kezdjük az id-t 1-gyel
		}
	  
		const maxId = items.reduce((max, item) => Math.max(max, item.id), 0);
		
		return maxId + 1;
	}

	protected toDos: IToDo[] = [];
	protected selectedToDoId:number | null = null;
	protected inputValue:string = "";
}
