<template>
<div class="edit">
  <h3>Edit your drink</h3>
  <form class="edit__drink">
    <input type="number" name="price" v-model="drink.price">
    <div class="ingredient">
      <input type="text" name="ingredient" v-model="drink.ingredients">
      <p v-if="info">{{info}}</p>
    </div>
    <select name="select">
      <option :value="drink.type">{{drink.type}}</option>
      <option v-for="other in others" :value="other">{{other}}</option>
    </select>
    <button type="submit" name="Update" @click.prevent="updateDrink(drink._id)">Update</button>
    <p v-if="feedback">{{feedback}}</p>
    <router-link :to="{ name: 'Index'}">Back to index</router-link>
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
      feedback: null
    }
  },
  methods: {
    updateDrink(id) {
      // update price in drink
      this.drink.type = document.querySelector('.edit__drink').select.options[document.querySelector('.edit__drink').select.options.selectedIndex].value
      if (!this.drink.ingredients) {
        this.info = 'Input must contain at least one ingredient'
      } else {
        this.info = null
        fetch(`http://localhost:1000/api/drinks/${id}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.drink)
        }).then((response) => response.json()).then((data) => {
          this.feedback = `Updated your drink`
        }).catch(err => this.feedback = error);
      }
      // change to json and send
      // redirect do index
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

</style>
