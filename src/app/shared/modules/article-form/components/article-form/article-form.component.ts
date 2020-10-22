import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ArticleInputInterface } from '../../../../types/article-input.interface';
import { BackendErrorsInterface } from '../../../../types/backend-errors.interface';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent {

  @Input() initialValues?: ArticleInputInterface;
  @Input() isSubmitting?: boolean;
  @Input() errors?: BackendErrorsInterface | null;
  @Output() articleSubmitEvent = new EventEmitter<ArticleInputInterface>();

  form: FormGroup = this.getForm();

  constructor(private fb: FormBuilder) {
  }

  private getForm(): FormGroup {
    return this.fb.group({
      title: this.initialValues?.title,
      description: this.initialValues?.description,
      body: this.initialValues?.body,
      tagList: this.initialValues?.tagList.join(' ')
    });
  }

  onSubmit(): void {
    if (this.form) {
      this.articleSubmitEvent.emit(this.form.value);
    }
  }

}
