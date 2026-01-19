// Blog Articles Data - Load from localStorage or use defaults
let articles = JSON.parse(localStorage.getItem('blogArticles')) || [
    {
        id: 1,
        title: "The Cognitive Revolution: How AI is Reshaping Human Thinking",
        excerpt: "Explore the profound impact of artificial intelligence on human cognitive processes, from enhanced decision-making to the transformation of creative thinking patterns.",
        category: "Cognitive Effect",
        author: "AI Studio",
        date: "2026-01-17",
        publishedAt: new Date("2026-01-17T10:00:00").toISOString(),
        icon: "🧠"
    },
    {
        id: 2,
        title: "GPT-5 and Beyond: The Next Generation of Language Models",
        excerpt: "A deep dive into the latest AI models that are pushing the boundaries of natural language understanding, multimodal capabilities, and reasoning performance.",
        category: "AI Models",
        author: "AI Studio",
        date: "2026-01-16",
        publishedAt: new Date("2026-01-16T18:00:00").toISOString(),
        icon: "🤖"
    },
    {
        id: 3,
        title: "Autonomous AI Agents: The Future of Intelligent Automation",
        excerpt: "Discover how AI agents are evolving from simple task executors to sophisticated systems capable of complex decision-making and autonomous problem-solving.",
        category: "Agents",
        author: "AI Studio",
        date: "2026-01-16",
        publishedAt: new Date("2026-01-16T02:00:00").toISOString(),
        icon: "🎯"
    }
];

// Convert string dates back to Date objects
articles = articles.map(a => ({
    ...a,
    publishedAt: new Date(a.publishedAt)
}));

// Current filter
let currentFilter = 'all';

// Auto-publish configuration
const AUTO_PUBLISH_INTERVAL = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
let autoPublishEnabled = localStorage.getItem('autoPublishEnabled') !== 'false';
let nextPublishTime = new Date(localStorage.getItem('nextPublishTime') || Date.now() + AUTO_PUBLISH_INTERVAL);

// Initialize the blog
document.addEventListener('DOMContentLoaded', function() {
    loadArticles();
    startCountdown();
    checkAutoPublish();
    
    // Check for auto-publish every minute
    setInterval(checkAutoPublish, 60000);
});

// Calculate next publish time
function calculateNextPublishTime() {
    const lastArticle = articles.sort((a, b) => b.publishedAt - a.publishedAt)[0];
    const lastPublishTime = lastArticle ? lastArticle.publishedAt : new Date();
    return new Date(lastPublishTime.getTime() + AUTO_PUBLISH_INTERVAL);
}

// Load and display articles
function loadArticles() {
    const grid = document.getElementById('articlesGrid');
    const loading = document.getElementById('loadingIndicator');
    const noArticles = document.getElementById('noArticles');
    
    loading.style.display = 'block';
    
    setTimeout(() => {
        loading.style.display = 'none';
        
        let filteredArticles = currentFilter === 'all' 
            ? articles 
            : articles.filter(article => article.category === currentFilter);
        
        if (filteredArticles.length === 0) {
            grid.innerHTML = '';
            noArticles.style.display = 'block';
            return;
        }
        
        noArticles.style.display = 'none';
        
        // Sort by date (newest first)
        filteredArticles.sort((a, b) => b.publishedAt - a.publishedAt);
        
        grid.innerHTML = filteredArticles.map(article => `
            <div class="article-card" onclick="openArticle(${article.id})">
                <div class="article-image">
                    <span style="position: relative; z-index: 1;">${article.icon}</span>
                </div>
                <div class="article-content">
                    <div class="article-meta">
                        <span class="article-category">${article.category}</span>
                        <span class="article-date">📅 ${formatDate(article.date)}</span>
                    </div>
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-footer">
                        <div class="article-author">
                            <div class="author-avatar">AI</div>
                            <span>${article.author}</span>
                        </div>
                        <span class="read-more">Read More →</span>
                    </div>
                </div>
            </div>
        `).join('');
    }, 500);
}

