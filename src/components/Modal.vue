<template>
  <div
    class="modal studio_create_modal fade in"
    role="dialog"
    v-bind:class="{ 'd-none ': !modalShow, 'd-block': modalShow, show: anim }"
  >
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create New Studio</h5>
          <button type="button" class="close" @click="dismiss">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <form
            class="form-horizontal"
            method="POST"
            action="#"
            enctype="multipart/form-data"
          >
            <div class="form-group row input_container">
              <label class="col-sm-2 col-form-label control-label" for="name"
                >Name</label
              >
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control _studio_name"
                  id="name"
                  name="name"
                />
              </div>
              <div class="input_field_error col-sm-12"></div>
            </div>
            <div class="form-group row input_container">
              <label
                class="col-sm-2 col-form-label control-label"
                for="description"
                >Description</label
              >
              <div class="col-sm-10">
                <textarea
                  class="form-control _studio_description"
                  id="description"
                  name="description"
                ></textarea>
              </div>
              <div class="input_field_error col-sm-12"></div>
            </div>
            <div class="form-group row input_container">
              <label class="col-sm-2 col-form-label control-label" for="logo"
                >Logo</label
              >
              <div class="col-sm-10">
                <input
                  type="file"
                  name="logo"
                  class="form-control _studio_logo"
                  id="logo"
                  accept="image/*"
                />
                <div class="logo-info">
                  Studio logo dimensions should be 64 * 64
                </div>
              </div>
              <div class="input_field_error col-sm-12"></div>
            </div>
            <div class="form-group input_container display-none">
              <label class="control-label col-sm-2" for="description"
                >Visibility
              </label>
              <div class="col-sm-10">
                <label class="radio-inline selected">
                  <input
                    type="radio"
                    name="visibility"
                    class="_visibility_radio"
                    data-name="_radio"
                    value="hidden"
                    checked=""
                  />
                  <i class="fa fa-eye" aria-hidden="true"></i>
                  Hidden
                </label>
                <label class="radio-inline">
                  <input
                    type="radio"
                    name="visibility"
                    class=""
                    data-name="_radio"
                    value="visible"
                  />
                  <i class="fa fa-eye-slash" aria-hidden="true"></i>
                  Visible
                </label>
              </div>
              <div class="input_field_error col-sm-12"></div>
            </div>
            <div class="form-group input_container display-none">
              <label class="control-label col-sm-2" for="description"
                >Registration
              </label>
              <div class="col-sm-10">
                <label class="radio-inline selected">
                  <input
                    type="radio"
                    name="registration"
                    class="_registration_radio"
                    data-name="_radio"
                    value="open"
                    checked=""
                  />
                  <i class="fa fa-check-circle" aria-hidden="true"></i>
                  Open
                </label>
                <label class="radio-inline">
                  <input
                    type="radio"
                    name="registration"
                    class=""
                    data-name="_radio"
                    value="validation"
                  />
                  <i class="fa fa-check-circle" aria-hidden="true"></i>
                  Validation
                </label>
                <label class="radio-inline">
                  <input
                    type="radio"
                    name="registration"
                    class=""
                    data-name="_radio"
                    value="closed"
                  />
                  <i class="fa fa-check-circle" aria-hidden="true"></i>
                  Closed
                </label>
              </div>
              <div class="input_field_error col-sm-12"></div>
            </div>
            <div class="form-group text-center">
              <button class="create_studio" type="button">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal-backdrop fade"
    v-bind:class="{ show: anim }"
    v-if="modalShow"
    v-on:click="dismiss()"
  ></div>
</template>

<script lang="ts">
import { getCurrentInstance, defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  setup(){
      const internalInstance = getCurrentInstance(); 
      const emitter = internalInstance?.appContext.config.globalProperties.emitter;
      
      emitter.on("modal:toggle", () => {
        const ddata:any = internalInstance?.data;
        ddata.modalShow = ddata.modalShow ? false : true;
        setTimeout(() => {
          ddata.anim = true;
        }, 200);
      });
  },
  data() {
    return {
      modalShow: false,
      anim: false,
    };
  },
  methods: {
    dismiss():void {
      this.anim = false;
      setTimeout(() => {
        this.modalShow = false;
      }, 200);
    },
  }
});
</script>
