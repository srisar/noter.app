export class Toaster {

    constructor(container) {
        this.toastContainer = container
        this.container = document.getElementById(container)
    }

    show(message = 'Hello, I am a toast', clickable = undefined, autohide = true) {

        let clickableArea = "";

        if (clickable !== undefined) {
            clickableArea = `<button id="btn-click-handler" class="btn btn-sm btn-dark">${clickable.label}</button>`
        }

        const html =
            `
            <div class="position-fixed bottom-0 d-flex align-items-center justify-content-center p-3">
                <div class="toast align-items-center text-white bg-secondary border-0 show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                <div class="toast-body">
                    ${message} ${clickableArea}
                </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" id="btn-toast-close" aria-label="Close"></button>
                </div>
                </div>
            </div>
            `
        this.container.innerHTML = html

        document.querySelector("#btn-toast-close").addEventListener("click", () => {
            this.hide()
        })

        if (clickableArea !== "") {
            document.querySelector('#btn-click-handler').addEventListener("click", function () {
                clickable.func()
            })
        }

        if (autohide) {
            setTimeout(() => {
                this.hide()
            }, 5000)
        }

    }

    hide() {
        this.container.innerHTML = ""
    }
}


