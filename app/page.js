// @ts-nocheck
"use client";

import { useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);
const errors = [
  ["I am coming", "I am on my way.", "When you mean you are going somewhere and will arrive shortly, “I am on my way” is the natural expression."],
  ["Off the light", "Turn off the light.", "Use “turn off” when switching a light off."],
  ["Close the light", "Turn off the light.", "Lights are normally turned on or off, not closed."],
  ["Open the light", "Turn on the light.", "Use “turn on” when switching a light on."],
  ["Close the fan", "Turn off the fan.", "Use “turn off” for switching an electrical appliance off."],
  ["Open the fan", "Turn on the fan.", "Use “turn on” when switching an appliance on."],
  ["I want to branch at the junction", "I want to turn at the junction.", "“Turn” is the natural Standard English expression for changing direction."],
  ["I have a question to ask you", "I have a question for you.", "“I have a question for you” is a natural way to introduce a question."],
  ["He is owing me money", "He owes me money.", "Use “owes” for a debt that someone currently has."],
  ["She is my junior sister", "She is my younger sister.", "“Younger sister” is the standard expression for a sister who is younger than you."],
  ["He is my senior brother", "He is my elder brother.", "“Elder brother” is the natural Standard English expression."],
  ["My senior sister", "My elder sister.", "Use “elder sister” when referring to a sister who is older than you."],
  ["I will flash you", "I will give you a missed call.", "“Give you a missed call” is clearer in Standard English."],
  ["I have forgotten my book at home", "I left my book at home.", "Use “left” when you mean you did not bring something with you."],
  ["He has gone to abroad", "He has gone abroad.", "“Abroad” does not normally take “to” before it."],
  ["I want to alight from the bus", "I want to get off the bus.", "“Get off the bus” is the natural everyday Standard English expression."],
  ["Enter inside", "Come in.", "“Enter” already expresses the idea of going inside, so “inside” is unnecessary."],
  ["Come and eat", "Come and have something to eat.", "“Have something to eat” is a natural Standard English expression."],
  ["I am hearing you", "I can hear you.", "Use “can hear” when you mean that you are able to hear someone."],
  ["I am seeing him", "I can see him.", "Use “can see” when you mean that you are able to see someone."],
  ["I am understanding you", "I understand you.", "“Understand” is normally used in the simple present, not the continuous form."],
  ["She is knowing the answer", "She knows the answer.", "“Know” is normally a stative verb and is not usually used in the continuous form."],
  ["I did not knew", "I did not know.", "After “did not,” use the base form of the verb: “know.”"],
  ["He did not went", "He did not go.", "After “did not,” use the base form of the verb: “go.”"],
  ["I have went there", "I have gone there.", "Use the past participle “gone” after “have.”"],
  ["She has ate the food", "She has eaten the food.", "Use the past participle “eaten” after “has.”"],
  ["He have gone home", "He has gone home.", "Use “has” with he, she, or it."],
  ["They was late", "They were late.", "Use “were” with “they.”"],
  ["She don't know", "She doesn't know.", "Use “doesn't” with he, she, or it."],
  ["I doesn't know", "I don't know.", "Use “don't” with I, you, we, and they."],
  ["He don't like it", "He doesn't like it.", "Use “doesn't” with he, she, or it."],
  ["She is married with a doctor", "She is married to a doctor.", "The standard expression is “married to,” not “married with.”"],
  ["Discuss about the matter", "Discuss the matter.", "“Discuss” does not normally take “about” before its direct object."],
  ["Return back", "Return.", "“Return” already means to go or come back, so “back” is usually unnecessary."],
  ["Repeat again", "Repeat.", "“Repeat” already means to say or do something again."],
  ["Revert back to me", "Get back to me.", "“Get back to me” is a natural expression when asking someone to respond later."],
  ["Request for something", "Request something.", "As a verb, “request” can take the object directly."],
  ["Order for food", "Order food.", "As a verb, “order” can take the object directly."],
  ["Emphasise on the point", "Emphasise the point.", "The verb “emphasise” normally takes the object directly."],
  ["Congratulate him for his success", "Congratulate him on his success.", "The standard preposition after “congratulate” is “on.”"],
  ["He is good in Mathematics", "He is good at Mathematics.", "Use “good at” when talking about a skill or subject."],
  ["She is married with two children", "She is married and has two children.", "“Married with two children” is not the standard way to express this idea."],
  ["I am in need of money", "I need money.", "“I need money” is simpler and more natural in everyday English."],
  ["I want to borrow you my book", "I want to lend you my book.", "“Lend” means to give something temporarily; “borrow” means to receive it temporarily."],
  ["Can I lend your pen?", "Can I borrow your pen?", "You borrow something from someone; you lend something to someone."],
  ["He borrowed me money", "He lent me money.", "The person who gives the money lends it; the person who receives it borrows it."],
  ["I am coming to school yesterday", "I came to school yesterday.", "Use the past tense “came” for an action that happened yesterday."],
  ["I will went tomorrow", "I will go tomorrow.", "After “will,” use the base form of the verb."],
  ["She can sings", "She can sing.", "After a modal verb such as “can,” use the base form of the verb."],
  ["He can goes there", "He can go there.", "After “can,” use the base form of the verb."],
  ["I used to went there", "I used to go there.", "After “used to,” use the base form of the verb."],
  ["He is more taller than me", "He is taller than me.", "Do not use “more” with the comparative form “taller.”"],
  ["This is the most easiest question", "This is the easiest question.", "Do not use “most” with the superlative form “easiest.”"],
  ["She is more prettier", "She is prettier.", "Use either “more beautiful” or “prettier,” not both comparative forms together."],
  ["I have two luggages", "I have two pieces of luggage.", "“Luggage” is normally an uncountable noun in Standard English."],
  ["She gave me an advice", "She gave me some advice.", "“Advice” is uncountable, so we do not normally say “an advice.”"],
  ["He gave me many informations", "He gave me a lot of information.", "“Information” is uncountable in Standard English."],
  ["I need an equipment", "I need some equipment.", "“Equipment” is normally an uncountable noun."],
  ["The news are good", "The news is good.", "“News” is treated as singular in Standard English."],
  ["People is complaining", "People are complaining.", "“People” is normally treated as a plural noun."],
  ["One of my friend", "One of my friends.", "After “one of,” use a plural noun."],
  ["One of the student", "One of the students.", "After “one of,” use a plural noun."],
  ["She is one of the best student", "She is one of the best students.", "After “one of the best,” use a plural noun."],
  ["I am a staff", "I am a staff member.", "“Staff” generally refers to a group of employees; “staff member” refers to one person."],
  ["He is a personnel", "He is a member of staff.", "“Personnel” is generally a collective noun; “member of staff” is natural for one person."],
  ["I am coming from Lagos", "I am from Lagos.", "Use “I am from Lagos” when stating your origin. “I am coming from Lagos” describes where you are travelling from."],
  ["Where are you coming from?", "Where are you from?", "“Where are you from?” is the usual question when asking about someone's origin."],
  ["What is your name called?", "What is your name?", "“What is your name?” is the natural Standard English question."],
  ["How is your name?", "What is your name?", "Use “What is your name?” when asking for someone's name."],
  ["What is the time by your watch?", "What time is it?", "“What time is it?” is the natural general question."],
  ["I am coming now", "I am on my way now.", "When you mean you are travelling toward a place, “I am on my way” is clearer."],
  ["I want to branch your house", "I want to stop by your house.", "“Stop by” is a natural expression for making a short visit."],
  ["I will branch you later", "I will stop by later.", "“Stop by” is used when you plan to make a short visit."],
  ["I want to barb my hair", "I want to have my hair cut.", "“Have my hair cut” is the standard expression."],
  ["I want to barb my hair tomorrow", "I want to have my hair cut tomorrow.", "Use “have my hair cut” in Standard English."],
  ["I want to make my hair", "I want to have my hair done.", "“Have my hair done” is a natural general expression."],
  ["I want to on the light", "I want to turn on the light.", "Use “turn on” when switching on a light."],
  ["I want to off the light", "I want to turn off the light.", "Use “turn off” when switching off a light."],
  ["Put on the generator", "Turn on the generator.", "For starting an electrical generator, “turn on” is the clearer expression."],
  ["Off the AC", "Turn off the air conditioner.", "Use “turn off” when switching off an appliance."],
  ["On the light", "Turn on the light.", "Use “turn on” when switching on a light."],
  ["I want to branch at the next junction", "I want to turn at the next junction.", "Use “turn” when describing a change in direction."],
];

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
const [consentSent, setConsentSent] = useState(false);
const [consentError, setConsentError] = useState("");
const [consentLoading, setConsentLoading] = useState(false);
  const [menu, setMenu] = useState(false);
  const [schoolSent, setSchoolSent] = useState(false);
