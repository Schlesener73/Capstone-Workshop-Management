import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  getTypeRequest(url) {
    return this.http.get(`${environment.serverUrl}${url}`).pipe(map(res => {
      return res;
    }));
  }
  
  postTypeRequest(url, payload) {
    return this.http.post(`${environment.serverUrl}${url}`, payload);
  }

  putTypeRequest(url, payload) {
    return this.http.put(`${environment.serverUrl}${url}`, payload).pipe(map(res => {
      return res;
    }));
  }

  uploadFile(formData): Observable<any> {
    return this.http.post(`${environment.serverUrl}/uploadFile`, formData);
  }

  getWorkshops(showDates): Observable<any> {
    if (showDates == "all")
      return this.http.get(`${environment.serverUrl}/workshops`);
    else if (showDates == "current")
      return this.http.get(`${environment.serverUrl}/workshops/current`);
    else if (showDates == "prior")
      return this.http.get(`${environment.serverUrl}/workshops/prior`);
    else
      return this.http.get(`${environment.serverUrl}/workshops/future`);
  }

  addWorkshop(data): Observable<any> {
    return this.http.post(`${environment.serverUrl}/workshops`, data);
  }

  deleteWorkshop(id): Observable<any> {
    return this.http.delete(`${environment.serverUrl}/workshops/${id}`);
  }

  updateWorkshop(id, data): Observable<any> {
    return this.http.put(`${environment.serverUrl}/workshops/${id}`, data);
  }

  updateParticipant(id, data): Observable<any> {
    return this.http.put(`${environment.serverUrl}/participants/${id}`, data);
  }

  updateEquipment(id, data): Observable<any> {
    return this.http.put(`${environment.serverUrl}/equipment/${id}`, data);
  }

  viewWorkshop(id): Observable<any> {
    return this.http.get(`${environment.serverUrl}/workshop/${id}`);
  }

  getWorkshop(id): Observable<any> {
    return this.http.get(`${environment.serverUrl}/workshops/${id}`);
  }

  getParticipant(id): Observable<any> {
    return this.http.get(`${environment.serverUrl}/participants/${id}`);
  }

  getEquip(id): Observable<any> {
    return this.http.get(`${environment.serverUrl}/equipment/${id}`);
  }

  getParticipants(): Observable<any> {
    return this.http.get(`${environment.serverUrl}/participants`);
  }

  getEquipment(): Observable<any> {
    return this.http.get(`${environment.serverUrl}/equipment`);
  }

  getWorkshopEquip(id): Observable<any> {
    return this.http.get(`${environment.serverUrl}/workshop/${id}/equipment`);
  }

  addParticipant(data, workshopID): Observable<any> {
    return this.http.post(`${environment.serverUrl}/participant/${workshopID}`, data);
  }

  deleteParticipant(data): Observable<any> {
    return this.http.delete(`${environment.serverUrl}/participants/${data.id}`);
  }

  viewEquipment(id): Observable<any> {
    return this.http.get(`${environment.serverUrl}/participant/${id}`);
  }

  addEquipment(data, participantID): Observable<any> {
    return this.http.post(`${environment.serverUrl}/equipment/${participantID}`, data);
  }

  deleteEquipment(data): Observable<any> {
    return this.http.delete(`${environment.serverUrl}/equipment/${data.id}`);
  }

  updateWorkshopCount(id, data): Observable<any> {
    return this.http.put(`${environment.serverUrl}/workshops/${id}/count/`, data);
  }
}
