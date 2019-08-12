<template>
<div class="edit">
  <h3>Edit your drink</h3>
  <div class="edit__drink">
    <input type="number" name="price" :value="drink.price">
    <div class="ingredient" v-for="ing in drink.ingredients">
      <input type="text" name="ingredient" :value="ing">
    </div>
    <select>
      <option selected :value="drink.type">{{drink.type}}</option>
      <option v-for="other in others" :value="other">{{other}}</option>
    </select>
  </div>
</div>
</template>

<script>
export default {
  name: 'edit',
  data() {
    return {
      drink: {},
      types: ['milk shake', 'shake', 'coffee'],
      others: []
    }
  },
  methods: {
    updateDrink(id) {
      console.log(`Updating drink ${id}`)
    }
  },
  created() {
    fetch(`http://localhost:1000/api/drinks/${this.$route.params.id}`)
      .then(response => response.json())
      .then(drink => this.drink = drink).then(drink => {
        this.types.forEach(type => {
          if (type != drink.type) {
            this.others.push(type)
          }
        })
      })
  }
}
</script>

<style lang="scss">

</style>
