import {
  AfterViewInit,
  Component,
  effect,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCategory } from './store/category.action';
import { categories, isLoading } from './store/category.selector';
import { AsyncPipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';

type Category = {
  id: number;
  name: string;
  slug: string;
};

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    AsyncPipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    RouterLink,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit, AfterViewInit, OnDestroy {
  columns = [
    {
      columnDef: 'position',
      header: 'No.',
      cell: (el: Category) => `${el.id}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (el: Category) => `${el.name}`,
    },
    {
      columnDef: 'actions',
      header: '',
      cell: (el: Category) => ``,
    },
  ];
  displayedColumns = this.columns.map((c) => c.columnDef);
  categoryData: MatTableDataSource<Category> = new MatTableDataSource();
  isLoading = false;

  isLoading$!: Observable<boolean>;
  ngUnsubscribe$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store$: Store) {
    effect(() => {
      this.isLoading = this.store$.selectSignal(isLoading)();
    });
  }

  ngOnInit(): void {
    this.store$.dispatch(loadCategory());

    this.store$
      .select(categories)
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        map((res: any) =>
          res.map((c: any, i: any) => ({
            id: i + 1,
            name: c.name,
            slug: c.slug,
          }))
        )
      )
      .subscribe((data) => {
        this.categoryData = new MatTableDataSource(data);
        this.categoryData.paginator = this.paginator;
      });
  }

  ngAfterViewInit() {
    if (this.categoryData) {
      this.categoryData.paginator = this.paginator;
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
