import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'favorites', component: FavoritesPageComponent, canActivate: [AuthGuard]},
  { path: 'books/:title', component: DetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
