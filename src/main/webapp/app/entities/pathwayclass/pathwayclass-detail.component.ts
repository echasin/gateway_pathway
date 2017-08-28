import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Pathwayclass } from './pathwayclass.model';
import { PathwayclassService } from './pathwayclass.service';

@Component({
    selector: 'jhi-pathwayclass-detail',
    templateUrl: './pathwayclass-detail.component.html'
})
export class PathwayclassDetailComponent implements OnInit, OnDestroy {

    pathwayclass: Pathwayclass;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pathwayclassService: PathwayclassService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPathwayclasses();
    }

    load(id) {
        this.pathwayclassService.find(id).subscribe((pathwayclass) => {
            this.pathwayclass = pathwayclass;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPathwayclasses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pathwayclassListModification',
            (response) => this.load(this.pathwayclass.id)
        );
    }
}
