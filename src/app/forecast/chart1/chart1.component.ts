import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgStyleType } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective, Label } from 'ng2-charts';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { IForecast } from '../../shared/models/forecast.model';
import { UtilsService } from '../../shared/services/utils.service';

@Component({
    selector: 'app-chart1',
    templateUrl: './chart1.component.html',
    styleUrls: ['./chart1.component.scss']
})
export class Chart1Component implements OnInit, OnChanges {
    @ViewChild(BaseChartDirective, { static: false }) chart!: BaseChartDirective;
    @Input() forecast: IForecast[] = [];
    public is_desktop: boolean = this.utils.isDesktop();
    public config: PerfectScrollbarConfigInterface = { suppressScrollX: false, suppressScrollY: true };
    public form!: FormGroup;
    public options: ChartOptions = { legend: { display: false } };
    public plugins = [pluginDataLabels];
    public type: ChartType = 'bar';
    public legend = true;
    public labels: Label[] = [];
    public dataset: ChartDataSets[] = [];
    public colors: string[] = ['#1E88E5', '#70AD47', '#264478', '#FFC000', '#C0504E', '#ED7D31', '#7030A0'];
    public colorsChart: any[] = [
        { borderColor: this.colors[0], backgroundColor: this.colors[0], pointBorderColor: this.colors[0], pointHoverBackgroundColor: this.colors[0], pointBackgroundColor: this.colors[0], pointHoverBorderColor: this.colors[0] },   // wave
        { borderColor: this.colors[1], backgroundColor: 'transparent', pointBorderColor: this.colors[1], pointHoverBackgroundColor: this.colors[1], pointBackgroundColor: this.colors[1], pointHoverBorderColor: this.colors[1] },    // period
        { borderColor: this.colors[2], backgroundColor: 'transparent', pointBorderColor: this.colors[2], pointHoverBackgroundColor: this.colors[2], pointBackgroundColor: this.colors[2], pointHoverBorderColor: this.colors[2] },    // s1
        { borderColor: this.colors[3], backgroundColor: 'transparent', pointBorderColor: this.colors[3], pointHoverBackgroundColor: this.colors[3], pointBackgroundColor: this.colors[3], pointHoverBorderColor: this.colors[3] },    // s2
        { borderColor: this.colors[4], backgroundColor: 'transparent', pointBorderColor: this.colors[4], pointHoverBackgroundColor: this.colors[4], pointBackgroundColor: this.colors[4], pointHoverBorderColor: this.colors[4] },    // s3
        { borderColor: this.colors[5], backgroundColor: this.colors[5], pointBorderColor: this.colors[5], pointHoverBackgroundColor: this.colors[5], pointBackgroundColor: this.colors[5], pointHoverBorderColor: this.colors[5] },   // energy
        { borderColor: this.colors[6], backgroundColor: this.colors[6], pointBorderColor: this.colors[6], pointHoverBackgroundColor: this.colors[6], pointBackgroundColor: this.colors[6], pointHoverBorderColor: this.colors[6] },   // wind
    ];

