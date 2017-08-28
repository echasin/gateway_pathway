import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayPathwaySharedModule } from '../../shared';
import {
    PathwaytypeService,
    PathwaytypePopupService,
    PathwaytypeComponent,
    PathwaytypeDetailComponent,
    PathwaytypeDialogComponent,
    PathwaytypePopupComponent,
    PathwaytypeDeletePopupComponent,
    PathwaytypeDeleteDialogComponent,
    pathwaytypeRoute,
    pathwaytypePopupRoute,
    PathwaytypeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...pathwaytypeRoute,
    ...pathwaytypePopupRoute,
];

@NgModule({
    imports: [
        GatewayPathwaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PathwaytypeComponent,
        PathwaytypeDetailComponent,
        PathwaytypeDialogComponent,
        PathwaytypeDeleteDialogComponent,
        PathwaytypePopupComponent,
        PathwaytypeDeletePopupComponent,
    ],
    entryComponents: [
        PathwaytypeComponent,
        PathwaytypeDialogComponent,
        PathwaytypePopupComponent,
        PathwaytypeDeleteDialogComponent,
        PathwaytypeDeletePopupComponent,
    ],
    providers: [
        PathwaytypeService,
        PathwaytypePopupService,
        PathwaytypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPathwayPathwaytypeModule {}
