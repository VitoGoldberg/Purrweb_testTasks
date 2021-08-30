let step = 0; //текущий шаг слайдера
let offset = 750; //смещение слайдов

let slides = document.querySelectorAll('.slide');
let slidesSRC = [];

//получаем коллекцию путей и удаляем все слайды
for (let i = 0; i < slides.length; i++) {
  slidesSRC[i] = slides[i].src;
  slides[i].remove();
}
console.log(slidesSRC);
//отрисовка слайда
function drawSlide() {
  let slide = document.createElement('img');
  slide.src = slides[step];
  slide.classList.add('.slide');
  slide.style.left = offset*750 + 'px';
  document.querySelector('#slide').appendChild(slide);
}

drawSlide();