

//Gin Button
const buttonOne = document.querySelector('#gin');
//Rum button
const buttonTwo = document.querySelector('#rum')
//Tequila button
const buttonThree = document.querySelector('#tequila')
//Vodka button
const buttonFour = document.querySelector('#vodka')

// First Axios Call for Search by Alcohol 
// Drink Cards are Created With Name and Photo
// Cards ID where append to each card
const getIngredient = async (url) => {
  removeLiquor()
  try{ 
    const response = await axios.get(url)
    const drinks = response.data.drinks;
    
    drinks.forEach((drink) => {
      const img = document.createElement('img');
      img.src = drink.strDrinkThumb;
      let pTag = document.createElement('p');
      pTag.innerText = drink.strDrink;
      const drinkDiv = document.createElement('div');
      const itemContainer = document.querySelector('.items-container')
      drinkDiv.append(img, pTag);
      //Appends drinks ID to there cards
      drinkDiv.value = drink.idDrink
      itemContainer.appendChild(drinkDiv);
      //Css container to style the item cards
      drinkDiv.classList.add('drinks')
      drinkDiv.classList.add('shrink')
    })
    console.log('DATA', drinks);
    drinkValues()
  }catch (error){
    console.log(error);
  }
}

//Listen for the button click and request drink list of the button value 
function getResponse(e) {
  const drink = e.target.value;
  const ingredient = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drink}`
  console.log(ingredient)
  getIngredient(ingredient);
  
}
// Click event listener on buttons
buttonOne.addEventListener('click', getResponse)
buttonTwo.addEventListener('click', getResponse)
buttonThree.addEventListener('click', getResponse)
buttonFour.addEventListener('click', getResponse)

// DrinksValues lets me console.log the array for drinks ID
const drinkValues = () => {
  document.querySelectorAll('.drinks').forEach((drink) => {
    drink.addEventListener('click', async (e) => {
      const getInstruction =  await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.value}`);
      const instructionList = getInstruction.data.drinks[0]
      console.log('Instruction',instructionList)
      
      removeDrink()
      
      
      // creates my drink cards with img, list of ingredients and instruction and appends to ingredients-container
      const instructionContainer = document.querySelector('.ingredients-container');
      const recipeDiv = document.createElement('div');
      recipeDiv.classList.add('recipe-container')
       const textDiv = document.createElement('div')
      textDiv.classList.add("text");
      const imageDrink = document.createElement('img');
      imageDrink.src = instructionList.strDrinkThumb;
      const ingredientList = document.createElement('ul');
      const pTag = document.createElement('p');
      pTag.innerText = instructionList.strInstructions;
      console.log(ingredientList);
      recipeDiv.appendChild(imageDrink);
      textDiv.append(ingredientList ,pTag);
      instructionContainer.appendChild(recipeDiv);
      instructionContainer.appendChild(textDiv)
      
      //Gets each ingredient for each drink
      const ingredients = Object.entries(instructionList).filter((entry) => {
        return entry[0].includes('strIngredient') && entry[1]
      })
      ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement('li');
        ingredientItem.innerText = ingredient[1];
        ingredientList.appendChild(ingredientItem);
      })
      
    })
  })
  
  //Clear last child from ingredient-container (drink cards)
  function removeDrink(){
    const clearDrink = document.querySelector('.ingredients-container')
    while(clearDrink.lastChild){
      clearDrink.removeChild(clearDrink.lastChild);
    }
  }
}

//Clears last child with items container.
function removeLiquor(){
  const clearLiquor = document.querySelector('.items-container')
  while(clearLiquor.lastChild){
    clearLiquor.removeChild(clearLiquor.lastChild);
  }
}



