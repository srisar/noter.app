const _ = require('lodash')

export function downloadFile(content) {


    let fileName = 'document.md'
    fileName = _.split(content, '\n', 1)[0]
    fileName = _.join(_.words(fileName), '-') + ".md"

    let element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
    element.setAttribute('download', fileName)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}
