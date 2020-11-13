import { ISwellForecast } from "./swell-forecast.model";

export interface IHourForecast {
    rating: number,
    period: number,
    wave_height: number,
    wave_direction: string,
    energy: number,
    wind_speed: number,
    wind_direction: string,
    wind_state: string,
    swell_1: ISwellForecast,
    swell_2: ISwellForecast,
    swell_3: ISwellForecast,
}