import React, { useState, useEffect } from "react";
import { FormDataType } from "../../types/type";

type FeedbackProps = {
  user: string;
  submit: (data: FormDataType) => Promise<void>;
};

export const Feedback = (props: FeedbackProps) => {
  const [isSuccessSubmit, setSuccessSubmit] = useState(false);
  const [isFailedSubmit, setFailedSubmit] = useState(false);

  const initialFormData: FormDataType = {
    grade: "default",
    text: "",
    email: props.user,
  };

  const [formData, setFormData] = useState<FormDataType>(initialFormData);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const id = (event.target.id || event.target.name) as keyof FormData;
    const newFormData = { ...formData, [id]: event.target.value };
    setFormData(newFormData);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await props.submit({
        grade: formData.grade,
        text: formData.text,
        email: formData.email,
        page: window.location.href,
      });
      setSuccessSubmit(true);
    } catch (err) {
      console.log(err);
      setFailedSubmit(true);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData(initialFormData);
  };

  const feedbackForm = (
    <form onSubmit={handleSubmit} id="feedback-form">
      <p>
        <select
          name="grade"
          id="grade"
          value={formData.grade}
          onChange={handleChange}
        >
          <option value="default" disabled>
            Select grade:
          </option>
          <option value="good">Good</option>
          <option value="bad">Bad</option>
        </select>
      </p>
      <p>
        <textarea
          name="text"
          id="text"
          placeholder="Review"
          value={formData.text}
          onChange={handleChange}
        ></textarea>
      </p>
      <p>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
        />
      </p>
      <button type="submit">Submit</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );

  return (
    <div>
      {!isSuccessSubmit && !isFailedSubmit && feedbackForm}
      {isSuccessSubmit && <b>Form was sent successfully</b>}
      {isFailedSubmit && (
        <b>
          Error was encountered...{" "}
          <a href="#feedback-form" onClick={() => setFailedSubmit(false)}>
            Try again
          </a>
        </b>
      )}
    </div>
  );
};
