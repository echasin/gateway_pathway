/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayPathwayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PathwayclassDetailComponent } from '../../../../../../main/webapp/app/entities/pathwayclass/pathwayclass-detail.component';
import { PathwayclassService } from '../../../../../../main/webapp/app/entities/pathwayclass/pathwayclass.service';
import { Pathwayclass } from '../../../../../../main/webapp/app/entities/pathwayclass/pathwayclass.model';

describe('Component Tests', () => {

    describe('Pathwayclass Management Detail Component', () => {
        let comp: PathwayclassDetailComponent;
        let fixture: ComponentFixture<PathwayclassDetailComponent>;
        let service: PathwayclassService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayPathwayTestModule],
                declarations: [PathwayclassDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PathwayclassService,
                    JhiEventManager
                ]
            }).overrideTemplate(PathwayclassDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PathwayclassDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PathwayclassService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Pathwayclass(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pathwayclass).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
