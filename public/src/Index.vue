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
      <input class="input" type="number" name="price" placeholder="Price">
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
      <input v-for="(ing, i) in ingredients" :key="i" type="text" class="input ingredient" v-model="ingredients[i]" name="ingredient" placeholder="Ingredient">
      <input @keydown.tab.prevent="addIng" v-model="ing" class="input" type="text" name="ingredient" placeholder="Ingredient">
      <p v-if="info" class="alert">{{info}}</p>
      <button @click.prevent="addNewDrink" class="button" type="submit" name="button">Create</button>
      <p v-if="drink">{{drink}}</p>
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
      info: null,
      drink: null
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
        fetch('http://localhost:1000/api/drinks/', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newDrink)
        }).then((response) => response.json()).then((data) => {
          this.drink = 'Created your awesome drink :)'
          document.querySelector('.addNew__form').reset()
          // document.querySelectorAll('.ingredient')
        }).catch(err => this.info = err)
      }
    }
  },
  created() {
    fetch(this.url)
      .then(response => response.json())
      .then(drinks => {
        drinks.forEach(drink => {
          this.drinks.push(drink)
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
        &:focus,
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
        grid-template-columns: repeat(3, 1fr);
        .h1{
          grid-column: 1/4;
        }
    }
}
</style>
