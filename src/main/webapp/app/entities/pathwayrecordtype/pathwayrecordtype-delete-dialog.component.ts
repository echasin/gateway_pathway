import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pathwayrecordtype } from './pathwayrecordtype.model';
import { PathwayrecordtypePopupService } from './pathwayrecordtype-popup.service';
import { PathwayrecordtypeService } from './pathwayrecordtype.service';

@Component({
    selector: 'jhi-pathwayrecordtype-delete-dialog',
    templateUrl: './pathwayrecordtype-delete-dialog.component.html'
})
export class PathwayrecordtypeDeleteDialogComponent {

    pathwayrecordtype: Pathwayrecordtype;

    constructor(
        private pathwayrecordtypeService: PathwayrecordtypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pathwayrecordtypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pathwayrecordtypeListModification',
                content: 'Deleted an pathwayrecordtype'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pathwayrecordtype-delete-popup',
    template: ''
})
export class PathwayrecordtypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pathwayrecordtypePopupService: PathwayrecordtypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pathwayrecordtypePopupService
                .open(PathwayrecordtypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
