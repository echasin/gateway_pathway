import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pathwaycategory } from './pathwaycategory.model';
import { PathwaycategoryPopupService } from './pathwaycategory-popup.service';
import { PathwaycategoryService } from './pathwaycategory.service';
import { Pathwayclass, PathwayclassService } from '../pathwayclass';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pathwaycategory-dialog',
    templateUrl: './pathwaycategory-dialog.component.html'
})
export class PathwaycategoryDialogComponent implements OnInit {

    pathwaycategory: Pathwaycategory;
    isSaving: boolean;

    pathwayclasses: Pathwayclass[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private pathwaycategoryService: PathwaycategoryService,
        private pathwayclassService: PathwayclassService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.pathwayclassService.query()
            .subscribe((res: ResponseWrapper) => { this.pathwayclasses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pathwaycategory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pathwaycategoryService.update(this.pathwaycategory));
        } else {
            this.subscribeToSaveResponse(
                this.pathwaycategoryService.create(this.pathwaycategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<Pathwaycategory>) {
        result.subscribe((res: Pathwaycategory) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Pathwaycategory) {
        this.eventManager.broadcast({ name: 'pathwaycategoryListModification', content: 'OK'});
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

    trackPathwayclassById(index: number, item: Pathwayclass) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pathwaycategory-popup',
    template: ''
})
export class PathwaycategoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pathwaycategoryPopupService: PathwaycategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pathwaycategoryPopupService
                    .open(PathwaycategoryDialogComponent as Component, params['id']);
            } else {
                this.pathwaycategoryPopupService
                    .open(PathwaycategoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
