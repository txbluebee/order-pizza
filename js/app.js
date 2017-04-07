//Business Logic

function Pizza(name, size, phone, date, time){
  this.name = name;
  this.size = size;
  this.telephone = phone;
  this.date = date;
  this.time = time;
  this.address = [];
  this.finalCost = 0;
  this.meatToppings = [];
  this.veggieToppins = [];
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
    for (var i=0; i< this.veggieToppins.length; i++) {
      this.finalCost += 1;
    }
}

//concate street, city , state and zip code

Address.prototype.fullAddress = function(){
  return "<p>" + this.street + " ,</p><p>" + this.city + ", " + this.state + " " + this.zipcode + "</p>";
}

//UI Logic

$(document).ready(function(){
  $("form#pizza-order").submit(function(event){
    event.preventDefault();

    //create variables to store user input and store the data in new pizza object
    var nameInput = $("input#name").val();
    var sizeInput = $("#size").val();
    var phoneInput = $("#phone").val();
    var dateInput = $("#date").val();
    var timeInput = $("#time").val();
    var newPizzaOrder = new Pizza(nameInput, sizeInput, phoneInput, dateInput, timeInput);

    //put user address info to Pizza object
    var streetInput = $("#street").val();
    var cityInput = $("#city").val();
    var stateInput = $("#state").val();
    var zipCodeInput = $("#zipcode").val();
    var addressInput = new Address(streetInput, cityInput, stateInput, zipCodeInput);

    newPizzaOrder.address.push(addressInput);
    console.log(newPizzaOrder.address);

    $("input:checkbox[name=meat-topping]:checked").each(function(){
      var meatsInput = $(this).val();
      newPizzaOrder.meatToppings.push(meatsInput);
    });

    $("input:checkbox[name=veggie-topping]:checked").each(function(){
      var veggiesInput = $(this).val();
      newPizzaOrder.veggieToppins.push(veggiesInput);
    });

    //Order details
    $(".customer-name").text(newPizzaOrder.name);
    $(".p-size").text(newPizzaOrder.size);

    newPizzaOrder.meatToppings.forEach(function(meattopping) {
      $(".p-toppings").append("<li>" + meattopping + "</li>");
    });

    newPizzaOrder.veggieToppins.forEach(function(veggietopping) {
      $(".p-toppings").append("<li>" + veggietopping + "</li>");
    });

    newPizzaOrder.totalCost();
    $(".p-price").text(newPizzaOrder.finalCost);

    $("input#name").val("");
    $("#size").val("");
    $('input[type=checkbox]').each(function() {
        this.checked = false;
    });
  });
});
