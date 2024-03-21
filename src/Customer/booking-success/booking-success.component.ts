import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-booking-success',
  standalone: true,
  imports: [],
  templateUrl: './booking-success.component.html',
  styleUrl: './booking-success.component.scss'
})
export class BookingSuccessComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject<void>();


  constructor(private route: ActivatedRoute, private router: Router,) {
  }

  ngOnInit(): void {
    this.preventBackToBooking();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  home(){
    this.router.navigateByUrl('/homecustomer')
  }

  preventBackToBooking() {
    this.router.events
      .pipe(filter((event): event is NavigationStart => event instanceof NavigationStart),
      takeUntil(this.unsubscribe$)
      )
      .subscribe((event: NavigationStart) => {
        if (event.navigationTrigger === 'popstate') {
          // Redirect to a different route, e.g., home
          this.router.navigateByUrl('/home');
              // Unsubscribe from router events to prevent further navigation to this component
              this.unsubscribe$.next();
              this.unsubscribe$.complete();
        }
      });
  }
}
