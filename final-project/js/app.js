document.addEventListener("DOMContentLoaded", function () {
  // JavaScript for cycling roles and colors
  const roles = ["Software Engineer", "Designer", "Researcher"];
  const colors = ["#46CDEB", "#266FCE", "#423DCC"];
  let roleIndex = 0;

  function changeRole() {
      const roleElement = document.querySelector(".dynamic-role");
      if (roleElement) { // Check if element exists
          roleElement.textContent = roles[roleIndex];
          roleElement.style.color = colors[roleIndex];
          roleIndex = (roleIndex + 1) % roles.length; // Cycle through roles and colors
      }
  }

  // Call `changeRole` every 2 seconds
  setInterval(changeRole, 2000);
});

document.addEventListener("DOMContentLoaded", () => {
  const resumeEvents = document.querySelectorAll(".resume-event");

  const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the element is in the viewport
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // Add class when the element is in view
              entry.target.classList.add("in-view");
          } else {
              // Remove class when the element is out of view
              entry.target.classList.remove("in-view");
          }
      });
  }, options);

  // Observe each resume event
  resumeEvents.forEach(event => {
      observer.observe(event);
  });
});

var slideIndex = 1;
if (document.querySelector(".mySlides")) { // Check if slides exist
  showSlides(slideIndex);
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");

  if (slides.length === 0 || dots.length === 0) {
      return; // Exit if no slides or dots exist
  }

  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Add this to your app.js file

document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".container"); // Select all containers

  const observerOptions = {
    threshold: 0.5, // Trigger when 50% of the element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("emphasized"); // Add animation class
      }
    });
  }, observerOptions);

  containers.forEach((container) => observer.observe(container)); // Observe each container
});

