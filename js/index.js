let cart = [];
// เลือกปุ่มและกล่องเมนูมาเก็บไว้ในตัวแปรก่อน
const menuToggle = document.querySelector('.menu-toggle');
const menuWrapper = document.querySelector('.admin-group');
const cardsCar = document.querySelectorAll('.card-car .card');
const cardsBike = document.querySelectorAll('.card-bike .card');
const modalOverlay = document.querySelector('.modal-overlay');
const modalOverlayBike = document.querySelector('.modal-overlay-bike');
const closeCarBtn = document.querySelector('.closeCar-btn');
const closeBikeBtn = document.querySelector('.closeBike-btn');
const tabs = document.querySelectorAll('.tab');
const carRoom = document.querySelector('.card-car');
const bikeRoom = document.querySelector('.card-bike');
const cartCountDisplay = document.querySelector('#cart-count');
const cartIcon = document.querySelector('.cart-icon'); // ปุ่ม 🛒
const cartSidebar = document.querySelector('#cartSidebar'); // แถบ Sidebar ที่ซ่อนอยู่
const closeCartBtn = document.querySelector('#closeCartBtn'); // ปุ่มกากบาท (X) ใน Sidebar
const cartItemsList = document.querySelector('#cartItemsList'); // กล่องสำหรับใส่รายการรถใน Sidebar
const totalDisplay = document.querySelector('#cartTotal');
const checkoutBtn = document.querySelector('.checkout-btn');
const addCartBtn = document.querySelectorAll('.addbtn');
const overlayPayment = document.querySelector('.overlay-payment');
const okBtn = document.querySelector('.ok');

// สั่งให้ปุ่ม "รอฟัง" การคลิก
menuToggle.addEventListener('click', () => {
    // พอคลิกปุ่ม ให้ "สลับ" คลาสที่ชื่อว่า 'active' ที่กล่องเมนู
    menuWrapper.classList.toggle('active');
});

// --- สั่งแอคชั่น: คลิกที่รถคันไหน โชว์คันนั้น ---
cardsCar.forEach(card =>{
    // ดึงนักแสดงในป๊อปอัพมารอไว้ ---
    const modalImg = modalOverlay.querySelector('img'); // รูปในป๊อปอัพ
    const modalBrand = modalOverlay.querySelector('h4'); // ข้อความแบรนด์ในป๊อปอัพ
    const modalPrice = modalOverlay.querySelector('p'); // ข้อความราคาในป๊อปอัพ
    card.addEventListener('click', (event) =>{
        // หยิบข้อมูลจากการ์ดที่เราคลิก (`card`) ---
        const clickedImgSrc = card.querySelector('img').src; // หยิบ link รูป
        const clickedBrandText = card.dataset.brand; // หยิบข้อความแบรนด์
        const clickedPriceText = card.dataset.price; // หยิบข้อความราคา
        // จัดกลุ่มข้อมูลรถคันที่เพิ่งคลิก
        const selectedCar = {
            brand: clickedBrandText, // ยี่ห้อ
            price: clickedPriceText, // ราคา
            image: clickedImgSrc     // รูปรถ
        };
        if(event.target.classList.contains('addbtn')){
            // ผลักข้อมูลรถคันนี้ลงตะกร้า!
            cart.push(selectedCar);
            console.log(cart);
        
            cartCountDisplay.innerText = cart.length

            updateCartUI();
            return;
        } else {
            // แปะข้อมูลจริงลงไปในป๊อปอัพ ---
            modalImg.src = clickedImgSrc; // เปลี่ยนรูปรถ
            modalBrand.innerText = clickedBrandText; // เปลี่ยนชื่อแบรนด์
            modalPrice.innerText = clickedPriceText + " $"; // เปลี่ยนราคา

            modalOverlay.style.display = 'flex';

        }
    });
});

cardsBike.forEach(card => {
    // สั่งให้รถ "คันนี้" รอฟังเสียงคลิก
    card.addEventListener('click', () => {
        // ดึงนักแสดงในป๊อปอัพมารอไว้ ---
        const modalImg = modalOverlay.querySelector('img'); // รูปในป๊อปอัพ
        const modalBrand = modalOverlay.querySelector('h4'); // ข้อความแบรนด์ในป๊อปอัพ
        const modalPrice = modalOverlay.querySelector('p'); // ข้อความราคาในป๊อปอัพ
        // หยิบข้อมูลจากการ์ดที่เราคลิก (`card`) ---
        const clickedImgSrc = card.querySelector('img').src; // หยิบ link รูป
        const clickedBrandText = card.dataset.brand; // หยิบข้อความแบรนด์
        const clickedPriceText = card.dataset.price; // หยิบข้อความราคา
        // แปะข้อมูลจริงลงไปในป๊อปอัพ ---
        modalImg.src = clickedImgSrc; // เปลี่ยนรูปรถ
        modalBrand.innerText = clickedBrandText; // เปลี่ยนชื่อแบรนด์
        modalPrice.innerText = clickedPriceText + " $"; // เปลี่ยนราคา

        modalOverlay.style.display = 'flex'; 
    });
});

