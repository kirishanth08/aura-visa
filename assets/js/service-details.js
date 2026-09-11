/**
 * AuraVisa - Dynamic Service Details Engine
 * Dynamically switches content across all 6 sections based on query param or interactive pills
 */

(function() {
  const servicesData = {
    'express-entry': {
      navTitle: 'Canada Express Entry',
      docTitle: 'Canada Federal Skilled Worker & Express Entry | AuraVisa',
      heroPill: '<i class="bi bi-flag-fill text-danger me-1"></i> Canada Permanent Residency Stream',
      title: 'Federal Skilled Worker & Express Entry Program',
      lead: "Canada's premier economic immigration pathway offering direct Permanent Resident (PR) status for university graduates, IT engineers, healthcare practitioners, and business professionals.",
      timeBadge: '<i class="bi bi-clock text-primary me-1"></i> 6-8 Months Processing',
      dependentsBadge: '<i class="bi bi-person-check text-success me-1"></i> Includes Family Dependents',
      heroImg: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&auto=format&fit=crop&q=80',
      heroImgAlt: 'Official passport open showing consular visa stamp and permanent residency entry endorsement',
      formulaSubtitle: 'Selection Formula',
      formulaTitle: 'How the CRS Point System Evaluates Candidates',
      formulaDesc: 'The Comprehensive Ranking System (CRS) awards points out of 1,200 based on core human capital, spousal factors, and government provincial nominations.',
      formulaCards: [
        { badge: 'badge-aura-primary', badgeText: 'Max 110 Points', title: 'Age Factor', desc: 'Maximum points are awarded to applicants aged between 20 and 29 years, tapering down after age 30.' },
        { badge: 'badge-aura-success', badgeText: 'Max 150 Points', title: 'Education Level', desc: 'Verified via Educational Credential Assessment (ECA). Master\'s and Ph.D. degrees earn highest bracket.' },
        { badge: 'badge-aura-warning', badgeText: 'Max 160 Points', title: 'Language (IELTS / CELPIP)', desc: 'Achieving Canadian Language Benchmark (CLB 9 / IELTS 8777) delivers an exponential score surge.' },
        { badge: 'badge-aura-danger', badgeText: 'Bonus +600 Points', title: 'Provincial Nomination', desc: 'Securing a nomination through Ontario, BC, or Alberta PNP guarantees an immediate Invitation to Apply (ITA).' }
      ],
      docList: [
        { icon: 'bi-file-earmark-check-fill text-primary', title: 'ECA Report (WES / ICAS)', desc: 'Equivalency report demonstrating degrees match Canadian educational standards.' },
        { icon: 'bi-translate text-success', title: 'Language Test Results (IELTS / TEF)', desc: 'Official score report less than 2 years old verifying English and/or French fluency.' },
        { icon: 'bi-briefcase-fill text-warning', title: 'Employment Reference Letters on Letterhead', desc: 'Detailed reference letters mapping duties directly to Canadian NOC 2021 codes.' },
        { icon: 'bi-shield-check text-danger', title: 'Police Clearance & Upfront Medicals', desc: 'Certificates from all nations resided in for 6+ consecutive months, plus panel physician exams.' }
      ],
      fundsTitle: 'Proof of Settlement Funds (2026)',
      fundsDesc: 'IRCC mandates unencumbered liquid funds depending on the number of family members migrating:',
      fundsHeaders: ['Family Size', 'Required CAD ($)', 'USD Equivalent'],
      fundsRows: [
        ['1 (Single Applicant)', '$14,690 CAD', '~$10,800 USD'],
        ['2 (Couple)', '$18,288 CAD', '~$13,500 USD'],
        ['3 (Couple + 1 Child)', '$22,483 CAD', '~$16,600 USD'],
        ['4 (Family of Four)', '$27,297 CAD', '~$20,150 USD']
      ],
      fundsNote: 'Funds must be maintained in accessible liquid bank accounts (fixed deposits, savings).',
      roadmapTitle: '6-Stage Application Milestone Timeline',
      roadmapDesc: 'From first document audit to your passport stamp, our licensed counsel guides every step.',
      roadmapSteps: [
        { step: '1', title: 'ECA & IELTS', desc: 'Evaluation & score benchmarking.' },
        { step: '2', title: 'Profile Entry', desc: 'Submission to federal Express Entry pool.' },
        { step: '3', title: 'PNP Nomination', desc: 'State stream application (+600 pts).' },
        { step: '4', title: 'ITA Received', desc: 'Official Invitation to Apply from IRCC.' },
        { step: '5', title: 'e-APR Filing', desc: 'Full dossier upload within 60 days.' },
        { step: '6', title: 'CoPR & Visa', desc: 'Confirmation of Permanent Residence.' }
      ],
      feeTitle: 'Official IRCC Government Fee Schedule',
      feeDesc: 'All government fees are paid directly to the Receiver General for Canada.',
      feeHeaders: ['Fee Category', 'Applicant Covered', 'Government Fee', 'Refundability Status'],
      feeRows: [
        ['Principal Applicant Processing Fee', 'Main Applicant', '$950 CAD', 'Non-refundable once processing begins'],
        ['Right of Permanent Residence Fee (RPRF)', 'Main Applicant', '$575 CAD', 'Refundable if visa refused or withdrawn'],
        ['Spouse / Common-Law Partner Fee', 'Dependent Spouse', '$950 CAD', 'Non-refundable'],
        ['Spouse RPRF Fee', 'Dependent Spouse', '$575 CAD', 'Refundable if refused'],
        ['Dependent Child Fee', 'Per child under 22', '$260 CAD', 'Non-refundable'],
        ['Biometrics Fee', 'Single / Family Max', '$85 / $170 CAD', 'Covers digital fingerprints and photo']
      ],
      bookingTitle: 'Speak with a Licensed Canadian Immigration Consultant (RCIC)',
      bookingDesc: 'Our certified practitioners will audit your credentials, compute your official CRS ranking, and evaluate opportunities for Ontario, BC, or Alberta PNP sponsorship.',
      bookingStreamVal: 'Canada Federal Skilled Worker & Express Entry'
    },

    'australia-gsm': {
      navTitle: 'Australia GSM',
      docTitle: 'Australia General Skilled Migration (Subclass 189 & 190) | AuraVisa',
      heroPill: '<i class="bi bi-compass-fill text-success me-1"></i> Australia Permanent Residency Stream',
      title: 'Australia General Skilled Migration (Subclass 189 & 190)',
      lead: "Australia's points-tested skilled immigration system granting direct permanent residence, full Medicare healthcare rights, and unrestricted work rights across all Australian states.",
      timeBadge: '<i class="bi bi-clock text-primary me-1"></i> 8-12 Months Processing',
      dependentsBadge: '<i class="bi bi-person-check text-success me-1"></i> Includes Spouse & Children',
      heroImg: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&auto=format&fit=crop&q=80',
      heroImgAlt: 'Australia General Skilled Migration permanent residency visa application dossier',
      formulaSubtitle: 'SkillSelect Points Matrix',
      formulaTitle: 'Australia 65-Point Skilled Migration Framework',
      formulaDesc: 'Invitations are issued to highest-scoring candidates across age, English test performance, overseas and onshore work experience, and state nominations.',
      formulaCards: [
        { badge: 'badge-aura-primary', badgeText: 'Max 30 Points', title: 'Age Matrix', desc: 'Maximum 30 points awarded to applicants aged between 25 and 32 years of age.' },
        { badge: 'badge-aura-success', badgeText: 'Max 20 Points', title: 'Superior English', desc: 'Achieving PTE Academic 79+ or IELTS 8.0 in every component unlocks the full 20 points.' },
        { badge: 'badge-aura-warning', badgeText: 'Max 20 Points', title: 'Skilled Employment', desc: '8+ years of relevant overseas experience or 5+ years Australian experience earns top tier.' },
        { badge: 'badge-aura-danger', badgeText: 'Bonus +5/+15 Pts', title: 'State Nomination', desc: 'Securing Subclass 190 state sponsorship awards +5 points; Subclass 491 regional awards +15 points.' }
      ],
      docList: [
        { icon: 'bi-file-earmark-check-fill text-primary', title: 'Positive Skills Assessment Outcome', desc: 'Accredited assessment through ACS, Engineers Australia, VETASSESS, or TRA.' },
        { icon: 'bi-translate text-success', title: 'PTE Academic / IELTS Scorecard', desc: 'Official scorecard verifying Proficient (65+) or Superior (79+) English level.' },
        { icon: 'bi-briefcase-fill text-warning', title: 'Detailed Employment References & Payslips', desc: 'Employer reference letters on letterhead, tax assessments, and superannuation statements.' },
        { icon: 'bi-shield-check text-danger', title: 'National Police Checks & Bupa Medicals', desc: 'AFP National Police Check, overseas penal clearances, and panel physician health checks.' }
      ],
      fundsTitle: 'Australian State Settlement Benchmark (2026)',
      fundsDesc: 'Nominating Australian states require proof of liquid reserves to establish residency:',
      fundsHeaders: ['Applicant Status', 'Required AUD ($)', 'USD Equivalent'],
      fundsRows: [
        ['Single Applicant', '$20,000 AUD', '~$13,200 USD'],
        ['Couple (Applicant + Spouse)', '$25,000 AUD', '~$16,500 USD'],
        ['Family of Three (1 Child)', '$30,000 AUD', '~$19,800 USD'],
        ['Family of Four (2 Children)', '$35,000 AUD', '~$23,100 USD']
      ],
      fundsNote: 'Unencumbered bank balances, term deposits, and verified liquid assets qualify.',
      roadmapTitle: '6-Stage Australian GSM Roadmap',
      roadmapDesc: 'From initial skills assessment lodgement to your Australian permanent visa grant.',
      roadmapSteps: [
        { step: '1', title: 'Skills Assessment', desc: 'ACS, EA, or VETASSESS outcome.' },
        { step: '2', title: 'PTE / IELTS 79+', desc: 'English benchmarking test.' },
        { step: '3', title: 'SkillSelect EOI', desc: 'Submit Expression of Interest.' },
        { step: '4', title: 'State Invitation', desc: 'State nomination approval & ITA.' },
        { step: '5', title: 'DHA Lodgement', desc: 'Final eVisa documentation upload.' },
        { step: '6', title: 'PR Visa Grant', desc: 'Subclass 189/190 permanent visa.' }
      ],
      feeTitle: 'Department of Home Affairs (DHA) Government Fee Schedule',
      feeDesc: 'Official statutory visa application charges payable directly to Home Affairs Australia.',
      feeHeaders: ['Fee Category', 'Applicant Covered', 'Government Fee', 'Refundability Status'],
      feeRows: [
        ['Primary Applicant Charge', 'Main Applicant', '$4,770 AUD', 'Statutory fee, non-refundable'],
        ['Additional Applicant (18+)', 'Dependent Spouse', '$2,385 AUD', 'Non-refundable once lodged'],
        ['Additional Applicant (Under 18)', 'Per Dependent Child', '$1,195 AUD', 'Non-refundable once lodged'],
        ['Second Installment Charge', 'Spouse (if English < 4.5)', '$4,885 AUD', 'Payable only if English requirement unmet'],
        ['Biometrics & Health Examination', 'Per Applicant', '~$350 AUD', 'Payable directly to panel clinic']
      ],
      bookingTitle: 'Consult with a Registered Migration Agent (MARA / RMA)',
      bookingDesc: 'Our MARA-registered practitioners optimize your points tally, select target state nomination lists, and handle your SkillSelect lodgement.',
      bookingStreamVal: 'Australia General Skilled Migration (189/190)'
    },

    'uk-skilled-worker': {
      navTitle: 'UK Skilled Worker',
      docTitle: 'UK Skilled Worker Visa & Sponsor Licensure | AuraVisa',
      heroPill: '<i class="bi bi-briefcase-fill text-warning me-1"></i> UK Economic Immigration Stream',
      title: 'UK Skilled Worker Visa & Sponsor Licensure',
      lead: "The primary legal immigration route for qualified professionals with an approved job offer from a Home Office licensed sponsor, offering a direct 5-year pathway to Indefinite Leave to Remain (ILR).",
      timeBadge: '<i class="bi bi-clock text-primary me-1"></i> 3-6 Weeks Processing (5-Day Priority)',
      dependentsBadge: '<i class="bi bi-person-check text-success me-1"></i> Full Work Rights for Spouse',
      heroImg: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&auto=format&fit=crop&q=80',
      heroImgAlt: 'UK Skilled Worker visa endorsement stamp and Home Office certificate of sponsorship',
      formulaSubtitle: 'Mandatory 70 Points',
      formulaTitle: 'UK Points-Based Immigration Framework',
      formulaDesc: 'Applicants must secure 50 mandatory points from sponsorship, skill level, and English, plus 20 tradeable points based on salary thresholds.',
      formulaCards: [
        { badge: 'badge-aura-primary', badgeText: '20 Pts - Mandatory', title: 'Valid Job Offer', desc: 'Formal contract and assigned Certificate of Sponsorship (CoS) from an A-rated UK licensed sponsor.' },
        { badge: 'badge-aura-success', badgeText: '20 Pts - Mandatory', title: 'Eligible Skill Level', desc: 'Position mapped to eligible Standard Occupational Classification (SOC) code at RQF Level 3 or higher.' },
        { badge: 'badge-aura-warning', badgeText: '10 Pts - Mandatory', title: 'English Proficiency', desc: 'CEFR Level B1 proficiency in reading, writing, listening, and speaking via approved SELT test.' },
        { badge: 'badge-aura-danger', badgeText: '20 Pts - Tradeable', title: 'Salary Threshold', desc: 'Meeting general salary benchmark of £38,700 or relevant occupational going rate (whichever is higher).' }
      ],
      docList: [
        { icon: 'bi-file-earmark-check-fill text-primary', title: 'Certificate of Sponsorship (CoS) Reference', desc: 'Issued by employer confirming job title, salary, SOC code, and employment tenure.' },
        { icon: 'bi-translate text-success', title: 'Secure English Language Test (SELT)', desc: 'Official certificate from approved provider (IELTS for UKVI, Pearson PTE Home).' },
        { icon: 'bi-briefcase-fill text-warning', title: 'Tuberculosis (TB) Screening Certificate', desc: 'Clearance certificate from Home Office-approved panel clinic where applicable.' },
        { icon: 'bi-shield-check text-danger', title: 'Overseas Criminal Record Certificate', desc: 'Mandatory for applicants working in healthcare, education, therapy, or social care sectors.' }
      ],
      fundsTitle: 'UKVI Maintenance Funds Requirements (2026)',
      fundsDesc: 'Liquid maintenance funds that must be held in a regulated financial account for 28 consecutive days:',
      fundsHeaders: ['Applicant Status', 'Required Maintenance (£)', 'USD Equivalent'],
      fundsRows: [
        ['Primary Skilled Worker', '£1,270 GBP', '~$1,620 USD'],
        ['Dependent Partner / Spouse', '£285 GBP', '~$365 USD'],
        ['First Dependent Child', '£315 GBP', '~$400 USD'],
        ['Each Additional Child', '£200 GBP', '~$255 USD']
      ],
      fundsNote: 'Maintenance funds requirement is waived if an A-rated sponsor certifies maintenance on the CoS.',
      roadmapTitle: '6-Stage UK Skilled Worker Roadmap',
      roadmapDesc: 'From sponsor licence coordination to Biometric Residence Permit (BRP) collection.',
      roadmapSteps: [
        { step: '1', title: 'Job Offer & CoS', desc: 'Employer assigns Certificate of Sponsorship.' },
        { step: '2', title: 'Salary & SOC Audit', desc: 'Ensure threshold and code compliance.' },
        { step: '3', title: 'UKVI Online Filing', desc: 'Submit application on gov.uk portal.' },
        { step: '4', title: 'Biometrics & TB', desc: 'VFS/TLS biometric enrollment appointment.' },
        { step: '5', title: 'Vignette Approval', desc: '30-day travel vignette placed in passport.' },
        { step: '6', title: 'UK Landing & BRP', desc: 'Collect Biometric Residence Permit in UK.' }
      ],
      feeTitle: 'Official UK Visas & Immigration (UKVI) Fee Schedule',
      feeDesc: 'Statutory fees payable directly to the UK Home Office online portal.',
      feeHeaders: ['Fee Category', 'Applicant Covered', 'Government Fee', 'Refundability Status'],
      feeRows: [
        ['Skilled Worker Visa (Up to 3 Years)', 'Per Applicant', '£719 GBP', 'Non-refundable once processed'],
        ['Skilled Worker Visa (3+ Years)', 'Per Applicant', '£1,420 GBP', 'Non-refundable once processed'],
        ['Immigration Health Surcharge (IHS)', 'Per Person / Per Year', '£1,035 GBP / yr', '100% Refundable if visa refused'],
        ['Priority Processing Service (Optional)', '5 Working Days Decision', '£500 GBP', 'Non-refundable optional expedite'],
        ['Biometric Enrollment Fee', 'Per Person', '£19.20 GBP', 'Payable at appointment booking']
      ],
      bookingTitle: 'Speak with an OISC-Accredited UK Immigration Counsel',
      bookingDesc: 'Our qualified UK immigration team will verify your Certificate of Sponsorship, confirm minimum wage compliance, and map your Indefinite Leave to Remain (ILR) settlement route.',
      bookingStreamVal: 'UK Skilled Worker Visa & Sponsor Licensure'
    },

    'golden-visa': {
      navTitle: 'Golden Visa & Investor',
      docTitle: 'Investor Golden Visas & Residency by Investment | AuraVisa',
      heroPill: '<i class="bi bi-gem text-warning me-1"></i> High Net Worth Sovereign Mobility',
      title: 'Investor Golden Visas & Residency by Investment',
      lead: "Acquire premier European Union or UAE permanent residency through regulated investment funds, commercial real estate, or sovereign capital, featuring minimal physical residency obligations.",
      timeBadge: '<i class="bi bi-clock text-primary me-1"></i> 2-5 Months Processing',
      dependentsBadge: '<i class="bi bi-person-check text-success me-1"></i> Includes 3 Generations of Family',
      heroImg: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&auto=format&fit=crop&q=80',
      heroImgAlt: 'Investor Golden Visa residency permit and citizenship by investment portfolio',
      formulaSubtitle: 'Sovereign Investment Criteria',
      formulaTitle: 'Golden Visa Wealth & Capital Pillars',
      formulaDesc: 'Each sovereign destination enforces specific capital investment amounts, clean source of funds verification, and minimal annual stay requirements.',
      formulaCards: [
        { badge: 'badge-aura-primary', badgeText: 'Regulated Funds', title: 'Capital Deployment', desc: 'CMVM-regulated venture capital funds, sovereign development bonds, or eligible real estate assets.' },
        { badge: 'badge-aura-success', badgeText: 'Source of Funds', title: 'Wealth Due Diligence', desc: 'Documented audit trail confirming legitimate lawful origin of funds, business dividends, or asset sales.' },
        { badge: 'badge-aura-warning', badgeText: '7 Days / Year', title: 'Minimal Physical Stay', desc: 'Retain European resident status with as few as 7 days per year physical presence in Portugal or Greece.' },
        { badge: 'badge-aura-danger', badgeText: 'EU Passport', title: 'Citizenship Pathway', desc: 'Direct statutory eligibility for EU passport citizenship after 5 years, providing visa-free access to 180+ nations.' }
      ],
      docList: [
        { icon: 'bi-file-earmark-check-fill text-primary', title: 'Bank Escrow Transfer & Subscription Proof', desc: 'Certified bank letters confirming capital arrival into qualifying sovereign account.' },
        { icon: 'bi-translate text-success', title: 'Comprehensive Net Worth & Tax Clearances', desc: 'Multi-year audited corporate tax filings, bank balance sheets, and dividends ledger.' },
        { icon: 'bi-briefcase-fill text-warning', title: 'Apostilled Clean Criminal Records', desc: 'FBI / RCMP / Interpol police clearance certificates with Hague apostilles.' },
        { icon: 'bi-shield-check text-danger', title: 'Global Private Health Insurance Dossier', desc: 'Comprehensive international policy providing full coverage across Schengen countries.' }
      ],
      fundsTitle: 'Sovereign Investment Threshold Benchmarks (2026)',
      fundsDesc: 'Capital allocation requirements by leading sovereign residence programs:',
      fundsHeaders: ['Jurisdiction / Program', 'Minimum Investment', 'Asset Category', 'Key Benefit'],
      fundsRows: [
        ['Portugal Golden Visa', '€500,000 EUR', 'Regulated Venture / Private Equity Fund', '5-Year EU Citizenship, 7 days/yr stay'],
        ['Greece Golden Visa', '€250,000 – €800,000 EUR', 'Prime Commercial / Residential Real Estate', 'Immediate 5-Year Schengen Residence Card'],
        ['UAE 10-Year Golden Visa', '2,000,000 AED (~$545k)', 'Real Estate / Bank Term Deposit', '10-Year Self-Sponsored Tax-Free Residency'],
        ['Spain Investor Visa', '€500,000 EUR', 'Real Estate Equity', 'Full Schengen mobility and family inclusion']
      ],
      fundsNote: 'Complete family inclusion (investor, spouse, dependent children up to 26, and parents).',
      roadmapTitle: '6-Stage Golden Visa Execution Roadmap',
      roadmapDesc: 'From fund due diligence to sovereign residence card collection.',
      roadmapSteps: [
        { step: '1', title: 'Program Selection', desc: 'Legal and financial suitability review.' },
        { step: '2', title: 'Tax ID & Banking', desc: 'Establish onshore bank account & NIF.' },
        { step: '3', title: 'Escrow Transfer', desc: 'Deploy qualifying investment funds.' },
        { step: '4', title: 'Sovereign Filing', desc: 'Submit application to immigration ministry.' },
        { step: '5', title: 'Consular Biometrics', desc: 'In-person biometric capture appointment.' },
        { step: '6', title: 'Residence Cards', desc: 'Collect Golden Residence Permit cards.' }
      ],
      feeTitle: 'Sovereign Government Application & Issuance Fees',
      feeDesc: 'Statutory fees payable directly to sovereign immigration departments (AIMA Portugal, Greek Ministry).',
      feeHeaders: ['Fee Category', 'Applicant Covered', 'Government Fee', 'Details'],
      feeRows: [
        ['Government Initial Processing Fee', 'Primary Investor', '€5,340 EUR', 'Statutory government dossier review fee'],
        ['Residence Card Issuance Fee', 'Per Family Member', '€2,670 EUR', 'Payable only upon official visa approval'],
        ['Dependent Family Processing', 'Per Dependent', '€534 EUR', 'Application review charge for family'],
        ['Biennial Card Renewal Fee', 'Per Person', '€2,670 EUR', 'Payable every 2 years at permit extension'],
        ['Legal Representation & Escrow', 'Family Dossier', 'Retainer Inclusive', 'Covered under AuraVisa engagement']
      ],
      bookingTitle: 'Schedule a Private Consultation with our Senior Partner',
      bookingDesc: 'Our private client wealth practice handles fund due diligence, sovereign tax structuring, and multi-generational golden visa family petitions.',
      bookingStreamVal: 'Investor Golden Visas & Residency by Investment'
    },

    'student-permits': {
      navTitle: 'Student Permits',
      docTitle: 'International Student Permits & Admissions | AuraVisa',
      heroPill: '<i class="bi bi-mortarboard-fill text-info me-1"></i> Global Higher Education Pathway',
      title: 'International Student Permits & Admissions',
      lead: "Securing direct university admissions, academic scholarships, and fast-track study permits for 850+ colleges and universities in Canada, Australia, the UK, and the USA with post-study work rights.",
      timeBadge: '<i class="bi bi-clock text-primary me-1"></i> 4-8 Weeks Processing',
      dependentsBadge: '<i class="bi bi-person-check text-success me-1"></i> Spouse Eligible for Open Work Permit',
      heroImg: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&auto=format&fit=crop&q=80',
      heroImgAlt: 'International university admission dossier, student visa stamp, and study permit paperwork',
      formulaSubtitle: 'Admissions & Consular Criteria',
      formulaTitle: 'Student Visa Evaluation & Compliance Standards',
      formulaDesc: 'Consular officers examine academic progression, financial solvency, and genuine student intent before granting study authorization.',
      formulaCards: [
        { badge: 'badge-aura-primary', badgeText: 'Official Admission', title: 'Letter of Acceptance (LOA)', desc: 'Unconditional admission from a government Designated Learning Institution (DLI) with valid Provincial Attestation.' },
        { badge: 'badge-aura-success', badgeText: 'Living Funds', title: 'Financial Solvency', desc: 'Proof of paid first-year tuition plus liquid living expense deposit (e.g. Canadian $20,635 CAD GIC).' },
        { badge: 'badge-aura-warning', badgeText: 'Academic SOP', title: 'Genuine Intent', desc: 'Airtight Statement of Purpose demonstrating logical study choice and career trajectory in home country.' },
        { badge: 'badge-aura-danger', badgeText: 'Language Score', title: 'English Benchmark', desc: 'Academic IELTS 6.5+ (no band below 6.0), PTE Academic 60+, or TOEFL iBT 88+.' }
      ],
      docList: [
        { icon: 'bi-file-earmark-check-fill text-primary', title: 'Letter of Acceptance (LOA) & Attestation (PAL)', desc: 'Certified university acceptance confirming program, DLI number, and tuition structure.' },
        { icon: 'bi-translate text-success', title: 'Guaranteed Investment Certificate (GIC) / Bank Solvency', desc: 'Irrevocable deposit certificate issued by approved financial institution.' },
        { icon: 'bi-briefcase-fill text-warning', title: 'Apostilled Academic Transcripts & Degrees', desc: 'Official high school and university transcripts, degree certificates, and marksheets.' },
        { icon: 'bi-shield-check text-danger', title: 'Statement of Purpose (SOP) & Medical Exam', desc: 'Comprehensive study motivation letter plus panel physician upfront medical exam receipt.' }
      ],
      fundsTitle: 'Student Living Expense Standards (2026)',
      fundsDesc: 'Statutory living funds mandated by destination immigration departments:',
      fundsHeaders: ['Country / Destination', 'Required Living Amount', 'USD Equivalent', 'Requirements'],
      fundsRows: [
        ['Canada Study Permit', '$20,635 CAD / year', '~$15,200 USD', 'Mandatory GIC deposit + 1st year tuition receipt'],
        ['Australia Student (Subclass 500)', '$29,710 AUD / year', '~$19,600 USD', 'Liquid savings or approved education loan'],
        ['UK Student (Outside London)', '£1,023 GBP / month (up to 9 mos)', '~$12,500 USD', 'Bank statement held for 28 consecutive days'],
        ['UK Student (Inside London)', '£1,334 GBP / month (up to 9 mos)', '~$16,300 USD', 'Bank statement held for 28 consecutive days']
      ],
      fundsNote: 'All funds must be backed by official bank letters, tax returns, or education loan sanctions.',
      roadmapTitle: '6-Stage University & Visa Roadmap',
      roadmapDesc: 'From program selection to your student arrival and campus orientation.',
      roadmapSteps: [
        { step: '1', title: 'Course Matching', desc: 'Select DLI university program.' },
        { step: '2', title: 'LOA & PAL Grant', desc: 'Receive official university admission.' },
        { step: '3', title: 'Tuition & GIC', desc: 'Wire tuition & establish living funds.' },
        { step: '4', title: 'Visa Lodgement', desc: 'Submit student visa petition online.' },
        { step: '5', title: 'Biometrics & Med', desc: 'Consular biometric collection.' },
        { step: '6', title: 'Study Permit', desc: 'Visa stamp issued with PGWP rights.' }
      ],
      feeTitle: 'Official Government Student Visa Fees',
      feeDesc: 'Consular processing fees paid directly to the destination government portal.',
      feeHeaders: ['Destination / Visa', 'Processing Authority', 'Government Fee', 'Post-Study Work Rights'],
      feeRows: [
        ['Canada Study Permit', 'IRCC Canada', '$150 CAD', 'Up to 3-Year Post-Graduation Work Permit (PGWP)'],
        ['Australia Student Visa', 'Department of Home Affairs', '$1,600 AUD', 'Subclass 485 Temporary Graduate Visa (2-4 Years)'],
        ['UK Student Visa', 'UK Visas & Immigration', '£490 GBP', '2-Year Graduate Route post-study work visa'],
        ['Biometrics Fee', 'Visa Application Center', '$85 CAD / £19.20 GBP', 'Digital biometric enrollment at consular center']
      ],
      bookingTitle: 'Book a Strategy Call with a Certified Education Counselor',
      bookingDesc: 'Our advisors identify high-visa-approval university courses, secure academic merit scholarships, and draft airtight Statements of Purpose.',
      bookingStreamVal: 'International Student Study Permits & Higher Education'
    },

    'family-sponsorship': {
      navTitle: 'Family Sponsorship',
      docTitle: 'Spousal & Parent Family Sponsorship | AuraVisa',
      heroPill: '<i class="bi bi-heart-fill text-danger me-1"></i> Sovereign Family Reunification',
      title: 'Spousal, Common-Law & Parent Family Sponsorship',
      lead: "Reunite permanently with your legal spouse, common-law partner, dependent children, or parents with permanent residency status, full social benefits, and open work authorization.",
      timeBadge: '<i class="bi bi-clock text-primary me-1"></i> 8-12 Months Processing',
      dependentsBadge: '<i class="bi bi-person-check text-success me-1"></i> Spousal Open Work Permit in 60 Days',
      heroImg: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&auto=format&fit=crop&q=80',
      heroImgAlt: 'Family reunification legal dossier, permanent residency grant, and spousal sponsorship documents',
      formulaSubtitle: 'Statutory Standards',
      formulaTitle: 'Family Sponsorship Eligibility & Relationship Integrity',
      formulaDesc: 'Immigration authorities rigorously audit sponsor qualifications, financial commitments, and the genuine, unsimulated nature of the relationship.',
      formulaCards: [
        { badge: 'badge-aura-primary', badgeText: 'Sponsor Status', title: 'Sponsor Eligibility', desc: 'Sponsor must be a citizen or permanent resident aged 18+ not in bankruptcy or receipt of social assistance.' },
        { badge: 'badge-aura-success', badgeText: 'Bona Fide Union', title: 'Genuine Relationship', desc: 'Detailed proof of continuous cohabitation, joint financial accounts, shared assets, and communication history.' },
        { badge: 'badge-aura-warning', badgeText: 'Income Threshold', title: 'Minimum Necessary Income', desc: 'MNI financial benchmarking mandatory for parent and grandparent sponsorships (waived for spouses).' },
        { badge: 'badge-aura-danger', badgeText: 'In-Land Permit', title: 'Open Work Permit', desc: 'Sponsored spouses residing onshore can obtain an unrestricted open work permit while PR processes.' }
      ],
      docList: [
        { icon: 'bi-file-earmark-check-fill text-primary', title: 'Certified Marriage Certificate / Common-Law Statutory Form', desc: 'Sworn legal documentation evidencing lawful marriage or 12+ months continuous cohabitation.' },
        { icon: 'bi-translate text-success', title: 'Proof of Joint Financial Interdependence', desc: 'Joint bank statements, residential leases, shared utility bills, and insurance beneficiary papers.' },
        { icon: 'bi-briefcase-fill text-warning', title: 'Photographic Archive & Communication Logs', desc: 'Chronological photo albums spanning relationship history, wedding photos, and phone message logs.' },
        { icon: 'bi-shield-check text-danger', title: 'Police Clearances & Upfront Medicals', desc: 'National penal certificates from all countries lived in for 6+ months, plus panel physician clearance.' }
      ],
      fundsTitle: 'Parent & Grandparent Income Benchmark (MNI)',
      fundsDesc: 'Statutory income requirements (waived completely for spousal sponsorship):',
      fundsHeaders: ['Family Unit Size', 'Minimum Necessary Income (MNI)', 'USD Equivalent', 'Notes'],
      fundsRows: [
        ['Spousal Sponsorship (Any Size)', '$0 CAD (Income Test Waived)', '$0 USD', 'No minimum income requirement for spouses/children'],
        ['Family Size of 2 (Sponsor + 1 Parent)', '$34,254 CAD MNI', '~$25,200 USD', 'Proven via 3 consecutive CRA Notices of Assessment'],
        ['Family Size of 3 (Couple + 1 Parent)', '$42,111 CAD MNI', '~$31,000 USD', 'Proven via 3 consecutive CRA Notices of Assessment'],
        ['Family Size of 4 (Couple + 2 Parents)', '$51,134 CAD MNI', '~$37,600 USD', 'Proven via 3 consecutive CRA Notices of Assessment']
      ],
      fundsNote: 'Sponsors sign an undertaking agreeing to financially support the applicant for 3 years (spouse) or 20 years (parents).',
      roadmapTitle: '6-Stage Family Reunification Roadmap',
      roadmapDesc: 'From document dossier compilation to permanent resident landing.',
      roadmapSteps: [
        { step: '1', title: 'Evidence Dossier', desc: 'Assemble marriage and relationship proof.' },
        { step: '2', title: 'Sponsorship Filing', desc: 'Submit sponsor eligibility petition.' },
        { step: '3', title: 'Applicant PR Upload', desc: 'File principal applicant PR docket.' },
        { step: '4', title: 'Open Work Permit', desc: 'Spouse receives open work permit (in-land).' },
        { step: '5', title: 'Biometrics & Checks', desc: 'Consular background and medical checks.' },
        { step: '6', title: 'PR Confirmation', desc: 'Confirmation of Permanent Residence (CoPR).' }
      ],
      feeTitle: 'Official Family Sponsorship Government Fee Schedule',
      feeDesc: 'Statutory fees payable directly to the sovereign immigration department.',
      feeHeaders: ['Fee Category', 'Applicant Covered', 'Government Fee', 'Refundability Status'],
      feeRows: [
        ['Sponsorship Assessment Fee', 'Primary Sponsor', '$75 CAD', 'Non-refundable once processing starts'],
        ['Principal Applicant PR Processing Fee', 'Sponsored Spouse / Parent', '$490 CAD', 'Non-refundable statutory charge'],
        ['Right of Permanent Residence Fee (RPRF)', 'Sponsored Adult', '$575 CAD', '100% Refundable if visa refused'],
        ['Dependent Child Sponsorship Fee', 'Per Child under 22', '$150 CAD', 'Non-refundable'],
        ['Biometrics Collection Fee', 'Per Person', '$85 CAD', 'Digital fingerprinting and photo fee']
      ],
      bookingTitle: 'Schedule a Family Sponsorship Legal Strategy Review',
      bookingDesc: 'Our certified immigration attorneys assemble airtight relationship proof portfolios, eliminate consular red flags, and secure fast-track spousal work authorization.',
      bookingStreamVal: 'Spousal, Common-Law & Parent Family Sponsorship'
    }
  };

  function renderService(serviceKey) {
    const data = servicesData[serviceKey] || servicesData['express-entry'];

    // Update Document Title
    if (data.docTitle) {
      document.title = data.docTitle;
    }

    // 1. Hero Section
    const heroPill = document.getElementById('service-hero-pill');
    if (heroPill) heroPill.innerHTML = data.heroPill;

    const title = document.getElementById('service-title');
    if (title) title.textContent = data.title;

    const lead = document.getElementById('service-lead');
    if (lead) lead.textContent = data.lead;

    const timeBadge = document.getElementById('service-time-badge');
    if (timeBadge) timeBadge.innerHTML = data.timeBadge;

    const dependentsBadge = document.getElementById('service-dependents-badge');
    if (dependentsBadge) dependentsBadge.innerHTML = data.dependentsBadge;

    const heroImg = document.getElementById('service-hero-img');
    if (heroImg && data.heroImg) {
      heroImg.src = data.heroImg;
      heroImg.alt = data.heroImgAlt || data.title;
    }

    // 2. Selection Formula
    const formulaSubtitle = document.getElementById('service-formula-subtitle');
    if (formulaSubtitle) formulaSubtitle.textContent = data.formulaSubtitle;

    const formulaTitle = document.getElementById('service-formula-title');
    if (formulaTitle) formulaTitle.textContent = data.formulaTitle;

    const formulaDesc = document.getElementById('service-formula-desc');
    if (formulaDesc) formulaDesc.textContent = data.formulaDesc;

    const formulaCards = document.getElementById('service-formula-cards');
    if (formulaCards && data.formulaCards) {
      formulaCards.innerHTML = data.formulaCards.map(c => `
        <div class="col-md-6 col-lg-3">
          <div class="card-auravisa p-4 text-center h-100">
            <span class="badge-aura ${c.badge} mb-2 mx-auto">${c.badgeText}</span>
            <h5 class="fw-bold mb-2">${c.title}</h5>
            <p class="text-muted small mb-0">${c.desc}</p>
          </div>
        </div>
      `).join('');
    }

    // 3. Document Dossier & Funds
    const docList = document.getElementById('service-doc-list');
    if (docList && data.docList) {
      docList.innerHTML = data.docList.map(d => `
        <div class="d-flex align-items-start gap-3 p-3 bg-surface border rounded-3">
          <i class="bi ${d.icon} fs-4 mt-1"></i>
          <div>
            <h6 class="fw-bold mb-1">${d.title}</h6>
            <small class="text-muted">${d.desc}</small>
          </div>
        </div>
      `).join('');
    }

    const fundsCard = document.getElementById('service-funds-card');
    if (fundsCard && data.fundsRows) {
      const headerCols = data.fundsHeaders.map(h => `<th>${h}</th>`).join('');
      const rows = data.fundsRows.map(r => `
        <tr>
          <td>${r[0]}</td>
          <td class="fw-bold text-primary">${r[1]}</td>
          <td>${r[2]}</td>
          ${r[3] ? `<td><small class="text-muted">${r[3]}</small></td>` : ''}
        </tr>
      `).join('');

      fundsCard.innerHTML = `
        <h4 class="fw-bold mb-3">${data.fundsTitle}</h4>
        <p class="text-muted small mb-4">${data.fundsDesc}</p>
        <div class="table-responsive mb-4">
          <table class="table table-auravisa mb-0">
            <thead><tr>${headerCols}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <div class="small text-muted">
          <i class="bi bi-info-circle me-1"></i> ${data.fundsNote}
        </div>
      `;
    }

    // 4. Milestone Roadmap
    const roadmapTitle = document.getElementById('service-roadmap-title');
    if (roadmapTitle) roadmapTitle.textContent = data.roadmapTitle;

    const roadmapDesc = document.getElementById('service-roadmap-desc');
    if (roadmapDesc) roadmapDesc.textContent = data.roadmapDesc;

    const roadmapSteps = document.getElementById('service-roadmap-steps');
    if (roadmapSteps && data.roadmapSteps) {
      roadmapSteps.innerHTML = data.roadmapSteps.map(s => `
        <div class="col-md-4 col-lg-2">
          <div class="card-auravisa p-3 text-center h-100">
            <div class="step-number-badge mx-auto">${s.step}</div>
            <h6 class="fw-bold mb-1">${s.title}</h6>
            <small class="text-muted">${s.desc}</small>
          </div>
        </div>
      `).join('');
    }

    // 5. Government Fee Schedule
    const feeTitle = document.getElementById('service-fee-title');
    if (feeTitle) feeTitle.textContent = data.feeTitle;

    const feeDesc = document.getElementById('service-fee-desc');
    if (feeDesc) feeDesc.textContent = data.feeDesc;

    const feeContainer = document.getElementById('service-fee-container');
    if (feeContainer && data.feeRows) {
      const feeHeaderCols = data.feeHeaders.map(h => `<th>${h}</th>`).join('');
      const feeRowsHtml = data.feeRows.map(r => `
        <tr>
          <td>${r[0]}</td>
          <td>${r[1]}</td>
          <td class="fw-bold text-primary">${r[2]}</td>
          <td>${r[3]}</td>
        </tr>
      `).join('');

      feeContainer.innerHTML = `
        <table class="table table-auravisa">
          <thead><tr>${feeHeaderCols}</tr></thead>
          <tbody>${feeRowsHtml}</tbody>
        </table>
      `;
    }

    // 6. Consultation Booking Form
    const bookingTitle = document.getElementById('service-booking-title');
    if (bookingTitle) bookingTitle.textContent = data.bookingTitle;

    const bookingDesc = document.getElementById('service-booking-desc');
    if (bookingDesc) bookingDesc.textContent = data.bookingDesc;

    const bookingStream = document.getElementById('service-booking-stream');
    if (bookingStream) bookingStream.value = data.bookingStreamVal;

    // Update Active Pill Buttons
    document.querySelectorAll('.service-pill-btn').forEach(btn => {
      if (btn.getAttribute('data-service') === serviceKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  document.addEventListener('DOMContentLoaded', function() {
    let currentService = getQueryParam('service') || 'express-entry';
    if (!servicesData[currentService]) {
      currentService = 'express-entry';
    }

    renderService(currentService);

    // Pill click delegation
    const pills = document.querySelectorAll('.service-pill-btn');
    pills.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const selected = this.getAttribute('data-service');
        if (selected && servicesData[selected]) {
          renderService(selected);
          const newUrl = window.location.pathname + '?service=' + selected;
          window.history.pushState({ service: selected }, '', newUrl);
        }
      });
    });

    // Handle back / forward browser navigation
    window.addEventListener('popstate', function() {
      const stateService = getQueryParam('service') || 'express-entry';
      renderService(stateService);
    });
  });
})();
