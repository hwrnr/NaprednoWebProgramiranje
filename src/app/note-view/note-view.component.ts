import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirenoteService } from '../services/firenote-service.service';
import { Note } from 'src/types/Note';

import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss'],
})
export class NoteViewComponent {
  faEdit = faEdit;

  note: Note = {
    name: '',
    text: '',
    createdTimeFormatted: '',
    lastEditedTimeFormatted: '',
    createdTime: {
      year: 0,
      month: 0,
      day: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      date: 0,
      time: 0,
      timezoneOffset: 0,
    },
    lastEditedTime: {
      year: 0,
      month: 0,
      day: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      date: 0,
      time: 0,
      timezoneOffset: 0,
    },
    lat: 0,
    lon: 0,
    uid: 0,
  };

  constructor(
    private actRoute: ActivatedRoute,
    private firenoteService: FirenoteService,
    private router: Router
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    console.log(id);
    if (!id) {
      this.router.navigate(['/dashboard']);
      return;
    }
    this.firenoteService
      .getNoteById(id)
      .valueChanges()
      .subscribe((note) => {
        const notee = note as Note;
        notee.createdTimeFormatted = new Date(
          notee.createdTime.time
        ).toLocaleString('sr-RS');
        notee.lastEditedTimeFormatted = new Date(
          notee.lastEditedTime.time
        ).toLocaleString('sr-RS');
        this.note = note as Note;
      });
  }
}
