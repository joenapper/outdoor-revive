const selectElement = function (element) {
  return document.querySelector(element);
};

let menuToggler = selectElement(".menu-toggle");
let body = selectElement("body");

menuToggler.addEventListener("click", function () {
  body.classList.toggle("open");
});

window.sr = ScrollReveal();

sr.reveal(".animate-left", {
  origin: "left",
  duration: 1000,
  distance: "25rem",
  delay: 300,
});

sr.reveal(".animate-right", {
  origin: "right",
  duration: 1000,
  distance: "25rem",
  delay: 600,
});

sr.reveal(".animate-top", {
  origin: "top",
  duration: 1000,
  distance: "25rem",
  delay: 600,
});

sr.reveal(".animate-bottom", {
  origin: "bottom",
  duration: 1000,
  distance: "25rem",
  delay: 600,
});

const a = document.getElementsByClassName("slider-a");
const cfImg = document.getElementsByClassName("coverflow__image");

let scaleI = 0;
for (scaleI; scaleI < a.length; scaleI++) {
  if (scaleI === 3) {
    continue;
  } else {
    a[scaleI].style.cursor = "default";
    a[scaleI].addEventListener("click", prevDef);
  }
}

function prevDef(e) {
  e.preventDefault();
}

function forScale(coverflowPos) {
  for (scaleI = 0; scaleI < a.length; scaleI++) {
    a[scaleI].style.cursor = "default";
    a[scaleI].addEventListener("click", prevDef);
  }
  for (scaleI = 0; scaleI < cfImg.length; scaleI++) {
    if (cfImg[scaleI].getAttribute("data-coverflow-index") == coverflowPos) {
      cfImg[scaleI].parentElement.style.cursor = "pointer";
      cfImg[scaleI].parentElement.removeEventListener("click", prevDef);
    }
  }
}

function setupCoverflow(coverflowContainer) {
  let coverflowContainers;

  if (typeof coverflowContainer !== "undefined") {
    if (Array.isArray(coverflowContainer)) {
      coverflowContainers = coverflowContainer;
    } else {
      coverflowContainers = [coverflowContainer];
    }
  } else {
    coverflowContainers = Array.prototype.slice.apply(
      document.getElementsByClassName("coverflow")
    );
  }

  coverflowContainers.forEach(function (containerElement) {
    const coverflow = {};
    let prevArrows, nextArrows;

    coverflow.container = containerElement;
    coverflow.images = Array.prototype.slice.apply(
      containerElement.getElementsByClassName("coverflow__image")
    );
    coverflow.position = Math.floor(coverflow.images.length / 2) + 1;

    coverflow.images.forEach(function (coverflowImage, i) {
      coverflowImage.dataset.coverflowIndex = i + 1;
    });

    coverflow.container.dataset.coverflowPosition = coverflow.position;

    prevArrows = Array.prototype.slice.apply(
      coverflow.container.getElementsByClassName("prev-arrow")
    );
    nextArrows = Array.prototype.slice.apply(
      coverflow.container.getElementsByClassName("next-arrow")
    );

    function setPrevImage() {
      coverflow.position = Math.max(1, coverflow.position - 1);
      coverflow.container.dataset.coverflowPosition = coverflow.position;

      forScale(coverflow.position);
    }

    function setNextImage() {
      coverflow.position = Math.min(
        coverflow.images.length,
        coverflow.position + 1
      );
      coverflow.container.dataset.coverflowPosition = coverflow.position;

      forScale(coverflow.position);
    }

    function jumpToImage(evt) {
      coverflow.position = Math.min(
        coverflow.images.length,
        Math.max(1, evt.target.dataset.coverflowIndex)
      );
      coverflow.container.dataset.coverflowPosition = coverflow.position;

      setTimeout(function () {
        forScale(coverflow.position);
      }, 1);
    }

    function onKeyPress(evt) {
      switch (evt.which) {
        case 37: //left arrow
          setPrevImage();
          break;
        case 39: //right arrow
          setNextImage();
          break;
      }
    }
    prevArrows.forEach(function (prevArrow) {
      prevArrow.addEventListener("click", setPrevImage);
    });
    nextArrows.forEach(function (nextArrow) {
      nextArrow.addEventListener("click", setNextImage);
    });
    coverflow.images.forEach(function (image) {
      image.addEventListener("click", jumpToImage);
    });
    window.addEventListener("keyup", onKeyPress);
  });
}

setupCoverflow();
