import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayPathwaySharedModule } from '../../shared';
import {
    VectorService,
    VectorPopupService,
    VectorComponent,
    VectorDetailComponent,
    VectorDialogComponent,
    VectorPopupComponent,
    VectorDeletePopupComponent,
    VectorDeleteDialogComponent,
    vectorRoute,
    vectorPopupRoute,
    VectorResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...vectorRoute,
    ...vectorPopupRoute,
];

@NgModule({
    imports: [
        GatewayPathwaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        VectorComponent,
        VectorDetailComponent,
        VectorDialogComponent,
        VectorDeleteDialogComponent,
        VectorPopupComponent,
        VectorDeletePopupComponent,
    ],
    entryComponents: [
        VectorComponent,
        VectorDialogComponent,
        VectorPopupComponent,
        VectorDeleteDialogComponent,
        VectorDeletePopupComponent,
    ],
    providers: [
        VectorService,
        VectorPopupService,
        VectorResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPathwayVectorModule {}