const [schoolError, setSchoolError] = useState("");
const [schoolLoading, setSchoolLoading] = useState(false);

  const suggestions = useMemo(() => {
  const q = input
    .trim()
    .toLowerCase()
    .replace(/[“”"'.!,?]/g, "")
    .replace(/\s+/g, " ");

  if (!q) return [];

  return errors
    .filter((item) => {
      const wrong = item[0]
        .toLowerCase()
        .replace(/[“”"'.!,?]/g, "")
        .replace(/\s+/g, " ");

      return wrong.includes(q) || q.includes(wrong);
    })
    .slice(0, 3);
}, [input]);

  function correctEnglish() {
  const normalize = (text = "") =>
    text
      .trim()
      .toLowerCase()
      .replace(/[“”"'.!,?]/g, "")
      .replace(/\s+/g, " ");

  const q = normalize(input);

  const found = errors.find(([wrong]) => normalize(wrong) === q);

  setResult(
    found
      ? {
          wrong: found[0],
          correct: found[1],
          note: found[2],
        }
      : {
          wrong: input.trim() || "Your expression",
          correct: "No correction found yet.",
          note: "This expression is not yet in the OPEYEA correction library. Try another expression or check back as the library grows.",
        }
  );
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
          <h1>Speak It Right.<br/><span>Speak It Proud.</span></h1>
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
              onChange={(event) => { setInput(event.target.value); setResult(null); }}
              placeholder='Example: “Off the light.”'
              rows="4"
            />
            {suggestions.length > 0 && (
              <div className="suggestions">
                {suggestions.map(([wrong, correct]) => (
  <button
    key={wrong}
    className="suggestionCard"
    onClick={() => {
      setInput(wrong);
      setResult({
        wrong,
        correct,
        note: errors.find(([item]) => item === wrong)?.[2] || ""
      });
    }}
  >
    <span className="suggestionLabel">SUGGESTED CORRECTION</span>
    <span className="suggestionWrong">❌ {wrong}</span>
    <span className="suggestionArrow">↓</span>
    <span className="suggestionCorrect">✓ {correct}</span>
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
<form
  className="consentForm"
  onSubmit={async (event) => {
    event.preventDefault();
    setConsentError("");
    setConsentLoading(true);
    const formElement = event.currentTarget;
const form = new FormData(formElement);

    

    const { error } = await supabase.from("parent_consents").insert([
      {
        student_name: form.get("student_name"),
        student_class: form.get("student_class"),
        school: form.get("school"),
        parent_guardian_name: form.get("parent_guardian_name"),
        parent_guardian_phone: form.get("parent_guardian_phone"),
        consent_given: true,
      },
    ]);

    setConsentLoading(false);

    if (error) {
      setConsentError("We couldn't submit the consent form. Please try again.");
      return;
    }

    setConsentSent(true);
    formElement.reset();
  }}
>
<input
  required
  name="student_name"
  placeholder="Student's full name"
/>
<div className="two">
  <input required name="student_class" placeholder="Class" />
<input required name="school" placeholder="School" />
</div>
          <input
  required
  name="parent_guardian_name"
  placeholder="Parent/Guardian name"
/>
          <input
  required
  name="parent_guardian_phone"
  type="tel"
  placeholder="Parent/Guardian phone number"
/>
          <label className="check"><input required type="checkbox" /> I give permission for my child to participate in English Clinic and OPEYEA activities.</label>
          <button className="btn primary" type="submit" disabled={consentLoading}>
  {consentLoading ? "Submitting..." : consentSent ? "Consent Recorded ✓" : "Give Consent"}
</button>
          {consentError && <p className="error">{consentError}</p>}
{consentSent && <p className="success">Thank you. Your consent has been submitted successfully.</p>}
        </form>
      </section>
<section id="school-registration" className="section">
  <div className="consentIntro">
    <p className="eyebrow">FOR SCHOOLS</p>

    <h2>Partner With OPEYEA</h2>

    <p>
      Is your school interested in having English Clinic and OPEYEA activities
      for students? Register your school and our team will contact you.
    </p>
  </div>

  <form
    className="consentForm"
    onSubmit={async (event) => {
      event.preventDefault();

      setSchoolError("");
      setSchoolSent(false);
      setSchoolLoading(true);

      const formElement = event.currentTarget;
      const form = new FormData(formElement);

      const schoolData = {
        school_name: form.get("school_name"),
        school_address: form.get("school_address"),
        principal_name: form.get("principal_name"),
        contact_person: form.get("contact_person"),
        phone: form.get("phone"),
        email: form.get("email") || null,
        classes_interested: form.get("classes_interested"),
        student_count: form.get("student_count") || null,
      };

      const { error } = await supabase
        .from("school_registrations")
        .insert([schoolData]);

      setSchoolLoading(false);

      if (error) {
        console.error("School registration error:", error);
        setSchoolError(
          "We couldn't submit the school registration. Please try again."
        );
        return;
      }

      setSchoolSent(true);
      formElement.reset();
    }}
  >
    <input
      required
      name="school_name"
      placeholder="School name"
    />

    <input
      required
      name="school_address"
      placeholder="School address"
    />

    <input
      required
      name="principal_name"
      placeholder="Principal / Head Teacher's name"
    />

    <input
      required
      name="contact_person"
      placeholder="Contact person's name"
    />

    <input
      required
      name="phone"
      type="tel"
      placeholder="Contact phone number"
    />

    <input
      name="email"
      type="email"
      placeholder="School email address (optional)"
    />

    <input
      required
      name="classes_interested"
      placeholder="Classes interested (e.g. JSS 1–3)"
    />

    <input
      name="student_count"
      placeholder="Approximate number of students (optional)"
    />

    <button
      className="btn primary"
      type="submit"
      disabled={schoolLoading}
    >
      {schoolLoading ? "Submitting..." : "Register Your School"}
    </button>

    {schoolError && (
      <p className="formError">{schoolError}</p>
    )}

    {schoolSent && (
      <p className="formSuccess">
        Thank you. Your school registration has been submitted successfully.
      </p>
    )}
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
