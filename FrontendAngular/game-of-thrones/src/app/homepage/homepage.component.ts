import { Component , OnInit} from '@angular/core';
import { IceAndFireService } from '../services/ice-and-fire.service';
import { Router, NavigationExtras } from '@angular/router';
import { Store } from '@ngrx/store';
import * as FavoritesActions from '../store/actions/books.actions'
import { FavoriteBook } from '../store/models/FavoriteBook.model';
import { State } from '../store/models/state.model';
import { selectFavorites } from '../store/selector/selector';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';




@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit  {

  books: any[] = [];
  originalBooks: any[] = [];

  searchControl = new FormControl('')

  constructor(public gotBooksService: IceAndFireService, private router: Router, private store: Store<State>) { }

  ngOnInit() {
    this.gotBooksService.getBooks().subscribe((data: any) => {
      this.books = data;
      this.originalBooks = data
    }, error => {
      console.error('Error fetching books', error);
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.applyFilter(value);
    });
  }

  applyFilter(searchTerm: any) {
    this.books = this.originalBooks.filter(book =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authors.some((author: any) => author.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }


  onManageFavorites(event: Event, book: any) {
    event.stopPropagation();
    const favoriteBook: FavoriteBook = {
      id: book.url,
      name: book.name,
      author: book.authors.join(', ')
    }

    this.gotBooksService.manageFavorites(favoriteBook);
  }

 
  goToDetailsPage(book: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        url: book.url
      }
    };
   this.router.navigate(['/books', book.name], navigationExtras);
  }


  // isInFavorites(url: string) {
  //   let isFavorite = false;
  //   this.store.select(selectFavorites).subscribe(favorites => {
  //     isFavorite = favorites.some(item => item.id === url);
  //   });

  //   return isFavorite;
  // }
}
