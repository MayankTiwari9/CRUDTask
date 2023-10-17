document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('my-form');
    const list = document.getElementById('list');

    let productData = [];

    function displayData() {
        list.innerHTML = '';

        productData.forEach((element, index) => {
            let listItem = document.createElement('li');
            listItem.textContent = element.price + '-' + element.name;

            let delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.type = 'button';
            delBtn.addEventListener('click', () => {
                deleteProduct(element._id);
            });

            listItem.appendChild(delBtn);
            list.appendChild(listItem);
        })
    }

    function deleteProduct(userId) {
        axios.delete(`https://crudcrud.com/api/cc870a2286724de3a782d6b4fe6bf98d/unicorns/${userId}`)
            .then(() => {
                productData = productData.filter((user) => user._id !== userId);
                displayData();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const price = document.getElementById('price').value;
        const name = document.getElementById('product').value;

        const formData = {
            price: price,
            name: name
        }

        saveData(formData);
    })

    function saveData(formData) {
        axios.post("https://crudcrud.com/api/cc870a2286724de3a782d6b4fe6bf98d/unicorns", formData)
            .then((res) => {
                const data = res.data;
                productData.push(formData);
                displayData(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    axios.get('https://crudcrud.com/api/cc870a2286724de3a782d6b4fe6bf98d/unicorns')
        .then((res) => {
            productData = res.data;
            displayData(productData);
        })
        .catch((err) => {
            console.log(err);
        })

    displayData();
})