import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { addItemToCart, removeItemFromCart } from './store/cart.action';
import { productDetail } from '../products/store/product.selector';
import { map, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { cartItems } from './store/cart.selector';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  data: MatTableDataSource<any> = new MatTableDataSource();

  columns = [
    {
      columnDef: 'thumbnail',
      header: 'Thumbnail',
      cell: (el: any) => ``,
    },
    {
      columnDef: 'title',
      header: 'Title',
      cell: (el: any) => `${el.title}`,
    },
    {
      columnDef: 'quantity',
      header: 'Quantity',
      cell: (el: any) => `${el.category}`,
    },
    {
      columnDef: 'price',
      header: 'Price',
      cell: (el: any) => `${el.price * el.cartCount}$`,
    },
    {
      columnDef: 'actions',
      header: '',
      cell: (el: any) => ``,
    },
  ];
  displayedColumns = this.columns.map((c) => c.columnDef);
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngUnsubscribe$ = new Subject<void>();

  constructor(private store$: Store) {}

  ngOnInit(): void {
    this.store$
      .select(cartItems)
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        map((res: any) => {
          return res ?? [];
        })
      )
      .subscribe((data) => {
        this.data = new MatTableDataSource(data);
        this.data.paginator = this.paginator;
      });
  }

  ngAfterViewInit() {
    if (this.data) {
      this.data.paginator = this.paginator;
    }
  }

  addItem(id: number, category: string) {
    const item = this.store$.selectSignal(productDetail(id, category))();
    this.store$.dispatch(addItemToCart({ product: item }));
  }

  removeItem(id: number) {
    this.store$.dispatch(removeItemFromCart({ id }));
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
