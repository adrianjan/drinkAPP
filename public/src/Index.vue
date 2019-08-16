<template>
<div class="index">
  <section class="info">
    <h1 class="h1">Make your awesome drink :)</h1>
    <h3>You can do cool stuff like:</h3>
    <ul class="ul">
      <li class="list__item">Creating your drink</li>
      <li class="list__item">Reading drinks from database</li>
      <li class="list__item">Updating your refreshment</li>
      <li class="list__item">Deleting</li>
    </ul>
  </section>
  <section class="drinks">
    <h1 class="h1">Your current drinks:</h1>
    <article v-for="drink in drinks" class="drink">
      <span class="drink__price">{{drink.price}}$</span>
      <ul class="ul">
        <li v-for="ing in drink.ingredients" class="drink__ingredient">
          {{ing}}
        </li>
      </ul>
      <span class="drink__type">{{drink.type}}</span>
      <button v-on:click="deleteDrink(drink._id)" class="drink__button drink__button--del" type="button" name="button">Delete</button>
      <router-link class="drink__button drink__button--upd" :to="{ name: 'EditDrink', params: {id: drink._id} }">Edit</router-link>
    </article>
  </section>
  <section class="addNew">
    <h1 class="h1">New awesome drink...</h1>
    <form class="addNew__form">
      <p>Price:</p>
      <input class="input" type="number" name="price" placeholder="20">
      <p>Type:</p>
      <div>
        <input class="input input--radio" type="radio" name="type" id="coffe" value="Coffee" checked>
        <label class="label" for="coffe">Coffee</label>
      </div>
      <div>
        <input class="input input--radio" type="radio" name="type" id="shake" value="Shake">
        <label class="label" for="shake">Shake</label>
      </div>
      <div>
        <input class="input input--radio" type="radio" name="type" id="milkShake" value="Milk shake">
        <label class="label" for="milkShake">Milk shake</label>
      </div>
      <p>Ingredients: <span class="small">(tab for new)</span></p>
      <div v-for="(ing, i) in ingredients" :key="i">
        <input type="text" class="input" v-model="ingredients[i]" name="ingredient" placeholder="Ingredient">
      </div>
      <input @keydown.tab.prevent="addIng" v-model="ing" class="input" type="text" name="ingredient" placeholder="Ingredient">
      <p v-if="info" class="alert">{{info}}</p>
      <button @click.prevent="addNewDrink" class="button" type="submit" name="button">Create</button>
    </form>
  </section>
</div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      url: 'http://localhost:1000/api/drinks/',
      drinks: [],
      newDrink: {},
      ing: null,
      ingredients: [],
      info: null
    }
  },
  methods: {
    deleteDrink(id) {
      // delete from DOM
      this.drinks = this.drinks.filter(drink => drink._id !== id);
      // delete from DB
      return fetch(`${this.url}${id}`, {
          method: 'delete'
        })
        .then(response => console.log(response.json()))
    },
    addIng() {
      if (this.ing) {
        this.ingredients.push(this.ing)
        this.ing = null
        this.info = null
      } else {
        this.info = 'Enter a value...'
      }
    },
    addNewDrink() {
      this.newDrink = {
        type: Array.from(document.getElementsByName("type")).find(r => r.checked).value,
        price: document.querySelector('.addNew__form').price.value,
        ingredients: this.ingredients
      }
      if (!this.newDrink.price) {
        this.info = 'Price is empty'
      } else if (!this.newDrink.ingredients[0]) {
        this.info = 'At least one ingredient'
      } else {
        console.log('All good');
        fetch('http://localhost:1000/api/drinks/', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newDrink)
        }).then((response) => response.json()).then((data) => {
          console.log('Created Drink:', data);
        }).catch(err => console.log(err));
      }

    }
  },
  created() {
    fetch(this.url)
      .then(response => response.json())
      .then(drinks => {
        drinks.forEach(drink => {
          this.drinks.push(drink);
        })
      })
  }
}
</script>

<style lang="scss">
$metal: #292F36;
$mint: #F7FFF7;
$turq: #4ECDC4;
$red: #FF6B6B;

#app {
    background: $metal;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $mint;
    display: flex;
    justify-content: center;
    align-items: space-around;
    width: 100%;
    min-height: 100vh;
}

.h1 {
    font-size: 26px;
}

.alert{
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
}

.info {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    z-index: 1;
    overflow: hidden;
    color: $metal;
    &::before {
        z-index: -1;
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: $mint;
        border-radius: 0 0 50% 50%/ 0 0 100% 100%;
        transform: scaleX(2.2);
    }
}

