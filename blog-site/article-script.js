// Article Page Script
// Get article ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const articleId = parseInt(urlParams.get('id'));

// Load articles from localStorage
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

// Article content templates
const articleContents = {
    "Cognitive Effect": {
        intro: "Artificial intelligence is fundamentally changing how humans think, process information, and make decisions. This transformation extends beyond simple automation into the very fabric of human cognition.",
        sections: [
            {
                title: "The Cognitive Partnership",
                content: "Modern AI systems are becoming cognitive partners rather than mere tools. When we interact with AI assistants, recommendation systems, and predictive algorithms daily, our thinking patterns gradually adapt to incorporate these digital collaborators. This symbiotic relationship is reshaping decision-making processes at both individual and organizational levels."
            },
            {
                title: "Enhanced Decision-Making",
                content: "AI augments human decision-making by processing vast amounts of data and identifying patterns that would be impossible for humans to detect alone. However, this enhancement comes with the responsibility to understand AI's limitations and potential biases. The most effective decision-making occurs when human intuition and contextual understanding combine with AI's analytical capabilities."
            },
            {
                title: "The Attention Economy",
                content: "AI-driven platforms have mastered the art of capturing and directing human attention. From social media algorithms to content recommendation systems, AI shapes what information we consume and how we allocate our cognitive resources. Understanding these mechanisms is crucial for maintaining agency over our attention and thought processes."
            },
            {
                title: "Future Implications",
                content: "As AI becomes more sophisticated, the cognitive effects will intensify. We're moving toward a future where AI doesn't just assist with thinking but becomes an integral part of how we conceptualize and solve problems. Preparing for this future requires developing new cognitive skills and maintaining awareness of how AI influences our mental processes."
            }
        ],
        conclusion: "The cognitive revolution driven by AI represents one of the most significant transformations in human history. By understanding and actively shaping this relationship, we can harness AI's power while preserving and enhancing uniquely human cognitive capabilities."
    },
    "AI Models": {
        intro: "The landscape of artificial intelligence is evolving at an unprecedented pace, with new language models pushing the boundaries of what machines can understand and generate. These models represent the cutting edge of AI research and development.",
        sections: [
            {
                title: "Architectural Innovations",
                content: "Modern language models build upon the transformer architecture introduced in 2017, but with significant enhancements. Techniques like sparse attention, mixture of experts, and multi-modal integration have dramatically improved model capabilities while managing computational costs. These innovations enable models to process longer contexts, understand multiple modalities, and perform more complex reasoning tasks."
            },
            {
                title: "Scaling and Efficiency",
                content: "The relationship between model size and capability isn't linear. Recent research shows that smaller, more efficiently trained models can outperform larger ones on specific tasks. This has led to a focus on training efficiency, data quality, and targeted fine-tuning rather than simply increasing parameter counts. The result is models that are both more capable and more accessible."
            },
            {
                title: "Multimodal Capabilities",
                content: "The latest generation of AI models isn't limited to text. They can process and generate images, understand audio, and even work with video and 3D data. This multimodal understanding represents a significant step toward more human-like AI that can perceive and interact with the world through multiple senses simultaneously."
            },
            {
                title: "Real-World Applications",
                content: "These advanced models are being deployed across industries, from healthcare diagnostics to creative content generation, scientific research to customer service. Their versatility and capability make them valuable tools for solving complex real-world problems, though their deployment requires careful consideration of ethical implications and potential biases."
            }
        ],
        conclusion: "The rapid advancement of AI models signals a transformative era in technology. As these systems become more capable and accessible, they will increasingly shape how we work, create, and interact with information."
    },
    "Agents": {
        intro: "Autonomous AI agents represent a paradigm shift from passive AI tools to proactive systems capable of independent action and decision-making. These agents are transforming industries by handling complex workflows with minimal human intervention.",
        sections: [
            {
                title: "From Tools to Agents",
                content: "Traditional AI systems wait for instructions and provide outputs. AI agents, however, can set goals, plan actions, execute tasks, and adapt based on outcomes. This autonomy makes them suitable for complex, multi-step processes that previously required constant human oversight. The transition from tool to agent represents a fundamental evolution in AI capabilities."
            },
            {
                title: "Multi-Agent Systems",
                content: "The true power of AI agents emerges when multiple agents collaborate. Multi-agent systems can tackle problems too complex for any single agent by dividing tasks, sharing information, and coordinating actions. These systems are being used in everything from supply chain optimization to scientific research, where different agents can specialize in different aspects of a problem."
            },
            {
                title: "Learning and Adaptation",
                content: "Modern AI agents don't just follow pre-programmed rules; they learn from experience and adapt to changing environments. Through reinforcement learning and other techniques, agents can improve their performance over time, discovering strategies that human programmers might never have considered. This adaptability makes them particularly valuable in dynamic, unpredictable environments."
            },
            {
                title: "Ethical Considerations",
                content: "As agents become more autonomous, questions of responsibility, accountability, and control become paramount. Who is responsible when an agent makes a mistake? How do we ensure agents align with human values? What safeguards prevent misuse? Addressing these questions is essential as agent technology becomes more prevalent in critical applications."
            }
        ],
        conclusion: "AI agents are ushering in a new era of intelligent automation. As these systems become more sophisticated and autonomous, they promise to transform how we approach complex problems while raising important questions about the future of human-AI collaboration."
    },
    "News": {
        intro: "The field of artificial intelligence continues to advance at a breathtaking pace, with new breakthroughs and developments emerging regularly. Staying informed about these changes is crucial for understanding where AI technology is heading.",
        sections: [
            {
                title: "Recent Breakthroughs",
                content: "Recent months have seen remarkable advances in AI capabilities. From improved language understanding to more efficient training methods, these breakthroughs are making AI more powerful and accessible. Notable developments include better reasoning capabilities, enhanced multimodal understanding, and more reliable factual accuracy in AI-generated content."
            },
            {
                title: "Industry Impact",
                content: "AI advancements are rapidly translating into real-world applications across industries. Healthcare providers use AI for diagnosis and treatment planning. Financial institutions deploy it for fraud detection and risk assessment. Creative industries leverage it for content generation and design. The pace of adoption is accelerating as AI becomes more reliable and user-friendly."
            },
            {
                title: "Regulatory Landscape",
                content: "As AI becomes more powerful and widespread, governments and organizations are working to establish appropriate regulatory frameworks. These efforts balance innovation with safety, privacy with utility, and progress with ethical considerations. The regulatory landscape is evolving rapidly, with significant implications for AI development and deployment."
            },
            {
                title: "What's Next",
                content: "Looking ahead, several trends are shaping AI's future: more efficient models, better integration with existing systems, enhanced safety measures, and broader accessibility. The focus is shifting from pure capability increases to making AI more reliable, interpretable, and aligned with human values and needs."
            }
        ],
        conclusion: "The AI landscape is dynamic and fast-moving. Staying informed about developments, understanding their implications, and participating in discussions about AI's future role in society will be increasingly important for everyone."
    },
    "AI and the Human Brain": {
        intro: "The relationship between artificial neural networks and biological neural networks has long fascinated researchers. Recent discoveries reveal surprising parallels between how AI systems and human brains process information.",
        sections: [
            {
                title: "Structural Similarities",
                content: "Artificial neural networks were originally inspired by biological neurons, but recent research shows the similarities run deeper than initially thought. Both systems use hierarchical processing, with simple features combined into increasingly complex representations. Studies show that neural networks trained on specific tasks develop internal representations remarkably similar to those found in corresponding brain regions."
            },
            {
                title: "Learning Mechanisms",
                content: "The learning processes in AI and biological systems share fundamental principles. Both use feedback to adjust connections and improve performance over time. Concepts like attention, prediction, and error correction appear in both artificial and biological learning. Understanding these parallels helps researchers improve AI systems and provides insights into brain function."
            },
            {
                title: "Differences and Limitations",
                content: "Despite similarities, significant differences remain. Biological brains are far more energy-efficient, can learn from fewer examples, and possess general intelligence that current AI lacks. The brain's ability to transfer learning across domains, understand causality, and exhibit consciousness remain beyond current AI capabilities. These differences highlight areas where AI research must advance."
            },
            {
                title: "Mutual Insights",
                content: "Research at the intersection of neuroscience and AI benefits both fields. Insights from brain research inspire new AI architectures and training methods. Conversely, AI models serve as testable hypotheses for brain function theories. This synergy is accelerating progress in understanding both artificial and biological intelligence."
            }
        ],
        conclusion: "The parallels between AI systems and the human brain reveal fundamental principles of information processing and learning. As research progresses, insights from both domains will continue to inform and enhance each other."
    }
};

