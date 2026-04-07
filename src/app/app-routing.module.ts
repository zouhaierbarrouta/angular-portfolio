import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainContentComponent } from './components/main-content/main-content.component';
import { ExperienceDetailsComponent } from './components/experience-details/experience-details.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

const routes: Routes = [
  { path: '', component: MainContentComponent },
  { path: 'experience-details/:id', component: ExperienceDetailsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
