// Seach Logic
function search(){
      const form = document.querySelector('.search-form');
      const searchInput = document.querySelector('.search-input');
      
      form.addEventListener('submit', (e) => {
            e.preventDefault();

            let searchValue = searchInput.value;

            searchRecipes(searchValue);

            clear(searchInput);
      })   
}
search();
function clear(search){
      search.value = '';
}

function creatCards(image, name, link, calories, health){
      const container = document.querySelector('.main-container');

      const card = `
      <div class="card">
            <div class="card-img" style="background-image:url(${image});"></div>
                  <div class="card-name-btn-container">
                  <div class="card-name-container">
                        <h1 class="card-name">
                              ${name}
                        </h1>
                  </div>
                  <div class="btn-container">
                        <a href="${link}" target="_blank">
                              <button class="ingredients-btn">
                                    Recipe
                              </button>
                        </a>
                  </div>
            </div>
            <br>
            <div class="card-info">
                  <p>
                        Calories: ${calories}
                  </p>
                  <br>
                  <p>
                        Health-Label: ${health}
                  </p>
            </div>
      </div>
      `;

      container.innerHTML += card;
}

function searchRecipes (search){
      let APP_ID = 'eeab0073';
      let API_KEY = 'ea82b59d97cc29c1cb4715cafd4913c0';


      fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${search}&to=30`, {
	"method": "GET"
      })
      .then(response => response.json()).then(data => {
            let items = data.hits;

            console.log(data.to);
            items.forEach(e => {
                  let image = e.recipe.image;
                  let name = e.recipe.label;
                  let calories = e.recipe.calories;
                  let health = e.recipe.healthLabels;
                  let link = e.recipe.url;

                  creatCards(image, name, link, calories, health);
            })
      
      }).catch(err => {
	console.error(err);
      });
};


