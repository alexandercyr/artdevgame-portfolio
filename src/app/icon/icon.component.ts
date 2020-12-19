import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() name: string;
  @Input() color: string = "#000";

  svgTemplate;

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
      this.http.get(`assets/icons/icon-${this.name}.svg`, {responseType:'text'}).subscribe(svg => {
        console.log(svg)
        this.svgTemplate = this.domSanitizer.bypassSecurityTrustHtml(svg);
      });
  }
}
