import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirenoteService } from '../services/firenote-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/types/Note';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
  noteForm: FormGroup;
  id?: string = undefined;

  constructor(
    public firenoteService: FirenoteService,
    public fb: FormBuilder,
    public router: Router,
    public actRoute: ActivatedRoute
  ) {
    this.noteForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      text: ['', [Validators.required, Validators.minLength(1)]],
    });
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.id = id ? id : undefined;
    if (id) {
      this.firenoteService
        .getNoteById(id)
        .valueChanges()
        .subscribe((note) => {
          const notee = note as Note;
          this.noteForm.setValue({
            name: notee.name,
            text: notee.text,
          });
        });
    }
  }

  ngOnInit() {
    this.firenoteService.getAllNotes();
    this.ResetForm();
  }

  get name() {
    return this.noteForm.get('name');
  }

  get text() {
    return this.noteForm.get('text');
  }

  submitNoteData() {
    if (this.id) {
      this.firenoteService.updateNote(
        this.id,
        this.noteForm.value.name,
        this.noteForm.value.text
      );
    } else {
      this.firenoteService.createNote(
        this.noteForm.value.name,
        this.noteForm.value.text
      );
    }
    this.ResetForm();
    this.router.navigate(['/dashboard']);
  }

  ResetForm() {
    this.noteForm.reset();
  }
}
