import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { MessageAlertHandleService } from '../shared/services/message-alert.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PaginationResult } from '../models/pagination-result';
import { Pagination } from '../models/pagination';

export abstract class BaseResourceService<T> {
    @BlockUI() blockUI: NgBlockUI;
    public baseUrl = '';

    constructor(private _http: HttpClient, _url: string, private _messageAlertHandleService: MessageAlertHandleService) {

        this.baseUrl = environment.apiUrl + _url;

    }

    public gePaginatedAll(pagination: Pagination): Observable<PaginationResult> {

        this.blockUI.start();
        return this._http.get<PaginationResult>(this.getHttpUrl(pagination)).pipe(
            catchError((response: any) => {
                this._messageAlertHandleService.handleError(response.error);
                this.blockUI.stop();
                return Observable.throw(response.error || 'Server error');
            }
            ), finalize(() => {
                this.blockUI.stop();
            }));
    }

    public getAll(): Observable<T[]> {
        this.blockUI.start();
        return this._http.get<T[]>(`${this.baseUrl}`).pipe(
            catchError((response: any) => {
                this._messageAlertHandleService.handleError(response.error);
                this.blockUI.stop();
                return Observable.throw(response.error || 'Server error');
            }
            ), finalize(() => {
                this.blockUI.stop();
            }));
    }

    public get(id: number): Observable<T> {
        this.blockUI.start();
        const url = id === 0 ? `${this.baseUrl}` : `${this.baseUrl}/${id}`;
        return this._http.get<T>(url)
            .pipe(catchError((response: any) => {
                this._messageAlertHandleService.handleError(response.error);
                this.blockUI.stop();
                return Observable.throw(response.error || 'Server error');
            }), finalize(() => {
                this.blockUI.stop();
            }));
    }

    private insert(entity: T): Observable<T> {
        this.blockUI.start();
        return this._http.post<T>(this.baseUrl, entity).pipe(
            catchError((response: any) => {
                this._messageAlertHandleService.handleError(response.error);
                this.blockUI.stop();
                return Observable.throw(response.error || 'Server error');
            }), finalize(() => {
                this.blockUI.stop();
            }));
    }

    private update(entity: T, id: number): Observable<T> {
        this.blockUI.start();
        const url = `${this.baseUrl}/${id}`;
        return this._http
            .put<T>(url, entity).pipe(
                catchError((response: any) => {
                    this._messageAlertHandleService.handleError(response.error);
                    this.blockUI.stop();
                    return Observable.throw(response.error || 'Server error');
                }), finalize(() => {
                    this.blockUI.stop();
                }));
    }

    delete(id: number): Observable<any> {
        this.blockUI.start();
        const url = id === 0 ? `${this.baseUrl}` : `${this.baseUrl}/${id}`;
        return this._http
            .delete<any>(url).pipe(
                catchError((response: any) => {
                    this._messageAlertHandleService.handleError(response.error);
                    this.blockUI.stop();
                    return Observable.throw(response.error || 'Server error');
                }), finalize(() => {
                    this.blockUI.stop();
                }));
    }

    save(entity: T, id: number): Observable<T> {

        if (id === 0) {
            return this.insert(entity);
        }
        return this.update(entity, id);
    }

    private getHttpUrl(pagination: Pagination): string {

        let url = this.baseUrl;

        if (pagination.currentPage !== undefined) {

            url = `${url}?page=${pagination.currentPage}`;
        }

        if (pagination.pageSize !== undefined) {
            url = `${url}&pageSize=${pagination.pageSize}`;
        }

        if (pagination.sortBy !== undefined) {
            url = `${url}&sortBy=${pagination.sortBy}`;
        }

        if (pagination.sortDirection !== undefined) {
            url = `${url}&sortDirection=${pagination.sortDirection}`;
        }

        return url;
    }
}
