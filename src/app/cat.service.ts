import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  constructor(private http: HttpClient) {}

  getCatFacts() {
    return this.http.get('https://cat-fact.herokuapp.com/facts');
  }
}
