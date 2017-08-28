import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pathwayrecordtype } from './pathwayrecordtype.model';
import { PathwayrecordtypePopupService } from './pathwayrecordtype-popup.service';
import { PathwayrecordtypeService } from './pathwayrecordtype.service';

@Component({
    selector: 'jhi-pathwayrecordtype-dialog',
    templateUrl: './pathwayrecordtype-dialog.component.html'
})
export class PathwayrecordtypeDialogComponent implements OnInit {

    pathwayrecordtype: Pathwayrecordtype;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private pathwayrecordtypeService: PathwayrecordtypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pathwayrecordtype.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pathwayrecordtypeService.update(this.pathwayrecordtype));
        } else {
            this.subscribeToSaveResponse(
                this.pathwayrecordtypeService.create(this.pathwayrecordtype));
        }
    }

    private subscribeToSaveResponse(result: Observable<Pathwayrecordtype>) {
        result.subscribe((res: Pathwayrecordtype) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Pathwayrecordtype) {
        this.eventManager.broadcast({ name: 'pathwayrecordtypeListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-pathwayrecordtype-popup',
    template: ''
})
export class PathwayrecordtypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pathwayrecordtypePopupService: PathwayrecordtypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pathwayrecordtypePopupService
                    .open(PathwayrecordtypeDialogComponent as Component, params['id']);
            } else {
                this.pathwayrecordtypePopupService
                    .open(PathwayrecordtypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
