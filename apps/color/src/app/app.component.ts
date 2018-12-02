import { Component, NgModule } from '@angular/core';
import ColorInterface from './store/color.interface';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RemoveColor, ReplaceColors } from './store/color.actions';
import { ClipboardService } from './clipboard.service';

@Component({
  selector: 'playground-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  colorRed = 52;
  colorGreen = 100;
  colorBlue = 156;

  dataSet$: Observable<Array<ColorInterface>>;
  dataSet: Array<ColorInterface> = [];

  constructor(
    private store: Store<{ colors: Array<ColorInterface> }>,
    private clipboard: ClipboardService,
    ) {
    this.dataSet$ = store
      .pipe(
        select('colors'),
      );

    this.dataSet$
      .subscribe({
        next: (value) => this.dataSet = value,
      });
  }

  removeColor(color: ColorInterface) {
    this.store.dispatch(new RemoveColor(color));
  }

  clearAll() {
    this.store.dispatch(new ReplaceColors([]));
  }

  copyColor(color: ColorInterface) {
    this.clipboard.copy(color.hex);
  }

}
