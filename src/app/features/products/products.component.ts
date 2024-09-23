import { Component, effect, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { map, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { isLoading, productDetail, products } from './store/product.selector';
import { loadProduct } from './store/product.action';
import { MatButtonModule } from '@angular/material/button';
import { addItemToCart } from '../cart/store/cart.action';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  data: MatTableDataSource<any> = new MatTableDataSource();

  columns = [
    {
      columnDef: 'id',
      header: 'Id',
      cell: (el: any) => `${el.id}`,
    },
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
      columnDef: 'category',
      header: 'Category',
      cell: (el: any) => `${el.category}`,
    },
    {
      columnDef: 'price',
      header: 'Price',
      cell: (el: any) => `${el.price}$`,
    },
    {
      columnDef: 'rating',
      header: 'Ratings',
      cell: (el: any) => `${el.rating} / 5`,
    },
    {
      columnDef: 'actions',
      header: '',
      cell: (el: any) => ``,
    },
  ];
  displayedColumns = this.columns.map((c) => c.columnDef);
  resultsLength = 0;
  isLoading = true;

  category = 'smartphones';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngUnsubscribe$ = new Subject<void>();

  constructor(private store$: Store, private activatedRoute: ActivatedRoute) {
    this.category =
      activatedRoute.snapshot.params?.['category'] ?? 'smartphones';

    effect(() => {
      this.isLoading = this.store$.selectSignal(isLoading)();
    });
  }

  ngOnInit(): void {
    this.store$.dispatch(loadProduct({ category: this.category }));

    this.store$
      .select(products(this.category))
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

  addToCart(id: number, category: string) {
    const item = this.store$.selectSignal(productDetail(id, category))();
    this.store$.dispatch(addItemToCart({ product: item }));
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