.list__item {
    text-align: center;
}

.drinks {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    justify-items: center;
    grid-row-gap: 20px;

    .h1 {
        margin-top: 40px;
    }
}

.drink {
    position: relative;
    width: 80%;
    background: $mint;
    padding: 30px;
    display: flex;
    flex-direction: column;
    border-radius: 25px 5px 5px 25px;
    color: $metal;

    &__ingredient {
        background: $metal;
        display: inline-block;
        width: 30%;
        text-align: center;
        padding: 10px 0;
        border-radius: 20px;
        margin: 10px;
        color: $mint;
        text-transform: capitalize;
    }

    &__price {
        font-size: 23px;
        font-weight: bold;
        align-self: center;
        color: $red;
    }

    &__type {
        text-transform: uppercase;
        letter-spacing: 0.06em;
        position: relative;
        align-self: center;
        z-index: 1;
        &::before {
            position: absolute;
            content: '';
            bottom: -3px;
            left: 50%;
            width: 100%;
            height: 4px;
            z-index: -1;
            background: $turq;
            transform: translateX(-50%);
        }
    }

    &__button {
        position: absolute;
        display: block;
        box-shadow: none;
        border: 2px solid $metal;
        color: $metal;
        cursor: pointer;
        transition: color 0.3s, border 0.2s ease-in, transform 0.3s ease-in-out;
        &:hover {
            color: $mint;
            transform: scale(1.1);
        }
        &--del {
            bottom: 5px;
            right: 10px;
            padding: 5px 20px;
            background: $red;
            &:hover {
                border-color: $red;
            }
        }

        &--upd {
            bottom: 48px;
            right: 10px;
            padding: 5px 29px;
            text-decoration: none;
            background: $turq;
            &:hover {
                border-color: $turq;
            }
        }
    }
}

.addNew {
    width: 100%;
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 70%;
        height: 100%;
        z-index: -1;
        background: $red;
        clip-path: ellipse(27% 51% at 68% 53%);
        transform: scale(3);
    }

    &__form {
        width: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}

.input {
    width: 60%;
    max-width: 400px;
    border: 2px solid $turq;
    padding: 5px;
    background: transparent;
    color: $mint;
    transition: border 0.3s ease-in;
    margin: 4px auto;
    &::placeholder {
        color: $mint;
    }

    &:focus {
        border-color: $mint;
    }

    &--radio {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        display: inline-block;
        position: relative;
        background: $mint;
        font-weight: bold;
        top: 10px;
        height: 25px;
        width: 25px;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        margin-right: 3px;
        outline: none;
        &:hover {
            background: $red;
        }
        &:checked::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            width: 60%;
            height: 60%;
            background: $turq;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }
    }
}

.label {
    cursor: pointer;
}

.button {
    display: block;
    margin: 20px auto;
    box-shadow: none;
    border: none;
    padding: 10px 23px;
    font-size: 18px;
    cursor: pointer;
    position: relative;
    color: $metal;
    font-weight: bold;
    background: $mint;
    z-index: 1;
    overflow: hidden;
    &::before {
        position: absolute;
        content: '';
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: $turq;
        top: 0;
        right: 0;
        z-index: -1;
        transform: translate(50%, 50%);
        transition: transform 0.1s cubic-bezier(.17,.67,1,.48);
    }
    &:hover {
        &::before {
            transform: scale(10, 3);
        }
        color: $mint;
    }
}

.small {
    font-size: 14px;
    font-weight: bold;
}

@media screen and (min-width: 768px) {
    .h1 {
        font-size: 32px;
    }
    .info {
        &::before {
            transform: scaleX(1.2);
        }
    }

    .addNew {
        &::after {
            background: $mint;
            transform: scaleX(3);
            width: 50%;
        }
    }
}

@media screen and (min-width: 1024px) {
    .drinks {
        grid-template-columns: 1fr 1fr;
        grid-row-gap: 30px;
        .h1 {
            grid-row: 1/2;
            grid-column: 1/3;
        }
    }
    .button {
        font-size: 23px;
        padding: 15px 40px;
        &::before {
            transform: translate(50%, 80%);
        }
        &:hover {
            &::before {
                transform: scale(18, 5);
            }
        }
    }
}

@media screen and (min-width: 1400px) {
    .drinks {
        grid-template-columns: 1fr 1fr 1fr;
        .h1 {
            grid-column: 1/6;
        }
    }
}
</style>
