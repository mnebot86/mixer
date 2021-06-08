// const ingredient = `www.thecocktaildb.com/api/json/v1/1/filter.php?i=${userChoice}`
// const instruction = `www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
let userChoice= ''

//Gin Button
const buttonOne = document.querySelector('#gin');
// const gin = buttonOne.value

//Rum button
const buttonTwo = document.querySelector('#rum')
const rum = buttonTwo.value

//Tequila button
const buttonThree = document.querySelector('#tequila')


//Vodka button
const buttonFour = document.querySelector('#vodka')

// console.log('TEST', gin, rum, tequila, vodka)

// First Axios Call for Search by Alcohol 
const getIngredient = async (url) => {
   try{ 
     const response = await axios.get(url)
     const drinks = response.data.drinks;
     drinks.forEach((drink) => {
       const img = document.createElement('img');
       img.src = drink.strDrinkThumb;
       const itemContainer = document.querySelector('.items-container')
       itemContainer.appendChild(img)
       let h2Tag = document.createElement('h2');
       h2Tag.innerText = drink.strDrink;
       itemContainer.appendChild(h2Tag);
     })
     console.log('DATA', drinks);
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

buttonOne.addEventListener('click', getResponse)
buttonTwo.addEventListener('click', getResponse)
buttonThree.addEventListener('click', getResponse)
buttonFour.addEventListener('click', getResponse)

