// Inicialización de librería Swiper 
var swiper=new Swiper(".mySwiper-1",{
    slidesPerView:1,
    spaceBetween:30,
    loop:true,
    pagination:{
        el:".swiper-pagination",
        clickable:true,
    },
    navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev",

    }
});
//Segundo slider con 3 slides en desktop
var swiper=new Swiper(".mySwiper-2",{
    slidesPerView:3,
    spaceBetween:20,
    loop:true,
    loopFillGroupWithBlank:true,
    navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev",
    },
     // Responsive
    breakpoints:{
        0:{
            slidesPerView:1,
        },
        520:{
            slidesPerView:2,
        },
        950:{
            slidesPerView:3,
        }
    }

});

// Recorre inputs con clase tabInput
let tabInputs = document.querySelectorAll(".tabInput");

tabInputs.forEach(function(input){

    input.addEventListener("change",function(){
        let id=input.ariaValueMax;
        let thisSwiper=document.getElementById("swiper"+id);
        thisSwiper.swiper.update();
    })

});


