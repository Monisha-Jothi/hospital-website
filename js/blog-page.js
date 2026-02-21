// ============================================================
// MEDIPORTAL — BLOG PAGE LOGIC
// ============================================================

function createBlogCard(post) {
    return `
        <article class="blog-card">
            <div class="blog-card-inner">
                <img class="blog-img" src="${post.image}" alt="${post.title}" loading="lazy">
                <div class="blog-body">
                    <span class="blog-category">${post.category}</span>
                    <h3><a href="#">${post.title}</a></h3>
                    <p>${post.excerpt}</p>
                    <div class="blog-meta">
                        <span><i class="fas fa-user-md"></i> ${post.author}</span>
                        <span><i class="fas fa-calendar-alt"></i> ${post.date}</span>
                        <span><i class="fas fa-clock"></i> ${post.readTime}</span>
                    </div>
                    <br>
                    <a href="#" class="read-more">Read Article <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        </article>
    `;
}

function renderBlog() {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;
    grid.innerHTML = BLOG_POSTS.map(createBlogCard).join('');
}

document.addEventListener('DOMContentLoaded', renderBlog);
