// Variable declarations for the DOM
const form = document.querySelector('form');
const list = document.querySelector('ul');
const input = document.querySelector(`input[type='text']`);
let arrayList = [];

// Event listeners for to-do list functionality

// Loads the list of to-do items from the localStorage when the page loads
window.addEventListener('load', () => {
    localStorage.setItem('list', '');
    arrayList = JSON.parse(localStorage.getItem('list'));

    if (arrayList) {
        for (let arrayItem of arrayList) {

            const listItem = document.createElement('li');
            listItem.innerText = arrayItem;
            list.appendChild(listItem);
        }
    }

});

// Adds an item to the list with user hits enter
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const item = document.createElement('li');

    item.innerText = input.value;
    list.appendChild(item);
    arrayList.push(item.innerText);

    localStorage.setItem('list', JSON.stringify(arrayList));


    input.value = '';
});

// Creates a box around the list item when hovered over, 
list.addEventListener('mouseover', (e) => {

    if (e.target.tagName === 'LI') {

        const item = e.target;
        item.classList.toggle('hover-over');
    }
})

// Handles also clicking and double-clicking events
list.addEventListener('click', (e) => {
    const item = e.target;
    item.classList.toggle('clicked');

    item.addEventListener('dblclick', (e) => {
        const item = e.target;
        arrayList.pop(item.remove());

        localStorage.setItem('list', JSON.stringify(arrayList));
    })
})

// Takes away the box and icons around the list item when the user hovers away
list.addEventListener('mouseout', (e) => {

    if (e.target.tagName === 'LI') {
        const item = e.target;
        item.classList.remove('hover-over');
    }
})