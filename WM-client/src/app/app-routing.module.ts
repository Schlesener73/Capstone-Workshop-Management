import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkshopsComponent } from './workshops/workshops.component';
import { ParticipantsComponent } from './participants/participants.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { ViewWorkshopComponent } from './view-workshop/view-workshop.component';
import { ViewParticipantComponent } from './view-participant/view-participant.component';
import { ViewEquipmentComponent } from './view-equipment/view-equipment.component';
import { AddParticipantComponent } from './add-participant/add-participant.component';
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';
import { EditWorkshopComponent } from './edit-workshop/edit-workshop.component';
import { EditParticipantComponent } from './edit-participant/edit-participant.component';
import { EditEquipmentComponent } from './edit-equipment/edit-equipment.component';

const routes: Routes = [
  {
    path: 'workshops',
    component: WorkshopsComponent
  },
  {
    path: 'workshops/:id',
    component: EditWorkshopComponent
  },
  {
    path: 'workshop/:id',
    component: ViewWorkshopComponent
  },
  {
    path: 'participants',
    component: ParticipantsComponent
  },
  {
    path: 'participant/:source/:id',
    component: ViewParticipantComponent
  },
  {
    path: 'new-participant/:workshopID',
    component: AddParticipantComponent
  },
  {
    path: 'participants/:source/:id',
    component: EditParticipantComponent
  },
  {
    path: 'equipment',
    component: EquipmentComponent
  },
  {
    path: 'equipment/:source/:id',
    component: ViewEquipmentComponent
  },
  {
    path: 'new-equipment/:source/:participantID',
    component: AddEquipmentComponent
  },
  {
    path: 'equip/:source/:id',
    component: EditEquipmentComponent
  },
  {
    path: '',
    redirectTo: '/workshops',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/workshops',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
