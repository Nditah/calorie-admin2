export function setLocalStorage(name, value, expires) {
    if (expires === undefined || expires === null) {
        expires = (24*60*60);
    } else {
        expires = Math.abs(expires);
    }

    const now = Date.now();
    const schedule = now + expires*1000;
    try {
        if (typeof value === 'string' || typeof value === 'number') {
            this.utilsService.setLocalStorage(name, `${value}`);
        } else {
            this.utilsService.setLocalStorage(name, (value));
        }
        this.utilsService.setLocalStorage(`${name}_expiresIn`, schedule);
        return true
    } catch(e) {
        console.log("Error: " + e);
        return false;
    }
}

export function getLocalStorage(name) {
    const now = Date.now();

    let expiresIn = this.utilsService.getLocalStorage(`${name}_expiresIn`);
    if (expiresIn === undefined || expiresIn === null) {
        expiresIn = 0;
    }

    if (expiresIn < now) {
        removeLocalStorage(name);
        return null;
    } else {
        if (propsExist(name, window.localStorage)) {
            const getItem = this.utilsService.getLocalStorage(name)
            try {
                return JSON.parse(getItem);
            } catch (e) {
                return getItem;
            }
        } else {
            return false;
        }
    }
}

export function removeLocalStorage(name) {
    try{
        this.utilsService.removeLocalStorage(name);
        this.utilsService.removeLocalStorage(`${name}_expiresIn`);
    } catch (e) {
        console.log("Error: ", e);
        return false;
    }
    return true;
}

export function nextDate(d = 1) {
    return new Date(new Date().setDate(new Date().getDate() + d));
}

export function getStringDate(dateObject) {
    if (propsExist('year', dateObject) && propsExist('month', dateObject) && propsExist('day', dateObject)) {
        return `${dateObject['year']}-${dateObject['month']}-${dateObject['day']}`
    }
    return false;
}

export function formatMoney(n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

export function propsExist(name, objectData) {
    return Object.prototype.hasOwnProperty.call(objectData, name);
}
