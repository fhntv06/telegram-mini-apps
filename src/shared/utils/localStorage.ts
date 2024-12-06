export const getStorage = (name: string = 'token') => {
    const value = localStorage.getItem(name)
    return (value && value !== 'undefined') ? value : ''
}

export const setStorage = (name = 'token', value: string) => {
    localStorage.setItem(name, value)
}

export const removeStorage = (name: string = 'token') => {
    localStorage.removeItem(name)
};
