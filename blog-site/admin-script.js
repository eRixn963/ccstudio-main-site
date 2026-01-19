// Admin Panel Script
// Sync with blog articles data
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

// Auto-publish settings
const AUTO_PUBLISH_INTERVAL = 8 * 60 * 60 * 1000; // 8 hours
let autoPublishEnabled = localStorage.getItem('autoPublishEnabled') !== 'false';
let nextPublishTime = new Date(localStorage.getItem('nextPublishTime') || Date.now() + AUTO_PUBLISH_INTERVAL);

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    loadStats();
    loadArticlesTable();
    updateNextPublish();
    document.getElementById('autoPublishToggle').checked = autoPublishEnabled;
    
    // Update countdown every second
    setInterval(updateNextPublish, 1000);
    
    // Check for auto-publish every minute
    setInterval(checkAutoPublish, 60000);
});

// Save data to localStorage
function saveData() {
    localStorage.setItem('blogArticles', JSON.stringify(articles));
    localStorage.setItem('nextPublishTime', nextPublishTime.toISOString());
    localStorage.setItem('autoPublishEnabled', autoPublishEnabled);
}

// Load stats
function loadStats() {
    document.getElementById('totalArticles').textContent = articles.length;
    
    const today = new Date().toDateString();
    const todayCount = articles.filter(a => new Date(a.publishedAt).toDateString() === today).length;
    document.getElementById('todayArticles').textContent = todayCount;
}

// Update next publish countdown
function updateNextPublish() {
    const now = new Date();
    const diff = nextPublishTime - now;
    
    if (diff <= 0 && autoPublishEnabled) {
        document.getElementById('nextPublish').textContent = 'Publishing...';
        return;
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('nextPublish').textContent = `${hours}h ${minutes}m`;
}

// Load articles table
function loadArticlesTable() {
    const table = document.getElementById('articlesTable');
    
    const sortedArticles = [...articles].sort((a, b) => 
        new Date(b.publishedAt) - new Date(a.publishedAt)
    );
    
    table.innerHTML = `
        <div class="article-row article-row-header">
            <div>Icon</div>
            <div>Title</div>
            <div>Category</div>
            <div>Date</div>
            <div>Author</div>
            <div>Actions</div>
        </div>
        ${sortedArticles.map(article => `
            <div class="article-row">
                <div class="article-icon-cell" data-label="Icon">${article.icon}</div>
                <div class="article-title-cell" data-label="Title">${article.title}</div>
                <div data-label="Category">
                    <span class="article-category-cell">${article.category}</span>
                </div>
                <div class="article-date-cell" data-label="Date">${formatDate(article.date)}</div>
                <div data-label="Author">${article.author}</div>
                <div class="article-actions" data-label="Actions">
                    <button class="btn-delete" onclick="deleteArticle(${article.id})">Delete</button>
                </div>
            </div>
        `).join('')}
    `;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Toggle auto-publish
function toggleAutoPublish() {
    autoPublishEnabled = document.getElementById('autoPublishToggle').checked;
    saveData();
    showNotification(autoPublishEnabled ? 'Auto-publish enabled' : 'Auto-publish disabled');
}

// Manual publish
function manualPublish() {
    if (confirm('Generate and publish a new article now?')) {
        generateNewArticle();
        showNotification('New article published successfully!');
    }
}

// Create article from form
function createArticle(event) {
    event.preventDefault();
    
    const title = document.getElementById('articleTitle').value;
    const excerpt = document.getElementById('articleExcerpt').value;
    const category = document.getElementById('articleCategory').value;
    const icon = document.getElementById('articleIcon').value;
    
    const newArticle = {
        id: articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1,
        title: title,
        excerpt: excerpt,
        category: category,
        author: "AI Studio",
        date: new Date().toISOString().split('T')[0],
        publishedAt: new Date().toISOString(),
        icon: icon
    };
    
    articles.unshift(newArticle);
    saveData();
    loadStats();
    loadArticlesTable();
    
    // Reset form
    document.getElementById('articleForm').reset();
    
    showNotification('Article created successfully!');
}

// Delete article
function deleteArticle(id) {
    if (confirm('Are you sure you want to delete this article?')) {
        articles = articles.filter(article => article.id !== id);
        saveData();
        loadStats();
        loadArticlesTable();
        showNotification('Article deleted successfully!');
    }
}

// Check for auto-publish
function checkAutoPublish() {
    if (!autoPublishEnabled) return;
    
    const now = new Date();
    if (now >= nextPublishTime) {
        generateNewArticle();
        nextPublishTime = new Date(Date.now() + AUTO_PUBLISH_INTERVAL);
        saveData();
        showNotification('New article auto-published!');
    }
}

// Save data to localStorage (ensure it's always saved)
function saveArticlesToStorage() {
    localStorage.setItem('blogArticles', JSON.stringify(articles));
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
    
    const newArticle = {
        id: articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1,
        title: template.title,
        excerpt: template.excerpt,
        category: template.category,
        author: "AI Studio",
        date: new Date().toISOString().split('T')[0],
        publishedAt: new Date().toISOString(),
        icon: template.icon
    };
    
    articles.unshift(newArticle);
    saveData();
    saveArticlesToStorage();
    loadStats();
    loadArticlesTable();
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
        font-weight: 600;
    `;
    notification.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    }, 3000);
}
