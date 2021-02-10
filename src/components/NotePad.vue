<template>
  <div class="flex-container">

    <div id="header" class="flex-item padding-5">

      <div class="header-container">

        <div class="left-side">
          <div class="logo">
            <div class="logo__icon">
              <img class="img-fluid" src="@/assets/notebook.svg" alt="">
            </div>
            <div class="logo__text">
              noter.app
            </div>
          </div><!-- logo -->
        </div><!-- left side -->

        <div class="right-side">

          <button class="header__button" @click="onDownloadFile">
            <i class="bi bi-file-earmark-arrow-down-fill"></i>
            <span class="popup">download document</span>
          </button>

          <button class="header__button" @click="onCopyText">
            <i class="bi bi-clipboard-check"></i>
            <span class="popup">{{ copyButtonLabel }}</span>
          </button>

          <button class="header__button" @click="onGeneratePreview">
            <i class="bi bi-markdown-fill"></i>
            <span class="popup">view markdown preview</span>
          </button>

          <router-link to="/settings" class="button">
            <button class="header__button">
              <i class="bi bi-sliders"></i>
              <span class="popup">settings</span>
            </button>
          </router-link>

          <router-link to="/about" class="button">
            <button class="header__button">
              <i class="bi bi-info-circle-fill"></i>
              <span class="popup">about noter</span>
            </button>
          </router-link>

        </div><!-- right-side -->

      </div>

    </div><!-- header -->

    <div id="notepad" class="flex-item padding-5">
      <textarea v-if="!isPreview" class="editor" v-model="editorContent"></textarea>
      <div v-else class="editor" v-html="previewData"></div>
    </div><!-- notepad -->

    <div id="footer" class="flex-item padding-5">
      <div class="footer__content d-flex justify-content-between align-items-center">

        <div class="text-start">
          Words: {{ wordsCount }}
        </div>

        <div class="text-end">
          Developed by <a href="https://srisar.dev">srisar.dev</a> | Version {{ appVersion }}
        </div>


      </div>
    </div><!-- footer -->

  </div>
</template>

<script>

// const KEY = 'content';

import {downloadFile} from "@/helpers/downloader";

const marked = require('marked');

export default {
  name: "NotePad",

  data() {
    return {
      appVersion: '0.5',

      previewData: "",
      isPreview: false,

      copyButtonLabel: 'copy',

    }
  },

  /* === COMPUTED === */
  computed: {
    //

    editorContent: {
      get: function () {
        return this.$store.getters.getEditorContent
      },
      set: function (value) {
        this.$store.commit('setEditorContent', value)
      }
    },

    wordsCount: function () {
      return this.$store.getters.getWordCount
    }

  },

  /* === MOUNTED === */
  mounted() {

    // load editor data from store
    this.$store.dispatch('getEditorContentFromStore')
        .catch(e => {
          console.log(e)
        })


    /* save editor content every 500 ms */
    setInterval(() => {
      this.$store.dispatch('putEditorContentInStore')
    }, 500)


  },

  /* === METHODS === */
  methods: {

    onDownloadFile: function () {
      downloadFile('document.md', this.editorContent);
    },

    onCopyText: function () {
      navigator.clipboard.writeText(this.editorContent)
          .then(() => {
            this.copyButtonLabel = '✔ copied';

            setTimeout(() => {
              this.copyButtonLabel = 'copy text';
            }, 3000);

          })
    },

    onGeneratePreview: function () {
      this.previewData = marked(this.editorContent);
      this.isPreview = !this.isPreview;
    }

  },

}
</script>

<style lang="scss">

.flex-container {
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  //border: solid 1px red;

  .flex-item {
    //border: solid 1px blue;
  }

  .flex-item.padding-5 {
    padding: 5px 0;
  }


}

a.button {
  text-decoration: none;
}

.popup {

  display: none;

  transition: 280ms all ease-out;

  position: absolute;
  background-color: #9e9e9e;
  color: #181818;
  padding: 3px 5px;
  border-radius: 5px;
  top: 40px;
  font-weight: bold;
  font-size: 0.9em;
}

/* === special components === */


#header {

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left-side {
      display: flex;
      justify-content: flex-end;
      //margin: auto;
    }

    .right-side {
      //flex: 1;
      //margin: auto;
    }

  }


  .logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .logo__text {
      font-size: 1.3em;
      line-height: 1.5em;
      margin-bottom: 3px;
    }

    .logo__icon {
      //margin: auto;
      // flex: 1;

      img {
        height: 24px;
        margin-right: 5px;
      }
    }

  }

  .header__button {

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border-radius: 5px;
    margin-left: 10px;
    padding: 5px;
    border: solid 1px #9e9e9e;
    color: #9e9e9e;
    background-color: #181818;
    transition: 280ms all ease-out;

    i {
      font-size: 1em;
      line-height: 1.5em;
      margin-top: -10px;
    }


    &:hover {
      .popup {
        display: inline;
      }
    }

  }

  .header__button:hover {
    background-color: #ff9800;
    border-color: #1E1E1E;
    color: #181818;
  }

  .header__button:focus {
    outline: none;
  }

}

/* header */


#notepad {
  flex-grow: 1;

  .editor {
    height: 100%;
    border: black;
    box-shadow: inset 0 0 5px black;
    border-radius: 5px;
    padding: 20px 10px;
    background-color: #181818;
    white-space: pre-wrap;
    width: 100%;
    color: white;
    resize: none;
    line-height: 1.6em;
    font-size: 1em;
  }

  .editor:focus {
    outline: #1E1E1E;
  }

}


#footer {
  //display: flex;

  .footer__content {
    font-size: 0.9em;

    a {
      color: #ff9800;
      text-decoration: none;
      display: inline-block;
      padding: 2px 5px;
    }

    a:hover {
      color: #FF5370;

    }

  }
}

/* footer */


</style>
