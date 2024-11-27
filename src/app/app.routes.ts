import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowlistComponent } from './showlist/showlist.component';
import { ShowdetailComponent } from './showdetail/showdetail.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: ProfileEditorComponent },
  { path: 'list/:days', component: ShowlistComponent },
  { path: 'detail/:id', component: ShowdetailComponent },
];
