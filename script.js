document.addEventListener("DOMContentLoaded", function () {
  const images = [
    {
      src: "img/8f2af499b2db9b884792da2181b4dc9e.jpg",
      caption: "Заснеженные вершины",
    },
    {
      src: "img/6abc3851273048a3be4e141e77ba705e.jpg",
      caption: "Лесное дерево",
    },
    {
      src: "img/8MZLo_KNSGc.jpg",
      caption: "Ночь над озером",
    },
    {
      src: "img/440dee747828a2b75093e79d1a809195.jpg",
      caption: "Обед у океана",
    },
    {
      src: "img/7903b8c218b2787fa309b5054e7e37cb.jpg",
      caption: "Дорога Волхвов",
    },
    {
      src: "img/Dália.jpg",
      caption: "Цветы в вазе",
    },
    {
      src: "img/-Xs5Atpzdwo.jpg",
      caption: "Скалистый берег",
    },
  ];

  const gallery = document.querySelector(".gallery");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const pagerDots = document.querySelector(".pager-dots");
  const currentPageEl = document.getElementById("current-page");
  const totalPagesEl = document.getElementById("total-pages");
  let currentPosition = 0;
  let slidesPerView = 3;
  let totalSlides = images.length;
  let totalPages = 0;

  // Определяем количество слайдов для отображения в зависимости от ширины экрана
  function updateSlidesPerView() {
    if (window.innerWidth <= 768) {
      slidesPerView = 1;
    } else {
      slidesPerView = 3;
    }
    updateGallery();
  }

  // Создаем слайды
  function createSlides() {
    gallery.innerHTML = "";

    images.forEach((image, index) => {
      const slide = document.createElement("div");
      slide.className = "slide";

      const img = document.createElement("img");
      img.src = image.src;
      img.alt = image.caption;

      const caption = document.createElement("div");
      caption.className = "slide-caption";
      caption.textContent = image.caption;

      slide.appendChild(img);
      slide.appendChild(caption);
      gallery.appendChild(slide);
    });
  }

  // Создаем точки пейджера
  function createPagerDots() {
    pagerDots.innerHTML = "";
    totalPages = Math.ceil(totalSlides / slidesPerView);

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        goToPage(i);
      });

      pagerDots.appendChild(dot);
    }

    totalPagesEl.textContent = totalPages;
  }

  // Обновляем галерею
  function updateGallery() {
    const slideWidth = 100 / slidesPerView;
    document.querySelectorAll(".slide").forEach((slide) => {
      slide.style.flex = `0 0 ${slideWidth}%`;
    });

    gallery.style.transform = `translateX(-${
      currentPosition * (100 / slidesPerView)
    }%)`;

    createPagerDots();
    updatePager();
  }

  // Обновляем пейджер
  function updatePager() {
    const currentPage = Math.floor(currentPosition / slidesPerView) + 1;
    currentPageEl.textContent = currentPage;

    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle(
        "active",
        index === Math.floor(currentPosition / slidesPerView)
      );
    });
  }

  // Переход к определенной странице
  function goToPage(pageIndex) {
    currentPosition = pageIndex * slidesPerView;
    updateGallery();
  }

  // Переход к следующему слайду
  function nextSlide() {
    if (currentPosition < totalSlides - slidesPerView) {
      currentPosition += slidesPerView;
    } else {
      currentPosition = 0; // Возврат к первому слайду
    }
    updateGallery();
  }

  // Переход к предыдущему слайду
  function prevSlide() {
    if (currentPosition > 0) {
      currentPosition -= slidesPerView;
    } else {
      currentPosition = totalSlides - slidesPerView; // Переход к последнему слайду
    }
    updateGallery();
  }

  // Инициализация галереи
  function initGallery() {
    createSlides();
    updateSlidesPerView();

    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    window.addEventListener("resize", updateSlidesPerView);

    /*loader.style.display = "block";
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);*/
  }

  // Запускаем инициализацию
  initGallery();
});

