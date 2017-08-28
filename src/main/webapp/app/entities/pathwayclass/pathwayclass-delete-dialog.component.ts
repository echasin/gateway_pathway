import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pathwayclass } from './pathwayclass.model';
import { PathwayclassPopupService } from './pathwayclass-popup.service';
import { PathwayclassService } from './pathwayclass.service';

@Component({
    selector: 'jhi-pathwayclass-delete-dialog',
    templateUrl: './pathwayclass-delete-dialog.component.html'
})
export class PathwayclassDeleteDialogComponent {

    pathwayclass: Pathwayclass;

    constructor(
        private pathwayclassService: PathwayclassService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pathwayclassService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pathwayclassListModification',
                content: 'Deleted an pathwayclass'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pathwayclass-delete-popup',
    template: ''
})
export class PathwayclassDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pathwayclassPopupService: PathwayclassPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pathwayclassPopupService
                .open(PathwayclassDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
