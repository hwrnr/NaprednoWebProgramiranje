import { Component } from '@angular/core';
import { Note } from 'src/types/Note';
import { FirenoteService } from '../services/firenote-service.service';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  notes: Array<Note> = [];
  faEdit = faEdit;
  faAdd = faPlus;

  constructor(private firenoteService: FirenoteService) {
    firenoteService
      .getAllNotes()
      .valueChanges()
      .subscribe((notes) => {
        this.notes = [];
        notes.forEach((note) => {
          note.createdTimeFormatted = new Date(
            note.createdTime.time
          ).toLocaleString('sr-RS');
          note.lastEditedTimeFormatted = new Date(
            note.lastEditedTime.time
          ).toLocaleString('sr-RS');
          this.notes.push(note);
        });
      });
  }
}
