const dessertCards = document.getElementById("dessert-card-container");
const showCartBtn = document.getElementById("cart-btn");
const carBtn = document.getElementById("cart-container")
const showIfnItem = document.getElementById("total-items");
const showSubtotal = document.getElementById("subtotal");
const showTax = document.getElementById("taxes");
const showTotal = document.getElementById("total");
const showIfnProduct = document.getElementById("products-container");

class Product {
    constructor(id, name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.id = id;
        this.quantity = 0; // Số lượng sản phẩm trong giỏ hàng`
    }
}

class ProductList {
    constructor() {
        this.productss = [
            new Product(1, "Vanilla Cupcakes (6 Pack)", 12.99, "Cupcake"),
            new Product(2, "French Macaron", 3.99, "Macaron"),
            new Product(3, "Pumpkin Cupcake", 3.99, "Cupcake"),
            new Product(4, "Chocolate Cupcake", 5.99, "Cupcake"),
            new Product(5, "Chocolate Pretzels (4 Pack)", 10.99, "Pretzel"),
            new Product(6, "Strawberry Ice Cream", 2.99, "Ice Cream"),
            new Product(7, "Chocolate Macarons (4 Pack)", 9.99, "Macaron"),
            new Product(8, "Strawberry Pretzel", 4.99, "Pretzel"),
            new Product(9, "Butter Pecan Ice Cream", 2.99, "Ice Cream"),
            new Product(10, "Rocky Road Ice Cream", 2.99, "Ice Cream"),
            new Product(11, "Vanilla Macarons (5 Pack)", 11.99, "Macaron"),
            new Product(12, "Lemon Cupcakes (4 Pack)", 12.99, "Cupcake"),
        ];
    }
}

const cart = new ProductList();
cart.productss.forEach(
    ({ name, id, price, category }) => {
        dessertCards.innerHTML += `
        <div class="dessert-card">
          <h2>${name}</h2>
          <p class="dessert-price">$${price}</p>
          <p class="product-category">Category: ${category}</p>
          <button 
            id="${id}" 
            class="btn add-to-cart-btn">Add to cart
          </button>
        </div>
      `;
    }
);

const btnAddToCart = document.querySelectorAll(".add-to-cart-btn");

class ShoppingCart {
    constructor(ProductList) {
        this.subtotal = 0;
        this.tax = 0;
        this.total = 0;
        this.items = 0;
        this.totalItems = 0;
        this.product = ProductList;
        this.products = [];
    }

    addProductToCart(ids) {
        var objProduct = this.product.productss.find(product => product.id === Number(ids)); // thêm chính xác sản phẩm vào giỏ hàng

        if (objProduct) {
            const existingProduct = this.products.find(product => product.id === objProduct.id); // kiểm tra sản phẩm đã có trong giỏ hàng chưa

            if (existingProduct) {
                // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng của sản phẩm đó
                existingProduct.quantity += 1;
                this.subtotal += objProduct.price;
                this.items += 1;
            } else {
                // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng và thiết lập số lượng ban đầu là 1
                objProduct.quantity = 1;
                this.products.push(objProduct);
                this.subtotal += objProduct.price;
                this.items += 1;
            }

            this.tax = this.subtotal * 0.07;
            this.total = this.subtotal + this.tax;

            // Cập nhật giỏ hàng
            this.updateCartDisplay();
        }
    }

    updateCartDisplay() {
        // Cập nhật số lượng và tổng tiền trong giỏ hàng
        showIfnItem.innerHTML = this.items;
        showSubtotal.innerHTML = this.subtotal.toFixed(2);
        showTax.innerHTML = this.tax.toFixed(2);
        showTotal.innerHTML = this.total.toFixed(2);

        // Hiển thị danh sách sản phẩm trong giỏ hàng và số lượng của từng sản phẩm
        showIfnProduct.innerHTML = '';
        this.products.forEach(product => {
            showIfnProduct.innerHTML += `
                <div>
                    <p>${product.name} x ${product.quantity}</p>
                    <p>$${(product.quantity * product.price).toFixed(2)}</p>
                </div>
            `;
        });
    }
}

const carts = new ShoppingCart(cart);

// Hiển thị giỏ hàng
showCartBtn.onclick = () => {
    carBtn.style.display = "block"; // làm cho giỏ hàng hiện lên
}

// Lắng nghe sự kiện click thêm sản phẩm vào giỏ hàng
btnAddToCart.forEach((btn) => {
    btn.onclick = () => {
        carts.addProductToCart(btn.id); // thêm sản phẩm vào giỏ hàng
    };
});
