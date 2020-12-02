import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { Chart1Component } from './chart1/chart1.component';
import { FiltersComponent } from './filters/filters.component';
import { ForecastRoutes } from './forecast.routing';
import { ForecastComponent } from './forecast/forecast.component';
import { HistoricComponent } from './historic/historic.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 2,
    wheelPropagation: true
};

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
        RouterModule.forChild(ForecastRoutes),
        PerfectScrollbarModule
    ],
    declarations: [
        ForecastComponent,
        HistoricComponent,
        Chart1Component,
        FiltersComponent
    ],
    providers: [
        DatePipe,
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    ]
})
export class ForecastModule { }
