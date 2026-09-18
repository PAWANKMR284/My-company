import { Link } from "react-router-dom";
import { blogPosts, getReadingTime } from "../data/blogPosts";

export function BlogIndexPage() {
  return (
    <main className="blog-index-page section-pad">
      <div className="blog-index-header">
        <Link className="text-link blog-back-link" to="/">
          ← Back to home
        </Link>
        <span className="eyebrow blog-eyebrow">Insights & guides</span>
        <h1>Blog</h1>
      </div>

      <div className="blog-index-grid">
        {blogPosts.map((post) => {
          const readingTime = getReadingTime(post);

          return (
            <article className="blog-index-card" key={post.slug}>
              <img
                src={post.image}
                alt={post.title}
                className="blog-index-image"
              />
              <div className="blog-index-body">
                <div className="blog-meta-row">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-read-time">{readingTime} min read</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="blog-read-link">
                  Read article <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
