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

          <button class="header__button" @click="onNewDocument">
            <i class="bi bi-file-earmark-plus"></i>
            <span class="popup">new document</span>
          </button>

          <button class="header__button" @click="onDownloadFile">
            <i class="bi bi-download"></i>
            <span class="popup">download document</span>
          </button>

          <button class="header__button" @click="onCopyText">
            <i class="bi bi-clipboard-check"></i>
            <span class="popup">{{ copyButtonLabel }}</span>
          </button>

          <button class="header__button" @click="onGeneratePreview" :class="{'header__button-pressed': isPreview}">
            <i class="bi bi-markdown"></i>
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
              <i class="bi bi-info-circle"></i>
              <span class="popup">about noter</span>
            </button>
          </router-link>

        </div><!-- right-side -->

      </div>

    </div><!-- header -->

    <div id="notepad" class="flex-item padding-5"
         @drop.prevent="onDropFile" @dragover.prevent="onDragOverFile" @dragleave="onDragLeave">

      <div id="drop-zone" v-if="isFileDropping">
        <h3>Drop your file here</h3>
        <p>Please drop only text / markdown files</p>
      </div>
      <textarea v-if="!isPreview" class="editor" v-model="editorContent" spellcheck="false"
                :style="{fontSize: editorConfig.fontSize + 'px', fontFamily: editorConfig.fontFace}"></textarea>
      <div v-else class="editor__preview" v-html="previewData"></div>
    </div><!-- notepad -->

    <div id="footer" class="flex-item padding-5">
      <div class="footer__content d-flex justify-content-between align-items-center">

        <div class="text-start">
          {{ wordsCount }} words | {{ readTime }} to read
        </div>

        <div class="text-end">
          by <a href="https://srisar.dev">srisar.dev</a> | version {{ appVersion }}
        </div>


      </div>
    </div><!-- footer -->
  </div>

</template>

<script>
import {downloadFile} from "@/helpers/downloader"
import {Toaster} from "@/helpers/toaster"
import {enableTabbing} from "@/helpers/textarea"

const marked = require('marked')
const _ = require('lodash')

export default {
  name: "NotePad",
  data() {
    return {
      appVersion: '0.1.3',
      previewData: "",
      isPreview: false,
      copyButtonLabel: 'copy',
      isFileDropping: false,
      toaster: undefined,
    }
  },

  /* === COMPUTED === */
  computed: {

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
    },

    readTime: function () {
      /* average read time is 130 wpm */
      let time = _.round(this.wordsCount / 130, 1)

      if (time < 1) {
        return 'less than a minute'
      } else {
        return `${time} minutes`
      }

    },

    editorConfig: {
      get() {
        return this.$store.getters.getConfig
      },
    }

  },

  /* === MOUNTED === */
  mounted() {

    this.toaster = new Toaster('toast-container')

    this.$store.dispatch('getConfigFromStore')
    // load editor data from store
    this.$store.dispatch('getEditorContentFromStore')

    enableTabbing()

    /* save editor content every 500 ms */
    setInterval(() => {
      this.$store.dispatch('putEditorContentInStore')
    }, 500)


  },

  /* === METHODS === */
  methods: {

    /* download the file as md */
    onDownloadFile: function () {
      downloadFile(this.editorContent);
    },

    onCopyText: function () {
      navigator.clipboard.writeText(this.editorContent)
          .then(() => {
            this.copyButtonLabel = '✔ copied';
            this.toaster.show('✔ copied', false)

            setTimeout(() => {
              this.copyButtonLabel = 'copy text';
            }, 3000);

          })
    },

    onGeneratePreview: function () {
      this.previewData = marked(this.editorContent);
      this.isPreview = !this.isPreview;
    },

    /* on dropping file from desktop */
    onDropFile: function (event) {

      let files = event.dataTransfer.files;

      /* check if file is dropped, otherwise ignore the drop */
      if (files.length > 0) {

        const file = files[0]

        if (file.name.match(/.(md|txt|text|markdown)/i)) {
          let fileReader = new FileReader()
          fileReader.readAsText(files[0])

          fileReader.onload = () => {
            const text = fileReader.result

            if (text !== '') {
              this.editorContent = text
            }
          }
        } else {
          console.log('not a text file')
        }
      }

      this.isFileDropping = false
    },

    /* while file is being dropped */
    onDragOverFile: function () {
      this.isFileDropping = true
    },

    onDragLeave: function () {
      this.isFileDropping = false
    },

    onNewDocument: function () {
      this.isPreview = false
      this.editorContent = ""
    },

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
      font-size: 1.5em;
      line-height: 1.5em;
      margin-bottom: 1px;
    }

    .logo__icon {
      //margin: auto;
      // flex: 1;

      img {
        height: 32px;
        margin-right: 5px;
      }
    }

  }

  .header__button {

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border-radius: 3px;
    margin-left: 10px;
    padding: 5px;
    border: solid 1px #181818;
    color: #FF5370;
    background-color: #454545;
    transition: 280ms all ease-out;
    width: 32px;
    height: 32px;
    box-shadow: 0 0 5px #181818;

    i {
      //font-size: 1em;
      line-height: 1.5em;
      margin-top: -5px;
    }


    &:hover {
      .popup {
        display: inline;
      }
    }

  }

  .header__button:hover {
    background-color: #FF5370;
    border-color: #1E1E1E;
    color: #1E1E1E;
    box-shadow: 0 0 5px #FF5370;
  }

  .header__button:focus {
    outline: none;
  }

  .header__button-pressed {
    background-color: #FF5370;
    border-color: #1E1E1E;
    color: #1E1E1E;
    box-shadow: 0 0 5px #FF5370;
  }

}

/* header */


#notepad {

  display: flex; // make us of Flexbox
  align-items: center; // does vertically center the desired content
  justify-content: center; // horizontally centers single line items
  text-align: center; // optional, but helps horizontally center text that breaks into multiple lines

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
    //font-size: 1em;
    overflow-x: hidden;
  }

  .editor:focus {
    outline: #1E1E1E;
  }

  .editor__preview {

    height: 100%;
    width: 100%;

    //box-shadow: inset 0 0 5px black;
    border-radius: 5px;
    padding: 20px 10px;
    background-color: #181818;


    p {
      text-align: left;
      margin-bottom: 1.2em;
    }

    h1, h2 {
      margin-top: 1.2em;
      margin-bottom: 1em;
    }

    h3 {
      margin-top: 1em;
      margin-bottom: 0.8em;
    }
  }


  #drop-zone {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.5);
    color: #181818;
    padding: 20px;
    border-radius: 10px;
    backdrop-filter: blur(5px);
    font-weight: bold;

    pointer-events: none;

    h3 {
      font-weight: bold;
    }
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
