import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  constructor() { }

  toasts: Array<Toast>;

  ngOnInit() {
    this.toasts = [];
  }

  addToast(toast: Toast): void {
    this.toasts.push(toast);
    setTimeout(() => {
      this.toasts.pop();
    }, toast.timeout);
  }

}
