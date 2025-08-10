import { useState } from "react";
import styles from "./FieldBuilder.module.scss";
import LabelField from "./fields/LabelField";
import DefaultValueField from "./fields/DefaultValueField";
import OrderField from "./fields/LabeledSelectField/OrderField";
import TypeField from "./fields/LabeledSelectField/TypeField";
import RequiredCheckboxField from "./fields/RequiredCheckboxField";
import ChoicesField from "./fields/ChoicesField";
import Footer from "./footer";
import { useFormReducer } from "../hooks/useFormReducer";
import { submitForm } from "../services/FieldService";

const FieldBuilder: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { form, errors, updateForm, resetForm, validateForm } =
    useFormReducer();

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const choicesArray = form.choices
      .split("\n")
      .map((c) => c.trim())
      .filter((c) => c);

    const choicesSet = new Set(choicesArray);

    if (form.defaultValue && !choicesSet.has(form.defaultValue)) {
      choicesSet.add(form.defaultValue);
    }

    const finalChoices = Array.from(choicesSet).slice(0, 50);
    /**
     * the final choices cannot be more than 50 choices total
     */

    const payload = {
      ...form,
      choices: finalChoices,
    };

    try {
      await submitForm(payload);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    resetForm();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Field Builder</div>
      <div className={styles.body}>
        <LabelField
          value={form.label}
          onChange={(label) => updateForm({ label })}
          error={errors.label}
        />
        <DefaultValueField
          value={form.defaultValue}
          onChange={(defaultValue) => updateForm({ defaultValue })}
          error={errors.defaultValue}
        />
        <TypeField
          value={form.type}
          onChange={(type) => updateForm({ type })}
        />
        <RequiredCheckboxField
          value={form.required}
          onChange={(required) => updateForm({ required })}
        />
        <ChoicesField
          value={form.choices}
          onChange={(choices) => updateForm({ choices })}
          error={errors.choices}
        />
        <OrderField
          value={form.order}
          onChange={(order) => updateForm({ order })}
        />

        <Footer
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          handleClear={handleClear}
        />
      </div>
    </div>
  );
};

export default FieldBuilder;
