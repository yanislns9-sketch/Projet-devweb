const voitures = [
    {
        id: 1,
        modele: "MERCEDES C63S 2021",
        portes: 5,
        places: 5,
        moteur: "V8 biturbo",
        boite: "AMG Speedshift MCT 9 rapports",
        prix: "25000 DA / jour",
        categorie: "luxury",
        images: [
            "../image.jpg/c63s2.jpg",
            "../image.jpg/c63s5.jpg",
            "../image.jpg/c63s3.jpg"
        ],
        indexPhoto: 0
    },
    {
        id: 2,
        modele: "AUDI RS3 2023",
        portes: 5,
        places: 5,
        moteur: "5 cylindres en ligne turbo 2.5 TFSI",
        boite: "S tronic (double embrayage) 7 rapports",
        prix: "15000 DA / jour",
        categorie: "luxury",
        images: [
            "../image.jpg/rs3.jpg",
            "../image.jpg/rs32.jpg",
            "../image.jpg/rs3.jpg",
            "../image.jpg/rs34.jpg",
            "../image.jpg/rs35.jpg",
            "../image.jpg/rs36.jpg",
            "../image.jpg/rs37.jpg",
            "../image.jpg/rs38.jpg"
        ],
        indexPhoto: 0
    },
    {
        id: 3,
        modele: "MERCEDES G-CLASS BRABUS 2022",
        portes: 5,
        places: 5,
        moteur: "V8 4.0L biturbo",
        boite: "Automatique 9 rapports",
        prix: "40000 DA / jour",
        categorie: "suv",
        images: [
            "../image.jpg/g.jpg",
            "../image.jpg/g2.jpg",
            "../image.jpg/g3.jpg",
            "../image.jpg/g4.jpg",
            "../image.jpg/g5.jpg"
        ],
        indexPhoto: 0
    },
    {
        id: 4,
        modele: "PORSCHE MACAN GTS 2019",
        portes: 5,
        places: 5,
        moteur: "V6 biturbo",
        boite: "Automatique PDK 7 rapports",
        prix: "28000 DA / jour",
        categorie: "suv",
        images: [
            "../image.jpg/macan1.jpg",
            "../image.jpg/macan2.jpg",
            "../image.jpg/macan3.jpg",
            "../image.jpg/macan4.jpg",
            "../image.jpg/macan5.jpg"
        ],
        indexPhoto: 0
    },
    {
        id: 5,
        modele: "GOLF 8 R-LINE 2024",
        portes: 5,
        places: 5,
        moteur: "4 cylindres 2.0L TSI",
        boite: "Automatique DSG 7 rapports",
        prix: "15500 DA / jour",
        categorie: "eco",
        images: [
            "../image.jpg/golf8r.jpg",
            "../image.jpg/golf8r2.jpg",
            "../image.jpg/golf8r4.jpg",
         
        ],
        indexPhoto: 0
    },
    {
        id: 6,
        modele: "RANGE ROVER SPORT SVR 2019",
        portes: 5,
        places: 5,
        moteur: "V8 compresseur (Supercharged) 5.0L",
        boite: "Automatique 8 rapports",
        prix: "18000 DA / jour",
        categorie: "suv",
        images: [
            "../image.jpg/svr.jpg",
            "../image.jpg/svr2.jpg",
            "../image.jpg/svr3.jpg",
            "../image.jpg/svr4.jpg",
            "../image.jpg/svr5.jpg"
        ],
        indexPhoto: 0
    },
    {
        id: 7,
        modele: "C63S CABRIOLET 2019",
        portes: 2,
        places: 4,
        moteur: "V8 4.0L biturbo AMG",
        boite: "Automatique MCT 9 rapports",
        prix: "20000 DA / jour",
        categorie: "luxury",
        images: [
            "../image.jpg/c.jpg",
            "../image.jpg/c2.jpg",
            "../image.jpg/c3.jpg",
            "../image.jpg/c4.jpg",
            "../image.jpg/c5.jpg"
        ],
        indexPhoto: 0
    },
    {
        id: 8,
        modele: "YAMAHA TMAX 560 2024",
        portes: 0,
        places: 2,
        moteur: "562cc",
        boite: "Automatique",
        prix: "10000 DA / jour",
        categorie: "moto",
        images: [
            "../image.jpg/tmax.jpg",
            "../image.jpg/tmax2.jpg",
            "../image.jpg/tmax3.jpg",
            "../image.jpg/tmax4.jpg",
            "../image.jpg/tmax5.jpg"
        ],
        indexPhoto: 0
    },
    {
        id: 9,
        modele: "HONDA X-ADV 750 2024",
        portes: 0,
        places: 2,
        moteur: "745cc",
        boite: "DCT (double embrayage) 6 rapports",
        prix: "9000 DA / jour",
        categorie: "moto",
        images: [
            "../image.jpg/xadv.jpg",
            "../image.jpg/xadv2.jpg",
            "../image.jpg/xadv3.jpg"
        ],
        indexPhoto: 0
    }
];

