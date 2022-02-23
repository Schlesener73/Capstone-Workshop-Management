import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { ParticipantsComponent } from './participants/participants.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { NavComponent } from './nav/nav.component';
import { ViewWorkshopComponent } from './view-workshop/view-workshop.component';
import { ViewParticipantComponent } from './view-participant/view-participant.component';
import { ViewEquipmentComponent } from './view-equipment/view-equipment.component';
import { EditWorkshopComponent } from './edit-workshop/edit-workshop.component';
import { EditParticipantComponent } from './edit-participant/edit-participant.component';
import { EditEquipmentComponent } from './edit-equipment/edit-equipment.component';
import { AddWorkshopComponent } from './add-workshop/add-workshop.component';
import { AddParticipantComponent } from './add-participant/add-participant.component';
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';
import { String2ampmPipe } from './convert2ampm.pipe';
import { PhonePipe } from './phone.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WorkshopsComponent,
    ParticipantsComponent,
    EquipmentComponent,
    NavComponent,
    ViewWorkshopComponent,
    ViewParticipantComponent,
    ViewEquipmentComponent,
    EditWorkshopComponent,
    EditParticipantComponent,
    EditEquipmentComponent,
    AddWorkshopComponent,
    AddParticipantComponent,
    AddEquipmentComponent,
    String2ampmPipe,
    PhonePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
