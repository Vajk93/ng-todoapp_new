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
		this.getTodos();
		this.initTheme();
	}

	protected initTheme(){
		let _theme = localStorage.getItem('to_do_app_theme');
		if(_theme){
			this.theme = _theme;
		} else {
			localStorage.setItem('to_do_app_theme', 'dark');
		}
		this.applyTheme();
	}
	// ?select todo with hover effect:
	protected selectToDo(id:number){
		this.selectedToDoId = id;
	}

	protected removeSelectedToDo(){
		this.selectedToDoId = null;
	}

	protected addToDo(){
		if(this.inputValue !== ""){
			const _todo: any = { 
				name: this.inputValue, 
				completed: false
			}
			this.indexDBService.addTodo(_todo).subscribe((key:any)=>{
				this.inputValue = '';
				this.getTodos();
			})
		}
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

	protected changeTheme(){
		this.theme = this.theme === 'light' ? 'dark' : 'light';
		localStorage.setItem('to_do_app_theme', this.theme);
		this.applyTheme();
	}

	private applyTheme() {
		const htmlElement = document.documentElement;
		if (this.theme === 'dark') {
		  htmlElement.classList.add('dark');
		} else {
		  htmlElement.classList.remove('dark');
		}
	  }

	protected toDos: IToDo[] = [];
	protected selectedToDoId:number | null = null;
	protected inputValue:string = "";
	protected theme:string = 'dark';
}
