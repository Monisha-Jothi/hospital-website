// ============================================================
// MEDIPORTAL — GLOBAL SEARCH MODULE
// ============================================================
// Provides a site-wide search overlay with live results.

const MediSearch = (() => {

    // Search index — all searchable content
    const INDEX = [
        // Pages
        { type: 'page', title: 'Home', url: '../index.html', desc: 'MediCare Excellence homepage' },
        { type: 'page', title: 'About Us', url: '../about.html', desc: 'Our story, values, and leadership team' },
        { type: 'page', title: 'Our Doctors', url: 'doctors.html', desc: 'Find and book specialist doctors' },
        { type: 'page', title: 'Health Blog', url: 'blog.html', desc: 'Expert health articles and tips' },
        { type: 'page', title: 'Careers', url: 'careers.html', desc: 'Join our medical team' },
        { type: 'page', title: 'Contact Us', url: 'contact.html', desc: 'Get in touch with our team' },
        // Departments
        { type: 'dept', title: 'Cardiology', url: '../cardiology.html', desc: 'Heart and cardiovascular care', icon: 'fas fa-heart' },
        { type: 'dept', title: 'Neurology', url: '../neurology.html', desc: 'Brain and nervous system specialists', icon: 'fas fa-brain' },
        { type: 'dept', title: 'Orthopedics', url: '../orthopedics.html', desc: 'Bone, joint, and spine care', icon: 'fas fa-bone' },
        { type: 'dept', title: 'Pediatrics', url: '../pediatrics.html', desc: "Children's health specialists", icon: 'fas fa-baby' },
        { type: 'dept', title: 'General Medicine', url: '../general-medicine.html', desc: 'Primary care and internal medicine', icon: 'fas fa-stethoscope' },
        // Services
        { type: 'service', title: 'Book Appointment', url: '#', desc: 'Schedule a consultation with our doctors', action: 'openModal' },
        { type: 'service', title: 'Emergency Care', url: 'tel:5559911234', desc: '24/7 emergency line: (555) 991-1234' },
        { type: 'service', title: 'Robotic Surgery', url: '../orthopedics.html', desc: 'Minimally invasive robotic-assisted procedures' },
        { type: 'service', title: 'Cardiac Cath Lab', url: '../cardiology.html', desc: 'Advanced cardiac catheterization laboratory' },
        { type: 'service', title: 'MRI & CT Scan', url: '../general-medicine.html', desc: '3T MRI and 256-slice CT scanner available' },
        { type: 'service', title: 'Stroke Response Unit', url: '../neurology.html', desc: '24/7 stroke response with rapid intervention' },
    ];

    let overlayEl = null;

    function createOverlay() {
        const div = document.createElement('div');
        div.id = 'searchOverlay';
        div.innerHTML = `
            <div class="search-overlay-backdrop" onclick="MediSearch.close()"></div>
            <div class="search-panel">
                <div class="search-input-row">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" id="globalSearchInput" placeholder="Search doctors, departments, services..." autocomplete="off" oninput="MediSearch.query(this.value)">
                    <button onclick="MediSearch.close()" class="search-close-btn"><i class="fas fa-times"></i></button>
                </div>
                <div id="searchResults" class="search-results">
                    <div class="search-hint"><i class="fas fa-lightbulb"></i> Try: "cardiology", "book appointment", "MRI", "stroke"</div>
                </div>
            </div>
        `;
        div.style.cssText = `position:fixed;inset:0;z-index:99999;display:flex;align-items:flex-start;justify-content:center;padding-top:80px;`;
        document.body.appendChild(div);

        const style = document.createElement('style');
        style.textContent = `
            #searchOverlay .search-overlay-backdrop { position:fixed;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px); }
            #searchOverlay .search-panel { position:relative;background:white;border-radius:1.5rem;width:90%;max-width:640px;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,0.25);max-height:75vh;display:flex;flex-direction:column; }
            #searchOverlay .search-input-row { display:flex;align-items:center;gap:1rem;padding:1.25rem 1.5rem;border-bottom:1px solid #f1f5f9; }
            #searchOverlay .search-icon { color:#94a3b8;font-size:1.1rem;flex-shrink:0; }
            #searchOverlay #globalSearchInput { flex:1;border:none;outline:none;font-size:1.05rem;font-family:inherit;color:#1e293b; }
            #searchOverlay .search-close-btn { background:none;border:none;color:#94a3b8;font-size:1.1rem;cursor:pointer;padding:0.25rem; }
            #searchOverlay .search-results { overflow-y:auto;padding:0.75rem; }
            #searchOverlay .search-hint { text-align:center;padding:2rem 1rem;color:#94a3b8;font-size:0.9rem; }
            #searchOverlay .search-hint i { display:block;font-size:1.5rem;margin-bottom:0.5rem;opacity:0.5; }
            #searchOverlay .result-group { margin-bottom:1rem; }
            #searchOverlay .result-group-label { font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;padding:0.25rem 0.75rem 0.5rem; }
            #searchOverlay .result-item { display:flex;align-items:center;gap:1rem;padding:0.75rem 1rem;border-radius:0.85rem;cursor:pointer;text-decoration:none;color:inherit;transition:background 0.15s; }
            #searchOverlay .result-item:hover { background:#f8fafc; }
            #searchOverlay .result-icon { width:38px;height:38px;border-radius:10px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:0.9rem;color:#475569;flex-shrink:0; }
            #searchOverlay .result-title { font-size:0.95rem;font-weight:600;color:#1e293b;margin-bottom:0.15rem; }
            #searchOverlay .result-desc { font-size:0.8rem;color:#94a3b8; }
            #searchOverlay .no-results { text-align:center;padding:2.5rem;color:#94a3b8; }
        `;
        document.head.appendChild(style);
        return div;
    }

    const typeIcons = {
        page: 'fas fa-file-alt',
        dept: 'fas fa-hospital',
        service: 'fas fa-concierge-bell',
        doctor: 'fas fa-user-md'
    };

    function typeLabel(t) {
        return { page: 'Pages', dept: 'Departments', service: 'Services', doctor: 'Doctors' }[t] || t;
    }

    function query(term) {
        const container = document.getElementById('searchResults');
        if (!term || term.trim().length < 2) {
            container.innerHTML = `<div class="search-hint"><i class="fas fa-lightbulb"></i> Try: "cardiology", "book appointment", "MRI", "stroke"</div>`;
            return;
        }
        const q = term.toLowerCase();

        // Search index
        let results = INDEX.filter(item =>
            item.title.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q)
        );

        // Search doctors data if available
        if (typeof DOCTORS_DATA !== 'undefined') {
            const doctorResults = DOCTORS_DATA
                .filter(d => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q))
                .map(d => ({
                    type: 'doctor',
                    title: d.name,
                    url: 'doctors.html',
                    desc: d.specialty,
                    icon: 'fas fa-user-md'
                }));
            results = [...results, ...doctorResults];
        }

        if (results.length === 0) {
            container.innerHTML = `<div class="no-results"><i class="fas fa-search" style="font-size:2rem;display:block;margin-bottom:0.75rem;opacity:0.3;"></i>No results for "<strong>${term}</strong>"</div>`;
            return;
        }

        // Group by type
        const groups = {};
        results.forEach(r => {
            if (!groups[r.type]) groups[r.type] = [];
            groups[r.type].push(r);
        });

        let html = '';
        for (const [type, items] of Object.entries(groups)) {
            html += `<div class="result-group"><div class="result-group-label">${typeLabel(type)}</div>`;
            items.slice(0, 4).forEach(item => {
                const icon = item.icon || typeIcons[item.type] || 'fas fa-circle';
                const href = item.action === 'openModal' ? '#' : item.url;
                const onclick = item.action === 'openModal' ? `onclick="MediSearch.close();openModal();return false;"` : '';
                html += `<a class="result-item" href="${href}" ${onclick}>
                    <div class="result-icon"><i class="${icon}"></i></div>
                    <div>
                        <div class="result-title">${item.title}</div>
                        <div class="result-desc">${item.desc}</div>
                    </div>
                </a>`;
            });
            html += `</div>`;
        }
        container.innerHTML = html;
    }

    function open() {
        if (!overlayEl) overlayEl = createOverlay();
        else overlayEl.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setTimeout(() => document.getElementById('globalSearchInput')?.focus(), 100);
    }

    function close() {
        if (overlayEl) overlayEl.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Keyboard shortcut: Ctrl+K / Cmd+K
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            open();
        }
        if (e.key === 'Escape' && overlayEl?.style.display !== 'none') {
            close();
        }
    });

    return { open, close, query };

})();

window.MediSearch = MediSearch;
