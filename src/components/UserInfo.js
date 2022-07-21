export default class UserInfo {
    constructor ({ name, about} ) {
        this._name = name;
        this._about = about;
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