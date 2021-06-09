// const ingredient = `www.thecocktaildb.com/api/json/v1/1/filter.php?i=${userChoice}`
// const instruction = `www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`


//Gin Button
const buttonOne = document.querySelector('#gin');


//Rum button
const buttonTwo = document.querySelector('#rum')


//Tequila button
const buttonThree = document.querySelector('#tequila')


//Vodka button
const buttonFour = document.querySelector('#vodka')



// First Axios Call for Search by Alcohol 
// Request Drinks Img and Name
// Appends Both to items-container
const getIngredient = async (url) => {
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

//Get the value of each button on click 
function getResponse(e) {
  const drink = e.target.value;
  const ingredient = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drink}`
  // return userChoice = drink
  console.log(ingredient)
  getIngredient(ingredient);

}
// Click event listener on buttons
buttonOne.addEventListener('click', getResponse)
buttonTwo.addEventListener('click', getResponse)
buttonThree.addEventListener('click', getResponse)
buttonFour.addEventListener('click', getResponse)

// Created an event listener
const drinkValues = () => {
  document.querySelectorAll('.drinks').forEach((drink) => {
    drink.addEventListener('click', async (e) => {
    const getInstruction =  await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.value}`);
    console.log('Instruction',getInstruction)

    //Creating a new div to hold img, ul, p
    const instructionContainer = document.querySelector('.ingrdients-container');
    const recipeDiv = document.createElement('div');
    const imageDrink = document.createElement('img');
    imageDrink.src = drink.strDrinkThumb;
    const ingredientList = document.createElement('ul');
    forEach(ingredient => {
    const ingredientItem = document.createElement('li')
    })
    const pTag = document.createElement('p');
    pTag.innerText = drink.strInstructions
    recipeDiv.append(imageDrink, ingredientList, pTag);
    instructionContainer.appendChild(recipeDiv);


    })
  })

}