import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgApexchartsModule } from "ng-apexcharts";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill';
import { MaterialModule } from '../material-module';
import { AppsRoutes } from './apps.routing';
import { CalendarDialogComponent, FullcalendarComponent } from './fullcalendar/fullcalendar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AppsRoutes),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        FlexLayoutModule,
        QuillModule.forRoot(),
        NgApexchartsModule,
        PerfectScrollbarModule,
        Ng2SearchPipeModule,
        DragDropModule,
        NgxPaginationModule
    ],
    declarations: [
        FullcalendarComponent,
        CalendarDialogComponent,
    ],
    providers: [

    ],
    entryComponents: [CalendarDialogComponent]
})
export class AppsModule { }
