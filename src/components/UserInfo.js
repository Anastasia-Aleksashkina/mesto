export default class UserInfo {
    constructor (obj) {
        this._name = document.querySelector(obj.nameSelector);
        this._about = document.querySelector(obj.aboutSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent,
        }
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
    }
}