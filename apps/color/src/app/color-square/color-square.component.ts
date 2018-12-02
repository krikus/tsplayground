import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import * as xolor from 'xolor';
import ColorInterface from './color.interface';
import { ClipboardService } from '../clipboard.service';

const formatColor = (num) => `00${num.toString(16)}`.slice(-2);
@Component({
  selector: 'playground-color-square',
  templateUrl: './color-square.component.html',
  styleUrls: ['./color-square.component.scss']
})
export class ColorSquareComponent implements OnInit {
  @Input() copies = 0;
  @Input() r = 0;
  @Input() g = 0;
  @Input() b = 0;
  @Output() copied = new EventEmitter<ColorInterface>();

  test($event: Event) {
    const hex = this.rgb;
    const { r, g, b } = this;
    this.clipboard.copy(hex);
    this.nzMessage.success(`Color ${hex} coppied to your clipboard`);
    this.copied.emit({ hex, r, g, b });
  }

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

  constructor(private nzMessage: NzMessageService, private clipboard: ClipboardService) { }

  ngOnInit() {
  }

}
