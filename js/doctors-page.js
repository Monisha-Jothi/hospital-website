// ============================================================
// MEDIPORTAL — DOCTORS PAGE LOGIC
// ============================================================

let currentFilter = 'all';
let currentSearch = '';

function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < full; i++) stars += '<i class="fas fa-star"></i>';
    if (half) stars += '<i class="fas fa-star-half-alt"></i>';
    return stars;
}

function createDoctorCard(doc) {
    return `
        <div class="doctor-card" data-dept="${doc.department}">
            <img class="doctor-img" src="${doc.image}" alt="${doc.name}" loading="lazy">
            <div class="doctor-info">
                <h3>${doc.name}</h3>
                <div class="doctor-specialty">${doc.specialty}</div>
                <div class="doctor-meta">
                    <span><i class="fas fa-briefcase"></i> ${doc.experience} yrs exp</span>
                    <span><i class="fas fa-users"></i> ${doc.patients.toLocaleString()}+ patients</span>
                </div>
                <div class="doctor-rating">
                    ${renderStars(doc.rating)}
                    <span>&nbsp;${doc.rating} (${doc.reviews} reviews)</span>
                </div>
                <div style="font-size:0.82rem;color:#64748b;margin-bottom:1rem;">
                    <i class="fas fa-language" style="margin-right:0.35rem;"></i>
                    ${doc.languages.join(' · ')}
                    &nbsp;•&nbsp;
                    <span style="color:${doc.available ? '#10b981' : '#ef4444'};font-weight:600;">
                        <i class="fas fa-circle" style="font-size:0.55rem;vertical-align:middle;"></i>
                        ${doc.available ? 'Available Today' : 'Next Available Tomorrow'}
                    </span>
                </div>
                <button class="btn-book-doc" onclick="openModal()">
                    <i class="fas fa-calendar-plus"></i>&nbsp; Book Appointment
                </button>
            </div>
        </div>
    `;
}

function renderDoctors() {
    const grid = document.getElementById('doctorsGrid');
    const filtered = DOCTORS_DATA.filter(doc => {
        const matchesDept = currentFilter === 'all' || doc.department === currentFilter;
        const matchesSearch = currentSearch === '' ||
            doc.name.toLowerCase().includes(currentSearch) ||
            doc.specialty.toLowerCase().includes(currentSearch);
        return matchesDept && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:#94a3b8;">
            <i class="fas fa-search" style="font-size:2.5rem;margin-bottom:1rem;display:block;opacity:0.4;"></i>
            No doctors found matching your search.
        </div>`;
        return;
    }

    grid.innerHTML = filtered.map(createDoctorCard).join('');
}

function setFilter(dept, btn) {
    currentFilter = dept;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDoctors();
}

function filterDoctors() {
    currentSearch = document.getElementById('doctorSearch').value.toLowerCase();
    renderDoctors();
}

// Initial render
document.addEventListener('DOMContentLoaded', renderDoctors);
