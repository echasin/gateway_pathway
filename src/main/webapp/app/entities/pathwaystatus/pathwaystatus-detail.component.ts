import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Pathwaystatus } from './pathwaystatus.model';
import { PathwaystatusService } from './pathwaystatus.service';

@Component({
    selector: 'jhi-pathwaystatus-detail',
    templateUrl: './pathwaystatus-detail.component.html'
})
export class PathwaystatusDetailComponent implements OnInit, OnDestroy {

    pathwaystatus: Pathwaystatus;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pathwaystatusService: PathwaystatusService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPathwaystatuses();
    }

    load(id) {
        this.pathwaystatusService.find(id).subscribe((pathwaystatus) => {
            this.pathwaystatus = pathwaystatus;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPathwaystatuses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pathwaystatusListModification',
            (response) => this.load(this.pathwaystatus.id)
        );
    }
}
