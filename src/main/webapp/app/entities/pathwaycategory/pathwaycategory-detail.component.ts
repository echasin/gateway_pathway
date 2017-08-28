import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Pathwaycategory } from './pathwaycategory.model';
import { PathwaycategoryService } from './pathwaycategory.service';

@Component({
    selector: 'jhi-pathwaycategory-detail',
    templateUrl: './pathwaycategory-detail.component.html'
})
export class PathwaycategoryDetailComponent implements OnInit, OnDestroy {

    pathwaycategory: Pathwaycategory;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pathwaycategoryService: PathwaycategoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPathwaycategories();
    }

    load(id) {
        this.pathwaycategoryService.find(id).subscribe((pathwaycategory) => {
            this.pathwaycategory = pathwaycategory;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPathwaycategories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pathwaycategoryListModification',
            (response) => this.load(this.pathwaycategory.id)
        );
    }
}
