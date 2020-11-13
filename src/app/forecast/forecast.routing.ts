import { Routes } from '@angular/router';
import { ForecastComponent } from './forecast/forecast.component';

export const ForecastRoutes: Routes = [
    {
        path: '',
        component: ForecastComponent,
        data: {
            title: 'Previsão',
            urls: [
                { title: 'Dashboard', url: '/dashboard' },
                { title: 'Previsão' }
            ]
        }
    }
];
