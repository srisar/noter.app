/*
* Thanks for the code
* https://css-tricks.com/snippets/javascript/support-tabs-in-textareas/
*
* */

HTMLTextAreaElement.prototype.getCaretPosition = function () { //return the caret position of the textarea
    return this.selectionStart
}

HTMLTextAreaElement.prototype.setCaretPosition = function (position) { //change the caret position of the textarea
    this.selectionStart = position
    this.selectionEnd = position
    this.focus();
}

HTMLTextAreaElement.prototype.hasSelection = function () { //if the textarea has selection then return true
    return this.selectionStart !== this.selectionEnd
}

HTMLTextAreaElement.prototype.getSelectedText = function () { //return the selection text
    return this.value.substring(this.selectionStart, this.selectionEnd)
};

HTMLTextAreaElement.prototype.setSelection = function (start, end) { //change the selection area of the textarea
    this.selectionStart = start
    this.selectionEnd = end
    this.focus()
}


export function enableTabbing() {
    let textarea = document.getElementsByTagName('textarea')[0];

    textarea.onkeydown = function (event) {

        //support tab on textarea
        if (event.keyCode === 9) { //tab was pressed
            let newCaretPosition;
            newCaretPosition = textarea.getCaretPosition() + "    ".length;
            textarea.value = textarea.value.substring(0, textarea.getCaretPosition()) + "    " + textarea.value.substring(textarea.getCaretPosition(), textarea.value.length);
            textarea.setCaretPosition(newCaretPosition);
            return false;
        }
        if (event.keyCode === 8) { //backspace
            if (textarea.value.substring(textarea.getCaretPosition() - 4, textarea.getCaretPosition()) === "    ") { //it's a tab space
                let newCaretPosition;
                newCaretPosition = textarea.getCaretPosition() - 3;
                textarea.value = textarea.value.substring(0, textarea.getCaretPosition() - 3) + textarea.value.substring(textarea.getCaretPosition(), textarea.value.length);
                textarea.setCaretPosition(newCaretPosition);
            }
        }
        if (event.keyCode === 37) { //left arrow
            let newCaretPosition;
            if (textarea.value.substring(textarea.getCaretPosition() - 4, textarea.getCaretPosition()) === "    ") { //it's a tab space
                newCaretPosition = textarea.getCaretPosition() - 3;
                textarea.setCaretPosition(newCaretPosition);
            }
        }
        if (event.keyCode === 39) { //right arrow
            let newCaretPosition;
            if (textarea.value.substring(textarea.getCaretPosition() + 4, textarea.getCaretPosition()) === "    ") { //it's a tab space
                newCaretPosition = textarea.getCaretPosition() + 3;
                textarea.setCaretPosition(newCaretPosition);
            }
        }
    }
}
