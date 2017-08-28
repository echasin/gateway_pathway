/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayPathwayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PathwayDetailComponent } from '../../../../../../main/webapp/app/entities/pathway/pathway-detail.component';
import { PathwayService } from '../../../../../../main/webapp/app/entities/pathway/pathway.service';
import { Pathway } from '../../../../../../main/webapp/app/entities/pathway/pathway.model';

describe('Component Tests', () => {

    describe('Pathway Management Detail Component', () => {
        let comp: PathwayDetailComponent;
        let fixture: ComponentFixture<PathwayDetailComponent>;
        let service: PathwayService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayPathwayTestModule],
                declarations: [PathwayDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PathwayService,
                    JhiEventManager
                ]
            }).overrideTemplate(PathwayDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PathwayDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PathwayService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Pathway(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pathway).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
