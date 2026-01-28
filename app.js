
const images = [
  "https://images.unsplash.com/photo-1523293182086-7651a899d37f",
  "https://images.pexels.com/photos/15097440/pexels-photo-15097440.jpeg",
  "https://images.pexels.com/photos/33820343/pexels-photo-33820343.jpeg",
  "https://images.pexels.com/photos/12456258/pexels-photo-12456258.jpeg",
  "https://images.pexels.com/photos/7270663/pexels-photo-7270663.jpeg",
  "https://images.pexels.com/photos/31117962/pexels-photo-31117962.jpeg",
  "https://images.pexels.com/photos/21008920/pexels-photo-21008920.jpeg",
  "https://images.pexels.com/photos/1961791/pexels-photo-1961791.jpeg"
];

let currentIndex = 0;
const mainImage = document.querySelector(".main-image img");
const dots = document.querySelectorAll(".dots span");
const thumbs = document.querySelectorAll(".thumbnails img");
const prevBtn = document.querySelector(".left-nav");
const nextBtn = document.querySelector(".right-nav");

function updateSlider(index) {
  currentIndex = index;
  mainImage.src = images[currentIndex];
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === currentIndex);
  });
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlider(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateSlider(currentIndex);
});

thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    updateSlider(index);
  });
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    updateSlider(index);
  });
});

updateSlider(0);


const subscriptionRadios = document.querySelectorAll(
  'input[name="subscription"]'
);
const singleCard = document.querySelector(".card");
const doubleCard = document.querySelector(".row-secondary");

subscriptionRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    singleCard.classList.remove("active");
    doubleCard.classList.remove("active");
    if (radio.value === "Single") {
      singleCard.classList.add("active");
    } else {
      doubleCard.classList.add("active");
    }
  });
});


const addToCartBtn = document.getElementById("addToCart");
const fragranceRadios = document.querySelectorAll('input[name="fragrance"]');

addToCartBtn.addEventListener("click", () => {
  const selectedFragrance = document.querySelector(
    'input[name="fragrance"]:checked'
  ).value;

  const selectedSubscription = document.querySelector(
    'input[name="subscription"]:checked'
  ).value;

  const cartItem = {
    product: "GTG Perfumes",
    fragrance: selectedFragrance,
    subscription: selectedSubscription,
    price:
      selectedSubscription === "Single" ? "$99.99" : "$169.99",
    addedAt: new Date().toISOString()
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(cartItem);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(
    "Added to Cart ✅\n\n" +
      JSON.stringify(cartItem, null, 2)
  );
});


const accordionItems = document.querySelectorAll(".accordion-item");
accordionItems.forEach(item => {
  const header = item.querySelector(".accordion-header");
  header.addEventListener("click", () => {
    accordionItems.forEach(i => {
      if (i !== item) {
        i.classList.remove("active");
        i.querySelector(".icon").textContent = "+";
      }
    });

    item.classList.toggle("active");
    const icon = item.querySelector(".icon");
    icon.textContent = item.classList.contains("active") ? "−" : "+";
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector(".stats-section");
  const numbers = document.querySelectorAll(".stat-box h2");

  let started = false;

  const countUp = () => {
    numbers.forEach(num => {
      const target = parseInt(num.innerText);
      let current = 0;
      const increment = Math.ceil(target / 60);

      const updateCount = () => {
        current += increment;
        if (current >= target) {
          num.innerText = target + "%";
        } else {
          num.innerText = current + "%";
          requestAnimationFrame(updateCount);
        }
      };

      updateCount();
    });
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        countUp();
      }
    });
  }, { threshold: 0.4 });

  observer.observe(statsSection);
});

const table = document.querySelector(".comparison-table");
table.addEventListener("click", function (e) {
  const cell = e.target.closest("th, td");
  if (!cell) return;

  const columnIndex = cell.cellIndex;

  table.querySelectorAll("th, td").forEach(el => {
    el.classList.remove("active");
  });
  table.querySelectorAll("tr").forEach(row => {
    if (row.children[columnIndex]) {
      row.children[columnIndex].classList.add("active");
    }
  });
});


const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
  hamburger.innerHTML = nav.classList.contains("active") ? "✖" : "☰";
});


nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    hamburger.textContent = "☰";
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    nav.classList.remove("active");
    hamburger.textContent = "☰";
  }
});
