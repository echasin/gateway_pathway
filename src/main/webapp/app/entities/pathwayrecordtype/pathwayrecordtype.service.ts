import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Pathwayrecordtype } from './pathwayrecordtype.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PathwayrecordtypeService {

    private resourceUrl = 'pathway/api/pathwayrecordtypes';
    private resourceSearchUrl = 'pathway/api/_search/pathwayrecordtypes';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(pathwayrecordtype: Pathwayrecordtype): Observable<Pathwayrecordtype> {
        const copy = this.convert(pathwayrecordtype);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(pathwayrecordtype: Pathwayrecordtype): Observable<Pathwayrecordtype> {
        const copy = this.convert(pathwayrecordtype);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Pathwayrecordtype> {
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

    private convert(pathwayrecordtype: Pathwayrecordtype): Pathwayrecordtype {
        const copy: Pathwayrecordtype = Object.assign({}, pathwayrecordtype);

        copy.lastmodifieddatetime = this.dateUtils.toDate(pathwayrecordtype.lastmodifieddatetime);
        return copy;
    }
}
