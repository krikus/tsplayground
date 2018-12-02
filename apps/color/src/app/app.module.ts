import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { ColorSquareComponent } from './color-square/color-square.component';
import { NgZorroAntdModule, NZ_I18N, en_US, NzIconModule, NZ_ICONS } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { colorReducer } from './store/color.reducer';
import { StoreModule } from '@ngrx/store';

const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill ];


@NgModule({
  declarations: [AppComponent, ColorSquareComponent, ],
  imports: [
    NzIconModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NxModule.forRoot(),
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    NgZorroAntdModule,
    StoreModule.forRoot({ colors: colorReducer }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
