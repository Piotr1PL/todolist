import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoServiceTsService } from '../../../todo.service.ts.service';
@Component({
  selector: 'app-add-task-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task-component.component.html',
  styleUrl: './add-task-component.component.css'
})
export class AddTaskComponentComponent {
  newTaskTitle: string = '';

  @Output() taskAdded = new EventEmitter<string>();

  saveTask(): void {
    if (this.newTaskTitle.trim()) {
      this.taskAdded.emit(this.newTaskTitle.trim());
      this.newTaskTitle = '';
    } else {
      alert('Please enter a valid task title!');
    }
  }
}