// Default content for custom articles
const defaultContent = {
    intro: "This article explores fascinating developments in artificial intelligence and their implications for technology and society.",
    sections: [
        {
            title: "Understanding the Innovation",
            content: "Artificial intelligence continues to evolve at a remarkable pace, bringing new capabilities and possibilities. This innovation represents a significant step forward in how machines can understand, process, and generate information. The implications extend across multiple domains, from practical applications to theoretical understanding."
        },
        {
            title: "Technical Foundations",
            content: "The underlying technology builds on advanced machine learning techniques, sophisticated algorithms, and massive computational resources. These technical foundations enable AI systems to tackle increasingly complex challenges. Understanding these basics helps appreciate the true scope of recent advances and their potential impact."
        },
        {
            title: "Practical Applications",
            content: "Real-world applications demonstrate the technology's value and versatility. From improving business processes to enhancing creative work, AI is being deployed across industries. These practical implementations provide valuable insights into what works, what doesn't, and where the technology is heading next."
        },
        {
            title: "Future Directions",
            content: "Looking ahead, several exciting developments are on the horizon. Researchers are working on making AI systems more capable, efficient, and aligned with human needs. The pace of innovation suggests that today's breakthroughs are just the beginning of a transformative era in artificial intelligence."
        }
    ],
    conclusion: "As AI technology continues to advance, staying informed and engaged with these developments becomes increasingly important. The changes ahead will affect virtually every aspect of how we work, create, and interact with technology."
};

