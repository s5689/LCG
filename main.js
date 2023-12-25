const desk = document.getElementById('desktop');
const deskDisplay = getComputedStyle(desk).display;

setTimeout(() => {
  if (deskDisplay == 'block') {
    runDesktop();
  } else {
    runMobile();
  }
  // }, 0);
}, 2000);

function runDesktop() {
  desk.style.opacity = 1;

  setTimeout(() => {
    document.querySelector('#desktop #alert').style.opacity = 1;
  }, 2000);
}

function runMobile() {
  const closed_letter = document.querySelector('#mobile #closed_letter');
  const open_letter_back = document.querySelector('#mobile #open_letter_back');
  const paper = document.querySelector('#mobile #paper');
  const paper_message = document.querySelector('#mobile #paper #message');
  const paper_image = document.querySelector('#mobile #paper img');
  const open_letter_front = document.querySelector('#mobile #open_letter_front');

  // Comprobar la carga de Imagenes
  const resourceList = {
    paths: [
      './assets/closed letter.png',
      './assets/open letter back.png',
      './assets/open letter front.png',
      './assets/paper.png',
      './assets/photo.jpg',
    ],
    ready: [],

    add(e) {
      this.ready.push(e);

      if (this.ready.length == this.paths.length) {
        startAnimation();
      }
    },
  };

  resourceList.paths.forEach((e) => {
    const tempImg = new Image();
    tempImg.src = e;

    tempImg.onload = () => {
      resourceList.add(tempImg);
    };
  });

  const controller = new YT.Player('xmas_song');

  // Animacion
  function startAnimation() {
    setTimeout(() => {
      closed_letter.style.top = '50%';
    }, 1000);

    const shake = setTimeout(() => {
      closed_letter.style.animation = 'closed_letter_animation 5s infinite';
    }, 6000);

    closed_letter.addEventListener('click', () => {
      clearInterval(shake);
      continueAnimation();
    });
  }

  // Al dar click
  function continueAnimation() {
    closed_letter.style.boxShadow = 'none';
    closed_letter.style.animation = 'idk';

    setTimeout(() => {
      closed_letter.style.animation = 'opening_letter_animation 150ms infinite';
    }, 1000);

    setTimeout(() => {
      closed_letter.style.animation = 'opening_letter_animation 100ms infinite';
    }, 2000);

    setTimeout(() => {
      document.querySelector('audio').play();
      closed_letter.style.animation = 'opening_letter_animation 50ms infinite';
    }, 2500);

    setTimeout(() => {
      closed_letter.style.animation = 'idk';
      closed_letter.style.display = 'none';

      open_letter_back.style.display = 'block';
      paper.style.display = 'block';
      open_letter_front.style.display = 'block';

      setTimeout(() => {
        paper.style.height = '80vw';
      }, 1000);

      setTimeout(() => {
        controller.loadVideoById('J8r2_qJO9Rg');

        open_letter_back.classList.add('open_letter_down');
        open_letter_front.classList.add('open_letter_down');
        paper.style.bottom = '0';
      }, 3000);

      setTimeout(() => {
        const minScroll = 80;
        const maxScroll = 445;
        let scrollTic;
        let prevScroll;
        paper.style.height = '100vw';

        // Scroll del Paper
        paper.addEventListener('touchstart', () => {
          prevScroll = 0;
          scrollTic = 0;
        });

        paper.addEventListener('touchmove', (e) => {
          if (scrollTic == 3) {
            const currentSize = Number(paper.style.height.replace('vw', ''));
            const currentScroll = e.touches[0].clientY;

            // Calcular Velocidad de scroll
            const tempVel0 =
              (currentScroll < 0 ? currentScroll * -1 : currentScroll) -
              (prevScroll < 0 ? prevScroll * -1 : prevScroll);

            const tempVel1 = tempVel0 < 0 ? tempVel0 * -1 : tempVel0;
            const velocity = tempVel1 < 10 ? 2 : 12;

            // Scroll
            if (currentScroll > prevScroll) {
              if (currentSize < maxScroll) {
                if (currentSize + velocity > maxScroll) {
                  paper.style.height = `${maxScroll}vw`;
                } else {
                  paper.style.height = `${currentSize + velocity}vw`;
                }
              }
            } else {
              if (currentSize > minScroll) {
                if (currentSize - velocity < minScroll) {
                  paper.style.height = `${minScroll}vw`;
                } else {
                  paper.style.height = `${currentSize - velocity}vw`;
                }
              }
            }

            prevScroll = e.touches[0].clientY;
            scrollTic = 0;
          } else {
            scrollTic++;
          }
        });
      }, 3500);

      // Fix de la parte frontal de la carta & Mostrar mensaje de la carta
      setTimeout(() => {
        open_letter_front.classList.add('fix');
        paper_message.style.opacity = 1;
        paper_image.style.opacity = 1;
      }, 4000);
      // }, 0);
    }, 3000);
  }
}
