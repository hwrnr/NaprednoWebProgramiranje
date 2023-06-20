import { Component } from '@angular/core';
import { Note } from 'src/types/Note';
import { FirenoteService } from '../services/firenote-service.service';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { CatService } from '../cat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  notes: Array<Note> = [];
  faEdit = faEdit;
  faAdd = faPlus;

  fact = '';

  constructor(
    private firenoteService: FirenoteService,
    private authService: AuthService,
    private catService: CatService
  ) {
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

    this.catService.getCatFacts().subscribe((data: any) => {
      this.fact = data[0].text;
    });
  }
}
