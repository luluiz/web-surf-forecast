import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MaterialModule } from '../material-module';
import { AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective } from './accordion';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { InputComponent } from './components/input/input.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MenuItems } from './menu-items/menu-items';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        TextMaskModule
    ],
    declarations: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        InputComponent,
        DatepickerComponent,
        LoadingComponent
    ],
    exports: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        InputComponent,
        DatepickerComponent,
        LoadingComponent
    ],
    providers: [
        MenuItems,
    ]
})
export class SharedModule { }
