//Business Logic

function Pizza(name, size){
  this.name = name;
  this.size = size;
  this.meatToppings = [];
  this.veggieToppins = [];
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



  });
});
