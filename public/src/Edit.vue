<template>
<div class="edit">
  <h3>Edit your drink</h3>
  <form class="edit__drink">
    <input type="number" name="price" :value="drink.price">
    <div class="ingredient" v-for="ing in drink.ingredients">
      <input type="text" name="ingredient" :value="ing">
    </div>
    <select name="select">
      <!-- <option :value="drink.type">{{drink.type}}</option> -->
      <option v-for="other in others" :value="other">{{other}}</option>
    </select>
    <button type="submit" name="Update" @click.prevent="updateDrink(drink._id)">Update</button>
  </form>
</div>
</template>

<script>
export default {
  name: 'edit',
  data() {
    return {
      drink: {},
      types: ['milk shake', 'shake', 'coffee'],
      others: [],
      form: document.querySelector('.edit__drink')
    }
  },
  methods: {
    updateDrink(id) {
      console.log(`Updating drink ${id}`)
      // get all data from inputs
      // console.log(this.form.select.options[this.form.select.options.selectedIndex].textContent)
      // this.drink.price = this.form.price.value
      console.log(this.form.select.options)
      // this.drink.ingredients = [...['New', 'New2']]
      // console.log(this.drink)
      // create a template
      // change to json and send
      // redirect do index
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
