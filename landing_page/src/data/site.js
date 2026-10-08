import hero1 from '../assets/hospital1.webp';
import hero2 from '../assets/hospital2.webp';
import hero3 from '../assets/hospital3.webp';
import hero4 from '../assets/hospital4.webp';
import hero5 from '../assets/hospital5.webp';
import drGajendraImg from '../assets/Dr. Gajendra Kumar Singh.webp';

export const college = {
  name: "Phulo Jhano Medical College & Hospital, Dumka",
  shortName: "PJMCH Dumka",
  phone: "06434 295024",
  phoneHref: "tel:06434295024",
  email: "principal.medicalcollege.dumka@gmail.com",
  address: "Phulo Jhano Medical College, Dumka, Jharkhand – 814101",
  registrationOffice:
    "Phulo Jhano Medical College, Dumka, Jharkhand – 822101",
  officeHours: "Monday – Saturday, 9:00 AM – 5:00 PM",
  noticeTicker: "Welcome to Phulo Jhano Medical College & Hospital, Dumka.",
};

export const nav = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    to: "/about",
    children: [
      { label: "About Dumka Medical", to: "/about" },
      { label: "Affiliation", to: "/about#affiliation" },
      { label: "Dean & Principal", to: "/administration#principal" },
      { label: "Superintendent", to: "/administration#superintendent" },
    ],
  },
  {
    label: "Academic",
    to: "/academics",
    children: [
      { label: "Academic Calendar", to: "/academics#calendar" },
      { label: "Syllabus", to: "/academics#syllabus" },
    ],
  },
  {
    label: "Staff Section",
    to: "/faculty",
    children: [
      { label: "Teaching Staff", to: "/faculty" },
      { label: "Non-Teaching Staff", to: "/faculty#non-teaching" },
    ],
  },
  {
    label: "Students",
    to: "/students",
    children: [
      { label: "Student List", to: "/students" },
      { label: "Syllabus", to: "/academics#syllabus" },
      { label: "Result", to: "/students#result" },
      { label: "Hostel Facility", to: "/students#hostel" },
      { label: "Canteen", to: "/students#canteen" },
    ],
  },
  {
    label: "Notices",
    to: "/recruitment",
    children: [
      { label: "Recruitment", to: "/recruitment" },
      { label: "Tender", to: "/tender" },
    ],
  },
  {
    label: "Gallery",
    to: "/gallery",
    children: [
      { label: "Photo Gallery", to: "/gallery" },
      { label: "Video Gallery", to: "/gallery#video" },
    ],
  },
  {
    label: "Biometric",
    href: "https://dumcdd.nmcindia.ac.in/",
  },
  { label: "Stipends", to: "/stipends" },
  { label: "Contact Us", to: "/contact" },
];

export const heroSlides = [hero1, hero2, hero3, hero4, hero5];

const base = "https://dumkamedicalcollege.org";

export const msrDisclosures = [
  {
    id: 1,
    detail:
      "Details of Dean/Principal including name, qualification, contact and e-mail",
    link: "/administration#principal",
  },
  {
    id: 2,
    detail:
      "Details of Superintendent including name, qualification, contact and e-mail",
    link: "/administration#superintendent",
  },
  { id: 3, detail: "Details of Teaching Staff", link: "/faculty" },
  {
    id: 4,
    detail: "Details of sanctioned intake capacity of various UG and PG courses",
    link: "/academics",
  },
  { id: 5, detail: "List of students admitted currently", link: "/students" },
  { id: 6, detail: "Research publications in last one year", link: "/academics" },
  { id: 7, detail: "Details of CME / Conferences", link: "/academics" },
  {
    id: 8,
    detail: "Awards / Achievements by Students & Faculty",
    link: "/academics",
  },
  {
    id: 9,
    detail: "Details of Affiliating University and its VC and Registrar",
    link: "/about#affiliation",
  },
  {
    id: 10,
    detail: "Results of all examinations of last one year",
    link: "/students#result",
  },
  { id: 11, detail: "Status of recognition of all courses", link: "/about#affiliation" },
  { id: 12, detail: "Details of clinical materials in hospital", link: "/about" },
];

export const leadership = [
  {
    id: "principal",
    name: "Dr. Gajendra Kumar Singh",
    role: "Dean & Principal",
    org: "Phulo Jhano Medical College, Dumka",
    address: "Dumka Medical College, Dumka, PIN – 814110, Jharkhand",
    email: "principal.medicalcollege.dumka@gmail.com",
    photo: drGajendraImg,
  },
  // {
  //   id: "superintendent",
  //   name: "Dr. Ruben Hembrom",
  //   role: "Superintendent",
  //   org: "Phulo Jhano Medical College, Dumka",
  //   address: "Dumka Medical College, Dumka, Jharkhand",
  //   email: "superintendentdmch@gmail.com",
  //   photo: base + "/wp-content/uploads/2026/03/SUP_160326.jpeg",
  // },
];

