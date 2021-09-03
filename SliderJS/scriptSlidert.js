let slide; // переменная слайда
let step = 0; //текущий шаг слайдера
let widthDeterminant = 1; //определение ширины контейнера dots
let animationSwitch = false; //true во время анимации

let leftBtn = document.querySelector('.btnLeft');//обработчики событий кнопок
let rightBtn = document.querySelector('.btnRight');


let slidesArr = document.querySelectorAll('.slide');
let slidesSRC = []; //массив путей всех слайдов

//получаем коллекцию путей и удаляем все слайды
for (let i = 0; i < slidesArr.length; i++) {
  slidesSRC[i] = slidesArr[i].src;
  slidesArr[i].remove();
}
console.log(slidesSRC)

//отрисовка dots
function drawDots() {
  let dot = document.createElement('button');
  dot.classList.add('dot');
  dot.id = widthDeterminant;
  let dots = document.querySelector('.slider_dots-container');
  dots.appendChild(dot);
  dots.style.width = 50 * widthDeterminant + 'px';
}

for (let j = 1; j <= slidesSRC.length; j++) {
  drawDots();
  widthDeterminant++;
}


//отрисовка слайда
function draw() {
  slide = document.createElement('img');
  slide.src = slidesSRC[step];
  slide.classList.add('slide');
  slide.id = step + 1;
  document.querySelector('#slide').appendChild(slide);
  console.log(slide);
}
draw();
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
let flippingState = 0; //для обработки попеременного листания влево-вправо(true-false)
let duration = 700;

function drawRight() {
  animationSwitch = true;
  
  let slides = document.querySelectorAll('.slide'),
    offset = 0;
    if (flippingState == 0) {
      flippingState = false;
    }
    for (let i = 0; i < slides.length; i++) {
        slidesRight[i].style.left = offset * 780 + 1780 + 'px';
        offset++;
    }
  setTimeout(() => {
    slidesRight[0].remove();
    animationSwitch = false;
  }, duration);
}

function drawLeft() {
  animationSwitch = true;
  let slidesLeft = document.querySelectorAll('.slide'),
    offsetLeft = 0;
    if (flippingState == 0) {
      flippingState = true;
    }
    if (flippingState == true) {
      for (let i = 0; i < slidesLeft.length; i++) {
        slidesLeft[i].style.left = offsetLeft * 780 - 780 + 'px';
        offsetLeft++;
      }
    } else {
      for (let i = 0; i < slidesLeft.length; i++) {
        slidesLeft[i].style.right = offsetLeft * 780 + 780 + 'px';
        offsetLeft++;
      }
    }
  setTimeout(() => {
    slidesLeft[0].remove();
    animationSwitch = false;
  }, duration);
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
    slide.style.left = 780 + 'px';
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
    slide.style.right = 780 + 'px';
    drawLeft();
  }
}

//Обработчики нажатия кнопок R/L
rightBtn.addEventListener('click', () => {
  drawOnRight();
});

leftBtn.addEventListener('click', () => {
  drawOnLeft();
});

//обработчик листания dots
let dots = document.querySelectorAll('.dot');
for (let dot of dots) {
  dot.addEventListener('click', () => {
    let repeat;
    duration = 150;
    if (dot.id != slide.id && animationSwitch == false) {
      if (dot.id > slide.id) {
        repeat = dot.id - slide.id;
        for (let i = 0; i < repeat; i++) {
          drawOnRight();
          animationSwitch = false;
        }
      } else {
        repeat = slide.id - dot.id;
        for (let i = 0; i < repeat; i++) {
          drawOnLeft();
          animationSwitch = false;
        }
      }
    }
  })
};




































/*
if (flippingState == 0) {
  flippingState = false;
}
if (flippingState == false) {
  offsetRight = 0;
} else {
  offsetRight = 1;
}

if (flippingState == 0) {
  flippingState = true;
}
if (flippingState == true) {
  offsetLeft = 0;
} else {
  offsetLeft = 1;
}

rightBtn.addEventListener('click', () => {
  if (animationSwitch == false) {
    if (step + 1 == slidesSRC.length) {
      step = 0;
    } else {
      step++;
    }
    draw();
    slide.style.left = 780 + 'px';
    drawRight();
  }
});

leftBtn.addEventListener('click', () => {
  if (animationSwitch == false) {
    if (step == 0) {
      step = slidesSRC.length - 1;
    } else {
      step--;
    }
    draw();
    slide.style.right = 780 + 'px';
    drawLeft();
  }
});



function drawRight() {
  animationSwitch = true;
  
  let slidesRight = document.querySelectorAll('.slide'),
    offsetRight = 0;
    if (flippingState == 0) {
      flippingState = false;
    }
    console.log(flippingState);
    if (flippingState == false) {
      offsetRight = 0;
    } else {
      offsetRight = 1;
    }
  for (let i = 0; i < slidesRight.length; i++) {
    slidesRight[i].style.left = offsetRight * 780 - 780 + 'px';
    offsetRight++;
  }
  setTimeout(() => {
    slidesRight[0].remove();
    animationSwitch = false;
  }, duration);
}

function drawLeft() {
  animationSwitch = true;
  let slidesLeft = document.querySelectorAll('.slide'),
    offsetLeft = 0;
    if (flippingState == 0) {
      flippingState = true;
    }
    if (flippingState == true) {
      for (let i = 0; i < slidesLeft.length; i++) {
        slidesLeft[i].style.right = offsetLeft * 780 - 780 + 'px';
        offsetLeft++;
      }
    } else {
      for (let i = 0; i < slidesLeft.length; i++) {
        slidesLeft[i].style.left = offsetLeft * 780 - 780 + 'px';
        offsetLeft++;
      }
    }
  setTimeout(() => {
    slidesLeft[0].remove();
    animationSwitch = false;
  }, duration);
}
*/