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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  async searchWeather(): Promise<void> {
    if (this.city.trim() === '') {
      return;
    }

    this.isLoading = true;
    this.weatherData = null;

    // Replace 'YOUR_API_KEY' and 'YOUR_API_URL' with the appropriate values
    const apiKey = '1b94df0ce07291e14d52f44a6761b5de';
    // const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${this.city}`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}&units=metric`

    try {
      const data: any = await this.http.get(apiUrl).toPromise();
      
      
      this.weatherData = {
        ...data,
        retrievalTime: moment().format('DD.MM.YYYY ')
      };

      this.last_searched_city = this.city;

      setTimeout(()=>{
        this.isLoading = false;
      }, 1000); // delay of 1seconds so we can see the loading text

      console.log(data);

      console.log(this.weatherData);


    } catch (error) {
      console.log('An error occurred while fetching weather data:', error);
      this.isLoading = false;
    }
  }

  async searchWeather_refresh(): Promise<void> {

    this.isLoading = true;
    this.weatherData = null;

    // Replace 'YOUR_API_KEY' and 'YOUR_API_URL' with the appropriate values
    const apiKey = '1b94df0ce07291e14d52f44a6761b5de';
    // const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${this.city}`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.last_searched_city}&appid=${apiKey}&units=metric`

    try {
      const data: any = await this.http.get(apiUrl).toPromise();
      
      
      this.weatherData = {
        ...data,
        retrievalTime: moment().format('DD.MM.YYYY ')
      };

      setTimeout(()=>{
        this.isLoading = false;
      }, 1000); // delay of 1seconds so we can see the loading text

      console.log(data);

      console.log(this.weatherData);


    } catch (error) {
      console.log('An error occurred while fetching weather data:', error);
      this.isLoading = false;
    }
  }

}
