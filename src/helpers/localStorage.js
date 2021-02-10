const STORAGE_ERROR = 'Local store not available'

export function storageExist() {
    return typeof (Storage) !== undefined
}

export function put(key, value) {

    if (storageExist()) {
        localStorage.setItem(key, value)
    } else {
        throw STORAGE_ERROR
    }
}

export function get(key) {
    if (storageExist()) {

        const data = localStorage.getItem(key)
        if (data == null) throw STORAGE_ERROR

        return data

    } else {
        throw STORAGE_ERROR
    }
}
