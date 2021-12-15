const productImage = ["image-product-1.jpg", "image-product-2.jpg", "image-product-3.jpg", "image-product-4.jpg"];

const thumbnails = ["images/image-product-1-thumbnail.jpg", "images/image-product-2-thumbnail.jpg", "images/image-product-3-thumbnail.jpg", "images/image-product-4-thumbnail.jpg"];

const getClass = (className) => document.querySelector(`.${className}`);
const getAllClass = (className) => document.querySelectorAll(`.${className}`);

// display menu on mobile

const hamburger = getClass("hamburger");
const navMenu = getClass("nav-menu");
const close = getClass("close");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
})

close.addEventListener("click", () => {
    navMenu.classList.remove("show");
})

// cart items display

const cartIcon = getClass("cart-icon");
const cartMenu = getClass("cart-menu");

cartIcon.addEventListener("click", () => {
    cartMenu.classList.toggle("show-cart");
});

// change displayed shoe on mobile with the navigation buttons

const productsInfo = getClass("products");
const displayImage = getClass("product-img");
const next = getClass("next");
const prev = getClass("prev");

let currentImgIndex = 0;

const navigator = (product,next,prev,display) => {
    product.addEventListener("click", (e) => {
        if (e.target.className.includes("next")) {
            currentImgIndex++;
            display.src = `images/${productImage[currentImgIndex]}`;
            if (currentImgIndex >= productImage.length - 1) {
                currentImgIndex = 0;
            }
        } else if (e.target.className.includes("prev")) {
            if (currentImgIndex < 0) {
                currentImgIndex = productImage.length - 1;
            }
            display.src = `images/${productImage[currentImgIndex]}`;
            currentImgIndex--;
        }
    });
}

navigator(productsInfo,next,prev,displayImage);

// quantity of items to be bought and add to cart

const minus = getClass("minus")
const plus = getClass("plus")
const quantityCount = getClass("quantity-count");

let quantityBought = 0;
quantityCount.textContent = 0;

const increement = () => {
    quantityCount.textContent = ++quantityBought;
}

const decreement = () => {
    if (quantityBought == 0) {
        quantityCount.textContent = 0;
    } else {
        quantityCount.textContent = --quantityBought;
    }
}

minus.addEventListener("click", decreement);
plus.addEventListener("click", increement);

// display selected items on large screen

const productImageDisplayed = getClass("product-img");
const productLightHouse = getClass("products-lighthouse")
let thumb = thumbnails[0];

const productSelection = (productContainer,productDisplay) => {
    productContainer.addEventListener("click", (e) => {
        if (e.target.className.includes("thumb-img")) {
    
            let temp = e.target.className.split(" ");
            temp = temp[1];
            const img = getClass(`${temp} .image`);
    
            //extract the image url from the image variable
    
            thumb = img.src.slice(img.src.lastIndexOf("/") + 1);
            thumb = `images/${thumb}`;
    
            let indexOfThumb = 0;
            thumbnails.forEach((value, index) => {
                if (thumb === value) {
                    indexOfThumb = index;
                }
            });
    
            productDisplay.src = `images/${productImage[indexOfThumb]}`;
        }
    })
}

productSelection(productsInfo,productImageDisplayed)

// add to cart and showing on cart, with cart notification count
// adding delete functionality when the item was add because the remove
// cart cant be access when the page loads

const cartContainer = getClass("cart-item-wrapper");
const addToCart = getClass("add-cart-btn");
const btnWrapper = getClass("btn-wrapper");
const emptyCart = getClass("empty-cart");
const cartNotificationCount = getClass("cart-count");

let cartCount = 0;
let removedCart;

const addItem = (thumb, quantity, totalAmount) => {
    return `<div class="cart cart${cartCount} flex-row">
    <div class="cart-prod flex-row">
      <img src=${thumb} alt="thumbnails">
      <div class="cart-price">
        <span>Autumn Limited Edition</span>
        <span>$125.00 x <span class="quantity-count">${quantity}</span> <span class="total-price">$${totalAmount}</span></span>
      </div>
    </div>
    <img src="images/icon-delete.svg" alt="delete" class="remove-cart cart${cartCount}">
  </div>`
}

if (!cartContainer.hasChildNodes()) {
    emptyCart.textContent = "Your cart is empty";
}

addToCart.addEventListener("click", () => {
    cartCount++;
    let amountToPay = (125 * quantityBought);
    thumb = `${thumb}`;
    cartContainer.innerHTML += addItem(thumb, quantityBought, amountToPay);

    if (cartContainer.children.length >= 0 && cartCount == 1) {
        btnWrapper.innerHTML += `<button class="checkout cart-btn btn">Checkout</button>`

        cartMenu.removeChild(emptyCart);
    }

    // notification count 

    cartNotificationCount.textContent = cartContainer.childElementCount;

    // remove item from cart

    const removeCartItem = getAllClass("remove-cart");
    const cart = getClass("cart");

    removeCartItem.forEach((cartItem) => {
        cartItem.addEventListener("click", (e) => {
            temp = cartItem.className.split(" ");
            temp = getClass(temp[1]);
            cartContainer.removeChild(temp)

            // check if the cart is empty while removing items, if it is the button will be remove and empty cart will be displayed

            if (cartContainer.children.length <= 0) {
                cartMenu.appendChild(emptyCart);
                btnWrapper.innerHTML = "";
            }
            --cartCount;
        })
    })

    // when click on checkout remove all the cart items

    const checkout = getClass("checkout");
    checkout.addEventListener("click", () => {
        cartContainer.textContent = "";
        btnWrapper.textContent = "";
        cartMenu.appendChild(emptyCart);
        cartCount = 0;
    });
})

// lighthouse

const displayLighthouse = getClass("display-lighthouse");
const lightPrev = getClass("light-prev");
const lightNext = getClass("light-next");
const closeLightHouse = getClass("close-lighthouse");

closeLightHouse.addEventListener("click",() => {
    productLightHouse.classList.remove("display");
});

productsInfo.addEventListener("click",(e) => {
    if (!e.target.className.includes("thumb-img")) {
        productLightHouse.classList.add("display");
    }
})

navigator(productLightHouse,next,prev,displayLighthouse);
productSelection(productLightHouse,displayLighthouse)