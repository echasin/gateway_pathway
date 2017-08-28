import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Pathwayrecordtype } from './pathwayrecordtype.model';
import { PathwayrecordtypeService } from './pathwayrecordtype.service';

@Injectable()
export class PathwayrecordtypePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private pathwayrecordtypeService: PathwayrecordtypeService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.pathwayrecordtypeService.find(id).subscribe((pathwayrecordtype) => {
                    pathwayrecordtype.lastmodifieddatetime = this.datePipe
                        .transform(pathwayrecordtype.lastmodifieddatetime, 'yyyy-MM-ddThh:mm');
                    this.ngbModalRef = this.pathwayrecordtypeModalRef(component, pathwayrecordtype);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.pathwayrecordtypeModalRef(component, new Pathwayrecordtype());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pathwayrecordtypeModalRef(component: Component, pathwayrecordtype: Pathwayrecordtype): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pathwayrecordtype = pathwayrecordtype;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
