document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('my-form');
    const list = document.getElementById('list');
    const totalValueElement = document.getElementById('totalValue');

    let productData = [];

    async function fetchData() {
        try {
            const response = await axios.get('https://crudcrud.com/api/bcbbdfa86a0e472f8b563b51a3e681a5/unicorns');
            productData = response.data;
            displayData();
        } catch (err) {
            console.log(err);
        }
    }

    fetchData();

    function displayData() {
        let totalValue = 0;
        list.innerHTML = '';

        productData.forEach((element, index) => {
            let listItem = document.createElement('li');
            listItem.textContent = element.price + '-' + element.name;

            totalValue += parseFloat(element.price);

            let delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.type = 'button';
            delBtn.addEventListener('click', () => {
                deleteProduct(element._id);
            });

            listItem.appendChild(delBtn);
            list.appendChild(listItem);
        });

        totalValueElement.textContent = totalValue.toFixed(2);
    }

    async function deleteProduct(userId) {
        try {
            await axios.delete(`https://crudcrud.com/api/bcbbdfa86a0e472f8b563b51a3e681a5/unicorns/${userId}`);
            productData = productData.filter((user) => user._id !== userId);
            displayData();
        } catch (err) {
            console.log(err);
        }
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const price = document.getElementById('price').value;
        const name = document.getElementById('product').value;

        const formData = {
            price: price,
            name: name
        };

        try {
            const response = await axios.post("https://crudcrud.com/api/bcbbdfa86a0e472f8b563b51a3e681a5/unicorns", formData);
            productData.push(formData);
            displayData();
        } catch (err) {
            console.log(err);
        }
    });
});