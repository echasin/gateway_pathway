import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pathwaystatus } from './pathwaystatus.model';
import { PathwaystatusPopupService } from './pathwaystatus-popup.service';
import { PathwaystatusService } from './pathwaystatus.service';

@Component({
    selector: 'jhi-pathwaystatus-delete-dialog',
    templateUrl: './pathwaystatus-delete-dialog.component.html'
})
export class PathwaystatusDeleteDialogComponent {

    pathwaystatus: Pathwaystatus;

    constructor(
        private pathwaystatusService: PathwaystatusService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pathwaystatusService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pathwaystatusListModification',
                content: 'Deleted an pathwaystatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pathwaystatus-delete-popup',
    template: ''
})
export class PathwaystatusDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pathwaystatusPopupService: PathwaystatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pathwaystatusPopupService
                .open(PathwaystatusDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
