import './src/sass/style.scss'

// Calculate how many items in cart
const productsContent = document.querySelector(".card-products-content");
const notifications = document.querySelector('.notify')

function calcNotifs() {
    var itemCount = productsContent.childElementCount;
        if (itemCount > 0) {
            notifications.style.display = "block";
        } else if (itemCount == 0) {
            notifications.style.display = "none";
        }
        notifications.innerHTML = itemCount;
}

calcNotifs()

// Check if the cart is empty
var isEmpty = true
const p = document.createElement("p")
const checkoutButton = document.querySelector('.checkout')

function emptyCheck() {
    console.log("i'm here")
    if (!productsContent.hasChildNodes()) {
        checkoutButton.style.display = 'none';
        productsContent.classList.add("card-text")
        p.innerHTML = "Your cart is empty."
        productsContent.appendChild(p)
        isEmpty = false
    } else if (isEmpty == false) {
        checkoutButton.style.display = 'block';
        productsContent.classList.remove("card-text")
        productsContent.removeChild(document.querySelector("p"))
        isEmpty = true
    }
}

emptyCheck()

// Counter
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const counter = document.getElementById("count");
var count = 1;

plus.addEventListener("click", () => {
    counter.innerHTML = ++count
});

minus.addEventListener("click", () => {
    if(count >= 2) {
        counter.innerHTML = --count
    } else {
        return;
    }
});

// Show/Hide Cart
const cartIcon = document.getElementById("shopping-cart-icon")
const cart = document.getElementById("shopping-cart")

cartIcon.addEventListener("click", () => {
    cart.classList.toggle("display");
})

// Add Product to Cart
const addToCart = document.querySelector("#add-to-cart")
const price = document.querySelector(".price")
const productName = document.querySelector(".product-name")


addToCart.addEventListener("click", () => {
    emptyCheck()

    const total = parseInt(price.innerHTML) * count;
    
    productsContent.insertAdjacentHTML("afterbegin", `
    <div class="cart-product">
        <div>
        <img class="cart-product-img" src="image-product-1.jpg" alt="Product">
        </div>
        <div class="card-product-info">
        <p>${productName.innerHTML}</p>
        <p>${price.innerHTML} x ${count} <span class="total">$${total}</span></p>
        </div>
        <i class="fa-solid fa-trash"></i>
    </div>
    `)

    calcNotifs()
})

// Remove Product from Cart
productsContent.addEventListener('click', function (e) {
    if (e.target.classList.contains('fa-trash')) {
        e.target.parentNode.remove()
        emptyCheck()
        calcNotifs()
    }
});

// Preview selected picture from gallery
const preview = document.querySelector('.preview')
const thumbnails = document.querySelectorAll('.thumbnail')

thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
        thumbnails.forEach((thumbnail) => {
            thumbnail.classList.remove('activeThumb');
        });
        thumbnail.classList.toggle('activeThumb');
        var thumbnailSrc = thumbnail.src.split('-')
        thumbnailSrc.splice(3);
        var newPreview = thumbnailSrc.join('-');
        newPreview += ".jpg";
        preview.src = newPreview
    });
});

// Preview selected picture from carousel
const cPreview = document.querySelector('.cPreview')
const cThumbnails = document.querySelectorAll('.cThumbnail')

cThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
        cThumbnails.forEach((thumbnail) => {
            thumbnail.classList.remove('cActiveThumb');
        });
        thumbnail.classList.toggle('cActiveThumb');
        var thumbnailSrc = thumbnail.src.split('-')
        thumbnailSrc.splice(3);
        var newPreview = thumbnailSrc.join('-');
        newPreview += ".jpg";
        cPreview.src = newPreview
    });
});

// Desktop carousel functionality
const rightDesktopChevron = document.querySelector('.d-right-chevron')
const leftDesktopChevron = document.querySelector('.d-left-chevron')

// Getting gallery preview image number
function getPreviewNumber() {
    var cPreviewNumber = preview.src.split('-').slice(2)
    cPreviewNumber = cPreviewNumber.toString()
    cPreviewNumber = cPreviewNumber.split('.').slice(0,1)
    return cPreviewNumber = parseInt(cPreviewNumber)
}


// Linking the picture gallery with the desktop carousel
const desktopCarousel = document.querySelector('.desktop-carousel');
const overlay = document.querySelector('.overlay');
var carouselOpened = false;

preview.addEventListener('click', () => {
    cPreview.src = `image-product-${getPreviewNumber()}.jpg`;
    cThumbnails.forEach((thumbnail) => {
        thumbnail.classList.remove('cActiveThumb');
    });
    cThumbnails[getPreviewNumber() - 1].classList.toggle('cActiveThumb');
    carouselOpened = true;
    desktopCarousel.style.display = "block";
    overlay.style.display = "block";
})

// Desktop carousel arrows and thumbnails functionality
function getCPreviewNumber() {
    var cPreviewNumber = cPreview.src.split('-').slice(2)
    cPreviewNumber = cPreviewNumber.toString()
    cPreviewNumber = cPreviewNumber.split('.').slice(0,1)
    return cPreviewNumber = parseInt(cPreviewNumber)
}

rightDesktopChevron.addEventListener('click', () => {
    if (getCPreviewNumber() < cThumbnails.length) {
        cPreview.src = `image-product-${getCPreviewNumber() + 1}.jpg`;
    } else {
        cPreview.src = "image-product-1.jpg";
    }
    cThumbnails.forEach((thumbnail) => {
        thumbnail.classList.remove('cActiveThumb');
    });
    cThumbnails[getCPreviewNumber() - 1].classList.toggle('cActiveThumb');

})

leftDesktopChevron.addEventListener('click', () => {
    
    if (getCPreviewNumber() > 1) {
        cPreview.src = `image-product-${getCPreviewNumber() - 1}.jpg`;
    } else {
        cPreview.src = `image-product-${cThumbnails.length}.jpg`;
    }
    cThumbnails.forEach((thumbnail) => {
        thumbnail.classList.remove('cActiveThumb');
    });
    cThumbnails[getCPreviewNumber() - 1].classList.toggle('cActiveThumb');

})

// Close desktop carousel

// Using the overlay
overlay.addEventListener('click', () => {
    desktopCarousel.style.display = "none";
    overlay.style.display = "none";
    carouselOpened = false;
})

//Using the X button
const xButton = document.querySelector('.fa-xmark');

xButton.addEventListener('click', () => {
    desktopCarousel.style.display = "none";
    overlay.style.display = "none";
    carouselOpened = false;
})

// Using Escape
document.addEventListener('keydown', (event) => {
    if(event.code == "Escape" && carouselOpened == true) {
        desktopCarousel.style.display = "none";
        overlay.style.display = "none";
        carouselOpened = false;
    } 
});