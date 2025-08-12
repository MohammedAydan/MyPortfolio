"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "@/components/header-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CircleCheckBig, CircleX } from "lucide-react";
import useSendContact from "@/hooks/use-send-contact";

const Contact = () => {
  const t = useTranslations();
  const locale = useLocale();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });
  const {
    loading,
    error,
    success,
    handleSendContact,
  } = useSendContact();

  const validate = () => {
    let valid = true;
    const newErrors = { fullName: "", phone: "", email: "", message: "" };

    if (!formData.fullName) {
      newErrors.fullName = t("contact.errors.fullName");
      valid = false;
    }
    if (!formData.phone) {
      newErrors.phone = t("contact.errors.phone");
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = t("contact.errors.email");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("contact.errors.emailInvalid");
      valid = false;
    }
    if (!formData.message) {
      newErrors.message = t("contact.errors.message");
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    await handleSendContact({ formData, locale });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader title={t("contact.title")} />
        {!success && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-10 mt-12"
          >
            <Card className="rounded-3xl bg-background/40 backdrop-blur-md border border-foreground/10 shadow-lg w-full max-w-4xl transition-all duration-300 hover:shadow-2xl">
              {error && (
                <div className="bg-red-600 text-white py-2 px-4 rounded-2xl mx-4 flex items-center gap-2">
                  <CircleX size={20} />
                  <p>{error}</p>
                </div>
              )}
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="fullName"
                        className="text-foreground font-medium"
                      >
                        {t("contact.fullName")}
                      </Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder={t("contact.fullNamePlaceholder")}
                        className="rounded-xl bg-background/50 border-foreground/20 focus:ring-2 focus:ring-primary p-5"
                      />
                      {errors.fullName && (
                        <span className="text-red-600">{errors.fullName}</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="phone"
                        className="text-foreground font-medium"
                      >
                        {t("contact.phone")}
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t("contact.phonePlaceholder")}
                        className="rounded-xl bg-background/50 border-foreground/20 focus:ring-2 focus:ring-primary p-5"
                      />
                      {errors.phone && (
                        <span className="text-red-600">{errors.phone}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="email"
                      className="text-foreground font-medium"
                    >
                      {t("contact.email")}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("contact.emailPlaceholder")}
                      className="rounded-xl bg-background/50 border-foreground/20 focus:ring-2 focus:ring-primary p-5"
                    />
                    {errors.email && (
                      <span className="text-red-600">{errors.email}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="message"
                      className="text-foreground font-medium"
                    >
                      {t("contact.message")}
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("contact.messagePlaceholder")}
                      className="h-40 resize-none rounded-xl bg-background/50 border-foreground/20 focus:ring-2 focus:ring-primary p-5"
                    />
                    {errors.message && (
                      <span className="text-red-600">{errors.message}</span>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-xl bg-primary text-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 p-5"
                    disabled={loading}
                  >
                    {loading && (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-r-transparent border-foreground"></div>
                    )}
                    {!loading && t("contact.sendMessage")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        )}

        {success && (
          <Card className="rounded-3xl bg-green-600/90 backdrop-blur-sm p-6 shadow-lg animate-in max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <CircleCheckBig className="text-white" size={24} />
              </div>
              <p className="text-white font-medium tracking-wide">
                {t("contact.successMessage")}
              </p>
            </div>
          </Card>
        )}

      </div>
    </section>
  );
};

export default Contact;

