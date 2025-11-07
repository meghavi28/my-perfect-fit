import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneField, isValidPhoneNumber } from "@/components/PhoneField";

const inchField = z
  .number({ invalid_type_error: "Required" })
  .positive("Must be positive")
  .max(200, "Too large");

const formSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .refine((v) => isValidPhoneNumber(v || ""), "Enter a valid phone number"),
  notes: z.string().max(500).optional().or(z.literal("")),
  // Top
  top_neck: inchField,
  top_shoulders: inchField,
  top_sleeves: inchField,
  top_chest: inchField,
  top_stomach: inchField,
  top_hips: inchField,
  top_length: inchField,
  // Bottom
  bottom_waist: inchField,
  bottom_hips: inchField,
  bottom_thigh: inchField,
  bottom_calf: inchField,
  bottom_folk: inchField,
  bottom_inner_length: inchField,
  bottom_length: inchField,
});

type FormValues = z.infer<typeof formSchema>;

const img = (label: string) => {
  // Using local images and placeholder service for measurement guides
  const measurementGuides: Record<string, string> = {
    // Try multiple formats for neck measurement (will use first available)
    Neck: "/images/Neck.png", 
    Shoulders:
      "/images/Shoulders.png",
    Sleeves:
      "/images/Sleeves.png",
    Chest:
      "/images/Chest.png",
    Stomach:
      "/images/Stomatch.png",
    Hips: "/images/Hips.png",
    "Top Length":
      "/images/TopLength1.png",
    Waist:
      "/images/Waist.png",
    Thigh:
      "/images/Thigh.png",
    Calf: "/images/Calf.png",
    Folk: "/images/Folk.png",
    "Inner Length":
      "/images/Inner Length.png",
    "Bottom Length":
      "/images/Bottom Length.png",
  };

  // Return measurement guide image or fallback to a styled placeholder
  return (
    measurementGuides[label] ||
    `https://placehold.co/400x400/8b5cf6/ffffff?text=${encodeURIComponent(
      label + " Measurement"
    )}`
  );
};

