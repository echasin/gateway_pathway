import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Vector } from './vector.model';
import { VectorService } from './vector.service';

@Component({
    selector: 'jhi-vector-detail',
    templateUrl: './vector-detail.component.html'
})
export class VectorDetailComponent implements OnInit, OnDestroy {

    vector: Vector;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private vectorService: VectorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVectors();
    }

    load(id) {
        this.vectorService.find(id).subscribe((vector) => {
            this.vector = vector;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVectors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'vectorListModification',
            (response) => this.load(this.vector.id)
        );
    }
}
