

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
      const itemContainer = document.querySelector('.items-container')
      let pTag = document.createElement('p');
      pTag.innerText = drink.strDrink;
      const drinkDiv = document.createElement('div');
      drinkDiv.classList.add('shrink')
      drinkDiv.value = drink.idDrink
      drinkDiv.classList.add('drinks')
      drinkDiv.append(img, pTag);
      itemContainer.appendChild(drinkDiv);
    })
    console.log('DATA', drinks);
    drinkValues()
  }catch (error){
    console.log(error);
  }
}

//Get ID number for each drink and calls back to getIngredient
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

// DriveValues lets me console.log the array for drinks ID
const drinkValues = () => {
  document.querySelectorAll('.drinks').forEach((drink) => {
    drink.addEventListener('click', async (e) => {
      const getInstruction =  await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.value}`);
      const instructionList = getInstruction.data.drinks[0]
      console.log('Instruction',instructionList)
      
      removeDrink()
      
      //Creating a new div to hold img, ul, p
      // Created a ptag for the instruction and Image tag for the photo for instruction card
      const instructionContainer = document.querySelector('.ingredients-container');
      const recipeDiv = document.createElement('div');
      
      
      const box = document.createElement('div')
      box.classList.add('box')
      instructionContainer.appendChild(box)

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
  
  //Clear last pick drinks from the item divs
  function removeDrink(){
    const clearDrink = document.querySelector('.ingredients-container')
    while(clearDrink.lastChild){
      clearDrink.removeChild(clearDrink.lastChild);
    }
  }
}

//Clears last picks drink card
function removeLiquor(){
  const clearLiquor = document.querySelector('.items-container')
  while(clearLiquor.lastChild){
    clearLiquor.removeChild(clearLiquor.lastChild);
  }
}

// const hideDiv = () => {
  //   const ingredientsHide = document.querySelector('ingredients-container');
  //   const test = ingredientsHide.contains();
  //   console.log('test', ingredientsHide);
  //   if(ingredientsHide.contains()){
    //     const itemHide = document.querySelector('.items-container')
    //     itemHide.classList.add('hidden')
    //   } 
    // }
    // hideDiv()

// window.addEventListener('mouseup', function(event){
//   const ingredientBox = document.querySelectorAll('ingredients-container');
//   if(event.target != ingredientBox && event.target.parentNode != ingredientBox){
//     ingredientBox.classList.toggle('hidden');
//   }
// })

