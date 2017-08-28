import { BaseEntity } from './../../shared';

export class Pathwaycategory implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public nameshort?: string,
        public description?: string,
        public status?: string,
        public lastmodifiedby?: string,
        public lastmodifieddatetime?: any,
        public domain?: string,
        public pathwayclass?: BaseEntity,
    ) {
    }
}
