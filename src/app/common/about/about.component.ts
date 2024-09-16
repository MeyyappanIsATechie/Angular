import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CounterbuttonComponent } from '../counterbutton/counterbutton.component';
import { CounterdisplayComponent } from '../counterdisplay/counterdisplay.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CounterbuttonComponent, CounterdisplayComponent, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  id: any;
  countries = ['United States', 'Canada', 'India', 'UK'];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }
}
