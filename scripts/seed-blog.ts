import { PrismaClient } from "@prisma/client";
import OpenAI from "openai";
import slugify from "slugify";

const prisma = new PrismaClient();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Blog categories for GovernValu
const categories = [
    {
        name: "Corporate Governance",
        slug: "corporate-governance",
        description: "Best practices, frameworks, and insights for effective corporate governance in the GCC region."
    },
    {
        name: "Investment Strategy",
        slug: "investment-strategy",
        description: "Strategic investment insights, market analysis, and portfolio management guidance."
    },
    {
        name: "Risk Management",
        slug: "risk-management",
        description: "Enterprise risk frameworks, cybersecurity governance, and risk mitigation strategies."
    },
    {
        name: "GCC Insights",
        slug: "gcc-insights",
        description: "Regional news, market trends, and business opportunities across the Gulf Cooperation Council."
    }
];

// Blog topics for each category (3 per category = 12 total)
const blogTopics = [
    // Corporate Governance (3)
    { category: "Corporate Governance", title: "Best Practices for Board Composition in GCC Companies" },
    { category: "Corporate Governance", title: "The Evolution of Corporate Governance Standards in Qatar" },
    { category: "Corporate Governance", title: "Building Effective Audit Committees: A Strategic Guide" },
    // Investment Strategy (3)
    { category: "Investment Strategy", title: "Navigating Sovereign Wealth Fund Investments in the GCC" },
    { category: "Investment Strategy", title: "Private Equity Opportunities in the Middle East Market" },
    { category: "Investment Strategy", title: "ESG Integration in GCC Investment Portfolios" },
    // Risk Management (3)
    { category: "Risk Management", title: "Enterprise Risk Management Frameworks for Family Businesses" },
    { category: "Risk Management", title: "Cybersecurity Governance for Financial Institutions" },
    { category: "Risk Management", title: "Managing Political and Economic Risks in Emerging Markets" },
    // GCC Insights (3)
    { category: "GCC Insights", title: "Qatar's Vision 2030: Implications for Investors" },
    { category: "GCC Insights", title: "The Rise of Family Offices in the Gulf Region" },
    { category: "GCC Insights", title: "Saudi Arabia's Economic Diversification: Investment Outlook" },
];

// Featured images from Unsplash for each article
const articleImages = [
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop", // Board meeting
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", // Qatar skyline
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop", // Business meeting
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop", // Investment charts
    "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2070&auto=format&fit=crop", // Middle East city
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop", // Modern office
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop", // Business documents
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop", // Cybersecurity
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop", // Risk analysis
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2070&auto=format&fit=crop", // Dubai skyline
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop", // Family office
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop", // Saudi Arabia
];

async function generateArticleContent(title: string, category: string): Promise<{
    title: string;
    excerpt: string;
    content: string;
    metaTitle: string;
    metaDesc: string;
}> {
    console.log(`  Generating content for: "${title}"...`);

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `You are an expert content writer for GovernValu, a premier governance and investment advisory firm based in Qatar serving the GCC region.

Write professional, insightful articles that demonstrate deep expertise. Your writing style should be:
- Professional yet accessible
- Data-informed and evidence-based
- Strategic and forward-looking
- Relevant to C-suite executives, board members, family business owners, and institutional investors`
            },
            {
                role: "user",
                content: `Write a comprehensive blog article with the title: "${title}"

This article belongs to the "${category}" category.

Generate the article in the following JSON format:
{
    "title": "The exact title",
    "excerpt": "A compelling 2-3 sentence summary (150-200 characters)",
    "content": "The full article content in HTML format with proper headings (h2, h3), paragraphs, and lists where appropriate. Use <p>, <h2>, <h3>, <ul>, <li>, <strong>, <em> tags. The article should be 800-1000 words. Do NOT include the title in the content - start with an introductory paragraph.",
    "metaTitle": "SEO-optimized title (50-60 characters)",
    "metaDesc": "SEO meta description (150-160 characters)"
}`
            }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: "json_object" }
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
        throw new Error("No content generated");
    }

    return JSON.parse(content);
}

async function main() {
    console.log("🚀 Starting blog seed process...\n");

    // Step 1: Create categories
    console.log("📁 Creating blog categories...");
    const categoryMap: Record<string, string> = {};

    for (const cat of categories) {
        const existing = await prisma.blogCategory.findUnique({
            where: { slug: cat.slug }
        });

        if (existing) {
            console.log(`  ✓ Category "${cat.name}" already exists`);
            categoryMap[cat.name] = existing.id;
        } else {
            const created = await prisma.blogCategory.create({
                data: cat
            });
            console.log(`  ✓ Created category: ${cat.name}`);
            categoryMap[cat.name] = created.id;
        }
    }
    console.log("");

    // Step 2: Generate and create blog posts
    console.log("📝 Generating blog articles with AI...\n");

    for (let i = 0; i < blogTopics.length; i++) {
        const topic = blogTopics[i];
        const slug = slugify(topic.title, { lower: true, strict: true });

        // Check if post already exists
        const existing = await prisma.blogPost.findUnique({
            where: { slug }
        });

        if (existing) {
            console.log(`  ⏭️  Article "${topic.title}" already exists, skipping...\n`);
            continue;
        }

        try {
            // Generate content with AI
            const article = await generateArticleContent(topic.title, topic.category);

            // Create the blog post
            await prisma.blogPost.create({
                data: {
                    title: article.title,
                    slug,
                    excerpt: article.excerpt,
                    content: article.content,
                    image: articleImages[i],
                    categoryId: categoryMap[topic.category],
                    metaTitle: article.metaTitle,
                    metaDesc: article.metaDesc,
                    published: true,
                }
            });

            console.log(`  ✓ Created article ${i + 1}/12: ${article.title}\n`);

            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (error) {
            console.error(`  ✗ Failed to create article: ${topic.title}`, error);
        }
    }

    console.log("\n✅ Blog seed completed successfully!");
    console.log(`   Created ${categories.length} categories`);
    console.log(`   Generated ${blogTopics.length} articles`);
}

main()
    .catch((e) => {
        console.error("Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
