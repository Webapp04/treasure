export const localStorageSet = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const localStorageGet = (key, defaultValue) => {
    let data = defaultValue;

    try {
        data = JSON.parse(localStorage.getItem(key));
    } catch (err) {
        console.warn(err?.message);
    }

    return data || defaultValue;
};

export const localStorageRemove = (key) => localStorage.removeItem(key);
