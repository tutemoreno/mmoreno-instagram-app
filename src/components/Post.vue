<template>
  <div class="card" style="width: 18rem;">
    <img id="imgCard" :src="getImage" class="card-img-top" alt="" />

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
        <span class="col-4 text-end">{{ post.likes.length }} Likes</span>
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
import axios from 'axios';

export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
    },
  },
  data() {
    return {
      fckImg: null,
    };
  },
  async created() {
    const response = await axios.get(this.imageURL, {
      responseType: 'arraybuffer',
    });
    console.log('[RESPONSE]', response);
    const imgBlob = new File([response.data], 'asdasd123', {
      type: 'image/jpg',
    });

    // new File(Buffer.from(response.data), this.post._id);

    this.fckImg = URL.createObjectURL(imgBlob);
  },
  computed: {
    getImage() {
      console.log(this.fckImg);
      return this.fckImg;
    },
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
