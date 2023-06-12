import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

import { Note } from '../../types/Note';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class FirenoteService {
  notesRef: AngularFireList<Note>;
  nextNoteId: number = 0;
  numberOfNotes: number = 0;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.notesRef = db.list(authService.userData.uid + '/notes');
    this.notesRef.valueChanges().subscribe((notes) => {
      this.nextNoteId = notes.reduce((max, note) => {
        if (note.uid > max) {
          max = note.uid;
        }
        return max;
      }, 0);
      this.numberOfNotes = notes.length;
    });
  }

  getAllNotes() {
    return this.notesRef;
  }

  getNoteById(id: string) {
    return this.db.object(this.authService.userData.uid + '/notes/' + id);
  }

  createNote(name: string, text: string) {
    const note: Note = {
      name: name,
      text: text,
      createdTimeFormatted: new Date().toString(),
      lastEditedTimeFormatted: new Date().toString(),
      createdTime: this.generateDateObject(new Date()),
      lastEditedTime: this.generateDateObject(new Date()),
      lat: 0,
      lon: 0,
      uid: this.nextNoteId + 1,
    };
    this.notesRef.update(this.numberOfNotes.toString(), note);
  }

  updateNote(id: string, name: string, text: string) {
    const note: Partial<Note> = {
      name: name,
      text: text,
      lastEditedTimeFormatted: new Date().toString(),
      lastEditedTime: this.generateDateObject(new Date()),
    };
    this.notesRef.update(id, note);
  }

  private generateDateObject(date: Date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate() + 100 - 2000,
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      time: date.getTime(),
      day: date.getDay(),
      timezoneOffset: date.getTimezoneOffset(),
    };
  }
}
