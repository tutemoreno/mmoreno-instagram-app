<template>
  <div class="container">
    <div class="row d-flex justify-content-center m-3">
      <div
        class="col-6 border-3 border-secondary d-flex justify-content-center align-items-center"
        style="height: 100px; border-style: dashed"
        @dragover.prevent=""
        @drop.prevent="drop"
      >
        <img
          class="m-3"
          src="../assets/plus-square-dotted.svg"
          alt="Bootstrap"
          width="40"
          height="40"
        />
        <h5>Drag image here to upload it</h5>
      </div>
    </div>
    <div class="row">
      <div
        class="col-12 col-xl-4 mb-3 d-flex justify-content-center"
        v-for="post in getPosts"
        :key="post.id"
      >
        <Post :post="post" />
      </div>
    </div>
    <Uploader
      :file="file"
      :uploadedFileUrl="uploadedFileUrl"
      id="uploadModal"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Post from '@/components/Post.vue';
import Uploader from '@/components/Uploader.vue';

export default {
  name: 'Home',
  components: { Post, Uploader },
  data() {
    return {
      file: null,
      uploadedFileUrl: null,
      description: null,
    };
  },
  async created() {
    await this.$store.dispatch('posts/refresh');
  },
  computed: {
    ...mapGetters('posts', ['getPosts']),
  },
  methods: {
    drop(e) {
      this.file = e.dataTransfer.files[0];

      this.uploadedFileUrl = URL.createObjectURL(this.file);

      console.log(this.uploadedFileUrl);

      $('#uploadModal').modal('show');
    },
  },
};
</script>
