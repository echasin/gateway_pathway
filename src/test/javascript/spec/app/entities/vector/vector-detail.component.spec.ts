/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayPathwayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { VectorDetailComponent } from '../../../../../../main/webapp/app/entities/vector/vector-detail.component';
import { VectorService } from '../../../../../../main/webapp/app/entities/vector/vector.service';
import { Vector } from '../../../../../../main/webapp/app/entities/vector/vector.model';

describe('Component Tests', () => {

    describe('Vector Management Detail Component', () => {
        let comp: VectorDetailComponent;
        let fixture: ComponentFixture<VectorDetailComponent>;
        let service: VectorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayPathwayTestModule],
                declarations: [VectorDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    VectorService,
                    JhiEventManager
                ]
            }).overrideTemplate(VectorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VectorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VectorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Vector(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.vector).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
