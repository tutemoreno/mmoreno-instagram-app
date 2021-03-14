<template>
  <Modal modalSize="modal-xl">
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
          <div class="col-12 d-flex justify-content-center align-items-center">
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
</template>

<script>
import Modal from './Modal.vue';
import axios from 'axios';
import { v1 } from 'uuid';

export default {
  name: 'Uploader',
  components: { Modal },
  props: {
    file: {
      type: File,
    },
    uploadedFileUrl: {
      type: String,
    },
  },
  data() {
    return {
      description: null,
    };
  },
  methods: {
    async uploadFile() {
      const formData = new FormData();

      formData.append('file', this.file);
      formData.append('description', this.description);
      formData.append('uuid', v1());

      try {
        const response = await axios({
          // headers: { 'Content-Type': 'multipart/form-data' },
          method: 'post',
          url: 'posts',
          data: formData,
        });

        console.log(response);

        $('#uploadModal').modal('hide');
      } catch (error) {
        console.log('[ERROR_UPLOADING]', error);
      }
    },
  },
};
</script>

<style></style>
