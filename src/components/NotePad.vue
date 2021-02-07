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
          <button class="header__button" @click="onDownloadFile"><i class="bi bi-download"></i></button>
          <button class="header__button" @click="onCopyText"><i class="bi" :class="[icons.buttonCopy]"></i></button>
          <button class="header__button" @click="onGeneratePreview"><i class="bi bi-markdown-fill"></i></button>
        </div><!-- right-side -->

      </div>

    </div><!-- header -->

    <div id="notepad" class="flex-item padding-5">
      <textarea v-if="!isPreview" class="editor" v-model="editorData"></textarea>
      <div v-else class="editor" v-html="previewData"></div>
    </div><!-- notepad -->

    <div id="footer" class="flex-item padding-5">
      <div class="footer__content">
        Developed by <a href="https://gravitide.dev">gravitide.dev</a> | Version {{ appVersion }}
      </div>
    </div><!-- footer -->

  </div>
</template>

<script>

const KEY = 'content';

import {downloadFile} from "@/helpers/downloader";

const marked = require('marked');

export default {
  name: "NotePad",

  data() {
    return {
      appVersion: '0.2',
      editorData: "",
      previewData: "",

      isPreview: false,

      icons: {
        buttonCopy: 'bi-clipboard'
      },

    }
  },

  computed: {
    //
  },

  watch: {
    editorData: function (value) {
      this._putIntoLocalStorage(KEY, value);
    },
  },

  mounted() {

    let storedData = this._getFromLocalStorage(KEY);
    if (storedData !== null) {
      this.editorData = storedData;
    } else {
      this.editorData = "## Doc Title ## \n Hey! start type something.";
    }

  },

  methods: {
    //

    _putIntoLocalStorage: function (key, data) {

      if (typeof (Storage) !== undefined) {
        localStorage.setItem(key, data);
        return true;
      }
      return false;

    },

    _getFromLocalStorage: function (key) {
      if (typeof (Storage) !== undefined) {
        return localStorage.getItem(key);
      }
      return null;
    },

    onDownloadFile: function () {
      downloadFile('document.md', this.editorData);
    },

    onCopyText: function () {
      navigator.clipboard.writeText(this.editorData)
          .then(() => {
            this.icons.buttonCopy = 'bi-clipboard-check';

            setTimeout(() => {
              this.icons.buttonCopy = 'bi-clipboard';
            }, 3000);

          })
    },

    onGeneratePreview: function () {
      this.previewData = marked(this.editorData);
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


/* === special components === */

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
  }

  .editor:focus {
    outline: #1E1E1E;
  }

}


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
    //padding: 10px;
    width: 30px;
    height: 30px;
    border: solid 1px #FF5370;
    border-radius: 50%;
    font-size: 1em;
    color: #FF5370;
    background-color: #181818;
    margin-left: 10px;
  }

  .header__button:hover {
    background-color: #FF5370;
    color: #181818;
  }

  .header__button:focus {
    outline: none;
  }

}

/* header */

#footer {
  display: flex;
  justify-content: center;

  .footer__content {
    font-size: 0.9em;

    a {
      color: #FF5370;
      text-decoration: none;
      display: inline-block;
      padding: 2px 5px;
    }

    a:hover {
      background-color: #FF5370;
      color: white;

    }

  }
}

/* footer */


</style>
