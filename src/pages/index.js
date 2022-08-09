import "./../pages/index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithAccept from "../components/PopupWithAccept.js";
import UserInfo from "../components/UserInfo.js";
import {
  popupUser,
  popupCard,
  popupImage,
  popupAvatar,
  popupAccept,
  profileButton,
  сardButton,
  avatarButton,
  cardListSelector,
  formElementUser,
  formElementCard,
  formElementAvatar,
  validationConfig,
} from "../utils/constants.js";

let userId;

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-47",
  headers: {
    authorization: "57fe7532-adaf-4e02-b40f-30da1bce78cd",
    "Content-Type": "application/json",
  },
});

const profileInfo = new UserInfo({
  nameSelector: ".profile__user-name",
  aboutSelector: ".profile__user-about",
  avatarSelector: ".profile__avatar-img",
});

// Создание экземпляра карточки
const createCard = (data) => {
  const card = new Card(data, "#element-template", openImage, {
    userId: userId,
    handleDeleteCard: () => {
      acceptPopup.open(data);
      acceptPopup.setSubmitAction({
        handleSubmitAction: () => {
          api
            .deleteCard(data)
            .then(() => {
              acceptPopup.close();
              card.delete();
            })
            .catch((err) => console.log(err));
        },
      });
    },
    handleLikeCard: () => {
      api
        .putLikeCard(data)
        .then((res) => {
          card.likesCounter(res.likes);
          card.like();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleDisLikeCard: () => {
      api
        .deleteLikeCard(data)
        .then((res) => {
          card.likesCounter(res.likes);
          card.disLike();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
  });
  const cardElement = card.generateCard();
  return cardElement;
};

// Рендер карточек
const cardList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  },
  cardListSelector
);

// Попап добавления нового места
const newCardPopup = new PopupWithForm(popupCard, {
  submitForm: handlerCardSubmit,
});

// Попап с картинкой
const imagePopup = new PopupWithImage(popupImage);
const openImage = (name, link) => {
  imagePopup.open(name, link);
};

// Попап подтверждения удаления моей карточки
const acceptPopup = new PopupWithAccept(popupAccept, {
  submitForm: () => acceptPopup.submitAction(),
});

// Попап изменения профиля
const profilePopup = new PopupWithForm(popupUser, {
  submitForm: handlerProfileSubmit,
});

// Попап изменения аватара
const avatarPopup = new PopupWithForm(popupAvatar, {
  submitForm: handlerAvatarSubmit,
});

// Отправка данных формы изменения профиля
function handlerProfileSubmit(data) {
  profilePopup.renderLoadingView(true, "Сохранение...");
  api
    .changeProfile(data)
    .then((res) => {
      profileInfo.setUserInfo(res);
      profilePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      profilePopup.renderLoadingView(false);
    });
}

// Отправка данных формы изменения аватара
function handlerAvatarSubmit(data) {
  avatarPopup.renderLoadingView(true, "Сохранение...");
  api
    .changeAvatar(data)
    .then((res) => {
      profileInfo.setUserInfo(res);
      avatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      avatarPopup.renderLoadingView(false);
    });
}

// Отправка данных формы добавления нового места
function handlerCardSubmit(data) {
  newCardPopup.renderLoadingView(true, "Сохранение...");
  api
    .addCard(data)
    .then((res) => {
      cardList.addItem(createCard(res));
      newCardPopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      newCardPopup.renderLoadingView(false);
    });
}

// Получение данных сервера при загрузке страницы
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
    userId = data._id;
    profileInfo.setUserInfo(data);
    cardList.renderItems(cards.reverse());
    console.log(userId);
  })
  .catch((err) => console.log(err));

// Обработчики событий

// Открытие попапа добавления нового места
сardButton.addEventListener("click", () => {
  newCardPopup.open();
  addFormValidation.resetValidation();
});

// Открытие попапа изменения аватара
avatarButton.addEventListener("click", () => {
  avatarPopup.open();
  avatarFormValidation.resetValidation();
});

// Открытие попапа изменения профиля
profileButton.addEventListener("click", () => {
  const info = profileInfo.getUserInfo();
  profilePopup.setInputValues(info);
  profilePopup.open();
  userFormValidation.resetValidation();
  userFormValidation.disabledButton();
});

// Валидация форм
const userFormValidation = new FormValidator(formElementUser, validationConfig);
const addFormValidation = new FormValidator(formElementCard, validationConfig);
const avatarFormValidation = new FormValidator(
  formElementAvatar,
  validationConfig
);
userFormValidation.enableValidation();
addFormValidation.enableValidation();
avatarFormValidation.enableValidation();

// Установка слушателей
newCardPopup.setEventListeners();
imagePopup.setEventListeners();
acceptPopup.setEventListeners();
avatarPopup.setEventListeners();
profilePopup.setEventListeners();
