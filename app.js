document.addEventListener("DOMContentLoaded", ()=>{
    // json fetching
    GetProducts();

    // display image changer every 5s
    ChangeImage(Covers, D_image, 5000)
})

// get elements
const D_image = document.querySelector(".DisplayImage")
const IntroText = document.querySelector(".IntroText")
const MenuBtn = document.querySelector("#MenuBtn")
const Nav = document.querySelector("nav")
const CardsHolder = document.querySelector(".CardsHolder")
const ProductsCategory = document.querySelector("#ProductsCategory")
const ToggleCartbtn = document.querySelector("#Cartbtn")
const CartDiv = document.querySelector(".CartDiv")
const AddQuantityBtn = document.querySelector("#AddQuantity") 
const ReduceQuantityBtn = document.querySelector("#ReduceQuantity") 
const CartRemoveBtn = document.querySelector("#CartRemoveBtn") 
const ProductQuantity = document.querySelector("#Quantity")
const ItemCost = document.querySelectorAll("#ItemCost")
const CartTotal = document.querySelector("#CartTotals")
const CartItemsHolder = document.querySelector(".CartItemsHolder")


// navigation

// menu btn for small screens
MenuBtn.addEventListener("click", ()=>{
    Nav.classList.toggle('Show'); 
})

// hides nav when one clicks outside it
window.onclick = function(e){
    let NavClass = e.target.parentElement.classList
    if(NavClass == "Show"){
        Nav.classList.toggle('Show'); 
    }
}


// Toggle Cart
ToggleCartbtn.addEventListener("click",()=>{
    CartDiv.classList.toggle("Show")
} )

// navigation end



// list of display cover photos
const Covers = [
    "(./Images/coveroriginal.png) center center /contain no-repeat",
    "(./Images/cover6600.png) center center /contain no-repeat",
    "(./Images/cover5600.png) center center /contain no-repeat",
    "(./Images/cover4600.png) center center /contain no-repeat",
    "(./Images/cover3600.png) center center /contain no-repeat"
]

function ChangeImage(images, container, step){
      images.forEach((image, index) => (
      setTimeout(() => {
          container.style.background = "url"+`${image}`;
      }, step * (index + 1))
    ))
    setTimeout(() => ChangeImage(images, container, step), step * images.length)
}

// photo changing end//////////////////////////////////////



// // json fetching
function GetProducts(){
    fetch("./products.json")
    .then(response => response.json())
    .then(data =>{
        data.map(data=>{
            // create card for each data 
            CreateProductCard(data.image, data.name, data.company, data.make, data.cost)
        })
        CreateCartItem()
    });

   
}

// create a product Card and appends to CardsHolder
function CreateProductCard(Pimage, PName, PCompany, PMake, PCost){
    let newCard = document.createElement("div")
    newCard.classList = "ProductCard"
    newCard.innerHTML += `
        <img src="${Pimage}" alt="Loading Image">
        <h3 class="ProductName">${PName}</h3>
        <h3 class="ProductCompany">${PCompany}</h3>
        <h3 class="ProductMake">${PMake}</h3>
        <h3>Ksh. <span id="ProductCost">${PCost}</span></h3>
        <button class="btn" id="AddTocart">Add to Cart</button> 
    `;
 
    CardsHolder.append(newCard); 
}



// Products sorting
// Displaying Products depending on the category the user wants
ProductsCategory.addEventListener('change', ()=>{
    CardsHolder.innerHTML = "";
    if((ProductsCategory.value) === "All"){
        GetProducts();
    }else{
    SortByCategory(ProductsCategory.value)
    }

})
// sorts catergoty depending on choice
function SortByCategory(userChoice){
    let source = `./${userChoice}.json`
    fetch(source)
    .then(response => response.json())
    .then(data =>{
        data.map(data=>{
            CreateProductCard(data.image, data.name, data.company, data.make, data.cost)
        })
        CreateCartItem()
    })
}
// Product sorting end






// Card to Cart

function CreateCartItem(){
    const Cards =document.querySelectorAll(".ProductCard")
    Cards.forEach(card=>{
        card.addEventListener("click",(e)=>{
           let ClickedBtn = e.target; //Gets the buttons
           let TargetParent = e.target.parentElement;
           let ItemImage = TargetParent.querySelector("img").src
           let ItemCost = TargetParent.querySelector("h3 #ProductCost").textContent

        //    ensure the button is clicked and the button is active
            if(ClickedBtn.id=="AddTocart"){
             //add to cart and open cart
                //    add item to cart ui
                AddItemToCart(ItemImage,ItemCost)  
                ToggleCartbtn.style.transform = "rotate(360deg)"
            } else {
                CartDiv.classList.toggle("Show")
            }
        })
    })
   
}

