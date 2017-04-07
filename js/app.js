//Business Logic

function Pizza(name, size){
  this.name = name;
  this.size = size;
  this.finalCost = 0;
  this.meatToppings = [];
  this.veggieToppins = [];
}

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

//UI Logic

$(document).ready(function(){
  $("form#pizza-order").submit(function(event){
    event.preventDefault();

    //create variables to store user input and store the data in new pizza object
    var nameInput = $("input#name").val();
    var sizeInput = $("#size").val();
    var newPizzaOrder = new Pizza(nameInput, sizeInput);

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
  });
});
