<script lang="ts">
import { defineComponent } from "vue";

interface Rating {
  average: number;
  count: number;
}

interface BookDetail {
  rating: Rating;
  _id: string;
  title: string;
  author: string;
  publishedDate: string;
  publisher: string;
  description: string;
  coverImage: string;
  tags: string[];
  initialQty: number;
  qty: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default defineComponent({
  name: "DetailBookView",
  data: () => ({
    bookDetail: {
      _id: "",
      title: "",
      author: "",
      publishedDate: "",
      publisher: "",
      description: "",
      coverImage: "",
      tags: [],
      initialQty: 0,
      qty: 0,
      createdAt: "",
      updatedAt: "",
      __v: 0,
      rating: {
        average: 0,
        count: 0,
      },
    } as BookDetail,
    fetchError: false,
  }),
  async created() {
    try {
      const response = await fetch(
        `http://localhost:8080/book/${this.$route.params.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch book data");
      }
      const data = await response.json();
      console.log(data)
      this.bookDetail = { ...data };
      console.log(this.bookDetail)
    } catch (error) {
      console.error(error);
      this.fetchError = true;
    }
  },
  methods: {
    async deleteBook() {
      const response = await fetch(
        `http://localhost:8080/book/${this.$route.params.id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);
      alert("Book has been removed!");
      this.$router.push("/");
    },
  },
  computed: {
    starRating(): string {
      const stars = Math.floor(this.bookDetail.rating.average);
      return "⭐".repeat(stars);
    },
  },
});
</script>

<template>
  <main class="py-5 px-5 bg-beige">
    <RouterLink
      to="/"
      class="px-4 text-beige py-2 lg:ml-24 bg-teal font-semibold rounded-md inline-block"
      > Back to Home </RouterLink
    >
    <div v-if="fetchError" class="mt-8">
      <h1 class="font-bold text-3xl text-center">Failed to load book data</h1>
    </div>

    <div v-else-if="bookDetail.title" class="mt-8">
      <div class="flex lg:ml-24 gap-x-10 flex-col lg:flex-row justify-center items-center">
        <div class="w-3/4 md:w-4/6 lg:w-[500px] lg:flex-shrink-0">
          <img
            :src="bookDetail.coverImage"
            class="rounded-xl w-full"
            alt="Book Cover"
          />
        </div>
        <div class="mt-10 lg:mt-0 lg:pr-24">
          <h1 class="font-bold text-xl md:text-2xl lg:text-3xl text-left text-teal">
            {{ bookDetail.title }} by {{ bookDetail.author }}
          </h1>
          <h5 class="text-sm text-gray-500 font-bold mt-2">
            {{ bookDetail.rating.average }} {{ starRating }} ({{
              bookDetail.rating.count
            }})
          </h5>
          <hr class="border border-teal my-2" />
          <h3 class="text-md md:text-lg text-left text-teal">
            <span class="font-bold">About:</span> {{ bookDetail.description }}
          </h3>
          <h3 class="text-md md:text-lg text-left text-teal">
            <span class="font-bold">Published:</span>
            {{ bookDetail.publishedDate }} by
            {{ bookDetail.publisher }}
          </h3>
          <h3 class="text-md md:text-lg text-left text-teal">
            <span class="font-bold">Category:</span>
            {{ bookDetail.tags.join(", ") }}
          </h3>
          <h3 class="text-md md:text-lg text-left text-teal">
            <span class="font-bold">Stock:</span>
            {{ bookDetail.qty }} of {{ bookDetail.initialQty }} books
          </h3>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <button
          @click="deleteBook"
          class="px-4 text-white py-2 w-1/2 bg-red-400 font-semibold rounded-xl mt-8 inline-block"
        >
          Remove Book
        </button>
      </div>
    </div>
    <div v-else class="mt-8">
      <h1 class="font-bold text-3xl text-center">Loading...</h1>
    </div>
  </main>
</template>
