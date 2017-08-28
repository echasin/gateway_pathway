import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayPathwayPathwayModule } from './pathway/pathway.module';
import { GatewayPathwayPathwaycategoryModule } from './pathwaycategory/pathwaycategory.module';
import { GatewayPathwayPathwayclassModule } from './pathwayclass/pathwayclass.module';
import { GatewayPathwayPathwayrecordtypeModule } from './pathwayrecordtype/pathwayrecordtype.module';
import { GatewayPathwayPathwaystatusModule } from './pathwaystatus/pathwaystatus.module';
import { GatewayPathwayPathwaytypeModule } from './pathwaytype/pathwaytype.module';
import { GatewayPathwayVectorModule } from './vector/vector.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayPathwayPathwayModule,
        GatewayPathwayPathwaycategoryModule,
        GatewayPathwayPathwayclassModule,
        GatewayPathwayPathwayrecordtypeModule,
        GatewayPathwayPathwaystatusModule,
        GatewayPathwayPathwaytypeModule,
        GatewayPathwayVectorModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPathwayEntityModule {}
