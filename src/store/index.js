import Vue from 'vue'
import Vuex from 'vuex'

import {put, get} from "@/helpers/localStorage";

const voca = require('voca')


Vue.use(Vuex)


const EDITOR_CONTENT = 'editor:content'
const CONFIG = 'config'

export default new Vuex.Store({
    state: {

        editor: {
            content: "",
            wordCount: 0
        },

        config: {
            fontSize: 14,
            fontFace: 'monospace'
        }

    },

    getters: {
        getEditorContent: state => {
            return state.editor.content
        },

        getWordCount: state => {
            return state.editor.wordCount
        },

        getConfig: state => {
            return state.config
        },
    },
    mutations: {
        setEditorContent: function (state, data) {
            state.editor.content = data
            state.editor.wordCount = voca.countWords(data)
        },

        setWordCount: function (state, wordCount) {
            state.editor.wordCount = wordCount
        },

        setConfig: function (state, config) {
            state.config = config
        },
    },

    actions: {

        /* save editor content into local storage */
        putEditorContentInStore: function ({state}) {

            return new Promise((resolve, reject) => {
                try {
                    put(EDITOR_CONTENT, state.editor.content)
                    resolve()

                } catch (e) {
                    reject(e)
                }
            });

        },

        /* get editor content from local storage */
        getEditorContentFromStore: function ({commit}) {
            return new Promise((resolve, reject) => {
                try {

                    const data = get(EDITOR_CONTENT)
                    commit('setEditorContent', data)
                    commit('setWordCount', voca.countWords(data))

                    resolve(data)

                } catch (e) {
                    reject(e)
                }
            })
        },

        saveConfigToStore: function ({state, commit}, config) {

            return new Promise((resolve, reject) => {

                commit('setConfig', config)

                try {
                    put(CONFIG, JSON.stringify(state.config))
                    resolve()
                } catch (e) {
                    reject(e)
                }
            })

        },

        getConfigFromStore: function ({commit}) {

            return new Promise((resolve, reject) => {

                try {
                    const configString = get(CONFIG)
                    commit('setConfig', JSON.parse(configString))

                    resolve()

                } catch (e) {
                    reject(e)
                }
            })
        },


    },
    modules: {}
})
