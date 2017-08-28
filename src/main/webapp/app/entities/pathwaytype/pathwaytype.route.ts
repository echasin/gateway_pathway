import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PathwaytypeComponent } from './pathwaytype.component';
import { PathwaytypeDetailComponent } from './pathwaytype-detail.component';
import { PathwaytypePopupComponent } from './pathwaytype-dialog.component';
import { PathwaytypeDeletePopupComponent } from './pathwaytype-delete-dialog.component';

@Injectable()
export class PathwaytypeResolvePagingParams implements Resolve<any> {

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

export const pathwaytypeRoute: Routes = [
    {
        path: 'pathwaytype',
        component: PathwaytypeComponent,
        resolve: {
            'pagingParams': PathwaytypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwaytype.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pathwaytype/:id',
        component: PathwaytypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwaytype.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pathwaytypePopupRoute: Routes = [
    {
        path: 'pathwaytype-new',
        component: PathwaytypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwaytype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pathwaytype/:id/edit',
        component: PathwaytypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwaytype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pathwaytype/:id/delete',
        component: PathwaytypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwaytype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
