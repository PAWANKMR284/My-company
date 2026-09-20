import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogPosts, getReadingTime } from "../data/blogPosts";

export function BlogPage() {
  const { slug } = useParams();
  const currentPost =
    blogPosts.find((post) => post.slug === slug) || blogPosts[0];
  const readingTime = getReadingTime(currentPost);

  return (
    <>
      <Helmet>
        <title>{currentPost.title} | Pawan Tech Solution</title>
        <meta name="description" content={currentPost.excerpt} />
        <meta name="keywords" content={currentPost.tags.join(", ")} />
      </Helmet>

      <main className="blog-page-shell">
        <div className="blog-page-header section-pad">
          <Link className="text-link blog-back-link" to="/">
            ← Back to home
          </Link>
          <p className="blog-page-kicker">{currentPost.category}</p>
          <h1>{currentPost.title}</h1>
          <div className="blog-page-meta">
            <span>{currentPost.author}</span>
            <span>
              {new Date(currentPost.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>{readingTime} min read</span>
          </div>
        </div>

        <article className="blog-post section-pad">
          <img
            src={currentPost.image}
            alt={currentPost.title}
            className="blog-post-image"
          />

          <div className="blog-post-body">
            <p className="blog-post-intro">{currentPost.excerpt}</p>

            {currentPost.sections.map((section) => (
              <section key={section.heading} className="blog-post-section">
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
