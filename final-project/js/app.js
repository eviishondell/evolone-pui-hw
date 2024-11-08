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
  