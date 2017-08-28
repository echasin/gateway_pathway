import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Pathway } from './pathway.model';
import { PathwayService } from './pathway.service';

@Component({
    selector: 'jhi-pathway-detail',
    templateUrl: './pathway-detail.component.html'
})
export class PathwayDetailComponent implements OnInit, OnDestroy {

    pathway: Pathway;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pathwayService: PathwayService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPathways();
    }

    load(id) {
        this.pathwayService.find(id).subscribe((pathway) => {
            this.pathway = pathway;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPathways() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pathwayListModification',
            (response) => this.load(this.pathway.id)
        );
    }
}
