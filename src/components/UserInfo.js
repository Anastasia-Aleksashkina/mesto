export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.nameSelector);
    this._about = document.querySelector(data.aboutSelector);
    this._avatar = document.querySelector(data.avatarSelector);
  }

  // Получение информации о пользователе
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
  }

  // Изменение информации о пользователе
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
