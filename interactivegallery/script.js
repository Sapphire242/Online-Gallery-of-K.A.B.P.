const modal = document.getElementById('myModal');
const modalImg = document.getElementById('img01');
const modalVideo = document.getElementById('video01');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');
const searchInput = document.getElementById('searchInput');

let currentIndex = 0;
let items = Array.from(document.querySelectorAll('.photo img, .photo video'));

/* OPEN IMAGE */
items.forEach((item, index) => {
  item.addEventListener('click', function () {
    currentIndex = index;
    openModal(item);
  });
});

function openModal(item) {
  modal.style.display = "flex";

  if (item.tagName === "IMG") {
    modalImg.style.display = "block";
    modalVideo.style.display = "none";
    modalImg.src = item.src;
    captionText.innerHTML = item.alt || "";
  } else {
    modalImg.style.display = "none";
    modalVideo.style.display = "block";
    modalVideo.src = item.querySelector('source').src;
    modalVideo.play();
    captionText.innerHTML = "";
  }
}

/* CLOSE */
closeBtn.onclick = () => {
  modal.style.display = "none";
  modalVideo.pause();
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    modalVideo.pause();
  }
};

/* SWIPE SUPPORT */
let touchStartX = 0;

modal.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
});

modal.addEventListener("touchend", e => {
  let touchEndX = e.changedTouches[0].screenX;
  handleSwipe(touchStartX - touchEndX);
});

function handleSwipe(diff) {
  if (Math.abs(diff) < 50) return;

  if (diff > 0) {
    currentIndex = (currentIndex + 1) % items.length;
  } else {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
  }

  openModal(items[currentIndex]);
}

/* SEARCH */
searchInput.addEventListener("input", function () {
  let value = this.value.toLowerCase();

  document.querySelectorAll(".photo").forEach(photo => {
    let text = photo.innerText.toLowerCase();
    let alt = photo.querySelector("img")?.alt.toLowerCase() || "";

    photo.style.display = alt.includes(value) ? "block" : "none";
  });
});
