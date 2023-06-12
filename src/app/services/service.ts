import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth.service';
import { Note } from '../../types/Note';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service {
  constructor(private db: AngularFirestore, private authService: AuthService) {}

  getAllNotes() {
    return new Promise<Array<Note>>((resolve, reject) => {
      if (!this.authService.isLoggedIn || !this.authService.userData) {
        reject('User not logged in');
      }
      this.db
        .collection(this.authService.userData.multiFactor.user.uid)
        .valueChanges()
        .subscribe((notes) => resolve(notes as Array<Note>));
    });
  }
}