export const facultyPdf =
  base + "/wp-content/uploads/2026/03/PJMCH-Faculty-for-Wbsite.pdf";

export const faculty = [
  ["Dr. Gajendra Kumar Singh", "Principal & Professor", "Pharmacology"],
  ["Dr. Anukaran Purty", "Superintendent", "Medicine"],
  ["Dr. Savita Sukla Das", "Professor", "Obs & Gynae"],
  ["Dr. Sairavi Kiran B", "Professor", "Biochemistry"],
  ["Dr. Suchandra Benarjee", "Professor", "Physiology"],
  ["Dr. Anand Choudhary", "Professor", "Dental"],
  ["Dr. Vijay Tara", "Associate Professor", "Pathology"],
  ["Dr. Ruben Hembrom", "Associate Professor", "Surgery"],
  ["Dr. Bipad Bhanjan Mahto", "Associate Professor", "Eye"],
  ["Dr. Alok Kumar", "Associate Professor", "ENT"],
  ["Dr. Subir Kumar", "Associate Professor", "Pharmacology"],
  ["Dr. Vijay Kumar", "Associate Professor", "P.S.M"],
  ["Dr. Rajesh R", "Associate Professor", "Anatomy"],
  ["Dr. Uddipan Kumar", "Associate Professor", "Dental"],
  ["Dr. Pinky Kumari", "Associate Professor", "Microbiology"],
  ["Dr. Nand Kishor Karmali", "Assistant Professor", "Anatomy"],
  ["Dr. Vikas Oraon", "Assistant Professor", "Microbiology"],
  ["Dr. Goutam Kumar", "Assistant Professor", "FMT"],
  ["Dr. Mrinal Ranjan Srivastava", "Assistant Professor", "PSM"],
  ["Dr. Sunil Kumar", "Assistant Professor", "Surgery"],
  ["Dr. Mitali Prasar", "Assistant Professor", "Obs & Gynae"],
  ["Dr. Sarani Sagen Dahanga", "Assistant Professor", "Obs & Gynae"],
  ["Dr. Ruchi Mitra", "Assistant Professor", "Dental"],
  ["Dr. Avijeet Prasad", "Assistant Professor", "Ortho"],
  ["Dr. Jayant Chakrawarty", "Assistant Professor", "ENT"],
  ["Dr. Abhishek Kumar", "Assistant Professor", "Surgery"],
  ["Dr. Keshav Krishan", "Tutor", "Anatomy"],
  ["Dr. Chandrabhushan", "Tutor", "Pathology"],
  ["Dr. Anand Kumar", "Tutor", "FMT"],
  ["Dr. Saiyad Ijaz Hashami", "Tutor", "PSM"],
  ["Dr. Ruth K Tara", "Senior Resident", "Medicine"],
  ["Dr. Mukul Pritam", "Senior Resident", "Medicine"],
  ["Dr. Ankit Kr Bhalotiya", "Senior Resident", "Ortho"],
  ["Dr. Rukshana Yasmin", "Senior Resident", "Obs & Gynae"],
  ["Dr. Ankit Singh", "Senior Resident", "Obs & Gynae"],
  ["Dr. Md Nayeem Uddin", "Senior Resident", "ENT"],
  ["Dr. Muneer TK", "Senior Resident", "Pediatrics"],
  ["Dr. Shamma Ahmad", "Senior Resident", "Pediatrics"],
  ["Dr. Mrinal Singh", "Senior Resident", "Eye"],
  ["Dr. Aravind Kr", "Senior Resident", "Surgery"],
  ["Dr. Kamlesh Kumar", "Senior Resident", "Surgery"],
  ["Dr. Arunmozhi S", "Senior Resident", "Surgery"],
  ["Dr. Ramsakal Hansdah", "Senior Resident", "Psychiatry"],
  ["Dr. Rishav Anand", "Junior Resident", "ENT"],
  ["Dr. Priyank Kunal", "Junior Resident", "Medicine"],
  ["Dr. Srishtee Shree", "Junior Resident", "Medicine"],
  ["Dr. Reema Kujur", "Junior Resident", "Surgery"],
].map(([name, post, department]) => ({ name, post, department }));

