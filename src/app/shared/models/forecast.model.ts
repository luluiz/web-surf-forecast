import { IHourForecast } from './hour-forecast.model';
import { ITide } from "./tide.model";

export interface IForecast {
    _id: string;
    spot_name: string;
    date: Date;
    forecast: IHourForecast;
    high_tides: [ITide];
    low_tides: [ITide];
}