import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../../environments/environment';
import { PersonPf } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class PersonService {

  private readonly PATH: string = 'person/';

  constructor(private http: HttpClient) { }

  save(person: PersonPf): Observable<any>{
    return this.http.post(env.baseApiUrl + this.PATH, person); 
  }
}
