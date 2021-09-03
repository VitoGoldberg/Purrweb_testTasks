let step = 0; //текущий шаг слайдера
let currentId; //Id видимого слайда
let offset = 0; //начальное смещение слайдов
let widthDeterminant = 1; //определение ширины контейнера dots
let animationSwitch = false; //true во время анимации

let leftBtn = document.querySelector('.btnLeft');//обработчики событий кнопок
let rightBtn = document.querySelector('.btnRight');


let slides = document.querySelectorAll('.slide');
let slidesSRC = []; //массив путей всех слайдов

//получаем коллекцию путей и удаляем все слайды
for (let i = 0; i < slides.length; i++) {
  slidesSRC[i] = slides[i].src;
  slides[i].remove();
}


//отрисовка dots
function drawDots() {
  let dot = document.createElement('button');
  dot.classList.add('dot');
  dot.id = widthDeterminant;
  let dots = document.querySelector('.slider_dots-container');
  dots.appendChild(dot);
  dots.style.width = 50 * widthDeterminant + 'px';
}

for (let j = 1; j <= slidesNumber; j++) {
  drawDots();
  widthDeterminant++;
}

//отрисовка слайда при листании вправо
function drawSlideRight() {
  let slide = document.createElement('img');
  slide.src = slidesSRC[step];
  slide.classList.add('slide');
  slide.id = step + 1;
  slide.style.left = offset * 780 + 'px';
  document.querySelector('#slide').appendChild(slide);
  recountId();
  console.log(currentId);
  if (step + 1 == slidesNumber) {
    step = 0;
  } else {
    step++;
  }
  offset = 1;
  //console.log(step)
}
//отрисовка слайда при листании влево
function drawSlideLeft() {
  if (step == 1) {
    step = slidesNumber - 1;
  } 
  console.log(step);
  let slide = document.createElement('img');
  slide.src = slidesSRC[step];
  slide.classList.add('slide');
  slide.id = step + 1;
  console.log(slide.id);
  slide.style.right = 780 + 'px';
  document.querySelector('#slide').appendChild(slide);
  step--;
  //console.log(step)
}

//пересчет Id
function recountId() {
    currentId = document.querySelector('.slide');
}

drawSlideRight();
console.log(step);
dotMarker();

//перелистывание вправо
function drawRight() {
  drawSlideRight();
  dotMarker();
  animationSwitch = true;
  let slidesRight = document.querySelectorAll('.slide'),
    offsetRight = 0;
  for (let i = 0; i < slidesRight.length; i++) {
    slidesRight[i].style.left = offsetRight * 780 - 780 + 'px';
    offsetRight++;
  }
  setTimeout(function () {
    slidesRight[0].remove();
    animationSwitch = false;
  }, 1000);
}
//перелистывание влево
function drawLeft() {
    drawSlideLeft();
    dotMarker();
    animationSwitch = true;
    let slidesLeft = document.querySelectorAll('.slide'),
      offsetLeft = 0;
    for (let i = 0; i < slidesLeft.length; i++) {
      slidesLeft[i].style.right = offsetLeft * 780 - 780 + 'px';
      offsetLeft++;
    }
    setTimeout(function () {
      slidesLeft[0].remove();
      animationSwitch = false;
    }, 400);
  }

//обработчик событий кнопок влево/вправо
rightBtn.addEventListener('click', () => {
  if (animationSwitch == false) {
    drawRight();
  }
});

leftBtn.addEventListener('click', () => {
    if (animationSwitch == false) {
      drawLeft();
    }
  });


//выделение соответствующего текущему слайду dot
function dotMarker() {
  let dots = document.querySelectorAll('.dot');
  for (dot of dots) {
    if (dot.id == step) {
      dot.style.backgroundColor = ' #535353';
      console.log(dot.id);
    } else if (dot.id == dots.length && step == 0){
        dot.style.backgroundColor = ' #535353';
    } else {
      dot.style.backgroundColor = ' #808080';
    }
  }
}
/*
function dotMarker() {
  let dots = document.querySelectorAll('.dot');
  for (dot of dots) {
    if (dot.id == currentId) {
      dot.style.backgroundColor = ' #535353';
    } else {
      dot.style.backgroundColor = ' #808080';
    }
  }
}
*/