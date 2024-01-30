Link https://angular.io/docs

## Day 1: Khởi tạo Project

- Cài Angular CLI: <br>
  npm install -g @angular/cli ( sử dụng ng) <br>
- Tạo Project: <br>
  ng new project_name <br>
  cd my-app <br>
  ng serve --open <br>

### Add tailwind css:

- Cài thư viện tailwind: <br>
  npm install -D tailwindcss postcss autoprefixer <br>
  npx tailwindcss init <br>
- Add content trong taildwind config: <br>
  content: [
  "./src/**/*.{html,ts}",
  ], <br>
- Add style.css <br>
  @tailwind base; <br>
  @tailwind components; <br>
  @tailwind utilities; <br>

### Create components

ng generate component [name] <br>
ng g c [name] <br>

### Component (4 file)

- css <br>
- html <br>
- spec.ts: test <br>
- component.ts: xử lý logic <br>

## Day 2:

- Sử dụng NgFor: duyệt qua phần tử trong danh sách (map) <br>
- imports: [NgFor] <br>
- \*ngFor="let item of itemList" <br>
- Truyền dữ liệu từ cha -> con <br>
  [productChild] = "productParent" <br>
  ### Data binding: <br>
- {{expression}} : trong component.ts -> html (view) <br>
- [target]="expression": <br>
  the html: src (img), href (a): [src]= "imgSrc" <br>
  component cha => con: [productChild] = "productParent" <br>

  ## Day 3: UI + Ghép API

  - Call Api <br>
  - Tạo folder services: <br>
  - ng g s [name] <br>
  - VD: ng g s services/product <br>
    - http = inject(HttpClient) <br>
    - Viết các function: <br>
    - getProductList(): http.get(apiUrl); <br>
  - Call API: page Home <br>
  - inject(ProductService) <br>
  - ngOnInit (chạy sau render UI) : function call api <br>
  - VD: productService // service <br>
    .getProductList() // function <br>
    .subscribe(data -> cb functions) // hứng data vào biến của mình <br>

  - Cấu hình app config: thêm trong provider: provideHttpClient()

  ## DAY 4: Lab 2

  - component sidebar: <br>
  - ng g c components/sidebar <br>
  - ng g c pages/admin/products <br>
  - ng g c layouts/layout-admin <br>
  - app.routes: <br>
    {
    path: 'admin',<br>
    component: LayoutAdminComponent, <br> // sử dụng component Layout
    children: [ <br> // gồm paths của con nằm trong layout
    { path: 'products', component: ProductsComponent }, <br> // path + value = pathCha/pathCon -> admin/products
    { path: 'products/add', component: ProductAddComponent }, <br> -> admin/products : Lab 3
    { path: 'products/:id', component: ProductEditComponent } <br> -> admin/products/edit/:id : Lab 4
    ],
    }, <br>

  - page admin/products: table render ProductList (edit, remove) <br>
  - Nut create product <br>

  - Update product service: getProductListAdmin() <br>
  - Call API render UI <br>
    - fakeapi ko có CRUD <br>
    - https://hoadv-nodejs.vercel.app/api/products (CRUD) <br>
    - Api Nodejs <br> (Option 1)
    - Api JSon Server <br> (Option 2)

  ## Day 5:

  - Viết pipe để xử lý dữ liệu:
  - ng g s [name]
  - Cách dùng: import
  - 120: tham số
  - description là pipe gọi ra
    {{ product.description | description : 120 }}
  - Data binding:
  - Event: (target)="statement": target: click, statement là function truyền vào
  - Lab 2: List + Delete + Notify
  - Lab 3: Create Product + Validate + Notify
  - Lab 4: Edit Product + Validate + Notify
  - ASM = (Lab 1 + Lab 2 + Lab 3 + Lab 4) /5 + Thuong : UI + SP + Deploy + Day Du (+ CRUD Category)

## Day 6:

- import FormsModule: sử dụng ngModel
- Data binding: Two way
- [(ngModel)]="statment" // biến
- (ngSubmit)="handleSubmit()"
- (click)="handleClick(...)"

## Day 7:

- Delete Product: Gọi service delete sau đó filter id
- Create Product: Gọi service create product là xong
- Api Category: Viết service gọi category List
- ngFor để list select: [ngValue] lấy dữ liệu mà mình select:
  <option
  \*ngFor="let category of categoryList"
  [ngValue]="category.\_id">
  {{ category.title }}
  </option>

- Lam quiz 5-8; <br>
- Lab 5 - Lab 6 <br>
- create page Login - Register (UI) <br>
- Viết service Auth: lưu token (local storage, session, cookie) <br>
- Ghép API: validate, Notify <br>
- Guard bảo vệ /admin (check local, cookie) <br>

## Day 8:

- Edit Product: <br>
- ProductID URL: <br>
  - path: 'products/edit/:id' :id <br>
  - link a: [routerLink]="['/admin/products/edit', product._id]" <br>
  - Get URL: route.params => param['id'] <br>
  - Call API get Product Detail <br>
  - Submit Form <br>

## Day 9:

Create guard protect route admin

- ng generate guard [name]
- ng g g [name]
- adminGuard return true || false
- Config route: canActivate: [adminGuard],
