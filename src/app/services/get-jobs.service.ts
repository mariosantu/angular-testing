import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetJobsService {

  url?:string;
  level:string = '';


  // constructor(private _httpclient: HttpClient) { }
  constructor(private _httpclient: HttpClient) { }

  // con questa funzione controllo e costruisco l'url
  // relativo alla ricerca effettuata dall'utetnte
  getJobsService(category:string, lev:any[]): Observable<any> {

    this.checkLvl(lev);
    
    this.url = `https://www.themuse.com/api/public/jobs?category=${category}&${this.level}page=10`;
    // console.log('url = ' + this.url);
    
    return this._httpclient.get(this.url);
  }

  checkLvl(lvl:any[]) {
    const eComm = '&';
    const l = 'level=';
    this.level = '';
    for(let y = 0; y<lvl.length; y++) {
      if(lvl[y].selected === true) {
        this.level = this.level + l + lvl[y].name + eComm;
        // console.log('lvl = ' + lvl[y].name);
      }
    }
    console.log(this.level);
  }
}



