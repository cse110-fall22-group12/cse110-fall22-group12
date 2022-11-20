let show_count = document.getElementById('count');
let count = 2;

setInterval(() => {
    show_count.innerText = count;
    count--;

    if (count < 0) {
        location.replace('test.html');
    }
},1000)