modalOverlay.addEventListener('click', (event) => {
    if((event.target==modalOverlay)||(event.target==closeCarBtn)){
        modalOverlay.style.display = 'none';
    } else {
        modalOverlay.style.display = 'flex';
    }
});
modalOverlayBike.addEventListener('click', (event) => {
    if((event.target==modalOverlayBike)||(event.target==closeBikeBtn)){
        modalOverlayBike.style.display = 'none';
    } else {
        modalOverlayBike.style.display = 'flex';
    }
});

bikeRoom.style.display = 'none';
tabs[0].classList.add('active-tab'); 
tabs.forEach (tab =>{
    tab.addEventListener('click', (event) => {
        tabs.forEach(t => {
            t.classList.remove('active-tab'); 
        });
        tab.classList.add('active-tab'); 

        if (tab.innerText === 'Menu 1') {
            carRoom.style.display = 'grid';
            bikeRoom.style.display = 'none';
        } else if (tab.innerText === 'Menu 2') {
            carRoom.style.display = 'none';
            bikeRoom.style.display = 'grid';
        } else if (tab.innerText === 'Menu 3') {
            carRoom.style.display = 'none';
            bikeRoom.style.display = 'none';
        } else if (tab.innerText === 'Menu 4') {
            carRoom.style.display = 'none';
            bikeRoom.style.display = 'none';
        }
    });
});

cartIcon.addEventListener('click', () => {
    cartSidebar.classList.toggle('active'); 
});

closeCartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('active'); 
});

// สร้างฟังก์ชันชื่อ updateCartUI เอาไว้อัปเดตหน้าตาตะกร้า
function updateCartUI() {
    // 1. ล้างของเก่าทิ้งก่อน ไม่งั้นมันจะโชว์เบิ้ลซ้ำไปซ้ำมา
    cartItemsList.innerHTML = ''; 
    let total = 0;

    // 2. วนลูปของในตะกร้าปัจจุบันมาสร้าง HTML ใหม่
    cart.forEach((item,index) => {
        // สร้างกล่อง div เล็กๆ สำหรับรถ 1 คัน
        const cartRow = document.createElement('div');
        
        // ใส่หน้าตา HTML เข้าไปในกล่องเล็ก (ดึงรูป ชื่อ ราคา มาโชว์)
        cartRow.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
                <img src="${item.image}" width="60px" style="border-radius: 5px;">
                <div style="flex-grow: 1;">
                    <h4 style="margin: 0; font-size: 14px;">${item.brand}</h4>
                    <p style="margin: 0; color: #555;">${item.price}</p>
                </div>
                <button class="remove-item-btn" style="background: #ff4d4d; color: white; border: none; border-radius: 3px; cursor: pointer; padding: 5px 10px; ">remove</button>
            </div>
        `;

        // เอากล่องเล็ก ไปต่อคิวเรียงกันในกล่องใหญ่
        cartItemsList.appendChild(cartRow);

        const cleanPrice = Number(item.price.replaceAll(',', ''));

        // ติดเซนเซอร์ให้ปุ่มลบของ "รถคันนี้" ทันที ---
        const removeBtn = cartRow.querySelector('.remove-item-btn');
        removeBtn.addEventListener('click', () => {
            // คำสั่งลบรถคันนี้ออกจากตะกร้า (ลบตำแหน่งที่ index จำนวน 1 คัน)
            cart.splice(index, 1);

            updateCartUI(); 
            cartCountDisplay.innerText = cart.length;
        });
        total = total + cleanPrice;

    });
    totalDisplay.innerText = total;
    totalDisplay.innerText = total.toLocaleString();
    
}

checkoutBtn.addEventListener('click', (event) => {
    if(cartItemsList.innerHTML != ''){
        // 1. เด้งข้อความขอบคุณลูกค้า
        // alert('Thank you for your support! Your total payment is ' + totalDisplay.innerText);
        overlayPayment.style.display = 'flex';

        // 2. เทของในตะกร้าทิ้งให้หมด
        cart = []; 

        // 3. สั่งอัปเดตหน้าเว็บให้กลับมาเป็น 0 ทันที
        updateCartUI(); 
        cartCountDisplay.innerText = cart.length; 

        // 4. สไลด์ปิดแถบตะกร้า
        cartSidebar.classList.remove('active'); 

        overlayPayment.classList.toggle('active');
    } else{
        alert('Your cart is empty. Please add items before checking out.');
    }
});

okBtn.addEventListener('click', () =>{
    overlayPayment.classList.remove('active');
    overlayPayment.style.display = 'none';
});