// Phone input
const inputPhone = document.querySelector("#phone");
const iti = window.intlTelInput(inputPhone, {
    utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@23.8.1/build/js/utils.js",
    onlyCountries: ["ua", "us", "gb"],
    initialCountry: "ua",
    separateDialCode: true,
    strictMode: true,
    customPlaceholder: function (selectedCountryPlaceholder) {
        return selectedCountryPlaceholder.replace(/\d/g, "X");
    },
    countrySearch: false,
});
inputPhone.addEventListener("countrychange", () => {
    inputPhone.value = "";
});

// Swiper
const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
    },
    loop: true,
    grabCursor: true,
    breakpoints: {
        500: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        650: {
            slidesPerView: 2.5,
            spaceBetween: 10,
        },
        960: {
            slidesPerView: 3.3,
            spaceBetween: 18,
        },
        1200: {
            slidesPerView: 4.3,
            spaceBetween: 18,
        },
    },
    on: {
        breakpoint: function (swiper) {
            const point = parseInt(swiper.currentBreakpoint);
            if (point >= 650) {
                swiper.navigation.init();
                swiper.pagination.destroy();
            }
            else if (point < 650) {
                swiper.navigation.destroy();
                swiper.pagination.init();
            }
            swiper.navigation.update();
            swiper.pagination.update();
        }
    },
});

// Modal open/close
const buttons = document.querySelectorAll(".wrapper .button");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".modal-close");
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        modal.style.display = "flex";
        document.body.classList.add("locked");
        document.querySelector(".wrapper").style.opacity = "0.3";
    })
});
closeModal.addEventListener("click", () => {
    document.querySelectorAll("input").forEach((input) => {
        input.value = "";
        input.checked = false;
        input.classList.remove("error");
    });
    modal.style.display = "none";
    document.body.classList.remove("locked");
    document.querySelector(".wrapper").style.opacity = "1";
});

// Mobile menu control
function toggleMobileMenu() {
    document.querySelector(".burger").classList.toggle("active");
    document.querySelector(".mobile-menu").classList.toggle("active");
    document.querySelector("body").classList.toggle("locked");
}
document.querySelector(".mobile-menu-icon").addEventListener("click", () => {
    toggleMobileMenu();
});
document.querySelectorAll(".mobile-menu li").forEach((link) => {
    link.addEventListener("click", () => {
        toggleMobileMenu();
    });
});

// Form control
const sendBtn = document.querySelector("#send");
sendBtn.addEventListener("click", validation);
function validation (){
    const inputName = document.querySelector("#name");
    const checkbox = document.querySelector("#privacy");
    
    if (inputName.value.length >= 3 && iti.isValidNumber() && checkbox.checked) {
        const congrats = document.createElement("div");
        congrats.className = "congrats";
        congrats.innerText = `Dear ${
            inputName.value
        },\n your number ${iti.getNumber()}\n was register successfully!`;
        closeModal.click();
        document.querySelector(".wrapper").append(congrats);
        setTimeout(() => {
            document.querySelector(".wrapper").removeChild(congrats);
        }, 1500);
        return;
    }
    if(inputName.value.length < 3){
        inputName.classList.add("error");
        inputName.addEventListener("input", () => {
            if (inputName.value.length >= 3){
                inputName.classList.remove("error");
            }
        })
    }
    if(!iti.isValidNumber()){
        inputPhone.classList.add("error");
        inputPhone.addEventListener("input", () => {
            if (iti.isValidNumber()) {
                inputPhone.classList.remove("error");
            }
        });
    }
    if(!checkbox.checked){
        checkbox.classList.add("error");
        checkbox.addEventListener("change", () => {
            checkbox.classList.remove("error");
        })
    }
}