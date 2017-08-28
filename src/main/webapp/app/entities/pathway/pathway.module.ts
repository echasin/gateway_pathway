import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayPathwaySharedModule } from '../../shared';
import {
    PathwayService,
    PathwayPopupService,
    PathwayComponent,
    PathwayDetailComponent,
    PathwayDialogComponent,
    PathwayPopupComponent,
    PathwayDeletePopupComponent,
    PathwayDeleteDialogComponent,
    pathwayRoute,
    pathwayPopupRoute,
    PathwayResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...pathwayRoute,
    ...pathwayPopupRoute,
];

@NgModule({
    imports: [
        GatewayPathwaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PathwayComponent,
        PathwayDetailComponent,
        PathwayDialogComponent,
        PathwayDeleteDialogComponent,
        PathwayPopupComponent,
        PathwayDeletePopupComponent,
    ],
    entryComponents: [
        PathwayComponent,
        PathwayDialogComponent,
        PathwayPopupComponent,
        PathwayDeleteDialogComponent,
        PathwayDeletePopupComponent,
    ],
    providers: [
        PathwayService,
        PathwayPopupService,
        PathwayResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPathwayPathwayModule {}
