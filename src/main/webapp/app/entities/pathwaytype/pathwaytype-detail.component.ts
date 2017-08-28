import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Pathwaytype } from './pathwaytype.model';
import { PathwaytypeService } from './pathwaytype.service';

@Component({
    selector: 'jhi-pathwaytype-detail',
    templateUrl: './pathwaytype-detail.component.html'
})
export class PathwaytypeDetailComponent implements OnInit, OnDestroy {

    pathwaytype: Pathwaytype;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pathwaytypeService: PathwaytypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPathwaytypes();
    }

    load(id) {
        this.pathwaytypeService.find(id).subscribe((pathwaytype) => {
            this.pathwaytype = pathwaytype;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPathwaytypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pathwaytypeListModification',
            (response) => this.load(this.pathwaytype.id)
        );
    }
}
