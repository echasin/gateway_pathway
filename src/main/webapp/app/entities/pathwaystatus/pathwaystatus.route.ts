import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PathwaystatusComponent } from './pathwaystatus.component';
import { PathwaystatusDetailComponent } from './pathwaystatus-detail.component';
import { PathwaystatusPopupComponent } from './pathwaystatus-dialog.component';
import { PathwaystatusDeletePopupComponent } from './pathwaystatus-delete-dialog.component';

@Injectable()
export class PathwaystatusResolvePagingParams implements Resolve<any> {

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

export const pathwaystatusRoute: Routes = [
    {
        path: 'pathwaystatus',
        component: PathwaystatusComponent,
        resolve: {
            'pagingParams': PathwaystatusResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwaystatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pathwaystatus/:id',
        component: PathwaystatusDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwaystatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pathwaystatusPopupRoute: Routes = [
    {
        path: 'pathwaystatus-new',
        component: PathwaystatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwaystatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pathwaystatus/:id/edit',
        component: PathwaystatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwaystatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pathwaystatus/:id/delete',
        component: PathwaystatusDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwaystatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
