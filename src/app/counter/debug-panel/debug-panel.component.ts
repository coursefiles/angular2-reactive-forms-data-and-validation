import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'debug-panel',
  template: `
    <input id="debugToggle" type="checkbox" [checked]="isVisible" (change)="isVisible = !isVisible;onSaveState()">
    <label for="debugToggle"></label>
    <div>
      <pre>{{ data | json }}</pre>
    </div>
  `,
  styles: [`
    :host {
      display: none;
    }
    :host.has-content {
      display: block;
      background-color: rgba(237, 119, 119, .9);
      position: fixed;
      top: 0;
      right: 0;
    }
    :host.is-visible {
      bottom: 0;
      min-width: 50%;
    }
    input[type=checkbox] {
      display: none;
    }
    label {
      display: block;
      text-align: center;
      height: 1.6em;
      padding: .4em;
      line-height: 1.3em;
    }
    label:before {
      content: "show debug";
      width: 100%;
      cursor: pointer;
    }
    input[type=checkbox]:checked+label:before {
      content: "hide debug";
    }
    :host.is-visible div {
      display: block;
      height: calc(100% - 1.6em);
    }
    div {
      display: none;
      overflow: auto;
    }
    pre {
      font-size: 2em;
      padding: 20px;
      margin: 0;
    }
  `]
})
export class DebugPanelComponent {
  @Input() data;
  @HostBinding('class.has-content') get content() { return this.hasContent; }
  hasContent = false;
  @HostBinding('class.is-visible') get visible() { return this.isVisible; }
  isVisible = false;
  
  constructor() {
    this.isVisible = localStorage.getItem('debugIsVisible') === 'true';
  }
  
  ngOnInit() {
    this.hasContent = (this.data);
  }

  onSaveState(){
    localStorage.setItem('debugIsVisible', this.isVisible.toString());
  }
}
