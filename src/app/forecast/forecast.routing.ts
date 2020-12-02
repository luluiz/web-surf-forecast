import { Routes } from '@angular/router';
import { ForecastComponent } from './forecast/forecast.component';
import { HistoricComponent } from './historic/historic.component';

export const ForecastRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ForecastComponent,
                data: {
                    title: 'Previsão',
                    urls: [
                        { title: 'Surf' },
                        { title: 'Previsão', url: '/forecast' }
                    ]
                }
            },
            {
                path: 'historic',
                component: HistoricComponent,
                data: {
                    title: 'Histórico',
                    urls: [
                        { title: 'Surf' },
                        { title: 'Histórico', url: '/historic' }
                    ]
                }
            }
        ]
    }
];
