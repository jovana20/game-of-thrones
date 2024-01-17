import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPageComponent } from './detail-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router } from '@angular/router';


describe('DetailPageComponent', () => {
  let component: DetailPageComponent;
  let fixture: ComponentFixture<DetailPageComponent>;
  let store: MockStore;


  beforeEach(() => {

    const activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: (key: string) => key === 'title' ? 'mockTitle' : null
        }
      }
    };

    // Mock Router with the expected history state
    const routerStub = {
      navigate: jasmine.createSpy('navigate'),
      getCurrentNavigation: () => ({ extras: { state: { url: 'mockUrl' } } })
    };

    history.pushState({ url: 'mockUrl' }, '', '');

    TestBed.configureTestingModule({
      declarations: [DetailPageComponent],
      imports: [HttpClientModule, AppRoutingModule],
      providers: [
        provideMockStore({}),
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerStub }
      ],

    });
    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(DetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the correct book title and book id', () => {
    expect(component.bookId).toBe('mockUrl');
  });
});