export const studentLists = [
  ["Student List Batch 2025", base + "/wp-content/uploads/2026/05/STUDENT-LIST-BATCH-2025.pdf"],
  ["Student List Batch 2024", base + "/wp-content/uploads/2026/05/STUDENT-LIST-BATCH-2024.pdf"],
  ["Student List Batch 2023", base + "/wp-content/uploads/2026/05/STUDENT-LIST-BATCH-2023.pdf"],
  ["Student List Batch 2022", base + "/wp-content/uploads/2026/05/STUDENT-LIST-BATCH-2022.pdf"],
  ["MBBS Batch 2021-22", base + "/wp-content/uploads/2026/05/MBBS-Batch-2021-22.pdf"],
  ["MBBS Batch 2019-20", base + "/wp-content/uploads/2026/05/MBBS-BATCH-2019-20.pdf"],
].map(([title, href]) => ({ title, href }));

export const stipends = [
  ["June 2026 Stipend Payment", base + "/wp-content/uploads/2026/07/Stipend-10th-July.pdf"],
  ["May 2026 Stipend Payment", base + "/wp-content/uploads/2026/06/Doc-06-11-2026-13-53-18.pdf"],
  ["April 2026 Stipend Payment", base + "/wp-content/uploads/2026/05/April-2026-16-May-2026-18-50-58.pdf"],
  ["March 2026 Stipend Payment", base + "/wp-content/uploads/2026/05/March-2026-16-May-2026-18-52-29.pdf"],
  ["Interns Stipend Payment 2024-25", base + "/wp-content/uploads/2026/03/Interns-Stipend-Payment-2024-25.pdf"],
  ["Interns Stipend Payment 2025-26", base + "/wp-content/uploads/2026/03/Interns-Stipend-Payment-2025-26.pdf"],
].map(([title, href]) => ({ title, href }));

export const recruitments = [
  {
    title: "Recruitment of various posts",
    href: base + "/wp-content/uploads/2025/03/IMG-20250327-WA0000.jpg",
  },
];

