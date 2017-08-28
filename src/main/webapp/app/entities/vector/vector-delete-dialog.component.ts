import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Vector } from './vector.model';
import { VectorPopupService } from './vector-popup.service';
import { VectorService } from './vector.service';

@Component({
    selector: 'jhi-vector-delete-dialog',
    templateUrl: './vector-delete-dialog.component.html'
})
export class VectorDeleteDialogComponent {

    vector: Vector;

    constructor(
        private vectorService: VectorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vectorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'vectorListModification',
                content: 'Deleted an vector'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vector-delete-popup',
    template: ''
})
export class VectorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vectorPopupService: VectorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.vectorPopupService
                .open(VectorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
