import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { ForecastRoutes } from './forecast.routing';
import { ForecastComponent } from './forecast/forecast.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(ForecastRoutes)
    ],
    declarations: [
        ForecastComponent
    ],
})
export class ForecastModule { }
