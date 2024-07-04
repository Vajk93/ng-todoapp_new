import { Component } from '@angular/core';

interface IToDo {
	id: number,
	title: string,
	completed: boolean
}

@Component({
  selector: 'app-ng-to-do',
  templateUrl: './ng-to-do.component.html',
  styleUrls: ['./ng-to-do.component.css']
})
export class NgToDoComponent {

	// ?select todo with hover effect:
	protected selectToDo(id:number){
		console.log(id);
		this.selectedToDoId = id;
	}

	protected addToDo($event:any){
		this.inputValue = $event?.target.value;
		if(this.inputValue !== ""){
			const _toDo: IToDo = {
				id: this.generateNewId(this.toDos),
				title: this.inputValue,
				completed: false
			}
			this.toDos.push(_toDo);
			this.inputValue = "";
		}

	}

	protected deleteToDo(index:number){
		this.selectedToDoId = index;
		this.toDos.splice(index, 1);
	}

	protected changeStatus(task: IToDo){
		this.toDos.forEach((toDo:IToDo)=>{
			if(task === toDo){
				toDo.completed = !toDo.completed
			}
		})
		console.log(this.toDos);
	}

	protected generateNewId(items: IToDo[]): number {
		if (items.length === 0) {
		  return 1; // Ha a tömb üres, kezdjük az id-t 1-gyel
		}
	  
		const maxId = items.reduce((max, item) => Math.max(max, item.id), 0);
		
		return maxId + 1;
	}

	// protected toDos: IToDo[] = [];
	// with dummy datas:
	protected toDos: IToDo[] = [
		{id:1, title: 'Almaszedés', completed: false},
		{id:2, title: 'Edzés', completed: true},
		{id:3, title: 'Pihenés', completed: false},
	];

	protected selectedToDoId:number | null = null;
	protected inputValue:string = "";
}
