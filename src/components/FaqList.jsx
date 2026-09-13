import { useState } from "react";
import { faqs } from "../data/siteContent";

export function FaqList() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <div className="faq-list">
      {faqs.map(([question, answer], index) => (
        <div
          className={openFaq === index ? "faq-item open" : "faq-item"}
          key={question}
        >
          <button onClick={() => toggleFaq(index)}>
            <span>{question}</span>
            <b>{openFaq === index ? "−" : "+"}</b>
          </button>
          {openFaq === index && <p>{answer}</p>}
        </div>
      ))}
    </div>
  );
}
