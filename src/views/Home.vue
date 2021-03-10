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
        v-for="post in posts"
        :key="post.id"
      >
        <Post :post="post" />
      </div>
    </div>
    <Modal
      id="uploadModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      modalSize="modal-xl"
    >
      <template #header>
        <h5 class="modal-title mx-auto">
          New Post
        </h5>
      </template>
      <template #body>
        <form class="container row">
          <div class="col-6">
            <img :src="uploadedFileUrl" class="img-fluid rounded" alt="" />
          </div>
          <div class="row col-6">
            <div class="col-12 mb-3">
              <textarea
                class="form-control"
                v-model="description"
                placeholder="Description"
                style="height: 100%"
              ></textarea>
            </div>
            <div
              class="col-12 d-flex justify-content-center align-items-center"
            >
              <button
                type="button"
                class="btn btn-primary btn-lg col-3 mx-3"
                @click="uploadFile"
              >
                Post
              </button>
              <button
                type="button"
                class="btn btn-danger btn-lg col-3 mx-3"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </template>
    </Modal>
  </div>
</template>

<script>
import Post from '@/components/Post.vue';
import Modal from '@/components/Modal.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: { Post, Modal },
  data() {
    return {
      file: null,
      uploadedFileUrl: null,
      description: null,
      posts: [
        {
          id: 1,
          description: 'adksljfalsfñlkjshhdfkjHSDFFKJhsjkf',
          likes: 0,
          sysOn: new Date(),
        },
        {
          id: 2,
          description: 'adksljfalsfñlkjshhdfkjHSDFFKJhsjkf',
          likes: 0,
          sysOn: new Date(),
        },
        {
          id: 3,
          description: 'adksljfalsfñlkjshhdfkjHSDFFKJhsjkf',
          likes: 0,
          sysOn: new Date(),
        },
        {
          id: 4,
          description: 'adksljfalsfñlkjshhdfkjHSDFFKJhsjkf',
          likes: 0,
          sysOn: new Date(),
        },
        {
          id: 5,
          description: 'adksljfalsfñlkjshhdfkjHSDFFKJhsjkf',
          likes: 0,
          sysOn: new Date(),
        },
        {
          id: 6,
          description: 'adksljfalsfñlkjshhdfkjHSDFFKJhsjkf',
          likes: 0,
          sysOn: new Date(),
        },
        {
          id: 7,
          description: 'adksljfalsfñlkjshhdfkjHSDFFKJhsjkf',
          likes: 0,
          sysOn: new Date(),
        },
        {
          id: 8,
          description: 'adksljfalsfñlkjshhdfkjHSDFFKJhsjkf',
          likes: 0,
          sysOn: new Date(),
        },
        {
          id: 9,
          description: 'adksljfalsfñlkjshhdfkjHSDFFKJhsjkf',
          likes: 0,
          sysOn: new Date(),
        },
        {
          id: 10,
          description: 'adksljfalsfñlkjshhdfkjHSDFFKJhsjkf',
          likes: 0,
          sysOn: new Date(),
        },
      ],
    };
  },
  methods: {
    drop(e) {
      this.file = e.dataTransfer.files[0];

      this.uploadedFileUrl = URL.createObjectURL(this.file);

      $('#uploadModal').modal('show');
    },
    async uploadFile() {
      const formData = new FormData();

      formData.append('file', this.file);
      formData.append('description', this.description);

      try {
        const {
          data: { file },
        } = await axios({
          headers: { 'Content-Type': 'multipart/form-data' },
          baseURL: process.env.VUE_APP_API_URL,
          method: 'post',
          url: 'uploads',
          data: formData,
        });

        if (file) console.log('success upload');

        $('#uploadModal').modal('hide');
      } catch (error) {
        console.log('[ERROR_UPLOADING]', error);
      }
    },
  },
};
</script>