    constructor(
        private datePipe: DatePipe,
        private fb: FormBuilder,
        private utils: UtilsService,
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.forecast && !changes.forecast.firstChange) {
            this.forecast = changes.forecast.currentValue;
            this.processData()
        }
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            wave: [true],
            period: [false],
            energy: [false],
            wind: [false],
            advanced: [false],
            swell_1: [false],
            swell_2: [false],
            swell_3: [false],
            plot: ['wave']
        });

        this.form.valueChanges.subscribe(_v => {
            if (this.forecast?.length) {
                if (_v.plot == 'wave') {
                    this.dataset[0].hidden = false;
                    this.dataset[1].hidden = !_v.period;
                    this.dataset[2].hidden = true;
                    this.dataset[3].hidden = true;
                    this.dataset[4].hidden = true;
                    this.dataset[5].hidden = true;
                    this.dataset[6].hidden = true;
                } else if (_v.plot == 'period') {
                    this.dataset[0].hidden = !_v.wave;
                    this.dataset[1].hidden = false;
                    this.dataset[2].hidden = true;
                    this.dataset[3].hidden = true;
                    this.dataset[4].hidden = true;
                    this.dataset[5].hidden = true;
                    this.dataset[6].hidden = true;
                } else if (_v.plot == 'energy') {
                    this.dataset[0].hidden = true;
                    this.dataset[1].hidden = true;
                    this.dataset[2].hidden = true;
                    this.dataset[3].hidden = true;
                    this.dataset[4].hidden = true;
                    this.dataset[5].hidden = false;
                    this.dataset[6].hidden = true;
                } else if (_v.plot == 'wind') {
                    this.dataset[0].hidden = true;
                    this.dataset[1].hidden = true;
                    this.dataset[2].hidden = true;
                    this.dataset[3].hidden = true;
                    this.dataset[4].hidden = true;
                    this.dataset[5].hidden = true;
                    this.dataset[6].hidden = false;
                } else if (_v.plot == 'advanced') {
                    this.dataset[0].hidden = !_v.wave;
                    this.dataset[1].hidden = true;
                    this.dataset[2].hidden = !_v.swell_1;
                    this.dataset[3].hidden = !_v.swell_2;
                    this.dataset[4].hidden = !_v.swell_3;
                    this.dataset[5].hidden = true;
                    this.dataset[6].hidden = true;
                }

                this.setOptions();
                if (this.chart)
                    this.chart.update();
            }
        });
    }

    get plot(): FormGroup {
        return this.form.get('plot') as FormGroup;
    }

    processData() {
        // console.log('forecast', this.forecast);
        this.clearData();
        this.forecast.forEach(it => {
            this.labels.push(`${this.datePipe.transform(it.date, 'EE, dd/MM HH')}h` as Label);
            if (it.forecast) {
                this.dataset[0].data?.push(it.forecast.wave_height);
                this.dataset[1].data?.push(it.forecast.period);
                this.dataset[2].data?.push(it.forecast.swell_1.wave_height);
                this.dataset[3].data?.push(it.forecast.swell_2.wave_height);
                this.dataset[4].data?.push(it.forecast.swell_3.wave_height);
                this.dataset[5].data?.push(it.forecast.energy);
                this.dataset[6].data?.push(it.forecast.wind_speed);
            }
        });
        this.setOptions();
        this.form.patchValue({ plot: 'wave' });
    }

    clearData() {
        this.labels = [];
        this.dataset = [
            { data: [], label: 'Onda (m)', hidden: false, ...this.colorsChart[0] },
            { data: [], label: 'Período (s)', hidden: true, type: 'line', ...this.colorsChart[1] },
            { data: [], label: 'Swell 1', hidden: true, type: 'line', ...this.colorsChart[2] },
            { data: [], label: 'Swell 2', hidden: true, type: 'line', ...this.colorsChart[3] },
            { data: [], label: 'Swell 3', hidden: true, type: 'line', ...this.colorsChart[4] },
            { data: [], label: 'Energia (kJ)', hidden: true, type: 'bar', ...this.colorsChart[5] },
            { data: [], label: 'Vento (km/h)', hidden: true, type: 'bar', ...this.colorsChart[6] },
        ];
    }

    setOptions() {
        const _forecast = this.forecast;
        this.options = {
            responsive: true,
            // maintainAspectRatio: false,
            aspectRatio: 4,
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    ticks: {
                        callback: function (value: any, index: number, values: any[]) {
                            return `${value}`;
                        }
                    },
                }],
                yAxes: [{
                    offset: true,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            plugins: {
                datalabels: {
                    display: this.plot.value == 'advanced' ? false : true,
                    anchor: this.plot.value != 'period' ? 'center' : 'end',
                    align: this.plot.value != 'period' ? 'center' : 'end',
                    // clamp: true,
                    font: { size: 12, weight: 'bold', lineHeight: 1.2 },
                    color: this.plot.value != 'period' && this.plot.value != 'advanced' ? 'white' : 'black',
                    // backgroundColor: 'white',
                    offset: 10,
                    rotation: this.plot.value != 'period' ? 270 : 0,
                    formatter: (value: any, ctx: any) => {
                        if (ctx.datasetIndex == 0)         // WAVE
                            return `${value} m ${_forecast[ctx.dataIndex].forecast.wave_direction}`
                        else if (ctx.datasetIndex == 1)    // PERIOD
                            return `${value} s `;
                        else if (ctx.datasetIndex == 2)    // SWELL 1
                            return `${value} m ${_forecast[ctx.dataIndex].forecast.swell_1.wave_direction}`
                        else if (ctx.datasetIndex == 3)    // SWELL 2
                            return `${value} m ${_forecast[ctx.dataIndex].forecast.swell_2.wave_direction}`
                        else if (ctx.datasetIndex == 4)    // SWELL 3
                            return `${value} m ${_forecast[ctx.dataIndex].forecast.swell_3.wave_direction}`
                        else if (ctx.datasetIndex == 5)    // ENERGY
                            return `${value} kJ`
                        else if (ctx.datasetIndex == 6)    // WIND
                            return `${value} km/h ${_forecast[ctx.dataIndex].forecast.wind_direction}`
                    },
                }
            },
            tooltips: {
                callbacks: {
                    label: function (_tooltipItem: any, _data: any) {
                        const index: number = _tooltipItem.index;
                        const datasetLabel = _data.datasets[_tooltipItem.datasetIndex].label || '';
                        const value = _tooltipItem.value;
                        // console.log('_data', _data);
                        // console.log('_tooltipItem', _tooltipItem);

                        let label: string = '';
                        if (_tooltipItem.datasetIndex == 0)         // WAVE
                            label = `${datasetLabel}: ${value} m ${_forecast[index].forecast.wave_direction}`
                        else if (_tooltipItem.datasetIndex == 1)    // PERIOD
                            label = `${datasetLabel}: ${value} s `;
                        else if (_tooltipItem.datasetIndex == 2)    // SWELL 1
                            label = `${datasetLabel}: ${value} m ${_forecast[index].forecast.swell_1.wave_direction}`
                        else if (_tooltipItem.datasetIndex == 3)    // SWELL 2
                            label = `${datasetLabel}: ${value} m ${_forecast[index].forecast.swell_2.wave_direction}`
                        else if (_tooltipItem.datasetIndex == 4)    // SWELL 3
                            label = `${datasetLabel}: ${value} m ${_forecast[index].forecast.swell_3.wave_direction}`
                        else if (_tooltipItem.datasetIndex == 5)    // ENERGY
                            return `${value} kJ ${_forecast[index].forecast.energy}`
                        else if (_tooltipItem.datasetIndex == 6)    // WIND
                            return `${value} km/h ${_forecast[index].forecast.wind_direction}`

                        return label;
                    },
                    afterLabel: function (_tooltipItem: any, _data: any) {
                        let afterLabel = [''];
                        const index: number = _tooltipItem.index;
                        // console.log('_data', _data);
                        // console.log('_tooltipItem', _tooltipItem);

                        const wave: string = `Onda: ${_forecast[index].forecast.wave_height} m  ${_forecast[index].forecast.wave_direction}`;
                        const wind: string = `Vento: ${_forecast[index].forecast.wind_speed} km/h  ${_forecast[index].forecast.wind_direction}  ${_forecast[index].forecast.wind_state}`;
                        const rating: string = `Pontuação: ${_forecast[index].forecast.rating}`;
                        const energy: string = `Energia: ${_forecast[index].forecast.energy} kJ`;
                        const period: string = `Período: ${_forecast[index].forecast.period} s`;
                        const s1: string = `Swell #1: ${_forecast[index].forecast.swell_1.wave_height} m - ${_forecast[index].forecast.swell_1.wave_direction} - ${_forecast[index].forecast.swell_1.period} s`;
                        const s2: string = `Swell #2: ${_forecast[index].forecast.swell_2.wave_height} m - ${_forecast[index].forecast.swell_2.wave_direction} - ${_forecast[index].forecast.swell_2.period} s`;
                        const s3: string = `Swell #3: ${_forecast[index].forecast.swell_3.wave_height} m - ${_forecast[index].forecast.swell_3.wave_direction} - ${_forecast[index].forecast.swell_3.period} s`;
                        if (rating) afterLabel.push(rating);
                        if (wave) afterLabel.push(wave);
                        if (wind) afterLabel.push(wind);
                        if (period) afterLabel.push(period);
                        if (energy) afterLabel.push(energy);
                        if (s1) afterLabel.push(s1);
                        if (s2) afterLabel.push(s2);
                        if (s3) afterLabel.push(s3);
                        return afterLabel;
                    }
                }
            }
        };
    }

    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
        // console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
        // console.log(event, active);
    }

    public getStyle(index: number): NgStyleType {
        return { color: this.colors[index], 'font-weight': '400' };
    }

}
