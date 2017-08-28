import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PathwayComponent } from './pathway.component';
import { PathwayDetailComponent } from './pathway-detail.component';
import { PathwayPopupComponent } from './pathway-dialog.component';
import { PathwayDeletePopupComponent } from './pathway-delete-dialog.component';

@Injectable()
export class PathwayResolvePagingParams implements Resolve<any> {

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

export const pathwayRoute: Routes = [
    {
        path: 'pathway',
        component: PathwayComponent,
        resolve: {
            'pagingParams': PathwayResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathway.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pathway/:id',
        component: PathwayDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathway.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pathwayPopupRoute: Routes = [
    {
        path: 'pathway-new',
        component: PathwayPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathway.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pathway/:id/edit',
        component: PathwayPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathway.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pathway/:id/delete',
        component: PathwayDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayPathwayApp.pathway.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
