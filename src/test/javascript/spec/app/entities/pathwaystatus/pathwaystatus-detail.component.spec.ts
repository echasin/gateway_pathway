/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayPathwayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PathwaystatusDetailComponent } from '../../../../../../main/webapp/app/entities/pathwaystatus/pathwaystatus-detail.component';
import { PathwaystatusService } from '../../../../../../main/webapp/app/entities/pathwaystatus/pathwaystatus.service';
import { Pathwaystatus } from '../../../../../../main/webapp/app/entities/pathwaystatus/pathwaystatus.model';

describe('Component Tests', () => {

    describe('Pathwaystatus Management Detail Component', () => {
        let comp: PathwaystatusDetailComponent;
        let fixture: ComponentFixture<PathwaystatusDetailComponent>;
        let service: PathwaystatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayPathwayTestModule],
                declarations: [PathwaystatusDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PathwaystatusService,
                    JhiEventManager
                ]
            }).overrideTemplate(PathwaystatusDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PathwaystatusDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PathwaystatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Pathwaystatus(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pathwaystatus).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
