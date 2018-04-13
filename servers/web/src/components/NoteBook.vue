<template>
  <div class="notebook container">
    <div class="row row-offset" v-for="module in modules">
      <div class="col-md-10 offset-md-1">
        <div class="card">
          <component :key="module.key"
                     :is="module.module"
                     :content="module.content"
                     :editing="module.editing"
                     @contentUpdated="updateContent(module, $event)">
          </component>
          <div class="card-footer btn-toolbar justify-content-between">
            <button class="btn btn-sm btn-success card-text"
                    @click="module.editing = false"
                    v-if="module.editing">Save</button>
            <button class="btn btn-sm btn-secondary card-text"
                    @click="module.editing = true"
                    v-else>Edit</button>
            <button class="btn btn-lg btn-danger card-text" @click="removeModule(module)">-</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TextModule from './modules/TextModule.vue'
  import VideoModule from './modules/VideoModule.vue'
  import ImageModule from './modules/ImageModule.vue'
  import QuizletModule from './modules/QuizletModule.vue'


  export default {
    name: "NoteBook",
    data() {
      return {
        modules: [
          {
            module: TextModule,
            editing: false,
            content: {text: "EIJFOJ"}
          },
          {
            module: TextModule,
            editing: false,
            content: {text: "awegjOE"}
          },
          {
            module: VideoModule,
            editing: false,
            content: {embedUrl: "https://www.youtube.com/embed/C0DPdy98e4c"}
          },
          {
            module: ImageModule,
            editing: false,
            content: {imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Monnaie_de_Bactriane%2C_Eucratide_I%2C_2_faces.jpg"}
          },
          {
            module: QuizletModule,
            editing: false,
            content: {quizUrl: "https://quizlet.com/286184917/match/embed"}
          }
        ],
        editing: true
      }
    },
    methods: {
      removeModule(module) {
        for (var i = 0; i < this.modules.length; i++) {
          if (this.modules[i] === module) {
            this.modules.splice(i, 1);
            return;
          }
        }
      },
      updateContent(module, newContent) {
        module.content = newContent;
      }
    }
  }
</script>

<style scoped>
.row-offset {
  margin-top: 20px;
}
</style>
