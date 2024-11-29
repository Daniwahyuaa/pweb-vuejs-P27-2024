<script lang="ts">
import { RouterLink } from "vue-router";
import type { PropType } from "vue";

export interface BookObject {
  _id: string;
  title: string;
  author: string;
  publishedDate: string;
  tags: string[];
  initialQty: number;
  qty: number;
  publisher: string;
  coverImage: string;
}

export default {
  name: "BookCard",
  components: {
    RouterLink,
  },
  props: {
    book: {
      type: Object as PropType<BookObject>,
      required: true,
    },
  },
  methods: {
    getReadMoreLink(id: string) {
      return `/detail/${id}`;
    },
  },
};
</script>

<template>
  <div class="rounded-xl px-6 pt-6 pb-8 bg-beige" style="width: 250px;">
    <img
      :src="book.coverImage"
      alt="{{ book.title }}"
      class="w-full"
    />
    <h3 class="text-lg font-bold text-left text-navy mt-2">
      {{ book.title }}
    </h3>
    <h4 class="text-sm font-semibold text-left text-navy">
      By: {{ book.author }}
    </h4>
    <RouterLink
      :to="getReadMoreLink(book._id)"
      class="px-4 text-white py-1 bg-navy font-semibold rounded-md inline-block mt-2"
      >Read More</RouterLink
    >
  </div>
</template>
