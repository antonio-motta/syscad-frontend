import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../../environments/environment';
import { PersonPf } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class PersonService {

  private readonly PATH: string = '/v1/person';
  private readonly PATH_ID: string = '/v1/person/id/';

  constructor(private http: HttpClient) { }

  save(person: PersonPf): Observable<any>{
    return this.http.post(env.baseApiUrl + this.PATH, person); 
  }

  listAll(): Observable<any>{
    return this.http.get(env.baseApiUrl + this.PATH); 
  }

  findById(personId: string): Observable<any>{
    return this.http.get(env.baseApiUrl + this.PATH_ID + personId); 
  }

  update(personId: string, person: PersonPf): Observable<any>{
    return this.http.put(env.baseApiUrl + this.PATH_ID + personId, person); 
  }

  delete(personId: string): Observable<any>{
    return this.http.delete(env.baseApiUrl + this.PATH_ID + personId); 
  }

}
