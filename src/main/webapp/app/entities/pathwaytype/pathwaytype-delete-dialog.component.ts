import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pathwaytype } from './pathwaytype.model';
import { PathwaytypePopupService } from './pathwaytype-popup.service';
import { PathwaytypeService } from './pathwaytype.service';

@Component({
    selector: 'jhi-pathwaytype-delete-dialog',
    templateUrl: './pathwaytype-delete-dialog.component.html'
})
export class PathwaytypeDeleteDialogComponent {

    pathwaytype: Pathwaytype;

    constructor(
        private pathwaytypeService: PathwaytypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pathwaytypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pathwaytypeListModification',
                content: 'Deleted an pathwaytype'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pathwaytype-delete-popup',
    template: ''
})
export class PathwaytypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pathwaytypePopupService: PathwaytypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pathwaytypePopupService
                .open(PathwaytypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