// Initialize article page
document.addEventListener('DOMContentLoaded', function() {
    if (!articleId || isNaN(articleId)) {
        window.location.href = '/';
        return;
    }

    loadArticle();
    loadRelatedArticles();
    loadComments();
    loadBookmarkStatus();
    loadLikeStatus();
    initReadingProgress();
});

// Load article
function loadArticle() {
    const article = articles.find(a => a.id === articleId);
    
    if (!article) {
        window.location.href = '/';
        return;
    }

    // Update page title
    document.title = `${article.title} - Core Code AI Studio`;

    // Update article header
    document.getElementById('articleCategory').textContent = article.category;
    document.getElementById('articleDate').textContent = `📅 ${formatDate(article.date)}`;
    document.getElementById('articleTitle').textContent = article.title;
    document.getElementById('authorName').textContent = article.author;
    document.getElementById('articleIcon').textContent = article.icon;
    
    // Calculate read time based on content length
    const readTime = Math.max(5, Math.ceil(article.excerpt.split(' ').length / 50));
    document.getElementById('readTime').textContent = `${readTime} min read`;
    
    // Generate random view count
    const views = (Math.random() * 5 + 0.5).toFixed(1) + 'K';
    document.getElementById('articleViews').textContent = `${views} views`;

    // Load article content
    const contentData = articleContents[article.category] || defaultContent;
    generateArticleContent(article, contentData);
}

// Generate article content
function generateArticleContent(article, contentData) {
    const contentDiv = document.getElementById('articleContent');
    
    let html = `<p class="intro-paragraph">${contentData.intro}</p>`;
    
    contentData.sections.forEach((section, index) => {
        html += `
            <h2>${section.title}</h2>
            <p>${section.content}</p>
        `;
        
        // Add highlight box after second section
        if (index === 1) {
            html += `
                <div class="highlight-box">
                    <h4>💡 Key Insight</h4>
                    <p>${article.excerpt}</p>
                </div>
            `;
        }
    });
    
    html += `<p><strong>Conclusion:</strong> ${contentData.conclusion}</p>`;
    
    contentDiv.innerHTML = html;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Load related articles
function loadRelatedArticles() {
    const currentArticle = articles.find(a => a.id === articleId);
    if (!currentArticle) return;

    // Get 3 related articles from same category or random
    let relatedArticles = articles
        .filter(a => a.id !== articleId && a.category === currentArticle.category)
        .slice(0, 3);
    
    // If not enough from same category, add random ones
    if (relatedArticles.length < 3) {
        const remaining = articles
            .filter(a => a.id !== articleId && !relatedArticles.includes(a))
            .slice(0, 3 - relatedArticles.length);
        relatedArticles = [...relatedArticles, ...remaining];
    }

    const relatedDiv = document.getElementById('relatedArticles');
    relatedDiv.innerHTML = relatedArticles.map(article => `
        <a href="article.html?id=${article.id}" class="related-card">
            <div class="related-card-icon">${article.icon}</div>
            <span class="related-card-category">${article.category}</span>
            <h3 class="related-card-title">${article.title}</h3>
        </a>
    `).join('');
}

// Share functions
function shareArticle(platform) {
    const article = articles.find(a => a.id === articleId);
    if (!article) return;

    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article.title);
    
    let shareUrl;
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

function copyLink() {
    const url = window.location.href;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copied to clipboard!');
        });
    } else {
        // Fallback for older browsers
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showNotification('Link copied to clipboard!');
    }
}

