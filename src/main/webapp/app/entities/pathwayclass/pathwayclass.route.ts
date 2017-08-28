import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PathwayclassComponent } from './pathwayclass.component';
import { PathwayclassDetailComponent } from './pathwayclass-detail.component';
import { PathwayclassPopupComponent } from './pathwayclass-dialog.component';
import { PathwayclassDeletePopupComponent } from './pathwayclass-delete-dialog.component';

@Injectable()
export class PathwayclassResolvePagingParams implements Resolve<any> {

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

export const pathwayclassRoute: Routes = [
    {
        path: 'pathwayclass',
        component: PathwayclassComponent,
        resolve: {
            'pagingParams': PathwayclassResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwayclass.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pathwayclass/:id',
        component: PathwayclassDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwayclass.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pathwayclassPopupRoute: Routes = [
    {
        path: 'pathwayclass-new',
        component: PathwayclassPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwayclass.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pathwayclass/:id/edit',
        component: PathwayclassPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwayclass.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pathwayclass/:id/delete',
        component: PathwayclassDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwayclass.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
