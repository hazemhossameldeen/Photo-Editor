// File input - Start
let fileInput = document.querySelector(".file-input");
let chooseImg = document.querySelector(".choose-img");
let viewImg = document.querySelector(".img-container img");
let container = document.querySelector('.container');
let saveImg = document.querySelector('.save-img')

let loadImg = () =>{
    let file = fileInput.files[0];
    if(!file) return ;
    viewImg.src = URL.createObjectURL(file);
    viewImg.addEventListener('load',()=>{
        container.classList.remove('disaple')
    }) 
}

fileInput.addEventListener('change',loadImg)
chooseImg.addEventListener('click',()=>{fileInput.click()})
// File input - End

// Filters - Start
let slider = document.querySelector(".range input")
let rotateObtion = document.querySelectorAll('.rotate li')
let filter = document.querySelectorAll("ul li");
let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipH = 1, flipV = 1



let applyFilter = ()=>{
    viewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    viewImg.style.transform = `rotate(${rotate}deg) scale(${flipV}, ${flipH})`;
}


filter.forEach((e) => {
    e.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    e.classList.add("active");

    if (e.id === "brightness") {
        slider.max = "200";
        slider.value = brightness;
    } else if (e.id === "saturation") {
        slider.max = "200";
        slider.value = saturation;

    } else if (e.id === "inversion") {
        slider.max = '100';
        slider.value = inversion;

    } else if (e.id === "grayscale") {
        slider.max = '100';
        slider.value = grayscale;

    }
    });
});

rotateObtion.forEach(o => {
    o.addEventListener('click',() => {
        if(o.id === 'right'){
            rotate += 90
        }else if (o.id === "left"){
            rotate -= 90;
        } 
        else if (o.id === "horizontal") {
            flipH = flipH === 1 ? -1 : 1
        } 
        else if (o.id === "vertical") {
            flipV = flipV === 1 ? -1 : 1
        }
        applyFilter();
    })
})

let updateFilter = () => {
    let selectedFilter = document.querySelector(".filters-container .active");

    if(selectedFilter.id === 'brightness') {
        brightness = slider.value;
    }
    else if (selectedFilter.id === "saturation") {
        saturation = slider.value;
    }
    else if (selectedFilter.id === "inversion") {
        inversion = slider.value;
    } 
    else if (selectedFilter.id === "grayscale") {
        grayscale = slider.value;
    } 
    applyFilter();
}

let saveImage = () => {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = viewImg.naturalWidth;
    canvas.height = viewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
      ctx.rotate((rotate * Math.PI) / 180);
    }
    ctx.scale(flipH, flipV);
    ctx.drawImage(viewImg, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height)
    const link = document.createElement('a');
    link.download = 'image.jpg';
    link.href = canvas.toDataURL();
    link.click()
    console.log(link)
}

slider.addEventListener("input", updateFilter);
saveImg.addEventListener('click',saveImage)



// Filters - End

