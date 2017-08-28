/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayPathwayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PathwayrecordtypeDetailComponent } from '../../../../../../main/webapp/app/entities/pathwayrecordtype/pathwayrecordtype-detail.component';
import { PathwayrecordtypeService } from '../../../../../../main/webapp/app/entities/pathwayrecordtype/pathwayrecordtype.service';
import { Pathwayrecordtype } from '../../../../../../main/webapp/app/entities/pathwayrecordtype/pathwayrecordtype.model';

describe('Component Tests', () => {

    describe('Pathwayrecordtype Management Detail Component', () => {
        let comp: PathwayrecordtypeDetailComponent;
        let fixture: ComponentFixture<PathwayrecordtypeDetailComponent>;
        let service: PathwayrecordtypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayPathwayTestModule],
                declarations: [PathwayrecordtypeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PathwayrecordtypeService,
                    JhiEventManager
                ]
            }).overrideTemplate(PathwayrecordtypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PathwayrecordtypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PathwayrecordtypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Pathwayrecordtype(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pathwayrecordtype).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
