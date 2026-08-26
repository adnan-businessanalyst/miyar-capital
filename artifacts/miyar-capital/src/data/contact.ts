/**
 * Shared contact / register-interest form + CTA copy (EN + AR).
 * Used by `RegisterInterest`, `GetInTouch`, and `ContactForm`.
 */

export interface ContactCopy {
  registerSectionTitleEn: string;
  registerSectionTitleAr: string;
  registerSectionSubtitleEn: string;
  registerSectionSubtitleAr: string;
  getInTouchSectionTitleEn: string;
  getInTouchSectionTitleAr: string;
  getInTouchSectionSubtitleEn: string;
  getInTouchSectionSubtitleAr: string;
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
  emailOptionalEn: string;
  emailOptionalAr: string;
  phoneEn: string;
  phoneAr: string;
  pageTitleLabelEn: string;
  pageTitleLabelAr: string;
  registerMessageTemplateEn: string;
  registerMessageTemplateAr: string;
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
  attachmentLabelEn: string;
  attachmentLabelAr: string;
  attachmentButtonEn: string;
  attachmentButtonAr: string;
  attachmentHintEn: string;
  attachmentHintAr: string;
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
  errorNameEn: string;
  errorNameAr: string;
  errorPhoneEn: string;
  errorPhoneAr: string;
  errorEmailEn: string;
  errorEmailAr: string;
  errorMessageLenEn: string;
  errorMessageLenAr: string;
  errorSubjectEn: string;
  errorSubjectAr: string;
  errorAttachmentEn: string;
  errorAttachmentAr: string;
  errorAttachmentSubjectEn: string;
  errorAttachmentSubjectAr: string;
  consentLabelEn: string;
  consentLabelAr: string;
  investorClassLabelEn: string;
  investorClassLabelAr: string;
  investorClassPlaceholderEn: string;
  investorClassPlaceholderAr: string;
  investorClassInstitutionEn: string;
  investorClassInstitutionAr: string;
  investorClassQualifiedEn: string;
  investorClassQualifiedAr: string;
  errorConsentEn: string;
  errorConsentAr: string;
  errorInvestorClassEn: string;
  errorInvestorClassAr: string;
}

export const CONTACT: ContactCopy = {
  registerSectionTitleEn: "Start a Conversation",
  registerSectionTitleAr: "ابدأ حواراً",
  registerSectionSubtitleEn:
    "Tell us about your mandate or transaction — our team will follow up with the right specialists.",
  registerSectionSubtitleAr:
    "أخبرنا عن تفويضك أو معاملتك — سيتابع فريقنا مع المختصين المناسبين.",
  getInTouchSectionTitleEn: "We're Here to Help",
  getInTouchSectionTitleAr: "نحن هنا لمساعدتك",
  getInTouchSectionSubtitleEn:
    "Questions about our platform, products, or partnership opportunities — reach out and we'll respond promptly.",
  getInTouchSectionSubtitleAr:
    "أسئلة حول منصتنا أو منتجاتنا أو فرص الشراكة — تواصل معنا وسنرد عليك بسرعة.",
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
  emailOptionalEn: "Email (optional)",
  emailOptionalAr: "البريد الإلكتروني (اختياري)",
  phoneEn: "Phone",
  phoneAr: "الهاتف",
  pageTitleLabelEn: "Page",
  pageTitleLabelAr: "الصفحة",
  registerMessageTemplateEn:
    "I would like to receive more information about {pageTitle}.",
  registerMessageTemplateAr:
    "أرغب في الحصول على مزيد من المعلومات حول {pageTitle}.",
  subjectLabelEn: "Select Subject",
  subjectLabelAr: "اختر الموضوع",
  subjectInquiryEn: "Inquiry",
  subjectInquiryAr: "استفسار",
  subjectComplaintEn: "Complaint",
  subjectComplaintAr: "شكوى",
  subjectInfoEn: "Info",
  subjectInfoAr: "معلومات",
  messageEn: "Write your message",
  messageAr: "اكتب رسالتك",
  attachmentLabelEn: "Attach an image (optional)",
  attachmentLabelAr: "إرفاق صورة (اختياري)",
  attachmentButtonEn: "Upload image",
  attachmentButtonAr: "رفع صورة",
  attachmentHintEn: "PNG, JPG, or JPEG · max 2 MB · one file",
  attachmentHintAr: "PNG أو JPG أو JPEG · بحد أقصى 2 ميجابايت · ملف واحد",
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
  errorNameEn: "Name is required.",
  errorNameAr: "الاسم مطلوب.",
  errorPhoneEn: "Phone is required.",
  errorPhoneAr: "رقم الهاتف مطلوب.",
  errorEmailEn: "Please enter a valid email address.",
  errorEmailAr: "يرجى إدخال بريد إلكتروني صالح.",
  errorMessageLenEn: "Message must be between 20 and 300 characters.",
  errorMessageLenAr: "يجب أن تكون الرسالة بين 20 و 300 حرفاً.",
  errorSubjectEn: "Please select a subject.",
  errorSubjectAr: "يرجى اختيار الموضوع.",
  errorAttachmentEn:
    "Attachment must be a single PNG, JPG, or JPEG image up to 2 MB.",
  errorAttachmentAr:
    "يجب أن يكون المرفق صورة PNG أو JPG أو JPEG بحجم لا يتجاوز 2 ميجابايت.",
  errorAttachmentSubjectEn: "Images can only be attached for complaints.",
  errorAttachmentSubjectAr: "يمكن إرفاق الصور مع الشكاوى فقط.",
  consentLabelEn: "I agree to be contacted about this service.",
  consentLabelAr: "أوافق على التواصل معي بخصوص هذه الخدمة.",
  investorClassLabelEn: "Investor classification",
  investorClassLabelAr: "تصنيف المستثمر",
  investorClassPlaceholderEn: "Select classification",
  investorClassPlaceholderAr: "اختر التصنيف",
  investorClassInstitutionEn: "Institution",
  investorClassInstitutionAr: "مؤسسة",
  investorClassQualifiedEn: "Qualified",
  investorClassQualifiedAr: "مؤهل",
  errorConsentEn: "Please confirm that we may contact you.",
  errorConsentAr: "يرجى الموافقة على التواصل.",
  errorInvestorClassEn: "Please select an investor classification.",
  errorInvestorClassAr: "يرجى اختيار تصنيف المستثمر.",
};
