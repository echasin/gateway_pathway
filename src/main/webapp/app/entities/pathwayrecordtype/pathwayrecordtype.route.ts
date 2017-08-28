import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PathwayrecordtypeComponent } from './pathwayrecordtype.component';
import { PathwayrecordtypeDetailComponent } from './pathwayrecordtype-detail.component';
import { PathwayrecordtypePopupComponent } from './pathwayrecordtype-dialog.component';
import { PathwayrecordtypeDeletePopupComponent } from './pathwayrecordtype-delete-dialog.component';

@Injectable()
export class PathwayrecordtypeResolvePagingParams implements Resolve<any> {

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

export const pathwayrecordtypeRoute: Routes = [
    {
        path: 'pathwayrecordtype',
        component: PathwayrecordtypeComponent,
        resolve: {
            'pagingParams': PathwayrecordtypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwayrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pathwayrecordtype/:id',
        component: PathwayrecordtypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwayrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pathwayrecordtypePopupRoute: Routes = [
    {
        path: 'pathwayrecordtype-new',
        component: PathwayrecordtypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwayrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pathwayrecordtype/:id/edit',
        component: PathwayrecordtypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwayrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pathwayrecordtype/:id/delete',
        component: PathwayrecordtypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwayrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