let lightboxOpen = false;

window.openLightbox = function(src) {
    let lb = document.getElementById('lightbox');
    if (!lb) {
        lb = document.createElement('div');
        lb.id = 'lightbox';
        lb.innerHTML = `
            <div class="lb-overlay"></div>
            <div class="lb-content">
                <button class="lb-close" aria-label="Fermer">&#10005;</button>
                <img id="lb-img" src="" alt="Aperçu">
            </div>`;
        document.body.appendChild(lb);
        lb.querySelector('.lb-overlay').onclick = closeLightbox;
        lb.querySelector('.lb-close').onclick = closeLightbox;
    }
    document.getElementById('lb-img').src = src;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
    lightboxOpen = true;
};

window.closeLightbox = function() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('active');
    document.body.style.overflow = '';
    lightboxOpen = false;
};

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

window.reserverVoiture = function(id) {
    const v = voitures.find(item => item.id === id);
    if (!v) return;
    const params = new URLSearchParams({
        id: v.id,
        modele: v.modele,
        prix: v.prix,
        categorie: v.categorie
    });
    window.location.href = `res.html?${params.toString()}`;
};

window.changePhoto = function(id, direction) {
    const v = voitures.find(item => item.id === id);
    if (!v) return;
    v.indexPhoto += direction;
    if (v.indexPhoto >= v.images.length) v.indexPhoto = 0;
    if (v.indexPhoto < 0) v.indexPhoto = v.images.length - 1;

    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) {
        const img = card.querySelector('.car-img');
        const dots = card.querySelectorAll('.dot');
        img.classList.add('fade-out');
        setTimeout(() => {
            img.src = v.images[v.indexPhoto];
            img.onclick = () => openLightbox(v.images[v.indexPhoto]);
            img.classList.remove('fade-out');
            dots.forEach((d, i) => d.classList.toggle('active', i === v.indexPhoto));
        }, 180);
    }
};

function afficherCatalogue() {
    const container = document.getElementById('catalogue');
    if (!container) return;

    container.className = 'grid-catalogue';
    container.innerHTML = '';

    voitures.forEach(v => {
        const card = document.createElement('article');
        card.setAttribute('data-id', v.id);
        card.className = 'car-card';

        const dots = v.images.map((_, i) =>
            `<span class="dot ${i === 0 ? 'active' : ''}"></span>`
        ).join('');

        card.innerHTML = `
            <div class="slider">
                <img src="${v.images[v.indexPhoto]}"
                     class="car-img"
                     alt="${v.modele}"
                     onclick="openLightbox('${v.images[v.indexPhoto]}')">
                <div class="slider-overlay">
                    <button class="nav-btn prev" onclick="changePhoto(${v.id}, -1)" aria-label="Photo précédente">&#10094;</button>
                    <button class="nav-btn next" onclick="changePhoto(${v.id}, 1)" aria-label="Photo suivante">&#10095;</button>
                </div>
                <div class="dots">${dots}</div>
                <span class="badge-prix">${v.prix}</span>
            </div>
            <div class="car-info">
                <h3>${v.modele}</h3>
                <ul class="specs">
                    ${v.portes ? `<li><span class="spec-icon">🚪</span><span>${v.portes} Portes</span></li>` : ''}
                    <li><span class="spec-icon">💺</span><span>${v.places} Places</span></li>
                    <li><span class="spec-icon">⚙️</span><span>${v.moteur}</span></li>
                    <li><span class="spec-icon">🕹️</span><span>${v.boite}</span></li>
                </ul>
                <button class="btn-reserver" onclick="reserverVoiture(${v.id})">
                    Réserver maintenant
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

afficherCatalogue();