import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Vector } from './vector.model';
import { VectorPopupService } from './vector-popup.service';
import { VectorService } from './vector.service';
import { Pathwayrecordtype, PathwayrecordtypeService } from '../pathwayrecordtype';
import { Pathwayclass, PathwayclassService } from '../pathwayclass';
import { Pathwaycategory, PathwaycategoryService } from '../pathwaycategory';
import { Pathwaytype, PathwaytypeService } from '../pathwaytype';
import { Pathway, PathwayService } from '../pathway';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-vector-dialog',
    templateUrl: './vector-dialog.component.html'
})
export class VectorDialogComponent implements OnInit {

    vector: Vector;
    isSaving: boolean;

    pathwayrecordtypes: Pathwayrecordtype[];

    pathwayclasses: Pathwayclass[];

    pathwaycategories: Pathwaycategory[];

    pathwaytypes: Pathwaytype[];

    pathways: Pathway[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private vectorService: VectorService,
        private pathwayrecordtypeService: PathwayrecordtypeService,
        private pathwayclassService: PathwayclassService,
        private pathwaycategoryService: PathwaycategoryService,
        private pathwaytypeService: PathwaytypeService,
        private pathwayService: PathwayService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.pathwayrecordtypeService.query()
            .subscribe((res: ResponseWrapper) => { this.pathwayrecordtypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.pathwayclassService.query()
            .subscribe((res: ResponseWrapper) => { this.pathwayclasses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.pathwaycategoryService.query()
            .subscribe((res: ResponseWrapper) => { this.pathwaycategories = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.pathwaytypeService.query()
            .subscribe((res: ResponseWrapper) => { this.pathwaytypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.pathwayService.query()
            .subscribe((res: ResponseWrapper) => { this.pathways = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.vector.id !== undefined) {
            this.subscribeToSaveResponse(
                this.vectorService.update(this.vector));
        } else {
            this.subscribeToSaveResponse(
                this.vectorService.create(this.vector));
        }
    }

    private subscribeToSaveResponse(result: Observable<Vector>) {
        result.subscribe((res: Vector) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Vector) {
        this.eventManager.broadcast({ name: 'vectorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackPathwayrecordtypeById(index: number, item: Pathwayrecordtype) {
        return item.id;
    }

    trackPathwayclassById(index: number, item: Pathwayclass) {
        return item.id;
    }

    trackPathwaycategoryById(index: number, item: Pathwaycategory) {
        return item.id;
    }

    trackPathwaytypeById(index: number, item: Pathwaytype) {
        return item.id;
    }

    trackPathwayById(index: number, item: Pathway) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-vector-popup',
    template: ''
})
export class VectorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vectorPopupService: VectorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.vectorPopupService
                    .open(VectorDialogComponent as Component, params['id']);
            } else {
                this.vectorPopupService
                    .open(VectorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
