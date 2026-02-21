// ============================================================
// MEDIPORTAL — SITE CONFIG & SHARED DATA
// ============================================================

const SITE_CONFIG = {
    name: "MediCare Excellence",
    tagline: "Your Health, Our Priority",
    phone: "(555) 123-4567",
    emergency: "(555) 991-1234",
    email: "info@medicare-excellence.com",
    address: "123 Medical Plaza Drive, Healthcare City, HC 12345",
    founded: 1995,
    hours: {
        weekdays: "7:00 AM – 8:00 PM",
        saturday: "8:00 AM – 5:00 PM",
        sunday: "9:00 AM – 2:00 PM",
        emergency: "24/7"
    }
};

const DEPARTMENTS = [
    { id: "cardiology",       name: "Cardiology",       icon: "fas fa-heart",        href: "../cardiology.html",        color: "#ef4444", doctors: 18 },
    { id: "neurology",        name: "Neurology",        icon: "fas fa-brain",         href: "../neurology.html",         color: "#8b5cf6", doctors: 14 },
    { id: "orthopedics",      name: "Orthopedics",      icon: "fas fa-bone",          href: "../orthopedics.html",       color: "#f59e0b", doctors: 12 },
    { id: "pediatrics",       name: "Pediatrics",       icon: "fas fa-baby",          href: "../pediatrics.html",        color: "#10b981", doctors: 16 },
    { id: "general",          name: "General Medicine", icon: "fas fa-stethoscope",   href: "../general-medicine.html",  color: "#0891b2", doctors: 24 }
];

const STATS = {
    patients:    25000,
    doctors:     120,
    departments: 18,
    experience:  25,
    satisfaction: 98
};
