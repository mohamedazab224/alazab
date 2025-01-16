class CircleMenu {
  constructor(menuElm, circleElm, contentElm) {
    this.menu = document.querySelector(menuElm);
    this.circle = document.querySelector(circleElm);
    this.content = document.querySelector(contentElm);
    this.animation = '';
    this.touchStart = -1;
    this.touchMove = false;
  }

  rotateCircle(direction) {
    if (this.animation === '') {
      let activeLink = +this.menu.dataset.activeLink;

      this.animation = 'is-animate-';

      if (direction === 'up') {
        if (activeLink === 1) {
          this.menu.dataset.activeLink = 4;

          this.animation += '1-4';
        } else
        {
          this.menu.dataset.activeLink = activeLink - 1;

          this.animation += activeLink + '-' + (activeLink - 1);
        }
      } else
      if (direction === 'down') {
        if (activeLink === 4) {
          this.menu.dataset.activeLink = 1;

          this.animation += '4-1';
        } else
        {
          this.menu.dataset.activeLink = activeLink + 1;

          this.animation += activeLink + '-' + (activeLink + 1);
        }
      }

      this.circle.dataset.activeCircle = this.menu.dataset.activeLink;
      this.content.dataset.activeContent = this.menu.dataset.activeLink;

      this.menu.classList.add(this.animation);
      this.circle.classList.add(this.animation);
      this.content.classList.add(this.animation);
    }
  }

  triggerCircleScroll(evt) {
    if (this.touchStart < evt.clientY && this.touchMove === true) {
      this.rotateCircle('down');
    } else
    if (this.touchStart > evt.clientY && this.touchMove === true) {
      this.rotateCircle('up');
    }

    this.touchMove = false;
    this.touchStart = -1;
  }

  addScrollEvent() {
    // Smart phone
    this.menu.addEventListener('touchstart', evt => {
      evt.preventDefault();

      this.touchStart = evt.touches[0].clientY;
    });

    this.menu.addEventListener('touchmove', evt => {
      if (this.touchStart >= 0) {
        this.touchMove = true;
      }
    });

    this.menu.addEventListener('touchcancel', evt => {
      this.triggerCircleScroll(evt.changedTouches[0]);
    });

    this.menu.addEventListener('touchend', evt => {
      this.triggerCircleScroll(evt.changedTouches[0]);
    });

    // Swipe by mouse
    this.menu.addEventListener('mousedown', evt => {
      evt.preventDefault();

      this.touchStart = evt.clientY;
    });

    this.menu.addEventListener('mousemove', evt => {
      if (this.touchStart >= 0) {
        this.touchMove = true;
      }
    });

    this.menu.addEventListener('mouseleave', evt => {
      this.triggerCircleScroll(evt);
    });

    this.menu.addEventListener('mouseup', evt => {
      this.triggerCircleScroll(evt);
    });

    // Keyboard
    window.addEventListener('keydown', evt => {
      if (evt.keyCode === 38) {
        this.rotateCircle('up');
      } else
      if (evt.keyCode === 40) {
        this.rotateCircle('down');
      }
    });

    // Mouse wheel
    this.menu.addEventListener('wheel', evt => {
      if (evt.deltaY < 0) {
        this.rotateCircle('up');
      } else
      if (evt.deltaY > 0) {
        this.rotateCircle('down');
      }
    });

    this.menu.addEventListener('animationend', evt => {
      this.menu.classList.remove(this.animation);
      this.circle.classList.remove(this.animation);
      this.content.classList.remove(this.animation);

      this.animation = '';
    });
  }}


var c = new CircleMenu('#circle_menu', '#circle_box', '#content_box');

c.addScrollEvent();