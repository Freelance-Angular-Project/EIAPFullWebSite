import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PublicNews } from '../../Models/public-news';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PublicNewsService {

  constructor(private httpclient: HttpClient) { }
  getPublicNews(take:number=100,skip:number=0):Observable<PublicNews[]> {

    return this.httpclient.get<PublicNews[]>(`${environment.baseApiURL}/News/PublicNews?take=${take}&skip=${skip}`)
  }
}
