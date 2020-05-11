const searchInput = document.querySelector("#demo-2");
const searchBtn = document.querySelector("#search");
const row = document.querySelector(".others");
const drop = document.querySelector(".drop");
const rowRecipe = document.querySelector("#recipe");
const recipeContainer = document.querySelector("#recipeContainer");
const box = document.querySelector("#box");
// make page scroll down when you click searchBtn, function called in Event Listener

class searchCocktail {
  constructor(query) {
    this.query = query;
    this.api_ing = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.query}`;
    this.api_name = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.query}`;
  }

  searchByIngredient(myAPI) {
    fetch(myAPI)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(this.api_ing);
        let cocktail = data.drinks;
        cocktail.forEach((drink) => {
          this.cocktailUI(drink);
        });
        document.querySelectorAll(".mainCard").forEach((card) => {
          card.addEventListener("click", function (e) {
            //console.log('Hello Button')
            //console.log(card.childNodes[1].childNodes[2].nextSibling.value);
            let value = card.childNodes[1].childNodes[2].nextSibling.value;
            let newRecipe = new getRecipe(value);
            newRecipe.search(newRecipe.api);
            e.preventDefault();
            box.style.display = "flex";
            setTimeout(function () {
              document.getElementById("recipe").scrollIntoView();
            }, 200);
          });
        });
      });
  }

  searchByName(myAPI) {
    fetch(myAPI)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(this.api_name);
        let cocktail2 = data.drinks;
        cocktail2.forEach((drink) => {
          this.cocktailUI(drink);
        });
        document.querySelectorAll(".mainCard").forEach((card) => {
          card.addEventListener("click", function (e) {
            //console.log('Hello Button')

            //console.log(card.childNodes[1].childNodes[2].nextSibling.value);
            let value = card.childNodes[1].childNodes[2].nextSibling.value;
            let newRecipe = new getRecipe(value);
            newRecipe.search(newRecipe.api);
            box.style.display = "flex";
            e.preventDefault();
            setTimeout(function () {
              document.getElementById("recipe").scrollIntoView();
            }, 200);
          });
        });
      });
  }

  cocktailUI(obj) {
    row.innerHTML += `
    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3">
    <div class="main">
    
        <div class="card mb-5 mainCard">
            <div class='card-body'>
            <a href=""><img src="${obj.strDrinkThumb}" class="img-fluid cardImg" alt="${obj.strDrink}"/></a>
            <button type="button" class="btn btn-light btn-block drinkBtn" value="${obj.idDrink}">${obj.strDrink}</button>
            </div>
            <div class="overlay"> 
            <div class="text">See recipe</div>
            </div>
            
          </div>
    </div> </div>`;
  }
}

class getRecipe {
  constructor(id) {
    this.id = id;
    this.api = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.id}`;
  }
  search(myAPI) {
    fetch(myAPI)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let recipe = data.drinks;
        recipe.forEach((drink) => {
          this.recipeUI(drink);
        });
      });
  }

  recipeUI(obj) {
    rowRecipe.innerHTML = "";
    // recipeContainer.innerHTML=''
    rowRecipe.innerHTML += `<div class ="sideCard col-lg-4 col-md-6 col-sm-12">
            <div class="polaroid">
                <img class="card-img-top" src="${obj.strDrinkThumb}" alt="">
             </div>
             <br>
             <a href="#top" id="searchAgain" class="btn btn-secondary btn-lg" role="button">Shake Again</a>

            </div>
            
