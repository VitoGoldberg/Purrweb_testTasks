//let slide; // переменная слайда
let step = 0; //текущий шаг слайдера
let widthDeterminant = 1; //определение ширины контейнера dots
let animationSwitch = false; //true во время анимации
let slidesDirection; //true - для отрисовки справа/слева; ...=row/row-reverse

let leftBtn = document.querySelector('.btnLeft'); //обработчики событий кнопок
let rightBtn = document.querySelector('.btnRight');

let slidesArr = document.querySelectorAll('.slide');
let slidesSRC = []; //массив путей всех слайдов

//отрисовка слайдов (также при ошибке)
let frame = document.querySelector('.slides-container');
//let slide = document.createElement('img');
let addErrorText = document.createElement('h2');

//отрисовка слайдов с ошибками (при количестве <0 ; >10)
function drawError() {
  let slide = document.createElement('img');
  frame.style.backgroundColor = '#0f794d';
  slide.classList.add('error-img');
  addErrorText.classList.add('error-text');
  frame.appendChild(slide);
  frame.appendChild(addErrorText);
}

//получаем коллекцию путей и удаляем все слайды
for (let i = 0; i < slidesArr.length; i++) {
  slidesSRC[i] = slidesArr[i].src;
  slidesArr[i].remove();
}

