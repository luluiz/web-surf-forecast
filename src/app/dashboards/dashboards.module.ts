
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from '../material-module';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { DashboardsRoutes } from './dashboards.routing';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ChartistModule,
        ChartsModule,
        NgApexchartsModule,
        RouterModule.forChild(DashboardsRoutes)
    ],
    declarations: [Dashboard1Component, Dashboard2Component]
})
export class DashboardsModule { }
