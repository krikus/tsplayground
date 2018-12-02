import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import * as xolor from 'xolor';
import ColorInterface from './color.interface';

const formatColor = (num) => `00${num.toString(16)}`.slice(-2);
function copyMessage(val: string): void {
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = val;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
}

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
    copyMessage(hex);
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

  constructor(private nzMessage: NzMessageService) { }

  ngOnInit() {
  }

}
