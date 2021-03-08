<template>
  <div class="card" style="width: 18rem;">
    <img
      src="https://instagram.faep9-2.fna.fbcdn.net/v/t51.2885-15/e35/117680934_672528716694659_3050226877422797306_n.jpg?tp=1&_nc_ht=instagram.faep9-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=UTgVXfkfBgsAX9gcBJ7&oh=211a9bc8a5bf230a3ea4ba0c4a94eca7&oe=606CBDEF"
      class="card-img-top"
      alt=""
    />

    <div class="container">
      <div
        class="row d-flex justify-content-end"
        style="margin: -40px 0px 0px 0px"
      >
        <div
          class="col-12 bg-light rounded-top rounder-start d-flex justify-content-center align-items-center"
          style="height: 40px; width: 40px; margin: 0px -25px 0px 0px"
        >
          <img
            src="../assets/heart.svg"
            alt="Bootstrap"
            width="30"
            height="30"
          />
        </div>
      </div>
      <div class="row">
        <span class="col-8 text-start">{{ this.timeago }}</span>
        <span class="col-4 text-end">{{ post.likes }} Likes</span>
      </div>
      <div class="card-body row">
        <!-- <h5 class="card-title">Card title</h5> -->
        <p class="card-text">
          {{ post.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { distanceInWordsToNow } from 'date-fns';

export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
    },
  },

  computed: {
    timeago() {
      const { sysOn } = this.post;
      return distanceInWordsToNow(sysOn, { includeSeconds: true });
    },
  },
};
</script>
