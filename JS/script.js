// Get DOM Elements
const product_name_input_field = document.querySelector("#product_name_input_field");
const product_price_input_field = document.querySelector("#product_price_input_field");
const product_category_input_field = document.querySelector("#product_category_input_field"); 
const product_description_input_field = document.querySelector("#product_description_input_field");    
const add_product_button = document.querySelector("#add_product_button");
const display_container = document.querySelector("#display_container");

// Initialize products list
let products_list = JSON.parse(localStorage.getItem("products_list")) || [];

// Reset form fields
function reset(){
    product_name_input_field.value = "";
    product_price_input_field.value = "";
    product_category_input_field.value = "";
    product_description_input_field.value = "";
}

// Add a new product
function add_product(){
    const product = {
        name: product_name_input_field.value,
        price: product_price_input_field.value,
        category: product_category_input_field.value,
        description: product_description_input_field.value
    };

    products_list.push(product);
    localStorage.setItem("products_list", JSON.stringify(products_list));
    display();
    reset(); 
}

// Delete a product
function delete_product(index){
    products_list.splice(index, 1);
    localStorage.setItem("products_list", JSON.stringify(products_list));
    display();
}

// Update a product
function update_product(index) {
    let product = products_list[index];

    product_name_input_field.value = product.name;
    product_price_input_field.value = product.price;
    product_category_input_field.value = product.category;
    product_description_input_field.value = product.description;

    add_product_button.innerHTML = "Update";

    add_product_button.onclick = () => {
        product.name = product_name_input_field.value;
        product.price = product_price_input_field.value;
        product.category = product_category_input_field.value;
        product.description = product_description_input_field.value;

        localStorage.setItem("products_list", JSON.stringify(products_list));
        add_product_button.innerHTML = "Add";
        add_product_button.onclick = add_product; // Restore default behavior
        display();
        reset();
    };
}

// Display products
function display(){
    let cartona = '';
    products_list.forEach((product, i) => {
        cartona += `
            <div class="card my-3 p-3 shadow-sm col-12 md-col-6 lg-col-4">
                <h5 class="card-title text-center mb-2">Product</h5>
                <p><strong>Name:</strong> ${product.name}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Description:</strong> ${product.description}</p>
                <button class="btn btn-primary w-100 mb-2" onclick="update_product(${i})">Update</button>
                <button class="btn btn-danger w-100" onclick="delete_product(${i})">Delete</button>
            </div>
        `;
    });

    display_container.innerHTML = cartona;
}

// Initial render
display();
