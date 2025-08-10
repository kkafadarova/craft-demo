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
    console.log(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const choicesArray = form.choices
      .split("\n")
      .map((c) => c.trim())
      .filter((c) => c);

    const finalChoices = Array.from(
      new Set([
        ...choicesArray,
        ...(form.defaultValue && !choicesArray.includes(form.defaultValue)
          ? [form.defaultValue]
          : []),
      ])
    ).slice(0, 50);

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
          onChange={(val) => updateForm({ label: val })}
          error={errors.label}
        />
        <DefaultValueField
          value={form.defaultValue}
          onChange={(val) => updateForm({ defaultValue: val })}
        />
        <TypeField
          value={form.type}
          onChange={(val) => updateForm({ type: val })}
        />
        <RequiredCheckboxField
          value={form.required}
          onChange={(val) => updateForm({ required: val })}
        />
        <ChoicesField
          value={form.choices}
          onChange={(val) => updateForm({ choices: val })}
          error={errors.choices}
        />
        <OrderField
          value={form.order}
          onChange={(val) => updateForm({ order: val })}
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
