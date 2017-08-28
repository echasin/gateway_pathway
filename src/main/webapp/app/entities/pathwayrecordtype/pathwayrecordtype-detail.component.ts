import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Pathwayrecordtype } from './pathwayrecordtype.model';
import { PathwayrecordtypeService } from './pathwayrecordtype.service';

@Component({
    selector: 'jhi-pathwayrecordtype-detail',
    templateUrl: './pathwayrecordtype-detail.component.html'
})
export class PathwayrecordtypeDetailComponent implements OnInit, OnDestroy {

    pathwayrecordtype: Pathwayrecordtype;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pathwayrecordtypeService: PathwayrecordtypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPathwayrecordtypes();
    }

    load(id) {
        this.pathwayrecordtypeService.find(id).subscribe((pathwayrecordtype) => {
            this.pathwayrecordtype = pathwayrecordtype;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPathwayrecordtypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pathwayrecordtypeListModification',
            (response) => this.load(this.pathwayrecordtype.id)
        );
    }
}
