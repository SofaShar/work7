document.addEventListener("DOMContentLoaded", function () {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      caption: "Горный пейзаж",
    },
    {
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      caption: "Лесная тропа",
    },
    {
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      caption: "Озеро в горах",
    },
    {
      src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      caption: "Закат над океаном",
    },
    {
      src: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      caption: "Скалистый берег",
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      caption: "Зеленый лес",
    },
    {
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      caption: "Заснеженные вершины",
    },
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      caption: "Пустынный каньон",
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
