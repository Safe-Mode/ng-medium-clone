import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../../../types/backend-errors.interface';

@Component({
  selector: 'app-backend-errors',
  templateUrl: './backend-errors.component.html',
  styleUrls: ['./backend-errors.component.scss']
})
export class BackendErrorsComponent implements OnInit {

  @Input() errors!: BackendErrorsInterface;
  errorMessages?: string[];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.errors).map((name: string) => {
      const messages = this.errors[name].join(' ');
      return `${name} ${messages}`;
    });
  }

}
