if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");

  for (i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (i = 0; i < addToCartButtons.length; i++) {
    var buttons = addToCartButtons[i];
    buttons.addEventListener("click", addToCartClicked);
  }
}

function addToCartClicked(event) {
  var button = event.target;
  var shopitem = button.parentElement.parentElement;
  var title = shopitem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopitem.getElementsByClassName("shop-item-price")[0].innerText;
  additemtocart(title, price);
  updateCartTotal();
}

function additemtocart(title, price) {
  var cartRow = document.createElement("div");
  // cartRow.classList.add("cart-row");
  var cartcontainer = document.getElementsByClassName("cart-container")[0];
  var cartitemnames = document.getElementsByClassName("cart-item-title");
  for (i = 0; i < cartitemnames.length; i++) {
    if (cartitemnames[i].innerText == title) {
      alert("item already in cart");
      return;
    }
  }
  var cartrowcontents = `
<div class="cart-row">
<div class="cart-item cart-column">
<span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
<input type="number" value="1" class="cart-quantity-input" />
<button class="btn btn-danger" type="button">Remove</button>
</div>`;
  cartRow.innerHTML = cartrowcontents;
  cartcontainer.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("click", quantityChanged);
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function removeCartItem() {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-container")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];

    var price = parseFloat(priceElement.innerText.replace("rs", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  document.getElementsByClassName("cart-total-price")[0].innerText =
    total + "Rs";
}
