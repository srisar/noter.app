export class Toaster {

    constructor(container) {
        this.toastContainer = container
        this.container = document.getElementById(container)
    }

    show(message = 'Hello, I am a toast', autohide = true, clickable = undefined) {

        let clickableArea = "";

        if (clickable !== undefined) {
            clickableArea = `<button id="btn-click-handler" class="btn btn-sm btn-light">${clickable.label}</button>`
        }

        const html =
            `
            <div class="toast text-white bg-dark border-0 show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="toast-body text-center w-100">
                        ${message} ${clickableArea}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" id="btn-toast-close" aria-label="Close"></button>
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


