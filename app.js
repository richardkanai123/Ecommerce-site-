// get elements
const D_image = document.querySelector(".DisplayImage")
const IntroText = document.querySelector(".IntroText")


/// animations

// anime js 1. Display Image
anime({
    targets: '.DisplayImage',
    border: ' solid #FFF',
    borderRadius: ['0%', '50%', '0%'],
    autoplay: true,
    loop: true,
    duration: 6000,
    easing: 'easeInOutQuad'
});


// animate IntroText
ScrollReveal().reveal('.IntroText', { delay: 800});
ScrollReveal().reveal('.HomeBtns', { delay: 1000});







// display image changer every 5s
const Covers = [
    "(./Images/coveroriginal.png) center center /contain no-repeat",
    "(./Images/cover6600.png) center center /contain no-repeat",
    "(./Images/cover5600.png) center center /contain no-repeat",
    "(./Images/cover4600.png) center center /contain no-repeat",
    "(./Images/cover3600.png) center center /contain no-repeat"
]

const cycleImages = (images, container, step) => {
      images.forEach((image, index) => (
      setTimeout(() => {
          container.style.background = "url"+`${image}`;
      }, step * (index + 1))
    ))
    setTimeout(() => cycleImages(images, container, step), step * images.length)
  }
  
  cycleImages(Covers, D_image, 5000)




