let slide; // переменная слайда
let step = 0; //текущий шаг слайдера
let widthDeterminant = 1; //определение ширины контейнера dots
let animationSwitch = false; //true во время анимации

let leftBtn = document.querySelector('.btnLeft'); //обработчики событий кнопок
let rightBtn = document.querySelector('.btnRight');

let slidesArr = document.querySelectorAll('.slide');
let slidesSRC = []; //массив путей всех слайдов

//отрисовка слайдов при ошибке
let errorDisplay = document.querySelector('#slide');
let errorImg = document.createElement('img');
let errorText = document.createElement('h2');

//отрисовка слайдов с ошибками ( <0 ; >10)
function drawError() {
  errorDisplay.style.backgroundColor = '#0f794d';
  errorImg.classList.add('error-img');
  errorText.classList.add('error-text');
  errorDisplay.appendChild(errorImg);
  errorDisplay.appendChild(errorText);
}

//получаем коллекцию путей и удаляем все слайды
for (let i = 0; i < slidesArr.length; i++) {
  slidesSRC[i] = slidesArr[i].src;
  slidesArr[i].remove();
}

if (slidesArr.length == 0) {
  //Загружено 0 слайдов
  errorImg.src = 'SliderIMG/errors/error0.svg';
  errorText.textContent = 'Это слайдер. Нам нужен минимум 1 слайд.';
  drawError();
} else if (slidesArr.length > 10) {
  //Загружено более 10 слайдов
  errorImg.src = 'SliderIMG/errors/error12.svg';
  errorText.textContent = 'Многовато. Загрузите не более 10 слайдов.';
  drawError();
} else {
  //Нормальная работа слайдера
  //отрисовка dots
  function drawDots() {
    let dot = document.createElement('button');
    dot.classList.add('dot');
    dot.id = widthDeterminant;
    let dots = document.querySelector('.slider_dots-container');
    dots.appendChild(dot);
    dots.style.width = 50 * widthDeterminant + 'px';
  }

  //отрисовка слайда
  function draw() {
    slide = document.createElement('img');
    slide.src = slidesSRC[step];
    slide.classList.add('slide');
    slide.id = step + 1;
    document.querySelector('#slide').appendChild(slide);
  }

  //отрисовка первого кадра и dots при загрузке
  draw();
  for (let j = 1; j <= slidesSRC.length; j++) {
    drawDots();
    widthDeterminant++;
  }
  dotMarker();

  //соответствие dot - слайд
  function dotMarker() {
    let dots = document.querySelectorAll('.dot');
    for (dot of dots) {
      if (dot.id == slide.id) {
        dot.style.backgroundColor = ' #535353';
      } else {
        dot.style.backgroundColor = ' #808080';
      }
    }
  }

  //перелистывание вправо/влево; перемещение слайдов и удаление
  function drawRight() {
    animationSwitch = true;
    let slides = document.querySelectorAll('.slide');
    let offset = 1;
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.left = offset * 790 - 790 + 'px';
      offset++;
    }
  }

  function drawLeft() {
    animationSwitch = true;
    let slides = document.querySelectorAll('.slide');
    let offset = 1;
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.right = offset * 790 - 790 + 'px';
      offset++;
    }
  }

  //отрисовка по кнопкам и dots
  function drawOnRight() {
    if (animationSwitch == false) {
      if (step + 1 == slidesSRC.length) {
        step = 0;
      } else {
        step++;
      }
      draw();
      drawRight();
    }
  }

  function drawOnLeft() {
    if (animationSwitch == false) {
      if (step == 0) {
        step = slidesSRC.length - 1;
      } else {
        step--;
      }
      draw();
      drawLeft();
    }
  }

  let interval = 12; //скорость анимации
  let animation;

  function animationSlideLeft() {
    let slides = document.querySelectorAll('.slide');
    let d = 0;
    for (let slide of slides) {
      let r = window.getComputedStyle(slide, null).getPropertyValue('right');
      r = r.replace('px', '');
      r = Number(r);
      let slidesNumber = slides.length;
      animation = setInterval(() => {
        slide.style.right = r + d + 'px';
        d = d - 10;
        let stop = -800 * (slidesNumber - 1);
        console.log(d);
        if (d == stop) {
          clearInterval(animation);
          for (let i = 0; i < slidesNumber - 1; i++) {
            slides[i].remove();
          }
          slides[slidesNumber - 1].style.removeProperty('right');
          animationSwitch = false;
        }
      }, interval);
    }
  }

  function animationSlideRight() {
    let slides = document.querySelectorAll('.slide');
    let d = 0;
    for (let slide of slides) {
      let l = window.getComputedStyle(slide, null).getPropertyValue('left');
      l = l.replace('px', '');
      l = Number(l);
      let slidesNumber = slides.length;
      animation = setInterval(() => {
        slide.style.left = l + d + 'px';
        d = d - 10;
        let stop = -800 * (slidesNumber - 1);
        console.log(d);
        if (d == stop) {
          clearInterval(animation);
          animation = null;
          while (animation !== null) {
            animation = null;
          }
          for (let i = 0; i < slidesNumber - 1; i++) {
            slides[i].remove();
          }
          slides[slidesNumber - 1].style.removeProperty('left');
          animationSwitch = false;
        }
      }, interval);
    }
  }

  //Обработчики нажатия кнопок R/L
  rightBtn.addEventListener('click', () => {
    if (animationSwitch == false && slidesSRC.length != 1) {
      drawOnRight();
      animationSlideRight();
      dotMarker();
    }
  });

  leftBtn.addEventListener('click', () => {
    if (animationSwitch == false && slidesSRC.length != 1) {
      drawOnLeft();
      animationSlideLeft();
      dotMarker();
    }
  });

  //обработчик листания dots
  let dots = document.querySelectorAll('.dot');
  for (let dot of dots) {
    dot.addEventListener('click', () => {
      let repeat;
      interval = 20;
      if (dot.id != slide.id && animationSwitch == false) {
        if (dot.id > slide.id) {
          repeat = dot.id - slide.id;
          for (let i = 0; i < repeat; i++) {
            step++;
            draw();
            drawRight();
          }
          animationSlideRight();
          animationSwitch == false;
        } else {
          repeat = slide.id - dot.id;
          for (let i = 0; i < repeat; i++) {
            step--;
            draw();
            drawLeft();
          }
          animationSlideLeft();
          animationSwitch == false;
        }
        centr();
        dotMarker();
      }
    });
  }

  //выравнивание слайда в завершение анимации
  function centr() {
    let slides = document.querySelectorAll('.slide');
    for (let item of slides) {
      item.style.removeProperty('left');
      item.style.removeProperty('right');
    }
  }
}
