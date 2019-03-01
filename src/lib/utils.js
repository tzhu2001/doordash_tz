/**
 * Stores the provided `value` with the provided `name` in a cookie.
 * `expiresIn` is the number of days the data will be persisted. Defaults to 360 days.
 */
function setCookie(name, value, expiresIn) {
    if (!expiresIn) {
        expiresIn = 360;
    }

    const d = new Date();
    d.setTime(d.getTime() + expiresIn * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
}

/**
 * Gets the value of `name` from the stored cookie or null if not found
 */
function getCookie(name) {
    const cookieName = `${name}=`;

    const decodedCookie = decodeURIComponent(document.cookie);
    const allCookies = decodedCookie
        .split(";")
        .map((cookie) => cookie.trim());

    for (const cookie of allCookies) {
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }

    return null;
}


/**
 * Gets the value of `login_name` from the stored cookie
 */
export function getUserLogin() {
    const login = getCookie("login_name");
    return login || '';
}
/**
 * Stores a user's setting in the cookie
 */
export function setUserSetting(name, setting, expiresIn) {
    if (setting === undefined || setting === null || setting === "null") {
        return;
    }
    setCookie(`${getUserLogin()}::${name}`, setting, expiresIn);
}

/**
 * Gets a user setting from the cookie
 */
export function getUserSetting(name, defaultValue) {
    const value = getCookie(`${getUserLogin()}::${name}`);
    return value && value !== "null" ? value : defaultValue;
}

let PLATFORM = '';

export function getPlatform() {
    const platforms = ['linux','win','mac','iphone','ipad','android']

    if (PLATFORM === '' ){
        for (let p of platforms) {
            if (navigator.platform.toLowerCase().indexOf(p) !== -1) {
                PLATFORM = p;
            }
        }    
    }
    return PLATFORM;
}

/**
 * getUrlVar("variable") will return "value" from http://domain/some_url?variable=value
 * and will return true for "variable2" from http://domain/some_url?variable=value&variable2
 */
export function getUrlVar(variable, defaultValue) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (const raw of vars) {
        if (raw.indexOf("=") === -1 && decodeURIComponent(raw) === variable) {
            return true;
        }

        const pair = raw.split("=");

        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }

    return defaultValue;
}

export async function simpleGet(url) {
    try {
        const response = await fetch(url, {            
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            method: "GET",
            referrer: "no-referrer",
        });
        return await response.json();
    } catch (e) {
        throw new Error(e.statusText);
    }
}

export async function simplePost(url, data) {
    try {
        const response = await fetch(url, {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            method: "POST",
            referrer: "no-referrer",
        });
        return await response.json();
    } catch (e) {
        throw new Error(e.statusText);
    }
}
