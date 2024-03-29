import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})


export class WeatherComponent implements OnInit {

  isLoading: boolean = false;
  weatherData: any;
  city: string = 'maribor';
  last_searched_city: string = "";
  showWeather: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const storedWeatherData = localStorage.getItem('weatherData');
    if (storedWeatherData) {
      this.weatherData = JSON.parse(storedWeatherData);
      this.showWeather = true;
    }
  }

  async searchWeather(): Promise<void> {
    if (this.city.trim() === '') {
      return;
    }

    this.isLoading = true;
    this.weatherData = null;


    const apiKey = '1b94df0ce07291e14d52f44a6761b5de';
    // const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${this.city}`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}&units=metric`;

    try {
      const data: any = await this.http.get(apiUrl).toPromise();
      
      
      this.weatherData = {
        ...data,
        retrievalTime: moment().format('DD.MM.YYYY ')
      };

      localStorage.setItem('weatherData', JSON.stringify(this.weatherData));
      this.last_searched_city = this.city;
      this.showWeather = true;

    
      setTimeout(()=>{
        this.isLoading = false;
      }, 1000); 

      console.log(data);
      // console.log(this.weatherData);



    } catch (error) {
      console.log('An error occurred while fetching weather data:', error);
      this.isLoading = false;
      this.showWeather = false;
    }
  }

  async searchWeather_refresh(): Promise<void> {

    this.isLoading = true;
    this.weatherData = null;

    
    const apiKey = '1b94df0ce07291e14d52f44a6761b5de';

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.last_searched_city}&appid=${apiKey}&units=metric`;

    try {
      const data: any = await this.http.get(apiUrl).toPromise();
      
      
      this.weatherData = {
        ...data,
        retrievalTime: moment().format('DD.MM.YYYY ')
      };

      setTimeout(()=>{
        this.isLoading = false;
      }, 1000); 

      // console.log(this.weatherData);

      this.showWeather = true;


    } catch (error) {
      console.log('An error occurred while fetching weather data:', error);
      this.isLoading = false;
      this.showWeather = false;

    }
  }

}
