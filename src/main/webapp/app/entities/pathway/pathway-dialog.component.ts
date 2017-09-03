import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef ,NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pathway } from './pathway.model';
import { PathwayPopupService } from './pathway-popup.service';
import { PathwayService } from './pathway.service';
import { Pathwayrecordtype, PathwayrecordtypeService } from '../pathwayrecordtype';
import { Pathwayclass, PathwayclassService } from '../pathwayclass';
import { Pathwaycategory, PathwaycategoryService } from '../pathwaycategory';
import { Pathwaytype, PathwaytypeService } from '../pathwaytype';
import { ResponseWrapper } from '../../shared';


@Component({
    selector: 'jhi-pathway-dialog',
    templateUrl: './pathway-dialog.component.html'
})
export class PathwayDialogComponent implements OnInit {

    pathway: Pathway;
    isSaving: boolean;

    pathwayrecordtypes: Pathwayrecordtype[];

    pathwayclasses: Pathwayclass[];

    pathwaycategories: Pathwaycategory[];

    pathwaytypes: Pathwaytype[];
    
    closeResult: string;

    asset: any=[];
    
    query : any;
    
    
    constructor(
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private pathwayService: PathwayService,
        private pathwayrecordtypeService: PathwayrecordtypeService,
        private pathwayclassService: PathwayclassService,
        private pathwaycategoryService: PathwaycategoryService,
        private pathwaytypeService: PathwaytypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.pathwayrecordtypeService.query()
            .subscribe((res: ResponseWrapper) => { this.pathwayrecordtypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.pathwayclassService.query()
            .subscribe((res: ResponseWrapper) => { this.pathwayclasses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.pathwaycategoryService.query()
            .subscribe((res: ResponseWrapper) => { this.pathwaycategories = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.pathwaytypeService.query()
            .subscribe((res: ResponseWrapper) => { this.pathwaytypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pathway.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pathwayService.update(this.pathway));
        } else {
            this.subscribeToSaveResponse(
                this.pathwayService.create(this.pathway));
        }
    }

    private subscribeToSaveResponse(result: Observable<Pathway>) {
        result.subscribe((res: Pathway) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Pathway) {
        this.eventManager.broadcast({ name: 'pathwayListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackPathwayrecordtypeById(index: number, item: Pathwayrecordtype) {
        return item.id;
    }

    trackPathwayclassById(index: number, item: Pathwayclass) {
        return item.id;
    }

    trackPathwaycategoryById(index: number, item: Pathwaycategory) {
        return item.id;
    }

    trackPathwaytypeById(index: number, item: Pathwaytype) {
        return item.id;
    }
    open(content) {
      this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
    }

    private getDismissReason(reason: any): string {
     if (reason === ModalDismissReasons.ESC) {
       return 'by pressing ESC';
     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
       return 'by clicking on a backdrop';
     } else {
      return  `with: ${reason}`;
     }
    }
        
    searchAsset(){
        console.log(this.query);
        this.pathwayService.searchAsset(this.query).subscribe((asset) => {
            this.asset = asset;
            console.log(asset);
        });
    }
    
    setOrigin(origin){
        this.pathway.originjson=JSON.stringify(origin);
    }
    
    setDestination(destination){
        this.pathway.destinationjson=JSON.stringify(destination);
    }
    
}

@Component({
    selector: 'jhi-pathway-popup',
    template: ''
})
export class PathwayPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pathwayPopupService: PathwayPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pathwayPopupService
                    .open(PathwayDialogComponent as Component, params['id']);
            } else {
                this.pathwayPopupService
                    .open(PathwayDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }   
 
}
