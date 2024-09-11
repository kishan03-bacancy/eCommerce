import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private _snackBarRef!: MatSnackBarRef<any>;

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(
    message: string,
    action: string,
    type: SnackBarType = SnackBarType.INFO,
    position: SnackBarPosition = { vertical: 'top', horizontal: 'end' }
  ) {
    if (this._snackBarRef) {
      this._snackBarRef.dismiss();
    }
    this._snackBarRef = this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: position.vertical,
      horizontalPosition: position.horizontal,
      panelClass: [`${type}-snackbar`],
    });
  }
}

export enum SnackBarType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

export interface SnackBarPosition {
  vertical: MatSnackBarVerticalPosition;
  horizontal: MatSnackBarHorizontalPosition;
}
