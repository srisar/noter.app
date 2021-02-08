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
      appVersion: '0.4',
      editorData: "",
      previewData: "",

      isPreview: false,

      copyButtonLabel: 'copy',

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
            this.copyButtonLabel = '✔ copied';

            setTimeout(() => {
              this.copyButtonLabel = 'copy text';
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
  display: flex;
  justify-content: center;

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
