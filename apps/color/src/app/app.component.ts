import { Component, NgModule } from '@angular/core';
import ColorInterface from './color-square/color.interface';
import { NzMessageService } from 'ng-zorro-antd';
//import * as ColorSquareCompontent from './color-square/color-square.component';


@Component({
  selector: 'playground-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  colorRed = 52;
  colorGreen = 100;
  colorBlue = 156;

  dataSet: Array<ColorInterface> = [];

  onCopied($event: ColorInterface) {
    if (!this.dataSet.find(x => x.hex === $event.hex)) {
      this.dataSet =[
        $event,
        ...this.dataSet,
      ];
    } else {
      this.nzMessage.error('Color already exists in table');
    }
  }

  removeColor(color: ColorInterface) {
    this.dataSet = this.dataSet.filter(x => x !== color);
  }

  constructor(private nzMessage: NzMessageService) {

  }
}
