import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss']
})
export class CtaComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  navigateToAboutScreen() {
    window.location.href = "/about";
  }

}