export const tenders = [
  ["Tender 02/2026-27", "27-05-2026", "06-06-2026", [base + "/wp-content/uploads/2026/05/tender-02-2026-27.pdf"]],
  ["Tender 01/2026-27", "27-05-2026", "06-06-2026", [base + "/wp-content/uploads/2026/05/Tender-01-2026-27.pdf"]],
  ["Tender no 05/2025-26", "27-09-2025", "13-10-2025", [base + "/wp-content/uploads/2025/09/NIT.pdf"]],
  ["Tender no 04/2025-26", "11-09-2025", "19-09-2025", [base + "/wp-content/uploads/2025/09/Scan_0041.pdf"]],
  ["Tender no 03/2025-26", "18-07-2025", "08-08-2025", [base + "/wp-content/uploads/2025/07/Tender-no-03-2025-26.pdf"]],
  ["Tender No. 01/2025 and 02/2025", "04-07-2025", "14-07-2025", [base + "/wp-content/uploads/2025/06/NIT.pdf", base + "/wp-content/uploads/2025/06/NIT-1.pdf"]],
  ["Tender for Students Goods", "20-03-2025", "24-03-2025", [base + "/wp-content/uploads/2025/03/Doc-03-20-2025-17-09-20.pdf"]],
  ["Tender No. 5/2023-25", "24-01-2025", "06-02-2025", [base + "/wp-content/uploads/2025/01/Doc-01-24-2025-12-25-35.pdf"]],
  ["Quotation for Printing of Examination Sheet", "11-09-2024", "13-09-2024", [base + "/wp-content/uploads/2024/09/Doc-09-11-2024-17-27-15.pdf"]],
  ["Quotation for Camera Canon", "11-09-2024", "13-09-2024", [base + "/wp-content/uploads/2024/09/Doc-09-11-2024-17-30-16.pdf"]],
  ["Tender 03/2024-25 – Stationery and Machinery Items", "31-08-2024", "06-09-2024", [base + "/wp-content/uploads/2024/08/03-2024-25.pdf"]],
  ["Tender 01/2024-25 – Stationery, Chemical, Machines, Museum etc.", "02-07-2024", "23-07-2024", [base + "/wp-content/uploads/2024/07/tender-01-2024-25.pdf"]],
  ["Tender 02/2024-25 – Purchase of Books", "02-07-2024", "23-07-2024", [base + "/wp-content/uploads/2024/07/Tender-no-02-2024-25.pdf"]],
  ["Quotation for networking of Internet", "03-02-2024", "09-02-2024", [base + "/wp-content/uploads/2024/02/153-dt-06-02-2024.pdf"]],
  ["Quotation for 20 Mbps Dedicated Internet Leased Line Connection", "02-02-2024", "06-02-2024", [base + "/wp-content/uploads/2024/02/Tender-122-dt-02-02-2024.pdf"]],
  ["Corrigendum of Internet Tender no. 07/2023-24", "08-01-2024", "27-01-2024", [base + "/wp-content/uploads/2024/01/corrgendum-Internet.pdf"]],
  ["Tender no 07/2023-24 – Internet Leased Line & Wi-Fi Network", "08-01-2024", "19-01-2024", [base + "/wp-content/uploads/2024/01/Tender-07-2023-24.pdf"]],
  ["Tender No 06/2023-24 – Internet Leased Line & Intercom Connectivity", "22-08-2023", "11-09-2023", [base + "/wp-content/uploads/2023/08/intercome-tender-62023-2024-23-Aug-2023-5-31-PM.pdf"]],
  ["Tender No 05/2023-24 – Gym & Sports Material", "12-07-2023", "28-07-2023", [base + "/wp-content/uploads/2023/07/Tender-No.-052023-2024PJMC-Dumka.pdf"]],
  ["Tender No 04/2023-24 – Office Material / Chemical / Equipment", "12-07-2023", "28-07-2023", [base + "/wp-content/uploads/2023/07/TenderNo-042023-2024-PJMC-DUMKA.pdf"]],
  ["Tender No 03/2023-24 – Cafeteria", "12-07-2023", "28-07-2023", [base + "/wp-content/uploads/2023/07/Tender-No-032023-24-Cafeteria-PJMC-Dumka.pdf"]],
  ["Tender No 02/2023-24 – Mess (Boys / Girls)", "03-06-2023", "15-06-2023", [base + "/wp-content/uploads/2023/06/MESS-TENDER-2022-2023-PJMC-DUMKA.pdf"]],
  ["Tender No 01/2023-24 – Stationery & Chemical", "30-05-2023", "14-06-2023", [base + "/wp-content/uploads/2023/05/Tender-no-01.2023-24-PJMC-DUMKA.pdf"]],
  ["Tender No 10/2022-23 – CAL Lab (Computer and Other Materials)", "28-01-2023", "07-02-2023", [base + "/wp-content/uploads/2023/01/Tender-No-102020-23PJMCDumka.pdf"]],
  ["Tender No 09/2022-23 – Common Room (Gym Setup)", "20-01-2023", "28-01-2023", [base + "/wp-content/uploads/2023/01/SHORT-Tender-No-092022-23PJMC-DUMKA.pdf"]],
  ["Tender No 08/2022-23 – Library Books", "18-01-2023", "27-01-2023", [base + "/wp-content/uploads/2023/01/Library-Book-Tender-No-82022-23PJMC-Dumka.pdf"]],
  ["Tender No 07/2022 – Library Book List", "11-11-2022", "29-11-2022", [base + "/wp-content/uploads/2022/11/Library-Books-Tender-072022.pdf"]],
  ["Tender 05/2022-23 – Four Wheeler Hiring", "17-10-2022", "10-11-2022", [base + "/wp-content/uploads/2022/10/tender-05.pdf"]],
  ["Tender 04/2022-23 – Bus Hiring", "17-10-2022", "10-11-2022", [base + "/wp-content/uploads/2022/10/tender-04.pdf"]],
  ["Tender 01/2022-23 – Stationery & Chemical", "21-09-2022", "14-10-2022", [base + "/wp-content/uploads/2022/09/Tender-012022-23-PJMC-DUMKA.pdf"]],
  ["Tender 02/2022 – RT-PCR Lab", "03-05-2022", "09-05-2022", [base + "/wp-content/uploads/2022/05/Tender-22022-PJMC-DUMKA-RT-PCR-Lab.pdf"]],
  ["Tender Notice for Bus Purchase", "18-02-2022", "12-03-2022", [base + "/wp-content/uploads/2022/02/Tender-Document-08-21.pdf"]],
].map(([subject, start, end, files]) => ({ subject, start, end, files }));

const galleryNames = [
  "DSC_2831",
  "DSC_2833",
  "DSC_2836",
  "DSC_2848",
  "DSC_2858",
  "DSC_2881",
  "DSC_2886",
  "DSC_2919",
  "DSC_2926",
  "DSC_2992",
];

export const gallery = galleryNames.map((n) => ({
  title: n.replace("_", " "),
  thumb: `${base}/wp-content/uploads/photo-gallery/thumb/${n}.JPG.jpeg`,
  full: `${base}/wp-content/uploads/photo-gallery/${n}.JPG.jpeg`,
}));
