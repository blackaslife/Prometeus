function showText (element) {
    if(element.previousElementSibling.clientHeight === 80) {
     element.previousElementSibling.style.height = "100%";
     element.innerHTML = "Show less...";
    } else {
        element.previousElementSibling.style.height ="80px";
        element.innerHTML = "Read More..."
    }
}

// js for the sliders
// Слайдер: відстежуємо позицію кожного блоку .collections окремо
const sliderStates = new Map();

function getItemsPerView() {
    return window.innerWidth <= 480 ? 1 : 2;
}

function getSliderState(sliderEl) {
    if (!sliderStates.has(sliderEl)) {
        sliderStates.set(sliderEl, 0);
    }
    return sliderStates.get(sliderEl);
}

function updateSlider(sliderEl) {
    const items = sliderEl.querySelectorAll('.collection-item-outer');
    const perView = getItemsPerView();
    let start = getSliderState(sliderEl);

    // не виходити за межі
    const maxStart = Math.max(0, items.length - perView);
    if (start > maxStart) start = maxStart;
    if (start < 0) start = 0;
    sliderStates.set(sliderEl, start);

    items.forEach((item, index) => {
        if (index >= start && index < start + perView) {
            item.classList.remove('slide-hidden');
        } else {
            item.classList.add('slide-hidden');
        }
    });
}

function slideNext(button) {
    const sliderEl = button.closest('[data-slider]');
    const items = sliderEl.querySelectorAll('.collection-item-outer');
    const perView = getItemsPerView();
    let start = getSliderState(sliderEl);

    if (start + perView < items.length) {
        start++;
    } else {
        start = 0; // циклічно повертаємось на початок
    }
    sliderStates.set(sliderEl, start);
    updateSlider(sliderEl);
}

function slidePrev(button) {
    const sliderEl = button.closest('[data-slider]');
    const items = sliderEl.querySelectorAll('.collection-item-outer');
    const perView = getItemsPerView();
    let start = getSliderState(sliderEl);

    if (start > 0) {
        start--;
    } else {
        start = Math.max(0, items.length - perView); // циклічно в кінець
    }
    sliderStates.set(sliderEl, start);
    updateSlider(sliderEl);
}

// Ініціалізація і реакція на зміну розміру вікна
function initSliders() {
    document.querySelectorAll('[data-slider]').forEach(sliderEl => {
        updateSlider(sliderEl);
    });
}

window.addEventListener('load', initSliders);
window.addEventListener('resize', initSliders);
