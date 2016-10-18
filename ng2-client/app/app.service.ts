import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface IAppService {
    get(id: string): Observable<any>;
    query(filtro: any): Observable<any>;
    post(tarefa: any): Observable<any>;
    put(id: string, atualizacao: any): Observable<void>;
    delete(id: string): Observable<void>;
}

@Injectable()
export class AppService implements IAppService {
    private endpoint: string;
    private headers: Headers;
    private options: RequestOptions;
    constructor(private http: Http) {
        this.endpoint = 'http://localhost:3000';
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.options = new RequestOptions(this.headers);
    }
    get(id: string): Observable<any> {
        return this.http.get(`${this.endpoint}/${id}`, this.options)
            .map(response => response.json());
    }
    query(filtro: any): Observable<any> {
        return this.http.get(this.endpoint, this.options)
            .map(response => response.json());
    }
    post(tarefa: any): Observable<any> {
        return this.http.post(`${this.endpoint}`, tarefa, this.options)
            .map(response => response.json());
    }
    put(id: string, atualizacao: any): Observable<void> {
        return this.http.put(`${this.endpoint}/${id}`, atualizacao, this.options)
            .map(response => {});
    }
    delete(id: string): Observable<void> {
        return this.http.delete(`${this.endpoint}/${id}`, this.options)
            .map(response => {});
    }
}