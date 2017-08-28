import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayPathwaySharedModule } from '../../shared';
import {
    PathwaystatusService,
    PathwaystatusPopupService,
    PathwaystatusComponent,
    PathwaystatusDetailComponent,
    PathwaystatusDialogComponent,
    PathwaystatusPopupComponent,
    PathwaystatusDeletePopupComponent,
    PathwaystatusDeleteDialogComponent,
    pathwaystatusRoute,
    pathwaystatusPopupRoute,
    PathwaystatusResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...pathwaystatusRoute,
    ...pathwaystatusPopupRoute,
];

@NgModule({
    imports: [
        GatewayPathwaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PathwaystatusComponent,
        PathwaystatusDetailComponent,
        PathwaystatusDialogComponent,
        PathwaystatusDeleteDialogComponent,
        PathwaystatusPopupComponent,
        PathwaystatusDeletePopupComponent,
    ],
    entryComponents: [
        PathwaystatusComponent,
        PathwaystatusDialogComponent,
        PathwaystatusPopupComponent,
        PathwaystatusDeleteDialogComponent,
        PathwaystatusDeletePopupComponent,
    ],
    providers: [
        PathwaystatusService,
        PathwaystatusPopupService,
        PathwaystatusResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPathwayPathwaystatusModule {}
