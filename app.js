// get elements
const D_image = document.querySelector(".DisplayImage")
const IntroText = document.querySelector(".IntroText")
const MenuBtn = document.querySelector("#MenuBtn")
const Nav = document.querySelector("nav")
const CardsHolder = document.querySelector(".CardsHolder")
const ProductsCategory = document.querySelector("#ProductsCategory")
const ToggleCartbtn = document.querySelector("#Cartbtn")
const CartDiv = document.querySelector(".CartDiv")


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


// animate IntroText
ScrollReveal().reveal('.IntroText', { delay: 500});
ScrollReveal().reveal('.HomeBtns', { delay: 700});
ScrollReveal().reveal('.DisplayImage', { delay: 800});
ScrollReveal().reveal('.ProductCard', { delay: 2000});
ScrollReveal().reveal('form', { delay: 1000});
ScrollReveal().reveal('.SocialLinks', { delay: 1000});
ScrollReveal().reveal('.Links', { delay: 700});
ScrollReveal().reveal('#About', { delay: 900});

// display image changer every 5s
const Covers = [
    "(./Images/coveroriginal.png) center center /contain no-repeat",
    "(./Images/cover6600.png) center center /contain no-repeat",
    "(./Images/cover5600.png) center center /contain no-repeat",
    "(./Images/cover4600.png) center center /contain no-repeat",
    "(./Images/cover3600.png) center center /contain no-repeat"
]

const ChangeImage = (images, container, step) => {
      images.forEach((image, index) => (
      setTimeout(() => {
          container.style.background = "url"+`${image}`;
      }, step * (index + 1))
    ))
    setTimeout(() => ChangeImage(images, container, step), step * images.length)
}
  
ChangeImage(Covers, D_image, 5000)





// json fetching

GetProducts();
function GetProducts(){
    fetch("./products.json")
    .then(response => response.json())
    .then(data =>{
        data.map(data=>{
            // create card for each data 
            CreateProductCard(data.image, data.name, data.company, data.make, data.cost)
        })
    });
}


// create a product Card and appends to CardsHolder
function CreateProductCard(Pimage, PName, PCompany, PMake, PCost){
   let newCard = document.createElement("div")
   newCard.classList = "ProductCard"
   newCard.innerHTML = `
        <img src="${Pimage}" alt="Loading Image">
        <h3 class="ProductName">${PName}</h3>
        <h3 class="ProductCompany">${PCompany}</h3>
        <h3 class="ProductMake">${PMake}</h3>
        <h3>Ksh. <span id="ProductCost"></span>${PCost}</h3>
        <button class="btn" id="CartItem">Add to Cart</button> 
    `;

    CardsHolder.append(newCard);
}

// Displaying Products depending on the category the user wants
ProductsCategory.addEventListener('change', ()=>{
    CardsHolder.innerHTML = "";
    if((ProductsCategory.value) === "All"){
        GetProducts();
    }else{
    SortByCategory(ProductsCategory.value)
    }

})

function SortByCategory(userChoice){
    let source = `./${userChoice}.json`
    console.log(source);
    fetch(source)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        data.map(data=>{
            CreateProductCard(data.image, data.name, data.company, data.make, data.cost)
        })
    })
}