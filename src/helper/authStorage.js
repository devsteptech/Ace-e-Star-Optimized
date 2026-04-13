const ADMIN_TOKEN_KEY = "admin_token";
const USER_TOKEN_KEY = "user_token";
function pickStorage(type) {
    return type === "local" ? localStorage : sessionStorage;
}
export const authStorage = {
    getAdminToken() {
        return localStorage.getItem(ADMIN_TOKEN_KEY) || sessionStorage.getItem(ADMIN_TOKEN_KEY);
    },
    setAdminToken(token, storage) {
        pickStorage(storage).setItem(ADMIN_TOKEN_KEY, token);
    },
    clearAdminToken() {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    },
    getUserToken() {
        return localStorage.getItem(USER_TOKEN_KEY) || sessionStorage.getItem(USER_TOKEN_KEY);
    },
    setUserToken(token, storage) {
        pickStorage(storage).setItem(USER_TOKEN_KEY, token);
    },
    clearUserToken() {
        localStorage.removeItem(USER_TOKEN_KEY);
        sessionStorage.removeItem(USER_TOKEN_KEY);
    },
};
