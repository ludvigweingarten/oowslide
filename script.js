// Function to show the logo
function showLogo() {
    const logo = document.querySelector('.oow-symbol');
    logo.classList.remove('fade-out');
  }
  
  // Function to hide the logo
  function hideLogo() {
    const logo = document.querySelector('.oow-symbol');
    logo.classList.add('fade-out');
  }
  
  // Initial state: show the logo
  showLogo();
  
  // Timer variable
  let timer;
  
  // Event listeners for user interaction
  ['scroll', 'click', "mousemove", 'touchstart'].forEach(event => {
    window.addEventListener(event, () => {
      hideLogo(); // Fade out on interaction
      clearTimeout(timer); // Reset the timer
      timer = setTimeout(showLogo, 2000); // Fade back in after 2 seconds
    });
  });
  
  // Fetch the JSON data
  fetch('data.json')
  .then(response => response.json())
  .then(slideData => {
      const fullpageContainer = document.getElementById('fullpage');
  
      // Create the HTML for each slide
      slideData.forEach((slide, index) => {
        const section = document.createElement('div');
        section.classList.add('section');
  
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-wrapper');
  
        if (slide.type === 'video') {
          const video = document.createElement('video');
          video.src = slide.src;
          video.alt = 'Video';
          video.autoplay = true;
          video.muted = true;
          video.loop = true;
          imageWrapper.appendChild(video);
        } else {
          const img = document.createElement('img');
          img.src = slide.src;
          img.alt = `Image ${index + 1}`;
          imageWrapper.appendChild(img);
        }
  
        section.appendChild(imageWrapper);
  
        const footer = document.createElement('div');
        footer.classList.add('footer');
  
        // Add the four text elements
        const serviceText = document.createElement('div');
        serviceText.classList.add('service');
        serviceText.textContent = slide.service;
        footer.appendChild(serviceText);
  
        const contextText = document.createElement('div');
        contextText.classList.add('context');
        contextText.textContent = slide.context;
        footer.appendChild(contextText);
  
        const placeText = document.createElement('div');
        placeText.classList.add('place');
        placeText.textContent = slide.place;
        footer.appendChild(placeText);
  
        const clientText = document.createElement('div');
        clientText.classList.add('client');
        clientText.textContent = slide.client;
        footer.appendChild(clientText);
  
        const slideNumber = document.createElement('div');
        slideNumber.classList.add('slide-number');
        slideNumber.textContent = `${index + 1}/${slideData.length}`;
        footer.appendChild(slideNumber);
  
        section.appendChild(footer);
        fullpageContainer.appendChild(section);
      });
  
      // Initialize fullPage.js after the slides are added
      new fullpage('#fullpage', {
        // licenseKey: 'YOUR_LICENSE_KEY_HERE', // Uncomment if using a commercial license
        scrollBar: true,
        scrollingSpeed: 700,
        loopBottom: true, // Add this line for endless scrolling
        afterRender: function() {
          const activeSlide = document.querySelector('.section.active');
          const media = activeSlide.querySelector('img, video');
          if (media) {
            media.style.setProperty('--parallax-offset', 0);
          }
        },
        onLeave: function(origin, destination, direction) {
          // Fade out the old slide elements
          const leavingSlideNumber = origin.item.querySelector('.slide-number');
          const leavingService = origin.item.querySelector('.service');
          const leavingContext = origin.item.querySelector('.context');
          const leavingPlace = origin.item.querySelector('.place');
          const leavingClient = origin.item.querySelector('.client');
  
          if (leavingSlideNumber) leavingSlideNumber.classList.add('fade-out');
          if (leavingService) leavingService.classList.add('fade-out');
          if (leavingContext) leavingContext.classList.add('fade-out');
          if (leavingPlace) leavingPlace.classList.add('fade-out');
          if (leavingClient) leavingClient.classList.add('fade-out');
  
          // Fade in the new slide elements after a short delay
          const arrivingSlideNumber = destination.item.querySelector('.slide-number');
          const arrivingService = destination.item.querySelector('.service');
          const arrivingContext = destination.item.querySelector('.context');
          const arrivingPlace = destination.item.querySelector('.place');
          const arrivingClient = destination.item.querySelector('.client');
  
          setTimeout(() => {
            if (arrivingSlideNumber) arrivingSlideNumber.classList.remove('fade-out');
            if (arrivingService) arrivingService.classList.remove('fade-out');
            if (arrivingContext) arrivingContext.classList.remove('fade-out');
            if (arrivingPlace) arrivingPlace.classList.remove('fade-out');
            if (arrivingClient) arrivingClient.classList.remove('fade-out');
          }, 500); // Adjust the delay as needed
  
          // Parallax effect
          const leavingSlide = document.querySelectorAll('.section')[origin.index];
          const leavingMedia = leavingSlide.querySelector('img, video');
          if (leavingMedia) {
            leavingMedia.style.setProperty('--parallax-offset', 0);
          }
  
          const arrivingSlide = document.querySelectorAll('.section')[destination.index];
          const arrivingMedia = arrivingSlide.querySelector('img, video');
          if (arrivingMedia) {
            arrivingMedia.style.setProperty('--parallax-offset', 0);
          }
  
        },
        afterLoad: function(origin, destination, direction) {
          const video = destination.item.querySelector('video');
          if (video) {
            video.play();
          }
        }
      });
    });