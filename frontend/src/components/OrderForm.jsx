import { useState } from "react";
import axios from "axios";
import "./OrderForm.css";

const initialFormData = {
    name: "",
    email: "",
    phone: "",
    postalCode: "",
    city: "",
    street: "",
    phone2: "",
    paymentMethod: "",
};

const paymentMethods = ["Készpénz", "Előre utalás", "Utánvét", "Bankkártya"];

function validateStep(step, formData) {
    const errors = {};

    if (step === 1) {
        if (!formData.name.trim()) errors.name = "A név megadása kötelező.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            errors.email = "Adj meg egy érvényes e-mail címet.";
        }
        if (formData.phone.trim().length < 9) {
            errors.phone = "A telefonszám legalább 9 karakter hosszú legyen.";
        }
    }

    if (step === 2) {
        if (!/^\d{4}$/.test(formData.postalCode.trim())) {
            errors.postalCode = "Az irányítószám pontosan 4 számjegy legyen.";
        }
        if (formData.city.trim().length < 2) {
            errors.city = "A város neve legalább 2 karakter legyen.";
        }
        if (formData.street.trim().length < 6) {
            errors.street = "Az utca és házszám legalább 6 karakter legyen.";
        }
        if (formData.phone2.trim().length < 9) {
            errors.phone2 = "A második telefonszám legalább 9 karakter hosszú legyen.";
        }
    }

    if (step === 3 && !formData.paymentMethod) {
        errors.paymentMethod = "Válassz egy fizetési módot.";
    }

    return errors;
}