            <div class="col lg-8">
            <div class="text-left">
            <div class="bottomCard transbox">
            <h3 class=" title3">${obj.strDrink}</h3>
            <h4 class="title4" >Ingredients:</h4>
            <div class="listIngredients">
            <p id="obj1" class="ingredients"><span>${obj.strMeasure1 === null ? '' : obj.strMeasure1}</span>${obj.strIngredient1}</p>
            <p id="obj2" class="ingredients"><span>${obj.strMeasure2 === null ? '' : obj.strMeasure2}</span>${obj.strIngredient2}</p>
            <p id="obj3" class="ingredients"><span>${obj.strMeasure3 === null ? '' : obj.strMeasure3}</span>${obj.strIngredient3}</p>
            <p id="obj4" class="ingredients"><span>${obj.strMeasure4 === null ? '' : obj.strMeasure4}</span>${obj.strIngredient4}</p>
            <p id="obj5" class="ingredients"><span>${obj.strMeasure5 === null ? '' : obj.strMeasure5}</span>${obj.strIngredient5}</p>
            <p id="obj6" class="ingredients"><span>${obj.strMeasure6 === null ? '' : obj.strMeasure6}</span>${obj.strIngredient6}</p>
            <p id="obj7" class="ingredients"><span>${obj.strMeasure7 === null ? '' : obj.strMeasure7}</span>${obj.strIngredient7}</p>
            <p id="obj8" class="ingredients"><span>${obj.strMeasure8 === null ? '' : obj.strMeasure8}</span>${obj.strIngredient8}</p>
            <p id="obj9" class="ingredients"><span>${obj.strMeasure9 === null ? '' : obj.strMeasure9}</span>${obj.strIngredient9}</p>
            <p id="obj10" class="ingredients"><span>${obj.strMeasure10 === null ? '' : obj.strMeasure10}</span>${obj.strIngredient10}</p>

            </div>
            <h4 class="title4"">Instructions:</h4>
                <p class="instructions" style="text-align:center;">${obj.strInstructions}</p>
            </div>
            </div>
            </div>
            `;
    recipeContainer.style.border = "8px solid  #e7a101";
    recipeContainer.style.backgroundImage = "url('cocktail5.jpeg')";

    if (obj.strIngredient1 === null || obj.strIngredient1 === "") {
      const obj1 = document.getElementById("obj1");
      obj1.remove();
    }
    if (obj.strIngredient2 === null || obj.strIngredient2 === "") {
      const obj2 = document.getElementById("obj2");
      obj2.remove();
    }
    if (obj.strIngredient3 === null || obj.strIngredient3 === "") {
      const obj3 = document.getElementById("obj3");
      obj3.remove();
    }
    if (obj.strIngredient4 === null || obj.strIngredient4 === "") {
      const obj4 = document.getElementById("obj4");
      obj4.remove();
    }
    if (obj.strIngredient5 === null || obj.strIngredient5 === "") {
      const obj5 = document.getElementById("obj5");
      obj5.remove();
    }
    if (obj.strIngredient6 === null || obj.strIngredient6 === "") {
      const obj6 = document.getElementById("obj6");
      obj6.remove();
    }
    if (obj.strIngredient7 === null || obj.strIngredient7 === "") {
      const obj7 = document.getElementById("obj7");
      obj7.remove();
    }
    if (obj.strIngredient8 === null || obj.strIngredient8 === "") {
      const obj8 = document.getElementById("obj8");
      obj8.remove();
    }
    if (obj.strIngredient9 === null || obj.strIngredient9 === "") {
      const obj9 = document.getElementById("obj9");
      obj9.remove();
    }
    if (obj.strIngredient10 === null || obj.strIngredient10 === "") {
      const obj10 = document.getElementById("obj10");
      obj10.remove();
    }
  }
}

searchBtn.addEventListener("click", (e) => {
  setTimeout(function () {
    document.getElementById("results").scrollIntoView();
  }, 200);

  row.innerHTML = "";
  let cocktailSearch = new searchCocktail(searchInput.value);
  let dropChoice = drop.value;
  console.log(dropChoice);
  //als drop down ingredient is
  if (dropChoice === "Ingredient") {
    cocktailSearch.searchByIngredient(cocktailSearch.api_ing);
  }
  if (dropChoice === "Cocktail Name") {
    cocktailSearch.searchByName(cocktailSearch.api_name);
  }
  console.log(cocktailSearch);
  if (rowRecipe.children.length != 0) {
    //const box = document.querySelector('#box')
    box.style.display = "none";
  }

  e.preventDefault();
});
