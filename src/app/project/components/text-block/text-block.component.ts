import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-block',
  templateUrl: './text-block.component.html',
  styleUrls: ['./text-block.component.scss']
})
export class TextBlockComponent implements OnInit {

  @Input() content;

  constructor() { }

  ngOnInit(): void {
    console.log(this.content);
  }

}
