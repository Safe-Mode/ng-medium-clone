import { Component, Input } from '@angular/core';
import { TagType } from '../../../../types/tag.type';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent {
  @Input() tags?: TagType[];
}
