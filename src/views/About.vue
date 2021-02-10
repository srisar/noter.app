<template>
  <div class="about">
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8">
          <h1 class="text-center">about noter.app</h1>

          <div class="app__icon my-3 text-center">
            <span class="app__icon__icon">
              <img src="@/assets/notebook.svg" alt="">
            </span>
          </div>

          <p>noter is a small note-taking app that utilized the html5 storage mechanism to temporarily and quickly store what you have written.</p>
          <p>the purpose of this simple, mostly useless app is to keep track of notes which need google input tools (tamil) to be able to type on. this is why desktop solutions don’t work for me.
            Since i write articles for my blog, i use markdown for styling, so as an added feature, i have added markdown preview and download options.</p>

          <p>it uses <a href="https://github.com/markedjs/marked" target="_blank">marked</a> for markdown preview and <a href="https://vuejs.org/" target="_blank">vue.js</a> for the ui.</p>

          <p>if you find it useful, i will be glad.</p>

          <div class="d-flex align-items-center justify-content-center mt-5">
            <router-link class="" to="/">
              back to editor
            </router-link>
          </div>

          <div class="text-center mt-2">
            <hr>
            <p>from in srilanka with ❤.</p>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

a {
  color: #ff9800;
  text-decoration: none;
}

a:hover{
  color: #FF5370;
}

.app__icon {

  .app__icon__icon {
    background-color: white;
    padding: 20px;
    border-radius: 50%;
    display: inline-block;
    border: solid 1px #ff9800;
    box-shadow: inset 0 0 10px 2px #1E1E1E;

    img {
      width: 64px;
    }
  }
}

.button {
  width: 30px;
  height: 30px;
  border: solid 1px #FF5370;
  border-radius: 50%;
  font-size: 1em;
  color: #FF5370;
  background-color: #181818;
  margin-left: 10px;
  display: block;
}

.button:hover {
  background-color: #FF5370;
  color: #181818;
}

</style>
