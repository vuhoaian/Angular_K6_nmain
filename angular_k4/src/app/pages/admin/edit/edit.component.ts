import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../../services/product.service'; // import services
import { ProductAdd } from '../../../types/Product';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../types/Category';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  productId: string | undefined;

  productEdit: ProductAdd = {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rate: 0,
  };

  categoryService = inject(CategoryService); // inject vao bien
  productService = inject(ProductService); // inject vao bien
  router = inject(Router);

  route = inject(ActivatedRoute);
  categoryList: Category[] = [];

  ngOnInit(): void {
    this.categoryService
      .getCategoryListAdmin()
      .subscribe((categories) => (this.categoryList = categories));
    // Lay ProductId From Url
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      return this.getProductDetail();
    });
  }

  getProductDetail() {
    if (!this.productId) return;
    this.productService
      .getDetailProductById(this.productId)
      .subscribe(
        (product) =>
          (this.productEdit = { ...product, category: product.category._id })
      );
  }

  handleSubmit() {
    if (!this.productId) return;
    this.productService
      .updateProductById(this.productEdit, this.productId)
      .subscribe(() => this.router.navigate(['/admin/products']));
    // call service api POST products
  }
}

// B1: Tạo biến productId: Lưu trữ Id từ url
// B2: Tạo biến productEdit: Lưu trữ dữ liệu nhập input  form
// B3: Lấy id From Url qua route.param => gán lại vào productList
// B4: Gọi service getProductDetail -> cập nhật data vào productEdit
// B5: Submit form gọi service PUT update Product
