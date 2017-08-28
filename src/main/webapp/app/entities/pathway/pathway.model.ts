import { BaseEntity } from './../../shared';

export class Pathway implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public nameshort?: string,
        public originjson?: string,
        public destinationjson?: string,
        public description?: string,
        public status?: string,
        public lastmodifiedby?: string,
        public lastmodifieddatetime?: any,
        public domain?: string,
        public vectors?: BaseEntity[],
        public pathwayrecordtype?: BaseEntity,
        public pathwayclass?: BaseEntity,
        public pathwaycategory?: BaseEntity,
        public pathwaytype?: BaseEntity,
    ) {
    }
}
