import React from "react";
import { Link } from "gatsby-plugin-react-i18next";
import { useI18next } from "gatsby-plugin-react-i18next";
import { useForm } from "react-hook-form";

import { Input, TextArea } from "../Form";
import Button from "../Button";

export const ContactForm = ({ onSubmit }) => {
  const { t } = useI18next("index");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm();

  if (isSubmitSuccessful) {
    return (
      <div className="text-center">
        <p className="text-4xl font-bold tracking-tight">
          Votre message a été envoyé avec succès!
          <br />
          Je vous reviens dès que possible
        </p>

        <Button onClick={() => reset()}></Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        label={t("name-label")}
        info={t("optional")}
        autoComplete="name"
        placeholder="X Æ A-12"
        {...register("name")}
        error={errors.name}
      />

      <Input
        label={t("email-label")}
        type="email"
        autoComplete="email"
        placeholder="xX_kimdontdoit_Xx@msn.com"
        {...register("email", { required: true })}
        error={errors.email}
      />

      <Input
        type="text"
        label={t("subject-label")}
        placeholder={t("subject-placeholder")}
        info={t("subject-description")}
        {...register("subject", { required: true })}
        error={errors.subject}
      />

      <TextArea
        label="Message"
        placeholder={t("message-placeholder")}
        {...register("message", { required: true })}
        error={errors.message}
        rows="4"
      />

      <Button type="submit" className="bg-primary">
        {t(`lets-talk`)}
        {isSubmitting ? (
          <svg
            className="w-4 h-4 ml-2 mx-auto text-zinc-900 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : null}
      </Button>
    </form>
  );
};