// add Item to the cart
function AddItemToCart(image, Cost){
    CartItemsHolder.innerHTML +=`
    <div class="CartItem" onmouseover="CartTotalCalc()">
    <img src="${image}" alt="Loading Image">
    <section>
        <i class="bi bi-file-minus-fill" id="ReduceQuantity"></i>
        <input type="number"name="Quantity" id="Quantity" contenteditable="true" value="1">
        <i class="bi bi-file-plus-fill" id="AddQuantity"></i>
        <span type="number" name="ItemCost" id="ItemCost">${Cost}</span>
    </section>
    <span class="TotalCost">${Cost}</span>
    <i class="bi bi-file-x-fill" id="CartRemoveBtn"></i>
    </div>
    `
    ManipulateCartItem()
}


function ManipulateCartItem(){
    const CartItems = document.querySelectorAll(".CartItem")
    CartItems.forEach(item=>{
        item.addEventListener("click", (e)=>{
            // console.log(e.target.id);
            let TargetElement = e.target
            if(TargetElement.id == "CartRemoveBtn"){
                ToggleCartbtn.style.transform = "rotate(180deg)"
                TargetElement.parentElement.remove()
                ToggleCartbtn.style.transform = "rotate(0deg)"
            }else if(TargetElement.id == "AddQuantity"){
                //Plus Buttom operation
                let ParentItem = e.target.parentElement
                let ItemQuantity = ParentItem.querySelector("#Quantity").value
                let newItemQuantity = parseInt(ItemQuantity)+1;
                // console.log(newItemQuantity);
                ParentItem.querySelector("#Quantity").value = newItemQuantity
                let TotalDiv = ParentItem.parentElement.querySelector(".TotalCost")
                // Calculate the total of this particular item depending on quantity
                TotalDiv.textContent = CostCalculator(item)
                // CartTotalCalc(item)
            }else if(TargetElement.id == "ReduceQuantity" && e.target.parentElement.querySelector("#Quantity").value>1 ){
                // Minus button operation
                let ParentItem = e.target.parentElement
                let ItemQuantity = ParentItem.querySelector("#Quantity").value
                let newItemQuantityMinus = parseInt(ItemQuantity)-1;
                // console.log(newItemQuantityMinus);
                ParentItem.querySelector("#Quantity").value = newItemQuantityMinus
                let TotalDiv = ParentItem.parentElement.querySelector(".TotalCost")
                // Calculate the total of this particular item depending on quantity
                TotalDiv.textContent = CostCalculator(item)
                // CartTotalCalc(item)
            }
        })
        
    })
}

// gets cost of each cart item depending on Quantity
function CostCalculator(Cart){
    let TotalCostofItem = 0;
    let initialCost = Cart.querySelector("#ItemCost").textContent
    let currentQuantity = Cart.querySelector("#Quantity").value;
    if(currentQuantity>1){
        TotalCostofItem = currentQuantity*initialCost 
    }else{
        TotalCostofItem =initialCost
    }
    return TotalCostofItem;
}

// CartTotalCalc();

// todo: calculate all Totals
function CartTotalCalc(){
    const EvaluatedCosts = [...document.querySelectorAll(".CartItem .TotalCost")]
    // console.log(EvaluatedCosts);
    let CostArray =[];
    EvaluatedCosts.forEach(element => {
        CostArray.push(element.textContent)
    });

    // console.log(CostArray);

    let sum = 0;
    for (let index = 0; index < CostArray.length; index++) {
        sum = sum + parseInt(CostArray[index])
    }
    CartTotal.innerText = sum
}

// animations
ScrollReveal().reveal('.IntroText', { delay: 500});
ScrollReveal().reveal('.HomeBtns', { delay: 700});
ScrollReveal().reveal('.DisplayImage', { delay: 800});
ScrollReveal().reveal('.ProductCard', { delay: 2000});
ScrollReveal().reveal('form', { delay: 800});
ScrollReveal().reveal('.SocialLinks', { delay: 700});
ScrollReveal().reveal('.Links', { delay: 700});
ScrollReveal().reveal('#About', { delay: 900});
