import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from "lodash";
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { IForecast } from '../../shared/models/forecast.model';
import { ForecastService } from '../../shared/services/forecast.service';
import * as colors from "./colors.json";
import * as spots from "./spots.json";

@Component({
    selector: 'app-forecast',
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
    public loading: boolean = false;
    public forecast!: IForecast[];
    public itemsDS = new MatTableDataSource<any>();
    public columns: string[] = ['date', 'rating', 'wave', 'period', 'energy', 'wind', 'wind_state']; // 'high_tide', 'low_tide'
    public form: FormGroup = new FormGroup({});
    // public list_spots: { spot_name: string, text: string }[] = spots;
    public list_spots: { ['default']: { spot_name: string, text: string }[] } = <any>spots;
    public list_colors: { ['default']: { background: string, color: string }[] } = <any>colors;

    constructor(
        private forecastService: ForecastService,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.initForm();
        // this.getForecast();
    }

    initForm() {
        this.form = this.fb.group({
            spot_name: [null],
            date_from: [null],
            date_to: [null],
            show_swells: [false]
        });

        this.selectFilter('spot_name')?.subscribe(_v => this.getForecast(_v));
        this.form.get('show_swells')?.valueChanges.subscribe(_v => {
            if (_v) this.columns.push('swl1', 'swl2', 'swl3');
            else _.remove(this.columns, (it) => it == 'swl1' || it == 'swl2' || it == 'swl3');

        });
    }

    selectFilter(field: string): Observable<any> | undefined {
        return this.form.get(field)?.valueChanges.pipe(
            debounceTime(200),
            distinctUntilChanged(),
        );
    }

    getForecast(spot_name: string) {
        this.loading = true;
        this.forecastService.get(spot_name)
            .pipe(take(1))
            .subscribe(response => {
                console.log(response);
                if (response.success) {
                    this.forecast = response.forecast;
                    this.itemsDS.data = response.forecast;
                }
            }, (e) => {
                console.error(e)
                this.loading = false;
            }, () => this.loading = false);
    }

    getColor(value: number, min: number, max: number): { color: string, background: string } {
        const _min = 0;
        const _max = this.list_colors.default.length - 1;
        let intensity = _min + ((_max - _min) * (value - min) / (max - min));
        if (intensity > _max) intensity = _max;
        else if (intensity < _min) intensity = _min;
        const index = Math.trunc(intensity);

        return this.list_colors.default[index];
    }

    getStyle(value: number, min: number, max: number) {
        const style = this.getColor(value, min, max);
        return { color: style.color, background: style.background };
    }

    getDirectionImg(direction: string): string {
        return `assets/images/cardinals/${direction?.toLowerCase()}.png`;
    }
}
