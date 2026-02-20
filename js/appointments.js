// ============================================================
// MEDIPORTAL — APPOINTMENTS MODULE
// ============================================================
// Handles client-side appointment form logic, validation,
// and localStorage persistence (demo purposes).

const Appointments = (() => {

    const STORAGE_KEY = 'medicare_appointments';

    function getAll() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch {
            return [];
        }
    }

    function save(appt) {
        const all = getAll();
        appt.id = Date.now();
        appt.status = 'pending';
        appt.createdAt = new Date().toISOString();
        all.push(appt);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
        return appt;
    }

    function getById(id) {
        return getAll().find(a => a.id === id) || null;
    }

    function cancel(id) {
        const all = getAll().map(a => a.id === id ? { ...a, status: 'cancelled' } : a);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    }

    // Validate appointment form fields
    function validate(data) {
        const errors = [];
        if (!data.name || data.name.trim().length < 2) errors.push('Please enter your full name.');
        if (!data.phone || !/^\+?[\d\s\-()]{7,}$/.test(data.phone)) errors.push('Please enter a valid phone number.');
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Please enter a valid email address.');
        if (!data.date) errors.push('Please select a preferred date.');
        const selected = new Date(data.date);
        const today = new Date(); today.setHours(0, 0, 0, 0);
        if (selected < today) errors.push('Please select a future date.');
        return errors;
    }

    // Enhanced form submit handler — collects form data, validates, saves
    function handleFormSubmit(formEl, onSuccess, onError) {
        const inputs = formEl.querySelectorAll('input, select, textarea');
        const data = {};
        inputs.forEach(inp => {
            if (inp.name) data[inp.name] = inp.value;
        });

        // Collect by position if names aren't set (works with the existing modal)
        const allInputs = [...inputs];
        data.name  = allInputs[0]?.value || '';
        data.phone = allInputs[1]?.value || '';
        data.email = allInputs[2]?.value || '';
        data.dept  = allInputs[3]?.value || '';
        data.date  = allInputs[4]?.value || '';
        data.time  = allInputs[5]?.value || '';
        data.notes = allInputs[6]?.value || '';

        const errors = validate(data);
        if (errors.length > 0) {
            if (onError) onError(errors);
            return false;
        }

        const saved = save(data);
        if (onSuccess) onSuccess(saved);
        return true;
    }

    return { getAll, save, getById, cancel, validate, handleFormSubmit };

})();

// Expose globally
window.Appointments = Appointments;