// Filter by category
function filterCategory(category) {
    currentFilter = category;
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadArticles();
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Open article
function openArticle(id) {
    window.location.href = `article.html?id=${id}`;
}

// Countdown timer
function startCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date();
    const diff = nextPublishTime - now;
    
    if (diff <= 0) {
        document.getElementById('countdown').textContent = 'Publishing soon...';
        document.getElementById('statusProgress').style.width = '100%';
        return;
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('countdown').textContent = 
        `${hours}h ${minutes}m ${seconds}s`;
    
    // Update progress bar
    const totalTime = AUTO_PUBLISH_INTERVAL;
    const elapsed = totalTime - diff;
    const percentage = (elapsed / totalTime) * 100;
    document.getElementById('statusProgress').style.width = percentage + '%';
}

// Check if it's time to auto-publish
function checkAutoPublish() {
    if (!autoPublishEnabled) return;
    
    const now = new Date();
    
    if (now >= nextPublishTime) {
        generateNewArticle();
        nextPublishTime = new Date(Date.now() + AUTO_PUBLISH_INTERVAL);
        localStorage.setItem('nextPublishTime', nextPublishTime.toISOString());
    }
}

// Generate new article (AI simulation)
function generateNewArticle() {
    const templates = [
        {
            title: "Breaking: New AI Breakthrough in Natural Language Processing",
            excerpt: "Researchers have unveiled a revolutionary approach to language understanding that surpasses previous benchmarks by significant margins, marking a new era in NLP technology.",
            category: "News",
            icon: "📰"
        },
        {
            title: "The Psychology of AI: Understanding Machine Learning's Impact on Human Behavior",
            excerpt: "A comprehensive analysis of how daily interaction with AI systems is subtly reshaping human behavioral patterns and decision-making processes in unprecedented ways.",
            category: "Cognitive Effect",
            icon: "🧠"
        },
        {
            title: "Multi-Agent Systems: Coordinating AI for Complex Problem Solving",
            excerpt: "Learn how multiple AI agents can work together to solve problems that are too complex for a single system to handle effectively, opening new frontiers in automation.",
            category: "Agents",
            icon: "🤝"
        },
        {
            title: "Comparing Claude, GPT-4, and Gemini: The AI Model Showdown",
            excerpt: "An in-depth comparison of the leading language models, examining their strengths, weaknesses, and optimal use cases for different applications.",
            category: "AI Models",
            icon: "⚔️"
        },
        {
            title: "Neural Networks and the Human Brain: Surprising Similarities",
            excerpt: "Recent neuroscience research reveals fascinating parallels between artificial neural networks and biological brain structures, suggesting deeper connections than previously thought.",
            category: "AI and the Human Brain",
            icon: "🔬"
        },
        {
            title: "The Rise of Multimodal AI: Beyond Text and Into Reality",
            excerpt: "Explore how AI systems are learning to understand and generate multiple types of content simultaneously, from images and video to audio and 3D models.",
            category: "AI Models",
            icon: "🎨"
        },
        {
            title: "AI Ethics in 2026: Navigating the New Frontier",
            excerpt: "As AI becomes more powerful and ubiquitous, examining the ethical challenges and responsible development practices that will shape the future of technology.",
            category: "News",
            icon: "⚖️"
        },
        {
            title: "How AI Agents Are Revolutionizing Enterprise Automation",
            excerpt: "Businesses are deploying intelligent agents to handle complex workflows, customer service, and strategic planning with remarkable efficiency and accuracy.",
            category: "Agents",
            icon: "🏢"
        },
        {
            title: "The Neuroscience Behind AI Learning: Insights from Brain Research",
            excerpt: "Understanding how insights from human brain function are informing the next generation of machine learning architectures and training methodologies.",
            category: "AI and the Human Brain",
            icon: "🧬"
        },
        {
            title: "Attention Mechanisms: The Secret Sauce of Modern AI",
            excerpt: "Dive deep into how attention mechanisms work in transformer models and why they've become the foundation of breakthrough AI systems.",
            category: "AI Models",
            icon: "🔍"
        }
    ];
    
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // Generate unique ID
    const maxId = articles.length > 0 ? Math.max(...articles.map(a => a.id)) : 0;
    
    const newArticle = {
        id: maxId + 1,
        title: template.title,
        excerpt: template.excerpt,
        category: template.category,
        author: "AI Studio",
        date: new Date().toISOString().split('T')[0],
        publishedAt: new Date().toISOString(),
        icon: template.icon
    };
    
    articles.unshift(newArticle);
    
    // ⭐ CRITICAL FIX: Save to localStorage
    localStorage.setItem('blogArticles', JSON.stringify(articles));
    
    // Reload articles display
    loadArticles();
    
    // Show notification
    showNotification("New article published! 🎉");
}

// Search functionality
function searchArticles() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchClear = document.getElementById('searchClear');
    const query = searchInput.value.toLowerCase().trim();
    
    // Show/hide clear button
    searchClear.style.display = query ? 'flex' : 'none';
    
    if (!query) {
        searchResults.classList.remove('active');
        return;
    }
    
    // Search through articles
    const results = articles.filter(article => {
        return article.title.toLowerCase().includes(query) ||
               article.excerpt.toLowerCase().includes(query) ||
               article.category.toLowerCase().includes(query);
    });
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-search-results">No articles found matching your search.</div>';
        searchResults.classList.add('active');
        return;
    }
    
    // Display results
    searchResults.innerHTML = results.map(article => `
        <div class="search-result-item" onclick="openArticle(${article.id})">
            <div class="search-result-icon">${article.icon}</div>
            <div class="search-result-content">
                <div class="search-result-title">${article.title}</div>
                <div class="search-result-excerpt">${article.excerpt.substring(0, 100)}...</div>
                <span class="search-result-category">${article.category}</span>
            </div>
        </div>
    `).join('');
    
    searchResults.classList.add('active');
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchClear = document.getElementById('searchClear');
    
    searchInput.value = '';
    searchClear.style.display = 'none';
    searchResults.classList.remove('active');
}

// Close search results when clicking outside
document.addEventListener('click', function(event) {
    const searchContainer = document.querySelector('.search-container');
    const searchResults = document.getElementById('searchResults');
    
    if (searchContainer && !searchContainer.contains(event.target)) {
        searchResults.classList.remove('active');
    }
});

// Newsletter subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Save to localStorage
    let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
    
    if (subscribers.includes(email)) {
        showNotification('You are already subscribed!');
        return;
    }
    
    subscribers.push(email);
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    
    showNotification('Successfully subscribed! Welcome aboard 🎉');
    event.target.reset();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
