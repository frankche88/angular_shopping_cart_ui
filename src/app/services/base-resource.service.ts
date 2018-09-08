import { Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

export abstract class BaseResourceService<T> {

    public baseUrl = '';

    constructor(private _http: HttpClient, _url: string) {

        this.baseUrl = environment.apiUrl + _url;

    }

    public getAll(): Observable<T[]> {

        return this._http.get(`${this.baseUrl}`).pipe(
            map((response: Response) => response.json()),
            catchError((error: any) => Observable.throw(error || 'Server error')));
    }

    public get(id: number): Observable<T> {

        return this._http
            .get(`${this.baseUrl}/${id}`)
            .pipe(map((response: Response) => response.json()),
             catchError((error: any) => Observable.throw(error || 'Server error')));
    }

    private insert(entity: T): Observable<T> {

        return this._http.post(this.baseUrl, entity).pipe(
            map((response: Response) => response.json()),
            catchError((error: any) => Observable.throw(error || 'Server error')));
    }

    private update(entity: T, id: number): Observable<T> {

        const url = `${this.baseUrl}/${id}`;
        return this._http
            .put(url, entity).pipe(
            map(() => entity),
            catchError((error: any) => Observable.throw(error || 'Server error')));
    }

    delete(id: number): Observable<any> {

        const url = `${this.baseUrl}/${id}`;
        return this._http
            .delete(url).pipe(
            catchError((error: any) => Observable.throw(error || 'Server error')));
    }

    save(entity: T, id: number): Observable<T> {

        if (id === 0) {
            return this.insert(entity);
        }
        return this.update(entity, id);
    }
}
