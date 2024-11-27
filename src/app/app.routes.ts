import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowlistComponent } from './showlist/showlist.component';
import { ShowdetailComponent } from './showdetail/showdetail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'list/:days', component: ShowlistComponent },
  { path: 'detail/:id', component: ShowdetailComponent },
];
