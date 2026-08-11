/**
 * Shared contact / register-interest form + CTA copy (EN + AR).
 * Used by `RegisterInterest`, `GetInTouch`, and `ContactForm`.
 */

export interface ContactCopy {
  registerButtonEn: string;
  registerButtonAr: string;
  registerModalTitleEn: string;
  registerModalTitleAr: string;
  getInTouchButtonEn: string;
  getInTouchButtonAr: string;
  contactModalTitleEn: string;
  contactModalTitleAr: string;
  nameEn: string;
  nameAr: string;
  emailEn: string;
  emailAr: string;
  phoneEn: string;
  phoneAr: string;
  subjectLabelEn: string;
  subjectLabelAr: string;
  subjectInquiryEn: string;
  subjectInquiryAr: string;
  subjectComplaintEn: string;
  subjectComplaintAr: string;
  subjectInfoEn: string;
  subjectInfoAr: string;
  messageEn: string;
  messageAr: string;
  submitEn: string;
  submitAr: string;
  sendingEn: string;
  sendingAr: string;
  thanksEn: string;
  thanksAr: string;
  errorGenericEn: string;
  errorGenericAr: string;
  errorNetworkEn: string;
  errorNetworkAr: string;
}

export const CONTACT: ContactCopy = {
  registerButtonEn: "Register Interest",
  registerButtonAr: "سجّل اهتمامك",
  registerModalTitleEn: "Register Interest",
  registerModalTitleAr: "تسجيل الاهتمام",
  getInTouchButtonEn: "Get In Touch",
  getInTouchButtonAr: "تواصل معنا",
  contactModalTitleEn: "Contact Us",
  contactModalTitleAr: "اتصل بنا",
  nameEn: "Name",
  nameAr: "الاسم",
  emailEn: "Email",
  emailAr: "البريد الإلكتروني",
  phoneEn: "Phone",
  phoneAr: "الهاتف",
  subjectLabelEn: "Select Subject",
  subjectLabelAr: "اختر الموضوع",
  subjectInquiryEn: "Inquiry",
  subjectInquiryAr: "استفسار عام",
  subjectComplaintEn: "Complaint",
  subjectComplaintAr: "شكوى",
  subjectInfoEn: "Info",
  subjectInfoAr: "معلومات",
  messageEn: "Write your message",
  messageAr: "اكتب رسالتك",
  submitEn: "Send Message",
  submitAr: "إرسال الرسالة",
  sendingEn: "Sending…",
  sendingAr: "جارٍ الإرسال…",
  thanksEn:
    "Thank you — your message has been received. Our team will be in touch shortly.",
  thanksAr:
    "شكرًا لك — تم استلام رسالتك. سيتواصل معك فريقنا قريبًا.",
  errorGenericEn: "Submission failed. Please try again.",
  errorGenericAr: "فشل الإرسال. يرجى المحاولة مرة أخرى.",
  errorNetworkEn: "Network error. Please try again.",
  errorNetworkAr: "خطأ في الشبكة. يرجى المحاولة مرة أخرى.",
};
