import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pathwaycategory } from './pathwaycategory.model';
import { PathwaycategoryPopupService } from './pathwaycategory-popup.service';
import { PathwaycategoryService } from './pathwaycategory.service';

@Component({
    selector: 'jhi-pathwaycategory-delete-dialog',
    templateUrl: './pathwaycategory-delete-dialog.component.html'
})
export class PathwaycategoryDeleteDialogComponent {

    pathwaycategory: Pathwaycategory;

    constructor(
        private pathwaycategoryService: PathwaycategoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pathwaycategoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pathwaycategoryListModification',
                content: 'Deleted an pathwaycategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pathwaycategory-delete-popup',
    template: ''
})
export class PathwaycategoryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pathwaycategoryPopupService: PathwaycategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pathwaycategoryPopupService
                .open(PathwaycategoryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
