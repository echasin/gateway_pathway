import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayPathwaySharedModule } from '../../shared';
import {
    PathwayclassService,
    PathwayclassPopupService,
    PathwayclassComponent,
    PathwayclassDetailComponent,
    PathwayclassDialogComponent,
    PathwayclassPopupComponent,
    PathwayclassDeletePopupComponent,
    PathwayclassDeleteDialogComponent,
    pathwayclassRoute,
    pathwayclassPopupRoute,
    PathwayclassResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...pathwayclassRoute,
    ...pathwayclassPopupRoute,
];

@NgModule({
    imports: [
        GatewayPathwaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PathwayclassComponent,
        PathwayclassDetailComponent,
        PathwayclassDialogComponent,
        PathwayclassDeleteDialogComponent,
        PathwayclassPopupComponent,
        PathwayclassDeletePopupComponent,
    ],
    entryComponents: [
        PathwayclassComponent,
        PathwayclassDialogComponent,
        PathwayclassPopupComponent,
        PathwayclassDeleteDialogComponent,
        PathwayclassDeletePopupComponent,
    ],
    providers: [
        PathwayclassService,
        PathwayclassPopupService,
        PathwayclassResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPathwayPathwayclassModule {}
