import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-card, [app-card]',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent {
  @Input() public resizeable: boolean = false;
  @Input() public noPadding: boolean = false;
  public isMaximized: boolean = false;
  public toggle() {
    this.isMaximized = !this.isMaximized;
  }
}