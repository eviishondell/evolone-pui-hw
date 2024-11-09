document.addEventListener("DOMContentLoaded", function() {
    // JavaScript for cycling roles and colors
const roles = ["Software Engineer", "Designer", "Researcher"];
const colors = ["#46CDEB", "#266FCE", "#423DCC"];
let roleIndex = 0;

function changeRole() {
    const roleElement = document.querySelector(".dynamic-role");
    roleElement.textContent = roles[roleIndex];
    roleElement.style.color = colors[roleIndex];
    roleIndex = (roleIndex + 1) % roles.length; // Cycle through roles and colors
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
  
    const observer = new IntersectionObserver((entries, observer) => {
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
  