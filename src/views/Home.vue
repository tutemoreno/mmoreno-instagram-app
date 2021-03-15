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
    <!-- <pagination -->
    <nav aria-label="..." class="row d-flex justify-content-center">
      <ul class="pagination">
        <li
          class="page-item"
          :class="{ disabled: getCurrentPage == 1 }"
          @click="setPreviousPage"
        >
          <a class="page-link" href="#" tabindex="-1">Previous</a>
        </li>

        <li
          class="page-item"
          :class="{ active: getCurrentPage == n }"
          v-for="n in getPages"
          :key="n"
          @click="setCurrentPage(n)"
        >
          <a class="page-link" href="#">{{ n }}</a>
        </li>

        <li
          class="page-item"
          :class="{ disabled: getLastPage == getCurrentPage }"
          @click="setNextPage"
        >
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
    <!-- pagination/> -->
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
import { mapGetters, mapActions } from 'vuex';
import Post from '@/components/Post.vue';
import Uploader from '@/components/Uploader.vue';

export default {
  name: 'Home',
  components: { Post, Uploader },
  data() {
    return {
      file: null,
      uploadedFileUrl: null,
    };
  },
  async created() {
    this.refresh(1);
  },
  computed: {
    ...mapGetters('posts', [
      'getPosts',
      'getPages',
      'getCurrentPage',
      'getLastPage',
    ]),
  },
  methods: {
    ...mapActions('posts', [
      'refresh',
      'setCurrentPage',
      'setPreviousPage',
      'setNextPage',
    ]),
    paginate() {
      const { page, perPage } = this;

      let from = page * perPage - perPage,
        to = page * perPage;
    },
    drop(e) {
      this.file = e.dataTransfer.files[0];

      this.uploadedFileUrl = URL.createObjectURL(this.file);

      console.log(this.uploadedFileUrl);

      $('#uploadModal').modal('show');
    },
  },
};
</script>
