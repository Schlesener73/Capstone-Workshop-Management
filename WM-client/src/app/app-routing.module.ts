import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkshopsComponent } from './workshops/workshops.component';
import { ParticipantsComponent } from './participants/participants.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { ViewWorkshopComponent } from './view-workshop/view-workshop.component';
import { ViewParticipantComponent } from './view-participant/view-participant.component';
import { ViewEquipmentComponent } from './view-equipment/view-equipment.component';
import { AddWorkshopComponent } from './add-workshop/add-workshop.component';
import { AddParticipantComponent } from './add-participant/add-participant.component';
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';
import { EditWorkshopComponent } from './edit-workshop/edit-workshop.component';
import { EditParticipantComponent } from './edit-participant/edit-participant.component';
import { EditEquipmentComponent } from './edit-equipment/edit-equipment.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'workshops',
    canActivate: [AuthGuardService],
    component: WorkshopsComponent
  },
  {
    path: 'new-workshop',
    canActivate: [AuthGuardService],
    component: AddWorkshopComponent
  },
  {
    path: 'workshops/:id',
    canActivate: [AuthGuardService],
    component: EditWorkshopComponent
  },
  {
    path: 'workshop/:id',
    canActivate: [AuthGuardService],
    component: ViewWorkshopComponent
  },
  {
    path: 'participants',
    canActivate: [AuthGuardService],
    component: ParticipantsComponent
  },
  {
    path: 'participant/:id',
    canActivate: [AuthGuardService],
    component: ViewParticipantComponent
  },
  {
    path: 'new-participant/:workshopID',
    canActivate: [AuthGuardService],
    component: AddParticipantComponent
  },
  {
    path: 'participants/:id',
    canActivate: [AuthGuardService],
    component: EditParticipantComponent
  },
  {
    path: 'equipment',
    canActivate: [AuthGuardService],
    component: EquipmentComponent
  },
  {
    path: 'equipment/:id',
    canActivate: [AuthGuardService],
    component: ViewEquipmentComponent
  },
  {
    path: 'new-equipment/:participantID',
    canActivate: [AuthGuardService],
    component: AddEquipmentComponent
  },
  {
    path: 'equip/:id',
    canActivate: [AuthGuardService],
    component: EditEquipmentComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
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
