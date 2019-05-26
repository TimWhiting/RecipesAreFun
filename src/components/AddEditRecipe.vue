<template>
  <div>
    <figure v-if="newRecipe.imagePath">
      <img v-bind:src="newRecipe.imagePath">
    </figure>
    <figure v-else id="spiceFigure">
      <img src="@/assets/spice.jpg">
    </figure>
    <section class="recipeCard">
      <p class="error">{{this.error}}</p>
      <input type="text" v-model="newRecipe.title" placeholder="Recipe Title">
      <section class="ingredientSection">
        <h3>Ingredients</h3>
        <datalist id="optionalIngredients">
          <option value="none"></option>
          <option
            v-for="validIngredient in ingredients"
            :key="validIngredient._id"
            :value="validIngredient.name"
          >{{validIngredient.name}}</option>
        </datalist>
        <datalist id="validIngredients">
          <option
            v-for="validIngredient in ingredients"
            :key="validIngredient._id"
            :value="validIngredient.name"
          >{{validIngredient.name}}</option>
        </datalist>
        <ul class="ingredients">
          <li v-for="(ingredient,index) in newRecipe.ingredients" v-bind:key="ingredient">
            <input v-model="newRecipe.ingredients[index]" list="validIngredients">
            <button @click="removeIngredient(index)">x</button>
          </li>
          <li>
            <input v-model="newIngredient" list="optionalIngredients">
            <button @click="addIngredient">+</button>
          </li>
        </ul>
      </section>
      <section class="instructionSection">
        <h3>Instructions</h3>
        <ol class="ingredients">
          <li v-for="(instruction, index) in newRecipe.instructions" v-bind:key="instruction">
            <input type="text" v-model="newRecipe.instructions[index]">
            <button @click="removeInstruction(index)">x</button>
          </li>
          <li>
            <input type="text" v-model="newInstruction" placeholder="Add instruction">
            <button @click="addInstruction">+</button>
          </li>
        </ol>
      </section>
      <input type="file" name="photo" @change="changeImage">
      <p>Large images will take a long time to upload and give you an error</p>
      <button @click="saveRecipe">Save Recipe</button>
      <br>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AddRecipe",
  props: {
    newRecipe: Object,
    mode: String
  },
  data: () => {
    return {
      newImage: null,
      newIngredient: "",
      newInstruction: "",
      error: ""
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("ingredients", ["ingredients"])
  },
  methods: {
    async saveRecipe() {
      if (this.checkData()) {
        if (this.mode == "add") {
          await this.$store.dispatch("userRecipes/saveRecipe", {
            newRecipe: this.newRecipe,
            newImage: this.newImage
          });
        } else {
          await this.$store.dispatch(
            "userRecipes/updateRecipe",
            this.newRecipe
          );
        }
        this.$emit("saved");
      }
    },
    removeIngredient(index) {
      this.newRecipe.ingredients.splice(index, 1);
    },
    removeInstruction(index) {
      this.newRecipe.instructions.splice(index, 1);
    },
    async addIngredient() {
      if (this.newIngredient == "none") {
        this.$store.dispatch(
          "notifications/addError",
          "Can't add none as an ingredient"
        );
      } else {
        if (!this.ingredients.contains(this.newIngredient)) {
          this.$store.dispatch("notifications/question", {
            question: `Would you like to add ${this.newIngredient}`,
            answers: ["yes", "no"],
            callback: result => {
              if (result == "no") {
                return;
              } else {
                this.$store.dispatch("ingredients/addNewIngredient", {
                  name: this.newIngredient
                });
              }
            }
          });
        }
        this.newRecipe.ingredients.push(this.newIngredient);
        this.newIngredient = "";
      }
    },
    addInstruction() {
      this.newRecipe.instructions.push(this.newInstruction);
      this.newInstruction = "";
    },
    addNewIngredient() {},
    changeImage(event) {
      this.newImage = event.target.files[0];
    },
    checkData() {
      if (this.user != null) {
        if (
          (this.newRecipe.imagePath != null &&
            this.newRecipe.imagePath != undefined) ||
          (this.newImage != null && this.newImage.name != "")
        ) {
          if (this.newRecipe.title != "") {
            if (this.newRecipe.ingredients.length >= 1) {
              if (this.newRecipe.instructions.length >= 1) {
                return true;
              } else {
                this.error = "You need to specify at least one instruction!";
                return false;
              }
            } else {
              this.error = "You need to specify at least one ingredient!";
              return false;
            }
          } else {
            this.error = "You need to specify a title!";
            return false;
          }
        } else {
          this.error = "You need to choose a file to upload!";
          return false;
        }
      } else {
        this.error = "You need to register or login!";
        return false;
      }
    }
  }
};
</script>

<style scoped>
</style>