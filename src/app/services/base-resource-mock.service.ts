import { Observable, of } from 'rxjs';
import { BaseEntity } from '../models/base-entity';

export abstract class BaseResourceMockService<T extends BaseEntity> {

    constructor( private collection: T[] = []) {

    }


    public getAll(): Observable<T[]> {

        return of(this.collection);
    }

    public get(id: number): Observable<T> {

        return of(this.collection.find(o => o.id === id));
    }

    private insert(entity: T): Observable<T> {

        entity.id = this.collection.length + 1;
        this.collection.push(entity);
        return of(entity);
    }

    private update(entity: T, id: number): Observable<T> {

        const oldEntity = this.collection.find(o => o.id === id);

        const index = this.collection.indexOf(oldEntity);

        this.collection[index] = entity;
        return of(entity);
    }

    delete(id: number): Observable<any> {

        this.collection.splice(id, 1);

        return of(1);
    }

    save(entity: T, id: number): Observable<T> {

        if (id === 0) {
            return this.insert(entity);
        }
        return this.update(entity, id);
    }
}
