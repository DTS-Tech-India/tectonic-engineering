const textContainer = document.getElementById("text");
const words = ["design resilient structures.", "enhance structural performance.", "create project value.", "reduce construction costs.", "preserve architectural finesse."];
let wordIndex = 0;
let charIndex = 0;

function animateText() {
  if (charIndex < words[wordIndex].length) {
    textContainer.textContent += words[wordIndex][charIndex];
    charIndex++;
    setTimeout(animateText, 100);
  } else {
    setTimeout(deleteText, 1000);
  }
}

function deleteText() {
  if (charIndex > 0) {
    textContainer.textContent = words[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(deleteText, 50);
  } else {
    setTimeout(animateNextText, 500);
  }
}

function animateNextText() {
  textContainer.textContent = ""; // Clear previous content
  wordIndex = (wordIndex + 1) % words.length;
  setTimeout(animateText, 500);
}

animateText();