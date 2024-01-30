import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Category } from '../../../../types/Category';
import { CategoryService } from '../../../../services/category.service'; // import services
import { DescriptionPipe } from '../../../../pipes/description.pipe';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, DescriptionPipe, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  categoryService = inject(CategoryService); // inject vao bien

  categoryList: Category[] = [];

  ngOnInit(): void {
    this.categoryService
      .getCategoryListAdmin()
      .subscribe((categories) => (this.categoryList = categories)); // callApi.then(cb fuc)
  }
  handleDeleteProduct(id: string) {
    if (window.confirm('Do you really remove product?')) {
    }
  }
}
