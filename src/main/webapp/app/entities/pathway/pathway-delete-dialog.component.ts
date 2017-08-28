import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pathway } from './pathway.model';
import { PathwayPopupService } from './pathway-popup.service';
import { PathwayService } from './pathway.service';

@Component({
    selector: 'jhi-pathway-delete-dialog',
    templateUrl: './pathway-delete-dialog.component.html'
})
export class PathwayDeleteDialogComponent {

    pathway: Pathway;

    constructor(
        private pathwayService: PathwayService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pathwayService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pathwayListModification',
                content: 'Deleted an pathway'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pathway-delete-popup',
    template: ''
})
export class PathwayDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pathwayPopupService: PathwayPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pathwayPopupService
                .open(PathwayDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
