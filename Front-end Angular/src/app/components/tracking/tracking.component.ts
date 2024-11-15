// tracking.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackingService } from 'src/app/services-cliente/tracking.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  trackingInfo: any;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private trackingService: TrackingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const trackingId = this.route.snapshot.paramMap.get('id');
    if (trackingId) {
      this.fetchTrackingDetails(trackingId);
    }
  }

  fetchTrackingDetails(id: string): void {
    // Assuming you are using tracking ID to fetch tracking data
    this.trackingService.getTrackingById(id)
      .subscribe(
        data => {
          this.trackingInfo = data;
          this.loading = false;
        },
        error => {
          this.errorMessage = 'Error fetching tracking data';
          this.loading = false;
        }
      );
  }

  // You can also fetch data by CodigoPedido and Password here if needed
  fetchTrackingByCodigo(codigoPedido: string, codigo: string, password: string): void {
    this.trackingService.getTrackingByCodigo(codigoPedido, codigo, password)
      .subscribe(
        data => {
          this.trackingInfo = data;
          this.loading = false;
        },
        error => {
          this.errorMessage = 'Error fetching tracking data';
          this.loading = false;
        }
      );
  }
}
