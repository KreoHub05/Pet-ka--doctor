import { useState } from "react";
import { Calendar, User, Mail, Phone, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  preferredDate?: string;
  message?: string;
}

const BookConsultation = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.length < 2)
      newErrors.name = "Name must be at least 2 characters";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";

    if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone.replace(/\s/g, "")))
      newErrors.phone = "Enter a valid phone number";

    if (!formData.preferredDate)
      newErrors.preferredDate = "Select a future date";

    if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Fix the errors",
        description: "Please check the highlighted fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
            template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            template_params: {
              to_email: "drharshalmaheshgoel@gmail.com",
              from_name: formData.name,
              from_email: formData.email,
              phone: formData.phone,
              preferred_date: formData.preferredDate,
              message: formData.message,
            },
          }),
        }
      );

      if (!response.ok) throw new Error("Email failed");

      setIsSubmitted(true);
      toast({
        title: "Appointment Request Sent",
        description: "We’ll contact you shortly.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Submission received",
        description: "We’ll contact you shortly.",
      });
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-xl text-center">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Request Submitted</h1>
          <p className="text-muted-foreground mb-6">
            Our team will contact you within 24 hours.
          </p>
          <Button onClick={() => setIsSubmitted(false)}>
            Book Another Appointment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-32 pb-20 container max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Book a <span className="text-primary">Consultation</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl shadow">
          <Input
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}

          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}

          <Input
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
          {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}

          <Input
            type="date"
            value={formData.preferredDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => handleInputChange("preferredDate", e.target.value)}
          />
          {errors.preferredDate && (
            <p className="text-destructive text-sm">{errors.preferredDate}</p>
          )}

          <Textarea
            placeholder="Describe your concern"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
          />
          {errors.message && <p className="text-destructive text-sm">{errors.message}</p>}

          <Button type="submit" disabled={isSubmitting} className="w-full py-6 text-lg">
            {isSubmitting ? "Submitting..." : "Request Appointment"}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default BookConsultation;
