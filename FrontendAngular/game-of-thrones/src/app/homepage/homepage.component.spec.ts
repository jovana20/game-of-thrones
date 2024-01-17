import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';
import { IceAndFireService } from '../services/ice-and-fire.service';
import { Router } from '@angular/router';


const mockBooks = [
  { name: 'A Game of Thrones', authors: ['George R.R. Martin'], numberOfPages: 694, publisher: 'Bantam Books', released: '1996-08-06T00:00:00' },
];
class MockIceAndFireService {
  getBooks = jasmine.createSpy('getBooks').and.returnValue(of(mockBooks));
  manageFavorites = jasmine.createSpy('manageFavorites');
  isInFavorites = jasmine.createSpy('isInFavorites').and.returnValue(false); 

}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let store: MockStore;
  let mockIceAndFireService: MockIceAndFireService;
  let mockRouter: MockRouter;



  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageComponent],
      imports: [HttpClientModule, MatFormFieldModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
      providers: [
        provideMockStore({}),
        { provide: IceAndFireService, useClass: MockIceAndFireService },
        { provide: Router, useClass: MockRouter },
      ],

    });
    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    mockIceAndFireService = TestBed.inject(IceAndFireService) as any;
    mockRouter = TestBed.inject(Router) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch books on init', () => {
    fixture.detectChanges();
    expect(component.books.length).toBeGreaterThan(0);
    expect(mockIceAndFireService.getBooks).toHaveBeenCalled();
  });

  it('should filter books based on search term', () => {
    component.originalBooks = mockBooks;
    component.applyFilter('game');
    expect(component.books.length).toBeGreaterThan(0);
  });


  it('should call manageFavorites when onManageFavorites is called', () => {
    const mockEvent = { stopPropagation: jasmine.createSpy() };
    const mockBook = { url: 'url1', name: 'Book 1', authors: ['Author 1'] };
    component.onManageFavorites(mockEvent as any, mockBook);
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(mockIceAndFireService.manageFavorites).toHaveBeenCalledWith(jasmine.any(Object));
  });
});
