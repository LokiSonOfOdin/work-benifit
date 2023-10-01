const cards = Array.from(document.querySelectorAll(".gallery__card"));
const picture = Array.from(document.querySelectorAll(".gallery__item"));
const slider = document.querySelector(".gallery__slider");
const sliderContainer = document.querySelector(".gallery__slider-container");
const sliderBtnLeft = document.querySelector(".gallery__btn-left");
const sliderBtnRight = document.querySelector(".gallery__btn-right");
const sliderBtnClose = document.querySelector(".gallery__slider-close");

let cardIndex = -1;
let pictureFull;
let newPictureFull;

for (const card of cards) {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    cardIndex = cards.indexOf(card);
    pictureFull = picture[cardIndex].cloneNode();
    sliderContainer.append(pictureFull);
    slider.classList.add("active");
  });
}

sliderBtnLeft.addEventListener("click", (e) => {
  e.preventDefault();
  changePicture("left");
});
sliderBtnRight.addEventListener("click", (e) => {
  e.preventDefault();
  changePicture("right");
});

function changePicture(dir) {
  if (dir === "left") {
    if (cardIndex > 0) {
      cardIndex--;
    } else {
      cardIndex = cards.length - 1;
    }
  } else if (dir === "right") {
    if (cardIndex < cards.length - 1) {
      cardIndex++;
    } else {
      cardIndex = 0;
    }
  }
  let newPictureFull = picture[cardIndex].cloneNode();
  pictureFull.replaceWith(newPictureFull),
  pictureFull = newPictureFull;
}

sliderBtnClose.addEventListener("click", (e) => {
  e.preventDefault();
  slider.classList.remove("active");
  pictureFull.remove();
})

document.querySelector(".gallery__slider .gallery__slider-container").addEventListener('click', event => {
  event._isClickWithInModal = true;
});
document.querySelector(".gallery__slider").addEventListener('click', event => {
  if (event._isClickWithInModal) return;
  event.currentTarget.classList.remove('active');
});

window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
      document.querySelector(".gallery__slider").classList.remove("active")
  }
});

new Swiper(".swipers", {
  spaceBetween: 15,
  direction: "horizontal",
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


const modal = document.getElementById("my-modal");
const closePopup = document.getElementById("close-my-modal-btn");
function openModal() {
  modal.classList.add("open")
}

// Закрыть модальное окно
closePopup.addEventListener("click", function() {
  modal.classList.remove("open")
})

// Закрыть модальное окно при нажатии на Esc
window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("open")
  }
});

// Закрыть модальное окно при клике вне его
document.querySelector("#my-modal .modal__box").addEventListener('click', event => {
  event._isClickWithInModal = true;
});
document.getElementById("my-modal").addEventListener('click', event => {
  if (event._isClickWithInModal) return;
  event.currentTarget.classList.remove('open');
});

const URI_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;
const formTg = document.getElementById('tg');
const success = document.querySelector('.form__success')

formTg.addEventListener('submit', function(e) {
  e.preventDefault();
  
  let message = `<b>Заявка с Сайта</b>\n`;
  message += `<b>Имя отправителя: ${ this.name.value }</b>\n`
  message += `<b>Телефон отправителя: ${ this.tel.value }</b>\n`;
  message += `<b>Что интересует: ${ this.text.value }</b>`;

  axios.post(URI_API, {
    chat_id: CHAT_ID,
    parse_mode: 'html',
    text: message
  })
  .then((res) => {
    this.name.value = "";
    this.tel.value = "";
    this.text.value = "";
    success.style.display = "block";
    setTimeout(() => success.style.display = "none", 3000);
  })
  .catch((err) => {
    console.warn(err);
  })
  .finally(() => {
    console.log('end');
  })
})