/**
 * Resume asset reference.
 *
 * Phase 0 found the link in app/page.js pointed at /Anjinappa_Resume.pdf,
 * which did not exist under public/ (only a differently-named PDF existed
 * under data/, which Next.js does not serve statically).
 *
 * Fix applied in Phase 1: the existing PDF content
 * (data/Anjinappa_Professional_10PlusYearExpResume (2).pdf) was copied,
 * unmodified, to public/Anjinappa_Resume.pdf — matching the filename the
 * UI already linked to. No content was altered and no filename was invented;
 * this is the path the original code already assumed.
 */
const resume = {
  downloadPath: "/Anjinappa_Resume.pdf",
};

export default resume;
