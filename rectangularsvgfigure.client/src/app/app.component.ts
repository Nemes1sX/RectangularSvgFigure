import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  @ViewChild('svgContainer', { static: true }) svgContainer!: ElementRef<SVGElement>;

  isResizing = false;
  startX = 0;
  startY = 0;
  width = 100;
  height = 50;
  x = 0;
  y = 0;

  constructor(private http: HttpClient) {

  }


  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  startResize(event: MouseEvent) {
    this.isResizing = true;
    const svgRect = this.svgContainer.nativeElement.getBoundingClientRect();
    this.startX = event.clientX - svgRect.left;
    this.startY = event.clientY - svgRect.top;
  }

  stopResize() {
    this.isResizing = false;
  }

  @HostListener('document:mousemove', ['$event'])
  resize(event: MouseEvent) {
    if (!this.isResizing) return;

    const svgRect = this.svgContainer.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - svgRect.left;
    const mouseY = event.clientY - svgRect.top;

    this.width += mouseX - this.startX;
    this.height += mouseY - this.startY;

    this.startX = mouseX;
    this.startY = mouseY;
  }

  title = 'rectangularsvgfigure.client';
}