// Reading progress bar
function initReadingProgress() {
    window.addEventListener('scroll', updateReadingProgress);
    updateReadingProgress();
}

function updateReadingProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const trackLength = documentHeight - windowHeight;
    const percentScrolled = Math.floor((scrollTop / trackLength) * 100);
    
    document.getElementById('readingProgress').style.width = percentScrolled + '%';
}

// Bookmark functionality
function toggleBookmark() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles')) || [];
    const btn = document.getElementById('bookmarkBtn');
    
    if (bookmarks.includes(articleId)) {
        // Remove bookmark
        const index = bookmarks.indexOf(articleId);
        bookmarks.splice(index, 1);
        btn.classList.remove('active');
        showNotification('Removed from saved articles');
    } else {
        // Add bookmark
        bookmarks.push(articleId);
        btn.classList.add('active');
        showNotification('Saved to reading list! 📚');
    }
    
    localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarks));
}

function loadBookmarkStatus() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles')) || [];
    const btn = document.getElementById('bookmarkBtn');
    
    if (bookmarks.includes(articleId)) {
        btn.classList.add('active');
    }
}

// Like functionality
function toggleLike() {
    const likes = JSON.parse(localStorage.getItem('articleLikes')) || {};
    const btn = document.getElementById('likeBtn');
    const countSpan = document.getElementById('likeCount');
    
    if (!likes[articleId]) {
        likes[articleId] = { count: 0, liked: false };
    }
    
    if (likes[articleId].liked) {
        // Unlike
        likes[articleId].count = Math.max(0, likes[articleId].count - 1);
        likes[articleId].liked = false;
        btn.classList.remove('active');
        showNotification('Like removed');
    } else {
        // Like
        likes[articleId].count++;
        likes[articleId].liked = true;
        btn.classList.add('active');
        showNotification('Thanks for the love! ❤️');
    }
    
    countSpan.textContent = likes[articleId].count;
    localStorage.setItem('articleLikes', JSON.stringify(likes));
}

function loadLikeStatus() {
    const likes = JSON.parse(localStorage.getItem('articleLikes')) || {};
    const btn = document.getElementById('likeBtn');
    const countSpan = document.getElementById('likeCount');
    
    if (likes[articleId]) {
        countSpan.textContent = likes[articleId].count;
        if (likes[articleId].liked) {
            btn.classList.add('active');
        }
    }
}

// Comments functionality
function loadComments() {
    const comments = JSON.parse(localStorage.getItem('articleComments')) || {};
    const articleComments = comments[articleId] || [];
    
    document.getElementById('commentCount').textContent = articleComments.length;
    
    const commentsList = document.getElementById('commentsList');
    
    if (articleComments.length === 0) {
        commentsList.innerHTML = '<div class="no-comments">No comments yet. Be the first to share your thoughts!</div>';
        return;
    }
    
    // Sort by newest first
    articleComments.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    commentsList.innerHTML = articleComments.map(comment => `
        <div class="comment-item">
            <div class="comment-item-avatar">${comment.name.charAt(0).toUpperCase()}</div>
            <div class="comment-item-content">
                <div class="comment-item-header">
                    <span class="comment-item-name">${escapeHtml(comment.name)}</span>
                    <span class="comment-item-date">${formatCommentDate(comment.date)}</span>
                </div>
                <p class="comment-item-text">${escapeHtml(comment.text)}</p>
            </div>
        </div>
    `).join('');
}

function postComment(event) {
    event.preventDefault();
    
    const name = document.getElementById('commentName').value.trim();
    const text = document.getElementById('commentText').value.trim();
    
    if (!name || !text) return;
    
    const comments = JSON.parse(localStorage.getItem('articleComments')) || {};
    
    if (!comments[articleId]) {
        comments[articleId] = [];
    }
    
    const newComment = {
        name: name,
        text: text,
        date: new Date().toISOString()
    };
    
    comments[articleId].push(newComment);
    localStorage.setItem('articleComments', JSON.stringify(comments));
    
    // Reset form
    document.getElementById('commentName').value = '';
    document.getElementById('commentText').value = '';
    
    // Reload comments
    loadComments();
    
    showNotification('Comment posted! 💬');
}

function formatCommentDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
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
