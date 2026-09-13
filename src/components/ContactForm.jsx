import { useState } from "react";

const initialForm = {
  sender_name: "",
  sender_email: "",
  project_details: "",
};
const formSubmitEndpoint =
  "https://formsubmit.co/ajax/0cfd30baae01759832b6361da9e889d4";

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(formSubmitEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_name: form.sender_name,
          sender_email: form.sender_email,
          project_details: form.project_details,
          _subject: `New enquiry from ${form.sender_name}`,
          _replyto: form.sender_email,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to send the message.");
      }

      setSubmitted(true);
    } catch {
      setError(
        "We could not send your message. Please try again or email us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="form-success">
        <span>✓</span>
        <h3>Message received.</h3>
        <p>Thanks for reaching out. We&apos;ll be in touch shortly.</p>
        <button
          type="button"
          onClick={() => {
            setForm(initialForm);
            setSubmitted(false);
            setError("");
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Your name
        <input
          required
          name="sender_name"
          value={form.sender_name}
          onChange={updateField}
          placeholder="Jane Smith"
        />
      </label>
      <label>
        Email address
        <input
          required
          type="email"
          name="sender_email"
          value={form.sender_email}
          onChange={updateField}
          placeholder="jane@company.com"
        />
      </label>
      <label>
        Tell us a little about your project
        <textarea
          required
          name="project_details"
          value={form.project_details}
          onChange={updateField}
          placeholder="What are you building?"
          rows="3"
        />
      </label>
      <input
        aria-hidden="true"
        className="form-honeypot"
        name="_honey"
        tabIndex="-1"
        autoComplete="off"
      />
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button className="submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send enquiry"}{" "}
        {!isSubmitting && <span>↗</span>}
      </button>
    </form>
  );
}
