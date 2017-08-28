import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pathwaystatus } from './pathwaystatus.model';
import { PathwaystatusPopupService } from './pathwaystatus-popup.service';
import { PathwaystatusService } from './pathwaystatus.service';

@Component({
    selector: 'jhi-pathwaystatus-dialog',
    templateUrl: './pathwaystatus-dialog.component.html'
})
export class PathwaystatusDialogComponent implements OnInit {

    pathwaystatus: Pathwaystatus;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private pathwaystatusService: PathwaystatusService,
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
        if (this.pathwaystatus.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pathwaystatusService.update(this.pathwaystatus));
        } else {
            this.subscribeToSaveResponse(
                this.pathwaystatusService.create(this.pathwaystatus));
        }
    }

    private subscribeToSaveResponse(result: Observable<Pathwaystatus>) {
        result.subscribe((res: Pathwaystatus) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Pathwaystatus) {
        this.eventManager.broadcast({ name: 'pathwaystatusListModification', content: 'OK'});
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
    selector: 'jhi-pathwaystatus-popup',
    template: ''
})
export class PathwaystatusPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pathwaystatusPopupService: PathwaystatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pathwaystatusPopupService
                    .open(PathwaystatusDialogComponent as Component, params['id']);
            } else {
                this.pathwaystatusPopupService
                    .open(PathwaystatusDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
