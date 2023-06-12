import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';

import { AuthGuard } from './shared/guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { NoteViewComponent } from './note-view/note-view.component';

const routes: Routes = [
  { path: 'login', component: SigninComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/newNote',
    component: AddNoteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/note/:id',
    component: NoteViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/note/:id/edit',
    component: AddNoteComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
