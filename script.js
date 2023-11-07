document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('my-form');
    const list = document.getElementById('list');
    const totalValueElement = document.getElementById('totalValue');

    async function fetchData() {
        try {
            const response = await axios.get('https://crudcrud.com/api/6c1078e51ec54fb2bcc3225bc4482066/unicorns');
            const productData = response.data;
            displayData(productData);
        } catch (err) {
            console.log(err);
        }
    }

    function displayData(productData) {
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
            await axios.delete(`https://crudcrud.com/api/6c1078e51ec54fb2bcc3225bc4482066/unicorns/${userId}`);
            fetchData(); 
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
            await axios.post("https://crudcrud.com/api/6c1078e51ec54fb2bcc3225bc4482066/unicorns", formData);
            fetchData(); 
        } catch (err) {
            console.log(err);
        }

        document.getElementById('price').value = '';
        document.getElementById('product').value = '';
    });

    fetchData(); 
});
