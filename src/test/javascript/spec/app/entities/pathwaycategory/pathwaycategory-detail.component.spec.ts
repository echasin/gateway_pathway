/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayPathwayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PathwaycategoryDetailComponent } from '../../../../../../main/webapp/app/entities/pathwaycategory/pathwaycategory-detail.component';
import { PathwaycategoryService } from '../../../../../../main/webapp/app/entities/pathwaycategory/pathwaycategory.service';
import { Pathwaycategory } from '../../../../../../main/webapp/app/entities/pathwaycategory/pathwaycategory.model';

describe('Component Tests', () => {

    describe('Pathwaycategory Management Detail Component', () => {
        let comp: PathwaycategoryDetailComponent;
        let fixture: ComponentFixture<PathwaycategoryDetailComponent>;
        let service: PathwaycategoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayPathwayTestModule],
                declarations: [PathwaycategoryDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PathwaycategoryService,
                    JhiEventManager
                ]
            }).overrideTemplate(PathwaycategoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PathwaycategoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PathwaycategoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Pathwaycategory(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pathwaycategory).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
