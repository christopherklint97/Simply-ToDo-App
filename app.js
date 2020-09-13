(function () {
    // Variable declarations for the DOM
    const form = document.querySelector('form');
    const list = document.querySelector('ul');
    const input = document.querySelector(`input[type='text']`);
    let obj = {};

    // Event listeners for to-do list functionality

    // Loads the list of to-do items from the localStorage when the pages loads
    window.addEventListener('load', () => {

        if (localStorage.list) {
            obj = JSON.parse(localStorage.getItem('list'));

            for (let key in obj) {

                const listItem = document.createElement('li');
                listItem.innerText = key;
                listItem.classList.add(obj[key]);
                list.appendChild(listItem);
            }
        }
    });

    // Adds an item to the list when user hits enter
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const item = document.createElement('li');

        item.innerText = input.value;

        if (item.innerText.trim()) {
            list.appendChild(item);
            let key = item.innerText;
            obj[key] = 'open';
            localStorage.setItem('list', JSON.stringify(obj));
        }

        input.value = '';
    });

    // Handles also clicking and double-clicking events
    list.addEventListener('click', (e) => {
        const item = e.target;
        let key = item.innerText;

        if (item.classList.contains('completed')) {
            item.classList.remove('completed');
            obj[key] = 'open';
        } else {
            item.classList.add('completed');
            obj[key] = 'completed';
        }

        localStorage.setItem('list', JSON.stringify(obj));

        item.addEventListener('dblclick', (e) => {
            const item = e.target;
            let key = item.innerText;
            delete obj[key];
            item.remove();

            localStorage.setItem('list', JSON.stringify(obj));
        });
    });
})();