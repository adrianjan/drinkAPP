<template>
<div class="edit">
  <h3>Edit your drink</h3>
  <form class="edit__drink">
    <input class="input" type="number" name="price" v-model="drink.price">
    <input class="input" type="text" name="ingredient" :value="drink.ingredients">
    <p v-if="info">{{info}}</p>
    <select name="select" class="select">
      <option :value="drink.type">{{drink.type}}</option>
      <option v-for="other in others" :value="other">{{other}}</option>
    </select>
    <button class="button" type="submit" name="Update" @click.prevent="updateDrink(drink._id)">Update</button>
    <p v-if="feedback">{{feedback}}</p>
    <router-link :to="{ name: 'Index'}" class="link">Back to index</router-link>
  </form>
</div>
</template>

<script>
export default {
  name: 'edit',
  data() {
    return {
      drink: {},
      types: ['Milk shake', 'Shake', 'Coffee'],
      others: [],
      info: null,
      feedback: null,
      form: document.querySelector('.edit__drink')
    }
  },
  methods: {
    updateDrink(id) {
      // update price in drink
      this.drink.type = document.querySelector('.edit__drink').select.options[document.querySelector('.edit__drink').select.options.selectedIndex].value
      if (!document.querySelector('.edit__drink').ingredient.value) {
        this.info = 'Input must contain at least one ingredient'
      } else {
        this.info = null
        let sth = this.form.ingredient.value.split(',')
        this.drink.ingredients = sth
        console.log(this.drink)
        fetch(`http://localhost:1000/api/drinks/${id}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.drink)
        }).then((response) => response.json()).then((data) => {
          this.feedback = `Updated your drink`
        }).catch(err => this.feedback = error)
      }
    }
  },
  created() {
    fetch(`http://localhost:1000/api/drinks/${this.$route.params.id}`)
      .then(response => response.json())
      .then(drink => this.drink = drink).then(drink => {
        this.types.forEach(type => {
          if (type.toLowerCase() !== drink.type.toLowerCase()) {
            this.others.push(type)
          }
        })
      })
  }
}
</script>

<style lang="scss">
.edit {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    &__drink {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>
