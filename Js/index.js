let nameInput = document.querySelector('#nameInput');
let priceInput = document.querySelector('#priceInput');
let categorySeletor = document.querySelector('#categorySeletor');
let descriptionArea = document.querySelector('#descriptionArea');
let countInput = document.querySelector('#countInput');
let myData = document.querySelector('#myData');
let addBtn = document.querySelector('#addBtn');
let updateBtn = document.querySelector('#updateBtn');
let myForm = document.querySelector('form');
let deleteAll = document.querySelector('deleteAll');

myForm.addEventListener('submit', function (e) {
    e.preventDefault()
})

let allProducts = [];
let globalIndex;

if (localStorage.getItem('allProducts') == null) {
    let allProducts = [];
} else {
    allProducts = JSON.parse(localStorage.getItem('allProducts'));
    displayProduct(allProducts);
};

function addProduct() {
    let product = {
        code: nameInput.value,
        price: (priceInput.value * countInput.value),
        category: categorySeletor.value,
        desc: descriptionArea.value,
        count: countInput.value,
    }
    allProducts.push(product);
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
    displayProduct(allProducts);
    clearForm();
};

function deleteProduct(index) {
    allProducts.splice(index, 1);
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
    displayProduct(allProducts);
}

function setFormForupdateProduct(index) {
    globalIndex = index
    addBtn.classList.replace('inline-flex', 'hidden')
    updateBtn.classList.replace('hidden', 'inline-flex')
    nameInput.value = allProducts[index].code
    priceInput.value = (allProducts[index].price / allProducts[index].count)
    categorySeletor.value = allProducts[index].category
    descriptionArea.value = allProducts[index].desc
    countInput.value = allProducts[index].count
}

function updateProduct() {
    addBtn.classList.replace('hidden', 'inline-flex')
    updateBtn.classList.replace('inline-flex', 'hidden')
    allProducts[globalIndex].code = nameInput.value
    allProducts[globalIndex].price = (priceInput.value * countInput.value)
    allProducts[globalIndex].category = categorySeletor.value
    allProducts[globalIndex].desc = descriptionArea.value
    allProducts[globalIndex].count = countInput.value
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
    displayProduct(allProducts);
    clearForm()
}

function displayProduct(arr) {
    let box = ''

    for (let i = 0; i < arr.length; i++) {
        box += `
         <div class="flex justify-center items-center text-center bg-slate-300 p-5 text-xl rounded-md">
            <div class="w-1/6">
                <h2 class="hover:pl-3 hover:text-slate-600 duration-500">${arr[i].code}</h2>
            </div>
            <div class="w-1/6">
                <h2 class="hover:pl-3 hover:text-slate-600 duration-500">${arr[i].category}</h2>
            </div>
            <div class="w-1/6">
                <h2 class="hover:pl-3 hover:text-slate-600 duration-500">${arr[i].count}</h2>
            </div>
            <div class="w-1/6">
                <h2 class="hover:pl-3 hover:text-slate-600 duration-500">${arr[i].price} $</h2>
            </div>
            <div class="w-1/6">
                <h2 class="hover:pl-3 hover:text-slate-600 duration-500">${arr[i].desc}</h2>
            </div>
            <div class="w-1/6">
                <button onclick='setFormForupdateProduct(${i})' class="px-5 py-2 hover:tracking-[.10em] duration-500 bg-yellow-300 rounded-lg hover:bg-yellow-500">Update</button>
            </div>
            <div class="w-1/6">
                <button onclick='deleteProduct(${i})'  class="px-5 py-2 bg-red-500 rounded-lg hover:tracking-[.10em] hover:bg-red-700 duration-500">Delete</button>
            </div>
        </div>
        `
    }
    myData.innerHTML = box;
}

function validateInputs(element) {
    // console.log(element.nextElementSibling);
    let regex = {
        nameInput: /^[A-Z]{1}[a-z0-9]{1,}$/,
        descriptionArea: /^[A-Z]{1}[a-z0-9]{2,}$/,
    }

    if (regex[element.id].test(element.value)) {
        element.nextElementSibling.classList.replace('block', 'hidden')
        addBtn.disabled = false
    } else {
        element.nextElementSibling.classList.replace('hidden', 'block')
        addBtn.disabled = true
    }
}

function clearForm() {
    nameInput.value = null;
    priceInput.value = null;
    countInput.value = null;
    categorySeletor.value = null;
    descriptionArea.value = null;
};

function deleteAllProduct() {
    allProducts.splice(0);
    localStorage.removeItem('allProducts');
    displayProduct(allProducts);
};

function sreachForProduct(name) {
    // console.log(name);
    let box = ''
    for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].code.toLowerCase().includes(name.toLowerCase())) {
            box += `
         <div class="flex justify-center items-center text-center bg-slate-300 p-5 text-xl rounded-md">
            <div class="w-1/6">
                <h2 class="hover:pl-3 hover:text-slate-600 duration-500">${allProducts[i].code}</h2>
            </div>
            <div class="w-1/6">
                <h2 class="hover:pl-3 hover:text-slate-600 duration-500">${allProducts[i].category}</h2>
            </div>
            <div class="w-1/6">
                <h2 class="hover:pl-3 hover:text-slate-600 duration-500">${allProducts[i].count}</h2>
            </div>
            <div class="w-1/6">
                <h2 class="hover:pl-3 hover:text-slate-600 duration-500">${allProducts[i].price} $</h2>
            </div>
            <div class="w-1/6">
                <h2 class="hover:pl-3 hover:text-slate-600 duration-500">${allProducts[i].desc}</h2>
            </div>
            <div class="w-1/6">
                <button onclick='setFormForupdateProduct(${i})' class="px-5 py-2 hover:tracking-[.10em] duration-500 bg-yellow-300 rounded-lg hover:bg-yellow-500">Update</button>
            </div>
            <div class="w-1/6">
                <button onclick='deleteProduct(${i})'  class="px-5 py-2 bg-red-500 rounded-lg hover:tracking-[.10em] hover:bg-red-700 duration-500">Delete</button>
            </div>
        </div>
        `
        }
    }
    myData.innerHTML = box;
}