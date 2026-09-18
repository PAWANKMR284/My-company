import { Link } from "react-router-dom";
import { blogPosts, getReadingTime } from "../data/blogPosts";

export function BlogSection() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="blog-section section-pad reveal-section" id="blog">
      <div className="section-heading blog-heading">
        <div>
          <span className="eyebrow blog-eyebrow">Latest insights</span>
          <h2>
            Blog &amp; ideas
            <br />
            <em>worth reading.</em>
          </h2>
        </div>
        <Link className="text-link blog-link" to="/blog">
          View all posts
        </Link>
      </div>

      <div className="blog-grid">
        {latestPosts.map((post) => {
          const readingTime = getReadingTime(post);

          return (
            <article className="blog-card" key={post.slug}>
              <div className="blog-card-image-wrap">
                <img
                  src={post.image}
                  alt={post.title}
                  className="blog-card-image"
                  loading="lazy"
                />
              </div>
              <div className="blog-card-body">
                <div className="blog-meta-row">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-read-time">{readingTime} min read</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="blog-card-footer">
                  <span>{post.author}</span>
                  <Link to={`/blog/${post.slug}`}>
                    Read more <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
