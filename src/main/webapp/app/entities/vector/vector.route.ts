import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { VectorComponent } from './vector.component';
import { VectorDetailComponent } from './vector-detail.component';
import { VectorPopupComponent } from './vector-dialog.component';
import { VectorDeletePopupComponent } from './vector-delete-dialog.component';

@Injectable()
export class VectorResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const vectorRoute: Routes = [
    {
        path: 'vector',
        component: VectorComponent,
        resolve: {
            'pagingParams': VectorResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.vector.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'vector/:id',
        component: VectorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.vector.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vectorPopupRoute: Routes = [
    {
        path: 'vector-new',
        component: VectorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.vector.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vector/:id/edit',
        component: VectorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.vector.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vector/:id/delete',
        component: VectorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.vector.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