export default function Measurement() {
  const [sending, setSending] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    } as Partial<FormValues>,
  });

  const emailConfig = useMemo(
    () => ({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined,
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as
        | string
        | undefined,
      toEmail: import.meta.env.VITE_TO_EMAIL as string | undefined,
    }),
    []
  );

  const onSubmit = async (data: FormValues) => {
    if (
      !emailConfig.publicKey ||
      !emailConfig.serviceId ||
      !emailConfig.templateId ||
      !emailConfig.toEmail
    ) {
      alert(
        "EmailJS is not configured. Please create a .env file with:\n\n" +
          "VITE_EMAILJS_PUBLIC_KEY=your_public_key\n" +
          "VITE_EMAILJS_SERVICE_ID=your_service_id\n" +
          "VITE_EMAILJS_TEMPLATE_ID=your_template_id\n" +
          "VITE_TO_EMAIL=your@email.com\n\n" +
          "See README.md for setup instructions."
      );
      return;
    }
    setSending(true);
    try {
      emailjs.init(emailConfig.publicKey);
      const templateParams = {
        to_email: emailConfig.toEmail,
        name: data.name,
        email: data.email,
        phone: data.phone,
        notes: data.notes || "",
        // top
        top_neck: data.top_neck,
        top_shoulders: data.top_shoulders,
        top_sleeves: data.top_sleeves,
        top_chest: data.top_chest,
        top_stomach: data.top_stomach,
        top_hips: data.top_hips,
        top_length: data.top_length,
        // bottom
        bottom_waist: data.bottom_waist,
        bottom_hips: data.bottom_hips,
        bottom_thigh: data.bottom_thigh,
        bottom_calf: data.bottom_calf,
        bottom_folk: data.bottom_folk,
        bottom_inner_length: data.bottom_inner_length,
        bottom_length: data.bottom_length,
      };
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams
      );
      alert("Submitted successfully! We have received your measurements.");
    } catch (e: any) {
      console.error("EmailJS Error:", e);
      let errorMessage = "Failed to send email. ";

      if (e?.text?.includes("Template ID not found")) {
        errorMessage +=
          "\n\nTemplate ID not found. Please:\n" +
          "1. Go to https://dashboard.emailjs.com/admin/templates\n" +
          "2. Check your template ID in .env file\n" +
          "3. Make sure the template exists and is active\n" +
          "4. Restart your dev server after updating .env";
      } else if (e?.text?.includes("Service ID")) {
        errorMessage +=
          "\n\nService ID error. Please:\n" +
          "1. Go to https://dashboard.emailjs.com/admin/integration\n" +
          "2. Check your service ID in .env file\n" +
          "3. Make sure the service is active";
      } else if (e?.text) {
        errorMessage += `\n\nError: ${e.text}`;
      } else {
        errorMessage +=
          "Please check your EmailJS configuration and try again.";
      }

      alert(errorMessage);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="container py-10 bg-gradient-to-b from-accent/30 via-background to-accent/20 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-3 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Measurement Form
          </h1>
          <p className="text-foreground/70 text-lg">
            Fill in your personal info and precise measurements (in inches).
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardTitle className="text-2xl text-primary">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="John Doe" {...register("name")} />
                {errors.name && (
                  <p className="text-xs text-red-600">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <PhoneField
                  id="phone"
                  name="phone"
                  value={watch("phone")}
                  onChange={(v) => setValue("phone", v || "")}
                  onBlur={() => {}}
                  error={errors.phone?.message}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any preferences or details..."
                  {...register("notes")}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardTitle className="text-2xl text-primary">
                Top Measurements
              </CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 lg:grid-cols-2 gap-10 pt-6">
              {[
                ["top_neck", "Neck"],
                ["top_shoulders", "Shoulders"],
                ["top_sleeves", "Sleeves"],
                ["top_chest", "Chest"],
                ["top_stomach", "Stomach"],
                ["top_hips", "Hips"],
                ["top_length", "Top Length"],
              ].map(([key, label]) => (
                <div
                  key={key}
                  className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-accent/50 to-background border border-primary/10 hover:border-primary/30 transition-all"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-full flex justify-center bg-white p-2 rounded-xl">
                      <img
                        src={img(label)}
                        alt={`${label} measurement guide`}
                        className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl border-[3px] border-primary/30 shadow-xl object-contain bg-white hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <Label
                      htmlFor={key}
                      className="text-lg font-bold text-primary"
                    >
                      {label} (inches)
                    </Label>
                  </div>
                  <Input
                    id={key}
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    className="text-center text-lg font-medium"
                    {...register(key as keyof FormValues, {
                      valueAsNumber: true,
                    })}
                  />
                  {errors[key as keyof FormValues] && (
                    <p className="text-xs text-red-600 text-center">
                      {(errors as any)[key]?.message}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardTitle className="text-2xl text-primary">
                Bottom Measurements
              </CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 lg:grid-cols-2 gap-10 pt-6">
              {[
                ["bottom_waist", "Waist"],
                ["bottom_hips", "Hips"],
                ["bottom_thigh", "Thigh"],
                ["bottom_calf", "Calf"],
                ["bottom_folk", "Folk"],
                ["bottom_inner_length", "Inner Length"],
                ["bottom_length", "Bottom Length"],
              ].map(([key, label]) => (
                <div
                  key={key}
                  className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-accent/50 to-background border border-primary/10 hover:border-primary/30 transition-all"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-full flex justify-center bg-white p-2 rounded-xl">
                      <img
                        src={img(label)}
                        alt={`${label} measurement guide`}
                        className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl border-[3px] border-primary/30 shadow-xl object-contain bg-white hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <Label
                      htmlFor={key}
                      className="text-lg font-bold text-primary"
                    >
                      {label} (inches)
                    </Label>
                  </div>
                  <Input
                    id={key}
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    className="text-center text-lg font-medium"
                    {...register(key as keyof FormValues, {
                      valueAsNumber: true,
                    })}
                  />
                  {errors[key as keyof FormValues] && (
                    <p className="text-xs text-red-600 text-center">
                      {(errors as any)[key]?.message}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              disabled={sending}
              className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all"
            >
              {sending ? "Submitting..." : "Submit Measurements"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