if (slidesArr.length == 0) {
  //---Загружено 0 слайдов---//
  slide.src = 'SliderIMG/errors/error0.svg';
  addErrorText.textContent = 'Это слайдер. Нам нужен минимум 1 слайд.';
  drawError();
} else if (slidesArr.length > 10) {
  //---Загружено более 10 слайдов---//
  slide.src = 'SliderIMG/errors/error12.svg';
  addErrorText.textContent = 'Многовато. Загрузите не более 10 слайдов.';
  drawError();
} else {
  //---Нормальная работа слайдера---//
  //отрисовка dots
  function drawDots() {
    let dot = document.createElement('button');
    dot.classList.add('dot');
    dot.id = widthDeterminant;
    let dotsContainer = document.querySelector('.slider_dots-container');
    dotsContainer.appendChild(dot);
    dotsContainer.style.width = 50 * widthDeterminant + 'px';
  }

  //отрисовка слайда
  function draw() {
    let slide = document.createElement('img');
    slide.src = slidesSRC[step];
    slide.classList.add('slide');
    slide.id = step + 1;
    frame.appendChild(slide);
  }

  //соответствие dot - слайд, обновление id dot
  function dotMarker() {
    let dots = document.querySelectorAll('.dot');
    /*console.log(dots)
    for (let j = 0; j <= slidesSRC.length; j++) {
      dots[j].id = 'j + 1';
    }*/
    let currentSlide = document.querySelector('.slide');
    for (let dot of dots) {
      if (dot.id == currentSlide.id) {
        dot.style.backgroundColor = '#535353';
      } else {
        dot.style.backgroundColor = '#808080';
      }
    }
  }

  //отрисовка первого кадра при загрузке
  draw();

  //отрисовка dots при загрузке
  for (let j = 1; j <= slidesSRC.length; j++) {
    drawDots();
    widthDeterminant++;
  }
  dotMarker();

  //--пересчет и расположение слайдов в контейнере--//
  //для переключения flex-direction: контейнера (отрисовка слева или справа)

  function calcSlidesDirection() {
    frame.style.removeProperty('flexDirection');
    if (slidesDirection == true) {
      frame.style.flexDirection = 'row';
    } else {
      frame.style.flexDirection = 'row-reverse';
    }
  }

  //назначение слайдам отступов при отрисоке справа/слева
  function marginOnRight() {
    let slides = document.querySelectorAll('.slide');
    for (let i = 0; i < slides.length - 1; i++) {
      slides[i].style.marginRight = 25 + 'px';
    }
  }

  function marginOnLeft() {
    let slides = document.querySelectorAll('.slide');
    for (let i = 0; i < slides.length - 1; i++) {
      slides[i].style.marginLeft = 25 + 'px';
    }
    //стартовое смещение рамки со слайдами
    frame.style.left =
      -document.querySelector('.slides-container').offsetWidth + 750 + 'px';
  }

  //отрисовка следующих слайдов по кнопкам и dots
  function drawOnRight() {
    if (step + 1 == slidesSRC.length) {
      step = 0;
    } else {
      step++;
    }
    draw();
  }

  function drawOnLeft() {
    if (step == 0) {
      step = slidesSRC.length - 1;
    } else {
      step--;
    }
    draw();
  }

  //--Обработка анимации--//
  let interval = 30; //скорость анимации
  let acceleration; //ускорение анимации
  //let offsetFrame; //необходимое смещение полосы слайдов

  //--Анимация движения--//
  function animationSlides() {
    //итерация
    let count = 0;
    let offsetStep = 10; //смещение за 1 срабатывание
    let stopAnimation = false; //switch на стоп анимации
    let frameWidth = document.querySelector('.slides-container').offsetWidth;

    if (slidesDirection == false) {
      offsetStep = acceleration * offsetStep;
    } else {
      offsetStep = -acceleration * offsetStep;
    }

    animationPlay = setInterval(() => {
      let drawingOffset = frame.style.left;
      drawingOffset = drawingOffset.replace('px', '');
      drawingOffset = Number(drawingOffset);

      calcOffset = offsetStep * count;
      currentOffset = drawingOffset + calcOffset;
      frame.style.left = currentOffset + 'px';

      //вычисления момента остановки
      if (slidesDirection == true) {
        if (drawingOffset <= -frameWidth + 750) {
          stopAnimation = true;
        } else {
          stopAnimation = false;
        }
      } else {
        if (drawingOffset >= 0) {
          stopAnimation = true;
        } else {
          stopAnimation = false;
        }
      }

      if (stopAnimation == true) {
        clearInterval(animationPlay);
        //console.log('stop');
        deleteSlides();
      }
      count++;
    }, interval);
  }

  //удаление всех слайдов, кроме текущего, в конце анимации
  function deleteSlides() {
    let slides = document.querySelectorAll('.slide');
    for (let i = 0; i < slides.length - 1; i++) {
      slides[i].remove();
    }
    //включение возможности следующей анимации слайдера
    animationSwitch = false;
    slidesDirection = 0;
    //выравнивание контейнера слайдов в завершение анимации
    //frame.style.removeProperty('left');
    frame.style.left = 0 + 'px';
    dotMarker();
  }

  //--Обработчики нажатия элементов управления--//
  //Обработчики нажатия кнопок R/L
  rightBtn.addEventListener('click', () => {
    if (animationSwitch == false && slidesSRC.length != 1) {
      animationSwitch = true;
      slidesDirection = true;
      calcSlidesDirection();
      drawOnRight();
      marginOnRight();
      acceleration = 1.5;
      animationSlides();
    }
  });

  leftBtn.addEventListener('click', () => {
    if (animationSwitch == false && slidesSRC.length != 1) {
      animationSwitch = true;
      slidesDirection = false;
      calcSlidesDirection();
      drawOnLeft();
      marginOnLeft();
      acceleration = 1.5;
      animationSlides();
    }
  });

  //обработчик листания dots
  let dots = document.querySelectorAll('.dot');
  for (let dot of dots) {
    dot.addEventListener('click', () => {
      interval = 18;
      let currentSlideId = document.querySelector('.slide');
      dot = Number(dot.id);
      currentSlideId = Number(currentSlideId.id);
      console.log(dot, typeof dot);
      let repeat = Math.abs(currentSlideId - dot);

      if (dot != currentSlideId && animationSwitch == false) {
        animationSwitch = true;

        if (dot > currentSlideId) {
          slidesDirection = true;
          calcSlidesDirection();
          for (let i = 0; i < repeat; i++) {
            drawOnRight();
          }
          marginOnRight();
        } else {
          slidesDirection = false;
          calcSlidesDirection();
          for (let i = 0; i < repeat; i++) {
            drawOnLeft();
          }
          marginOnLeft();
        }
        acceleration = 2;
        animationSlides();

        let dots = document.querySelectorAll('.dot');
        console.log(dots)
      }
    });
  }
}
