<template>
  <div class="card w-100">
    <div
      class="h-75 bg-dark overflow-hidden d-flex justify-content-center align-items-center"
    >
      <img id="imgCard" :src="image" class="card-img-top" alt="" />
    </div>
    <div class="card-body container">
      <div class="row d-flex justify-content-end">
        <div
          class="bg-white rounded-top rounder-start d-flex justify-content-center align-items-center"
          style="height: 40px; width: 40px; margin: -60px -5px 0px 0px"
        >
          <svg
            v-if="post.liked"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            role="button"
            @click="didLike(post)"
            fill="red"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            role="button"
            @click="didLike(post)"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
            />
          </svg>
        </div>
      </div>
      <div class="row text-end">
        <h6 class="col-8">{{ this.timeago }}</h6>
        <h6 class="col-4" style="text-align: right">{{ post.likes }} Likes</h6>
      </div>
      <p class="card-text">
        {{ post.description }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { distanceInWordsToNow } from 'date-fns';
import axios from 'axios';

export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      image: null,
    };
  },
  async mounted() {
    const response = await axios.get(this.imageURL, {
      responseType: 'blob',
    });

    this.image = URL.createObjectURL(response.data);
    console.log(this.image);
  },
  watch: {
    imageURL: function(url) {
      this.fetchImage(url);
    },
  },
  methods: {
    ...mapActions('posts', ['didLike']),
    async fetchImage(url) {
      const response = await axios.get(url, {
        responseType: 'blob',
      });

      this.image = URL.createObjectURL(response.data);
    },
  },
  computed: {
    imageURL() {
      return `${process.env.VUE_APP_SERVER_URL}/posts/${this.post._id}`;
    },
    timeago() {
      return distanceInWordsToNow(this.post.createdAt, {
        includeSeconds: true,
      });
    },
  },
};
</script>
<style scoped>
.card {
  height: 400px;
}
@media (max-width: 1200px) {
  .card {
    height: auto;
  }
}
</style>
