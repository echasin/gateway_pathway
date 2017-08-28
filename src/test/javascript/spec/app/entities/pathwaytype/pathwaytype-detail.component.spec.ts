/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayPathwayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PathwaytypeDetailComponent } from '../../../../../../main/webapp/app/entities/pathwaytype/pathwaytype-detail.component';
import { PathwaytypeService } from '../../../../../../main/webapp/app/entities/pathwaytype/pathwaytype.service';
import { Pathwaytype } from '../../../../../../main/webapp/app/entities/pathwaytype/pathwaytype.model';

describe('Component Tests', () => {

    describe('Pathwaytype Management Detail Component', () => {
        let comp: PathwaytypeDetailComponent;
        let fixture: ComponentFixture<PathwaytypeDetailComponent>;
        let service: PathwaytypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayPathwayTestModule],
                declarations: [PathwaytypeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PathwaytypeService,
                    JhiEventManager
                ]
            }).overrideTemplate(PathwaytypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PathwaytypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PathwaytypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Pathwaytype(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pathwaytype).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