export default function OrderForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [submitMessage, setSubmitMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentData) => ({ ...currentData, [name]: value }));
        setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
        setSubmitMessage("");
    };

    const handleNext = () => {
        const stepErrors = validateStep(step, formData);
        setErrors(stepErrors);
        if (Object.keys(stepErrors).length === 0) setStep((currentStep) => currentStep + 1);
    };

    const handleBack = () => {
        setErrors({});
        setSubmitMessage("");
        setStep((currentStep) => currentStep - 1);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const stepErrors = validateStep(step, formData);
        setErrors(stepErrors);
        if (Object.keys(stepErrors).length > 0) return;

        setIsSubmitting(true);
        setSubmitMessage("");
        try {
            await axios.post("https://jsonplaceholder.typicode.com/posts", formData);
            setSubmitMessage("A rendelés elküldve");
        } catch (error) {
            console.error("A rendelés elküldése nem sikerült:", error);
            setSubmitMessage("A rendelés elküldése nem sikerült. Kérjük, próbáld újra.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderField = (name, label, props = {}) => (
        <div className="order-field">
            <label htmlFor={name}>{label}</label>
            <input id={name} name={name} value={formData[name]} onChange={handleChange} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} {...props} />
            {errors[name] && (
                <span className="order-field-error" id={`${name}-error`}>
                    {errors[name]}
                </span>
            )}
        </div>
    );

    return (
        <main className="order-page">
            <section className="order-card" aria-labelledby="order-title">
                <header className="order-header">
                    <p className="order-eyebrow">Webshop megrendelés</p>
                    <h1 id="order-title">Megrendelés véglegesítése</h1>
                    <ol className="order-progress" aria-label="Űrlap lépései">
                        {["Személyes adatok", "Szállítás", "Összegzés"].map((label, index) => {
                            const stepNumber = index + 1;
                            const state = stepNumber === step ? "active" : stepNumber < step ? "complete" : "";
                            return (
                                <li className={`order-progress-step ${state}`} key={label} aria-current={stepNumber === step ? "step" : undefined}>
                                    <span className="order-progress-number">{stepNumber < step ? "✓" : stepNumber}</span>
                                    <span className="order-progress-label">{label}</span>
                                </li>
                            );
                        })}
                    </ol>
                </header>

                <form
                    onSubmit={
                        step === 3
                            ? handleSubmit
                            : (event) => {
                                  event.preventDefault();
                                  handleNext();
                              }
                    }
                    noValidate
                >
                    {step === 1 && (
                        <section className="order-step" aria-labelledby="step-title">
                            <h2 id="step-title">1.Lépés:Személyes adatok</h2>
                            {renderField("name", "Teljes név", { type: "text", autoComplete: "name" })}
                            {renderField("email", "E-mail cím", { type: "email", autoComplete: "email" })}
                            {renderField("phone", "Telefonszám", { type: "tel", autoComplete: "tel" })}
                        </section>
                    )}

                    {step === 2 && (
                        <section className="order-step" aria-labelledby="step-title">
                            <h2 id="step-title">2.Lépés: Szállítási cím és fizetési mód</h2>
                            {renderField("postalCode", "Irányítószám", { type: "text", inputMode: "numeric", autoComplete: "postal-code", maxLength: 4 })}
                            {renderField("city", "Város", { type: "text", autoComplete: "address-level2" })}
                            {renderField("street", "Utca, házszám", { type: "text", autoComplete: "street-address" })}
                            {renderField("phone2", "Második telefonszám", { type: "tel" })}
                        </section>
                    )}

                    {step === 3 && (
                        <section className="order-step" aria-labelledby="step-title">
                            <h2 id="step-title">3.Lépés: Fizetés és összegzés</h2>
                            <fieldset className="order-payment">
                                <legend>Fizetési mód Kiválasztása:</legend>
                                {paymentMethods.map((method) => (
                                    <label className="order-radio-option" key={method}>
                                        <input type="radio" name="paymentMethod" value={method} checked={formData.paymentMethod === method} onChange={handleChange} aria-invalid={Boolean(errors.paymentMethod)} aria-describedby={errors.paymentMethod ? "paymentMethod-error" : undefined} />
                                        <span>{method}</span>
                                    </label>
                                ))}
                                {errors.paymentMethod && (
                                    <span className="order-field-error" id="paymentMethod-error">
                                        {errors.paymentMethod}
                                    </span>
                                )}
                            </fieldset>

                            <div className="order-summary">
                                <h3>Rendelés áttekintése</h3>
                                <dl>
                                    <div>
                                        <dt>Név</dt>
                                        <dd>{formData.name}</dd>
                                    </div>
                                    <div>
                                        <dt>E-mail</dt>
                                        <dd>{formData.email}</dd>
                                    </div>
                                    <div>
                                        <dt>Telefonszám</dt>
                                        <dd>{formData.phone}</dd>
                                    </div>
                                    <div>
                                        <dt>Második telefonszám</dt>
                                        <dd>{formData.phone2}</dd>
                                    </div>
                                    <div>
                                        <dt>Szállítási cím</dt>
                                        <dd>
                                            {formData.postalCode} {formData.city}, {formData.street}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt>Fizetési mód</dt>
                                        <dd>{formData.paymentMethod || "Még nincs kiválasztva"}</dd>
                                    </div>
                                    <div>
                                        <dt>Rendelés összege</dt>
                                        <dd>12 990 Ft</dd>
                                    </div>
                                </dl>
                            </div>
                        </section>
                    )}

                    <div className="order-actions">
                        {step > 1 && (
                            <button className="order-button order-button-secondary" type="button" onClick={handleBack}>
                                Vissza
                            </button>
                        )}
                        {step < 3 ? (
                            <button className="order-button order-button-primary" type="submit">
                                Tovább
                            </button>
                        ) : (
                            <button className="order-button order-button-primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Küldés..." : "Megrendelés elküldése"}
                            </button>
                        )}
                    </div>
                    {submitMessage && (
                        <p className={`order-message ${submitMessage === "A rendelés elküldve" ? "success" : "error"}`} role="status">
                            {submitMessage}
                        </p>
                    )}
                </form>
            </section>
        </main>
    );
}
