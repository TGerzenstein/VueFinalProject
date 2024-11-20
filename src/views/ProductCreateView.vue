<template>
  <v-container class="d-flex flex-column justify-center">
    <v-row>
      <v-col cols="12">
        <p class="text-h mt-4 mb-2 text-center">Create a New Product</p>
      </v-col>
      <v-col cols="12">
        <v-sheet class="mx-auto" width="350px">
          <v-form fast-fail @submit.prevent="saveData">
            <v-text-field
              label="Name"
              v-model="formData.name"
              :rules="inputRules('name')"
              required
            ></v-text-field>
            <v-text-field
              label="Price"
              v-model="formData.price"
              type="number"
              :rules="inputRules('price')"
              required
            ></v-text-field>
            <v-text-field
              label="Quantity"
              v-model="formData.quantity"
              type="number"
              :rules="inputRules('quantity')"
              required
            ></v-text-field>
            <v-textarea
              label="Description"
              v-model="formData.description"
              :rules="inputRules('description')"
              required
            ></v-textarea>
            <v-text-field
              label="Image URL"
              v-model="formData.image"
              :rules="inputRules('image')"
              required
            ></v-text-field>
            <v-select
              label="Category"
              :items="categories"
              v-model="formData.category"
              :rules="inputRules('category')"
              required
            ></v-select>
            <v-btn
              class="mx-auto mt-2 py-6"
              min-width="230"
              style="background-color: #f46568; color: #ffffff"
              type="submit"
              block
              >Enter product</v-btn
            >
            <v-btn
              class="mx-auto mt-2 py-6 text-white"
              color="#3949ab"
              min-width="230"
              type="button"
              @click="goToProductsList"
              block
            >
              <v-icon icon="mdi-arrow-left" start></v-icon>Back</v-btn
            >
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useProductsListStore } from "@/stores/ProductsStore";
import { storeToRefs } from "pinia";

const router = useRouter();
const store = useProductsListStore();
const { listProducts } = storeToRefs(store);

const formData = reactive({
  name: "",
  price: 0,
  quantity: 0,
  description: "",
  image: "",
  category: "",
  seller_id: "",
});

const categories = ref([
  "Electronic",
  "Percussion",
  "Wind",
  "String",
  "Keyboard",
  "Brass",
]);

//button
const goToProductsList = () => {
  router.push("/products");
};

const saveData = async () => {
  try {
    await store.addProduct(formData);
    console.log("Product added.");
  } catch (error) {
    console.error("Failed to add product:", error);
  }
};

//validation form;

function inputRules(field: string) {
  const rules = {
    name: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length >= 3) || "Minimum 3 characters",
    ],
    price: [
      (v) => !!v || "Price is required",
      (v) => v > 0 || "Price must be greater than 0",
    ],
    quantity: [
      (v) => !!v || "Quantity is required",
      (v) => v > 0 || "Quantity must be greater than 0",
    ],
    description: [
      (v) => !!v || "Description is required",
      (v) =>
        (v && v.length >= 10) || "Description must be at least 10 characters",
    ],
    image: [
      (v) => !!v || "Image URL is required",
      (v) => !!v || "This field is required",
    ],
    category: [(v) => !!v || "Category is required"],
  };
  return rules[field] || [];
}
</script>

<style scoped>
.text-h {
  font-size: 1.8rem;
}
</style>
