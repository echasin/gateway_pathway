import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayPathwaySharedModule } from '../../shared';
import {
    PathwayrecordtypeService,
    PathwayrecordtypePopupService,
    PathwayrecordtypeComponent,
    PathwayrecordtypeDetailComponent,
    PathwayrecordtypeDialogComponent,
    PathwayrecordtypePopupComponent,
    PathwayrecordtypeDeletePopupComponent,
    PathwayrecordtypeDeleteDialogComponent,
    pathwayrecordtypeRoute,
    pathwayrecordtypePopupRoute,
    PathwayrecordtypeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...pathwayrecordtypeRoute,
    ...pathwayrecordtypePopupRoute,
];

@NgModule({
    imports: [
        GatewayPathwaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PathwayrecordtypeComponent,
        PathwayrecordtypeDetailComponent,
        PathwayrecordtypeDialogComponent,
        PathwayrecordtypeDeleteDialogComponent,
        PathwayrecordtypePopupComponent,
        PathwayrecordtypeDeletePopupComponent,
    ],
    entryComponents: [
        PathwayrecordtypeComponent,
        PathwayrecordtypeDialogComponent,
        PathwayrecordtypePopupComponent,
        PathwayrecordtypeDeleteDialogComponent,
        PathwayrecordtypeDeletePopupComponent,
    ],
    providers: [
        PathwayrecordtypeService,
        PathwayrecordtypePopupService,
        PathwayrecordtypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPathwayPathwayrecordtypeModule {}
