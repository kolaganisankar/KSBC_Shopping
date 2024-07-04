document.addEventListener('DOMContentLoaded', function() {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448')
    .then(response => response.json())
    .then(data => {
        const productData = data.product;
        const productTitle = document.getElementById('product-title');
        const productVendor = document.getElementById('product-vendor');
        const productPrice = document.getElementById('product-price');
        const compareAtPrice = document.getElementById('compare-at-price');
        const percentageOff = document.getElementById('percentage-off');
        const mainImage = document.getElementById('main-image');
        const thumbnails = document.querySelector('.thumbnails');
        const colorOptions = document.getElementById('color-options');
        const sizeOptions = document.getElementById('size-options');
        const quantityInput = document.getElementById('quantity');
        const addToCartButton = document.getElementById('add-to-cart');
        const addToCartMessage = document.getElementById('add-to-cart-message');
        const description = document.getElementById('description');

        // Set product data
        productTitle.textContent = productData.title;
        productVendor.textContent = `${productData.vendor}`;
        productPrice.textContent = productData.price;
        compareAtPrice.textContent = productData.compare_at_price;
        percentageOff.textContent = `${Math.round(((parseFloat(productData.compare_at_price.replace('$', '')) - parseFloat(productData.price.replace('$', ''))) / parseFloat(productData.compare_at_price.replace('$', ''))) * 100)}% Off`;
        description.innerHTML = productData.description;

        // Set main image and thumbnails
        mainImage.src = productData.images[0].src;
        productData.images.forEach((image, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = `Thumbnail ${index + 1}`;
            imgElement.addEventListener('click', () => {
                // Update main image src on click
                mainImage.src = image.src;
                // Remove active class from all thumbnails
                document.querySelectorAll('.thumbnails img').forEach(thumb => thumb.classList.remove('active'));
                // Add active class to clicked thumbnail
                imgElement.classList.add('active');
            });
            thumbnails.appendChild(imgElement);
        });

        // Set color options
        productData.options[0].values.forEach((color, index) => {
            const colorName = Object.keys(color)[0];
            const colorValue = color[colorName];
            const colorInput = document.createElement('input');
            colorInput.type = 'radio';
            colorInput.id = `color-${index}`;
            colorInput.name = 'color';
            colorInput.value = colorName;
            const colorLabel = document.createElement('label');
            colorLabel.htmlFor = `color-${index}`;
            const colorSpan = document.createElement('span');
            colorSpan.style.backgroundColor = colorValue;
            colorLabel.appendChild(colorSpan);
            colorOptions.appendChild(colorInput);
            colorOptions.appendChild(colorLabel);
        });

        // Set size options
        productData.options[1].values.forEach((size, index) => {
            const sizeInput = document.createElement('input');
            sizeInput.type = 'radio';
            sizeInput.id = `size-${index}`;
            sizeInput.name = 'size';
            sizeInput.value = size;
            const sizeLabel = document.createElement('label');
            sizeLabel.htmlFor = `size-${index}`;
            sizeLabel.textContent = size;
            sizeOptions.appendChild(sizeInput);
            sizeOptions.appendChild(sizeLabel);
        });

        // Handle quantity increment and decrement
        document.getElementById('increment').addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });

        document.getElementById('decrement').addEventListener('click', () => {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });

        // Handle Add to Cart button click
        addToCartButton.addEventListener('click', () => {
            const selectedColor = document.querySelector('input[name="color"]:checked').value;
            const selectedSize = document.querySelector('input[name="size"]:checked').value;
            const selectedQuantity = quantityInput.value;

            addToCartMessage.textContent = `Embrace Sideboard with Color ${selectedColor}, Size ${selectedSize}, and Quantity ${selectedQuantity} added to cart`;
        });
    });
});
