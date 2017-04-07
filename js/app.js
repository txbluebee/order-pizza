/*************
Business Logic
**************/

function Pizza(name, size, phone, date, pickuptime, deliverytime){
  this.name = name;
  this.size = size;
  this.phone = phone;
  this.date = date;
  this.pickuptime = pickuptime;
  this.deliverytime = deliverytime;
  this.addresses = [];
  this.finalCost = 0;
  this.meatToppings = [];
  this.veggieToppings = [];
}

function Address(street, city, state, zipcode) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.zipcode = zipcode;
}

//calculate total pizza cost
Pizza.prototype.totalCost = function(){
    //Size
    if (this.size === "large") {
      this.finalCost += 12;
    } else if (this.size === "medium") {
      this.finalCost += 10;
    } else if (this.size === "small") {
      this.finalCost += 8;
    }
    //Each meat toppings cost $2 extra
    for (var i=0; i< this.meatToppings.length; i++) {
      this.finalCost += 2;
    }
    //Each veggie toppings cost $1 extra
    for (var i=0; i< this.veggieToppings.length; i++) {
      this.finalCost += 1;
    }
}

//concate street, city , state and zip code

Address.prototype.fullAddress = function(){
  return this.street + " ," + this.city + ", " + this.state + " " + this.zipcode;
}

/*************
UI Logic
**************/

$(document).ready(function(){

  //Click pickup order button
  $("button#pickup").click(function(){
    $("#order-type").hide();
    $("#main-page").show();
    $(".delivery-order").hide();
  });

  $("button#delivery").click(function(){
    $("#order-type").hide();
    $("#main-page").show();
    $(".pickup-order").hide();
  });


  $("form#pizza-order").submit(function(event){
    event.preventDefault();

    $("#orderlist")
    //create variables to store user input and store the data in new pizza object
    var nameInput = $("input#name").val();
    var sizeInput = $("#size").val();
    var phoneInput = $("#phone").val();
    var dateInput = $("#date").val();
    var pickupTimeInput = $("#p-time").val();
    var deliveryTimeInput = $("#d-time").val();
    var newPizzaOrder = new Pizza(nameInput, sizeInput, phoneInput, dateInput, pickupTimeInput, deliveryTimeInput);

    //put user address info to Pizza object
    var streetInput = $("#street").val();
    var cityInput = $("#city").val();
    var stateInput = $("#state").val();
    var zipCodeInput = $("#zipcode").val();
    var addressInput = new Address(streetInput, cityInput, stateInput, zipCodeInput);

    newPizzaOrder.addresses.push(addressInput);
    console.log(newPizzaOrder.addresses);

    $("input:checkbox[name=meat-topping]:checked").each(function(){
      var meatsInput = $(this).val();
      newPizzaOrder.meatToppings.push(meatsInput);
    });

    $("input:checkbox[name=veggie-topping]:checked").each(function(){
      var veggiesInput = $(this).val();
      newPizzaOrder.veggieToppings.push(veggiesInput);
    });

    newPizzaOrder.totalCost();

    //Order list
    $("#orderlist ul").append("<li><span class='order-list'>" + newPizzaOrder.name + "</span></li>");

    //Order details
    $(".order-list").last().click(function() {
      $(".order-detail").show();
      $(".customer-name").text(newPizzaOrder.name);
      $(".p-size").text(newPizzaOrder.size);
      $(".p-phone").text(newPizzaOrder.phone);
      $(".d-time").text(newPizzaOrder.deliverytime);
      $(".p-time").text(newPizzaOrder.pickuptime);
      newPizzaOrder.addresses.forEach(function(address){
        $(".p-address").text(address.fullAddress());
      });
      $(".p-toppings").text("");
      newPizzaOrder.meatToppings.forEach(function(meattopping) {
        $(".p-toppings").append("<li>" + meattopping + "</li>");
      });
      newPizzaOrder.veggieToppings.forEach(function(meattopping) {
        $(".p-toppings").append("<li>" + meattopping + "</li>");
      });
      $(".p-price").text(newPizzaOrder.finalCost);
    });





    $("input#name").val("");
    $("input#phone").val("");
    $("input#date").val("");
    $("input#p-time").val("");
    $("input#d-time").val("");
    $("input#street").val("");
    $("input#city").val("");
    $("input#state").val("");
    $("input#zipcode").val("");
    $('input[type=checkbox]').each(function() {
      this.checked = false;
    });
  });
});
