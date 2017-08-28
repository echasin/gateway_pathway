import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Pathwayclass } from './pathwayclass.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PathwayclassService {

    private resourceUrl = 'pathway/api/pathwayclasses';
    private resourceSearchUrl = 'pathway/api/_search/pathwayclasses';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(pathwayclass: Pathwayclass): Observable<Pathwayclass> {
        const copy = this.convert(pathwayclass);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(pathwayclass: Pathwayclass): Observable<Pathwayclass> {
        const copy = this.convert(pathwayclass);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Pathwayclass> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.lastmodifieddatetime = this.dateUtils
            .convertDateTimeFromServer(entity.lastmodifieddatetime);
    }

    private convert(pathwayclass: Pathwayclass): Pathwayclass {
        const copy: Pathwayclass = Object.assign({}, pathwayclass);

        copy.lastmodifieddatetime = this.dateUtils.toDate(pathwayclass.lastmodifieddatetime);
        return copy;
    }
}
