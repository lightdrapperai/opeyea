"use client";

import { useMemo, useState } from "react";

const errors = [
  ["I am coming", "I am on my way.", "Use this when you mean you are going somewhere and will return or arrive shortly; context matters."],
  ["Off the light", "Turn off the light.", "Use the verb “turn off” for switching a light off."],
  ["Close the light", "Turn off the light.", "Lights are normally turned on or off, not closed."],
  ["I want to branch at the junction", "I want to turn at the junction.", "“Turn” is the natural Standard English expression for changing direction."],
  ["I have a question to ask you", "I have a question for you.", "Both can be grammatical, but “I have a question for you” is more natural in many contexts."],
  ["He is owing me money", "He owes me money.", "Use the simple present “owes” for a current debt."],
];

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [consentSent, setConsentSent] = useState(false);
  const [menu, setMenu] = useState(false);

  const suggestions = useMemo(() => {
    const q = input.trim().toLowerCase();
    if (!q) return [];
    return errors.filter(([wrong]) => wrong.toLowerCase().includes(q)).slice(0, 3);
  }, [input]);

  function correctEnglish() {
    const q = input.trim().toLowerCase();
    const found = errors.find(([wrong]) => wrong.toLowerCase() === q);
    setResult(found ? { wrong: found[0], correct: found[1], note: found[2] } : {
      wrong: input.trim() || "Your expression",
      correct: "We are building this correction library.",
      note: "This first MVP contains starter examples. The full OPEYEA correction database can be expanded as the project grows."
    });
  }

  return (
    <main>
      <header className="nav">
        <a className="brand" href="#home">
          <span className="brandMark">O</span>
          <span>OPEYEA</span>
        </a>
        <button className="menuBtn" onClick={() => setMenu(!menu)}>☰</button>
        <nav className={menu ? "open" : ""}>
          <a href="#clinic" onClick={() => setMenu(false)}>English Clinic</a>
          <a href="#correct" onClick={() => setMenu(false)}>Correct My English</a>
          <a href="#errors" onClick={() => setMenu(false)}>Common Errors</a>
          <a href="#consent" onClick={() => setMenu(false)}>Parent Consent</a>
          <a href="#shirt" onClick={() => setMenu(false)}>T-Shirt</a>
        </nav>
      </header>

      <section id="home" className="hero">
        <div className="heroText">
          <p className="eyebrow">ENGLISH CLINIC • OPEYEA</p>
          <h1>Speak it right.<br/><span>Write it right.</span></h1>
          <p className="lead">
            Helping students identify and correct incorrect English expressions
            for confident communication in school and beyond.
          </p>
          <div className="actions">
            <a className="btn primary" href="#correct">Correct My English →</a>
            <a className="btn secondary" href="#clinic">Learn About OPEYEA</a>
          </div>
          <p className="smallNote">Operation Put An End To Yoruba English Association</p>
        </div>
        <div className="heroCard">
          <div className="cardTop">TODAY'S CORRECTION</div>
          <div className="wrong">❌ “Off the light.”</div>
          <div className="arrow">↓</div>
          <div className="right">✓ “Turn off the light.”</div>
          <p>Learn the natural Standard English expression.</p>
        </div>
      </section>

      <section id="clinic" className="section split">
        <div>
          <p className="eyebrow">THE ENGLISH CLINIC</p>
          <h2>A practical space for better English.</h2>
        </div>
        <div>
          <p>
            English Clinic helps students notice the expressions they use,
            understand why they are incorrect or unnatural in Standard English,
            and practise better alternatives.
          </p>
          <div className="pillRow">
            <span>Spoken English</span><span>Written English</span><span>Grammar</span>
            <span>Vocabulary</span><span>Pronunciation</span>
          </div>
        </div>
      </section>

      <section id="correct" className="section dark">
        <div className="sectionHead">
          <p className="eyebrow">TRY IT</p>
          <h2>Correct My English</h2>
          <p>Enter an expression you want to improve.</p>
        </div>
        <div className="checker">
          <div className="inputWrap">
            <textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); setResult(null); }}
              placeholder='Example: “Off the light.”'
              rows="4"
            />
            {suggestions.length > 0 && (
              <div className="suggestions">
                {suggestions.map(([wrong, correct]) => (
                  <button key={wrong} onClick={() => setInput(wrong)}>
                    <b>{wrong}</b><span>→ {correct}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="btn primary" onClick={correctEnglish}>Check Expression</button>
          {result && (
            <div className="result">
              <div><span className="label">YOU WROTE</span><strong>“{result.wrong}”</strong></div>
              <div><span className="label">BETTER FORM</span><strong className="correct">“{result.correct}”</strong></div>
              <p>{result.note}</p>
            </div>
          )}
        </div>
      </section>

      <section id="errors" className="section">
        <div className="sectionHead">
          <p className="eyebrow">LEARN</p>
          <h2>Common English Expressions</h2>
          <p>Small corrections can make a big difference.</p>
        </div>
        <div className="errorGrid">
          {errors.map(([wrong, correct, note], i) => (
            <article className="errorCard" key={wrong}>
              <span className="number">0{i+1}</span>
              <div className="wrongText">❌ {wrong}</div>
              <div className="correctText">✓ {correct}</div>
              <p>{note}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="consent" className="section consent">
        <div className="consentIntro">
          <p className="eyebrow">FOR PARENTS & GUARDIANS</p>
          <h2>Give your child permission to participate.</h2>
          <p>
            Parents and guardians can review the purpose of English Clinic and
            OPEYEA before giving permission for a student to participate in
            school-based activities.
          </p>
        </div>
        <form className="consentForm" onSubmit={(e) => { e.preventDefault(); setConsentSent(true); }}>
          <input required placeholder="Student's full name" />
          <div className="two"><input required placeholder="Class" /><input required placeholder="School" /></div>
          <input required placeholder="Parent/Guardian name" />
          <input required type="tel" placeholder="Parent/Guardian phone number" />
          <label className="check"><input required type="checkbox" /> I give permission for my child to participate in English Clinic and OPEYEA activities.</label>
          <button className="btn primary" type="submit">{consentSent ? "Consent Recorded ✓" : "Give Consent"}</button>
          {consentSent && <p className="success">Thank you. This demo form is ready to be connected to a secure database and notification system.</p>}
        </form>
      </section>

      <section id="shirt" className="section shirt">
        <div className="shirtMock">
          <div className="tee">
            <div className="teePrint">ENGLISH<br/><b>CLINIC</b><br/><small>OPEYEA</small></div>
          </div>
        </div>
        <div>
          <p className="eyebrow">OPEYEA MERCHANDISE</p>
          <h2>Wear the message.</h2>
          <p>
            An affordable round-neck T-shirt for students, teachers, parents
            and supporters of English Clinic and OPEYEA.
          </p>
          <div className="price">Affordable price</div>
          <button className="btn primary" onClick={() => window.location.href="https://wa.me/2349133790606?text=Hello%20OPEYEA%2C%20I%20want%20to%20order%20the%20English%20Clinic%20%2F%20OPEYEA%20T-shirt."}>
            Order T-Shirt on WhatsApp →
          </button>
          <p className="smallNote">Sizes and final price can be added when production is confirmed.</p>
        </div>
      </section>

      <section className="cta">
        <p className="eyebrow">BUILDING BETTER ENGLISH</p>
        <h2>Correct the expression.<br/>Build the confidence.</h2>
        <a className="btn secondary" href="#correct">Start Practising →</a>
      </section>

      <footer>
        <div><b>OPEYEA</b><br/><span>English Clinic</span></div>
        <div>Operation Put An End To Yoruba English Association</div>
        <div>WhatsApp: 09133790606</div>
      </footer>
    </main>
  );
}
