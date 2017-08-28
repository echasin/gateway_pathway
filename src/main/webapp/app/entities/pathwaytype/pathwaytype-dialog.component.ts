import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pathwaytype } from './pathwaytype.model';
import { PathwaytypePopupService } from './pathwaytype-popup.service';
import { PathwaytypeService } from './pathwaytype.service';
import { Pathwaycategory, PathwaycategoryService } from '../pathwaycategory';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pathwaytype-dialog',
    templateUrl: './pathwaytype-dialog.component.html'
})
export class PathwaytypeDialogComponent implements OnInit {

    pathwaytype: Pathwaytype;
    isSaving: boolean;

    pathwaycategories: Pathwaycategory[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private pathwaytypeService: PathwaytypeService,
        private pathwaycategoryService: PathwaycategoryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.pathwaycategoryService.query()
            .subscribe((res: ResponseWrapper) => { this.pathwaycategories = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pathwaytype.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pathwaytypeService.update(this.pathwaytype));
        } else {
            this.subscribeToSaveResponse(
                this.pathwaytypeService.create(this.pathwaytype));
        }
    }

    private subscribeToSaveResponse(result: Observable<Pathwaytype>) {
        result.subscribe((res: Pathwaytype) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Pathwaytype) {
        this.eventManager.broadcast({ name: 'pathwaytypeListModification', content: 'OK'});
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

    trackPathwaycategoryById(index: number, item: Pathwaycategory) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pathwaytype-popup',
    template: ''
})
export class PathwaytypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pathwaytypePopupService: PathwaytypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pathwaytypePopupService
                    .open(PathwaytypeDialogComponent as Component, params['id']);
            } else {
                this.pathwaytypePopupService
                    .open(PathwaytypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
