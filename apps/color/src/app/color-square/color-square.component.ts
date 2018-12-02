import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import * as xolor from 'xolor';
import ColorInterface from '../store/color.interface';
import { ClipboardService } from '../clipboard.service';
import { Store, select } from '@ngrx/store';
import { AddColor } from '../store/color.actions';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

const formatColor = (num) => `00${num.toString(16)}`.slice(-2);
@Component({
  selector: 'playground-color-square',
  templateUrl: './color-square.component.html',
  styleUrls: ['./color-square.component.scss']
})
export class ColorSquareComponent implements OnInit {
  copies = 0;
  data$: Observable<ColorInterface[]>;
  colorExists$: Observable<Boolean>;

  @Input() r = 0;
  @Input() g = 0;
  @Input() b = 0;

  constructor(
    private nzMessage: NzMessageService,
    private clipboard: ClipboardService,
    private store: Store<{ colors: Array<ColorInterface> }>) {
      this.data$ = this.store
        .pipe(select('colors'));

      this.colorExists$ = this.data$
        .pipe(map((value: ColorInterface[]) => value.every(x => x.hex !== this.hex)))
        .pipe(first());

      this.data$
        .subscribe({
          next: (data) => this.copies = data.length,
        })
    }

  copyColor($event: Event) {
    const hex = this.rgb;
    const { r, g, b } = this;
    this.colorExists$
      .subscribe({
        next: (exists) => {
          if(exists) {
            this.clipboard.copy(hex);
            this.store.dispatch(new AddColor({ r, g, b, hex }));
          } else {
            this.nzMessage.error('Color exists');
          }
        }
      })
  }

  get hex() { return this.rgb; }

  get rgb() {
    return `#${formatColor(this.r)}${formatColor(this.g)}${formatColor(this.b)}`;
  }

  get myStyle() {
    const xolorObject = xolor(this.rgb)
    const comp = xolorObject.comp().hex;
    const inver = xolorObject.inverse().hex;
    
    return {
      background: this.rgb,
      border: `1px solid ${comp}`,
      color: inver,
      'text-shadow': `${comp} 1px 1px 10px`,
    }
  }

  ngOnInit() {
  }

}
