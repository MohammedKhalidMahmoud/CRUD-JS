const product_name_input_field=document.querySelector("#product_name_input_field");
const product_price_input_field=document.querySelector("#product_price_input_field");
const product_category_input_field=document.querySelector("#product_category_input_field"); 
const product_description_input_field=document.querySelector("#product_description_input_field");    
const add_product_button=document.querySelector("#add_product_button");
const display_container=document.querySelector("#display_container");
// const update_product_button=document.querySelector("#update_product_button");

    
function reset(){
    product_name_input_field.value="";
    product_price_input_field.value="";
    product_category_input_field.value="";
    product_description_input_field.value="";
}

// let products_list=[];
let products_list=  JSON.parse(localStorage.getItem("products_list")) || [];
// console.log(typeof products_list);
// console.log(products_list);
function add_product(){
    const product={
        index:products_list.length,
        name:product_name_input_field.value,
        price:product_price_input_field.value,
        category:product_category_input_field.value,
        description:product_description_input_field.value
    };
    
    localStorage.setItem("products_list",JSON.stringify([...products_list,product]));
    // console.log(products_list);
    display();
    reset(); 
 }

function delete_product(index){
    // products_list=products_list.filter((product)=>  product.index !== index);
    localStorage.setItem("products_list",JSON.stringify(products_list));
    console.log(products_list);
    display();
};

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
        localStorage.setItem("products_list",JSON.stringify(products_list));
        add_product_button.innerHTML = "Add";
        add_product_button.onclick = add_product; // Restore original function
        display();
        reset();
    };
}



 

 function display(){
    let cartona='';
    let products_list=JSON.parse(localStorage.getItem("products_list"))||[];
    for(let i=0;i<products_list.length;i++){
        cartona+= `
    <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-5" >
        
        
        <div class="card-body">
            <h3 class="card-title text-center mb-3">Card title</h3>
            
            <p class="fs-5">Name: ${products_list[i].name} </p>
            <p class="fs-5">Price: ${products_list[i].price}</p>
            <p class="fs-5">Category: ${products_list[i].category}</p>
            <p class="fs-5">Description: ${products_list[i].description}</p>  
        </div>
        <button class="btn btn-primary block w-100 mb-1" onclick="update_product(${products_list[i].index})">Update</button>
        <button class="btn btn-danger block w-100" onclick="delete_product(${products_list[i].index})">Delete</button>        
    </div>
    `;
    }
    
    display_container.innerHTML=cartona;
    
    
 }
display();

function search(pname, cname){



}