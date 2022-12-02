const counter = document.getElementById('counter');
let count = 2;

/**
 * Will decrement a counter from the specified value above every second
 * and will redirect to home.html once finished
 */
setInterval(() => {
  if (count >= 0) {
    counter.innerHTML = `redirecting in.. ${count}`;
  }
  if (count === -1) {
    location.replace('home.html');
  }
  count--;
}, 1000);
