import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// Official Phulo Jhano Medical College Photos
import hospital1 from "../assets/hospital1.webp";
import hospital2 from "../assets/hospital2.webp";
import hospital4 from "../assets/hospital4.webp";

// Menu-Specific High-Definition Landscape Photos
import hospitalAcademics from "../assets/hospital_academics.jpg";
import hospitalFaculty from "../assets/hospital_faculty.jpg";
import hospitalStudents from "../assets/hospital_students.jpg";
import hospitalGallery from "../assets/hospital_gallery.jpg";
import hospitalStipends from "../assets/hospital_stipends.jpg";
import hospitalContact from "../assets/hospital_contact.jpg";
import hospitalRecruitment from "../assets/hospital_recruitment.jpg";
import hospitalTenders from "../assets/hospital_tenders.jpg";

function resolveBannerConfig(pathname, customImage) {
  if (customImage) {
    return { src: customImage, position: "object-center" };
  }

  const path = (pathname || "").toLowerCase();

  // 1. Department / Faculty -> Medical doctors & professors in clinical corridor (Ample headroom, completely uncropped)
  if (path.includes("/faculty") || path.includes("/department")) {
    return {
      src: hospitalFaculty,
      position: "object-center",
    };
  }
  // 2. Academics -> Stethoscope on open medical anatomy & pathology textbook (Matches Academic studies & syllabus)
  if (path.includes("/academic")) {
    return {
      src: hospitalAcademics,
      position: "object-center",
    };
  }
  // 3. About Us -> Official Phulo Jhano Medical College & Hospital main entrance & grand building
  if (path.includes("/about")) {
    return {
      src: hospital1,
      position: "object-[center_35%]",
    };
  }
  // 4. Students -> Pediatrician / medical student clinical training
  if (path.includes("/student")) {
    return {
      src: hospitalStudents,
      position: "object-[center_20%]",
    };
  }
  // 5. Gallery -> Vibrant college graduation convocation ceremony with celebration
  if (path.includes("/gallery")) {
    return {
      src: hospitalGallery,
      position: "object-center",
    };
  }
  // 6. Stipends -> Doctor reviewing duty records and clinical stipend payment documentation
  if (path.includes("/stipend")) {
    return {
      src: hospitalStipends,
      position: "object-center",
    };
  }
  // 7. Contact Us -> Hospital 24x7 helpdesk, telephone inquiry and communication center
  if (path.includes("/contact")) {
    return {
      src: hospitalContact,
      position: "object-center",
    };
  }
  // 8. Recruitment -> Hospital healthcare doctors team & clinical specialists
  if (path.includes("/recruitment")) {
    return {
      src: hospitalRecruitment,
      position: "object-center",
    };
  }
  // 9. Tenders -> Modern hospital surgical facility & medical machinery
  if (path.includes("/tender")) {
    return {
      src: hospitalTenders,
      position: "object-center",
    };
  }
  // 10. Announcements -> Teaching Hospital Clinical Inpatient Ward Block
  if (path.includes("/announcement")) {
    return {
      src: hospital4,
      position: "object-center",
    };
  }
  // 11. Administration -> Phulo Jhano Medical College Dean & Academic Block
  if (path.includes("/administration")) {
    return {
      src: hospital2,
      position: "object-center",
    };
  }

  // Default fallback
  return {
    src: hospital1,
    position: "object-center",
  };
}

export default function PageHeader({ title, subtitle, eyebrow, image }) {
  const location = useLocation();
  const banner = resolveBannerConfig(location.pathname, image);
  const path = (location.pathname || "").toLowerCase();
  const isRightAligned = path.includes("/contact") || path.includes("/department") || path.includes("/faculty");

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] flex items-center border-b border-teal-900/30">
      {/* Background Image: Menu-matched High-Definition Widescreen Photo with Smooth Ken Burns Animation */}
      <motion.img
        key={location.pathname || title}
        src={banner.src}
        alt={title || "Hospital and Medical College"}
        loading="eager"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1.03, opacity: 1 }}
        transition={{
          scale: { duration: 8, ease: "easeOut" },
          opacity: { duration: 0.6, ease: "easeInOut" }
        }}
        className={`absolute inset-0 w-full h-full object-cover ${banner.position} pointer-events-none will-change-transform`}
      />

      {/* Gentle Lighting Overlay: Direction adjusted based on text position so photo subject is 100% visible */}
      {isRightAligned ? (
        <div className="absolute inset-0 bg-gradient-to-l from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/20 pointer-events-none" />

      {/* Page Header Content in a Frosted Glass Card (Aligned to Right on Contact & Department, Left on others) */}
      <div className={`relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8 flex ${isRightAligned ? "justify-end" : "justify-start"}`}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-2xl bg-slate-950/50 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-3"
        >
          {/* Breadcrumb / Eyebrow Row */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-300">
            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors text-slate-300/90 hover:underline"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </Link>
            <span className="text-slate-500">/</span>
            {eyebrow && (
              <>
                <span className="text-teal-300 font-semibold uppercase tracking-wider">{eyebrow}</span>
                <span className="text-slate-500">/</span>
              </>
            )}
            <span className="text-white font-medium truncate max-w-[200px] sm:max-w-none">{title}</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-sm leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed drop-shadow-sm">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
