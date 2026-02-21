// ============================================================
// MEDIPORTAL — CAREERS PAGE LOGIC
// ============================================================

function createJobCard(job) {
    return `
        <div class="job-card" data-dept="${job.department}" data-type="${job.type}">
            <div>
                <div class="job-title">${job.title}</div>
                <p style="font-size:0.88rem;color:#64748b;margin:0.4rem 0 0.75rem;line-height:1.6;">${job.description}</p>
                <div class="job-tags">
                    <span class="job-tag tag-dept"><i class="fas fa-hospital-alt" style="margin-right:0.3rem;"></i>${job.department}</span>
                    <span class="job-tag tag-type"><i class="fas fa-clock" style="margin-right:0.3rem;"></i>${job.type}</span>
                    <span class="job-tag tag-exp"><i class="fas fa-briefcase" style="margin-right:0.3rem;"></i>${job.experience}</span>
                    <span class="job-tag tag-loc"><i class="fas fa-map-marker-alt" style="margin-right:0.3rem;"></i>${job.location}</span>
                </div>
            </div>
            <button class="btn-apply" onclick="openApplyModal('${job.title}', '${job.department}')">
                Apply Now
            </button>
        </div>
    `;
}

function filterJobs() {
    const deptFilter = document.getElementById('deptFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const list = document.getElementById('jobsList');
    const countEl = document.getElementById('jobCount');

    const filtered = JOBS_DATA.filter(job => {
        const matchDept = !deptFilter || job.department === deptFilter;
        const matchType = !typeFilter || job.type === typeFilter;
        return matchDept && matchType;
    });

    countEl.textContent = `Showing ${filtered.length} position${filtered.length !== 1 ? 's' : ''}`;

    if (filtered.length === 0) {
        list.innerHTML = `<div style="text-align:center;padding:4rem;color:#94a3b8;">
            <i class="fas fa-search" style="font-size:2.5rem;display:block;margin-bottom:1rem;opacity:0.4;"></i>
            No positions match your filters. Try adjusting your selections.
        </div>`;
        return;
    }

    list.innerHTML = filtered.map(createJobCard).join('');
}

document.addEventListener('DOMContentLoaded', () => filterJobs());
