import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pathwayclass } from './pathwayclass.model';
import { PathwayclassPopupService } from './pathwayclass-popup.service';
import { PathwayclassService } from './pathwayclass.service';
import { Pathwayrecordtype, PathwayrecordtypeService } from '../pathwayrecordtype';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pathwayclass-dialog',
    templateUrl: './pathwayclass-dialog.component.html'
})
export class PathwayclassDialogComponent implements OnInit {

    pathwayclass: Pathwayclass;
    isSaving: boolean;

    pathwayrecordtypes: Pathwayrecordtype[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private pathwayclassService: PathwayclassService,
        private pathwayrecordtypeService: PathwayrecordtypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.pathwayrecordtypeService.query()
            .subscribe((res: ResponseWrapper) => { this.pathwayrecordtypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pathwayclass.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pathwayclassService.update(this.pathwayclass));
        } else {
            this.subscribeToSaveResponse(
                this.pathwayclassService.create(this.pathwayclass));
        }
    }

    private subscribeToSaveResponse(result: Observable<Pathwayclass>) {
        result.subscribe((res: Pathwayclass) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Pathwayclass) {
        this.eventManager.broadcast({ name: 'pathwayclassListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-pathwayclass-popup',
    template: ''
})
export class PathwayclassPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pathwayclassPopupService: PathwayclassPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pathwayclassPopupService
                    .open(PathwayclassDialogComponent as Component, params['id']);
            } else {
                this.pathwayclassPopupService
                    .open(PathwayclassDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
