import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PathwaycategoryComponent } from './pathwaycategory.component';
import { PathwaycategoryDetailComponent } from './pathwaycategory-detail.component';
import { PathwaycategoryPopupComponent } from './pathwaycategory-dialog.component';
import { PathwaycategoryDeletePopupComponent } from './pathwaycategory-delete-dialog.component';

@Injectable()
export class PathwaycategoryResolvePagingParams implements Resolve<any> {

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

export const pathwaycategoryRoute: Routes = [
    {
        path: 'pathwaycategory',
        component: PathwaycategoryComponent,
        resolve: {
            'pagingParams': PathwaycategoryResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwaycategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pathwaycategory/:id',
        component: PathwaycategoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwaycategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pathwaycategoryPopupRoute: Routes = [
    {
        path: 'pathwaycategory-new',
        component: PathwaycategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwaycategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pathwaycategory/:id/edit',
        component: PathwaycategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwaycategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pathwaycategory/:id/delete',
        component: PathwaycategoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathwaycategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
