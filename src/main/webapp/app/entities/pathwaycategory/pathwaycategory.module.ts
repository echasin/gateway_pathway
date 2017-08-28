import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayPathwaySharedModule } from '../../shared';
import {
    PathwaycategoryService,
    PathwaycategoryPopupService,
    PathwaycategoryComponent,
    PathwaycategoryDetailComponent,
    PathwaycategoryDialogComponent,
    PathwaycategoryPopupComponent,
    PathwaycategoryDeletePopupComponent,
    PathwaycategoryDeleteDialogComponent,
    pathwaycategoryRoute,
    pathwaycategoryPopupRoute,
    PathwaycategoryResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...pathwaycategoryRoute,
    ...pathwaycategoryPopupRoute,
];

@NgModule({
    imports: [
        GatewayPathwaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PathwaycategoryComponent,
        PathwaycategoryDetailComponent,
        PathwaycategoryDialogComponent,
        PathwaycategoryDeleteDialogComponent,
        PathwaycategoryPopupComponent,
        PathwaycategoryDeletePopupComponent,
    ],
    entryComponents: [
        PathwaycategoryComponent,
        PathwaycategoryDialogComponent,
        PathwaycategoryPopupComponent,
        PathwaycategoryDeleteDialogComponent,
        PathwaycategoryDeletePopupComponent,
    ],
    providers: [
        PathwaycategoryService,
        PathwaycategoryPopupService,
        PathwaycategoryResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPathwayPathwaycategoryModule {}
