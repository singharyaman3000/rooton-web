import { ABOUT_US_PATH } from '@/constants/navigation';
import WinningWillIcon from '@/components/Icons/WinningWillIcon';
import OpenMindednessIcon from '@/components/Icons/OpenMindednessIcon';
import QualityServiceIcon from '@/components/Icons/QualityServiceIcon';
import IntegrityRespectIcon from '@/components/Icons/IntegrityRespectIcon';
import CustomerObsessionIcon from '@/components/Icons/CustomerObsessionIcon';
import PersonalAccountabilityIcon from '@/components/Icons/PersonalAccountabilityIcon';

/* About Us Banner Section */
export const BANNER_SECTION_CONTENT = {
  pagePath: ABOUT_US_PATH,
  bannerImageUrl: {
    desktopScreen: '/images/aboutUs/about-us-banner.png',
    mobileScreen: '/images/aboutUs/about-us-mobile-banner.png',
  },
  bannerHeading: '<span>About Root On</span>',
  bannerDescription:
    'Personalized immigration guidance from a licensed professional. Discover the best pathway for your Canadian dream.',
};

/* About Us Description Section */
export const WELCOME_SECTION_DATA = {
  companyDescription:
    'Root On Immigration Consultants, founded by Ronak Patel, is a licensed Canadian Immigration firm specialising in Study Permit, Work Permit, Visitor Visa, Permanent Residency and Business Immigration applications. It has had its Canadian office in Downtown Montreal, QC since 2015 and its overseas Indian office is incorporated in Surat, Gujarat since 2019. <br/> <br /><strong>We help international students, working professionals, businesses and families immigrate to Canada in the most ethical, efficient and optimal manner possible.</strong> <br /><br />By far, we have represented a diverse clientele from countries including India, Malaysia, Ghana, Cameroon, Morocco, the UAE, Sri Lanka, Turkey, Nepal, the UK and more, even receiving inquiries from the USA. Root On is a recognized and leading immigration firm when it comes to complex visa situations and for its successful appeals against unjust denials.What sets us apart is our expertise in complex visa situations and successful appeals against unjust denials. <br />Contact us today to discover your true immigration potential and make a knowledgeable decision for your Canadian journey!',
  experienceYearsText: 'years of experience,<br />we excel in immigration services.',
  clientsCountText: 'clients fulfilled their<br />Canada dreams with us.',
  welcomeImageUrl: '/images/aboutUs/traveling-man.png',
};

export const COMPANY_STAT_VALUES_DEFAULT = [
  { statValue: 15, statText: WELCOME_SECTION_DATA.experienceYearsText },
  { statValue: 850, statText: WELCOME_SECTION_DATA.clientsCountText },
];

/* Book a Consultation Section */
export const BOOK_CONSULTATION_CONTENT = {
  btnText: 'Book a Consultation with Ronak',
  imageUrl: '/images/servicePage/my-project-44@3x.png',
  imageAltText: 'Company employee',
  contentText: {
    firstLine: 'No wasted time and money.',
    secondLine: 'No empty promises.',
  },
};

/* Book Appointment Form Section */
export const BOOK_APPOINTMENT_FORM = {
  formHeading: 'Tell us more about yourself',
  imageUrl: '/images/my-project-46@3x.png',
  formData: {
    region: 'na1',
    portalId: '7535538',
    formId: '61e819dd-78e2-4fff-983e-60e559f52cc3',
    calendarLink: {
      free: 'https://meetings.hubspot.com/ronak-patel4/1-1-meeting-with-a-counsellor',
      paid: 'https://calendly.com/root-on-immigration-consultants/discovery-call-with-client',
    },
  },
};

/* About the CEO section */
export const COMPANY_CEO_INFO = {
  sectionHeading: 'About the CEO',
  description:
    'Mr. Ronak Patel is the founder of Root On Immigration Consultants Inc and an RCIC Member of Immigration Consultants of Canada Regulatory Council. With over 15 years of experience, he specializes in',
  vision:
    'His motivation to start Root On Consultants came from witnessing the challenges faced by immigrants, inspiring him to assist students with Canada Student Visas and immigrants from around the world.',
  licenseNumber: 'R529956',
  imageUrl: '/images/aboutUs/team-members/013.png',
  certificationImagesUrl: [
    {
      imageUrl: '/images/aboutUs/cicc-logo.png',
      imageWidth: '206px',
      imageHeight: '60px',
      imageAlt: 'CICC Certification',
    },
    {
      imageUrl: '/images/aboutUs/capic-logo.png',
      imageWidth: '240px',
      imageHeight: '56px',
      imageAlt: 'CAPIC Certification',
    },
  ],
  expertiseList: [
    'Study Visa Extensions',
    'Spousal Open Work Permit Visas',
    'Canadian Visitor Visas (single and multiple entry)',
    'Canadian Permanent Residence Visas',
    'Express Entry Program Visas',
    'Provincial Nominee Program Visas',
  ],
};

/* Who we are Section */
// Use '\n' for new-line '\t' for tab space in employeeDescription
export const COMPANY_MEMBERS_SECTION = {
  sectionHeading: 'Who we are',
  companyMembers: [
    {
      employeeName: 'Anjali Agarwal',
      employeeRole: 'TEAM LEADER',
      employeeDescription:
        'I am Anjali Agarwal, a seasoned and driven professional with over 9 years of dedicated experience in the realm of immigration consultancy and education counseling. Holding a Master of Business Administration in Finance, I bring a robust educational background to my role. Currently serving as the Team Leader at Root On Immigration Consultants Pvt Ltd, a distinguished Canadian Immigration Consultant (RCIC) firm located in Surat, Gujarat, I specialize in streamlining immigration processes exclusively for Canada.\n\nIn my current leadership role, I lead a dynamic team engaged in applications and counseling initiatives for Canada. Overseeing the entire spectrum of admissions and visa applications, my responsibilities span career counseling, meticulous application management, and delivering the same with the utmost professionalism. I take pride in my ability to convert leads into valued clients and maintain well-organized databases to enhance operational efficiency.',
      imageUrl: { employeeImage: '/images/aboutUs/team-members/Anjali Agarwal.svg', backgroundColor: '#71597B' },
    },
    {
      employeeName: 'Harnisha Dumasia',
      employeeRole: 'COUNSELOR',
      employeeDescription:
        'I\'m Harnisha Dumasia, a Dedicated counselling specialist with a Master\'s in Chemistry from the prestigious NIT, a Tier-1 institute. With four years of experience in the field, I bring a wealth of knowledge and expertise to guide clients through their immigration journeys.\n\nMy commitment lies in delivering personalized attention and tailored solutions, addressing each client\'s unique circumstances, whether it\'s navigating visa applications or citizenship processes. I take pride in fostering an empathetic approach, ensuring clients feel supported amidst the complexities of the immigration process is a top priority, guaranteeing that my clients receive the most accurate and reliable advice available.\n\nI am here to be your trustworthy ally in your immigration endeavors, offering invaluable insights and assistance at every step. Welcome to a journey where your immigration goals transform into a tangible reality.',
      imageUrl: { employeeImage: '/images/aboutUs/team-members/Harnisha.svg', backgroundColor: '#ffdba7' },
    },
    {
      employeeName: 'Krishna Parekh',
      employeeRole: 'COUNSELOR',
      employeeDescription:
        'Namaste! I am Krishna, your counseling specialist at Root On. I have completed my master’s in the subject of economics. I have spent three amazing years working as an education counselor. In February 2023, I made an exciting career move into immigration counseling, where I developed my skill in evaluating each candidate\'s individual needs and goals. My work goes beyond traditional counseling; it\'s about working together, getting to know your true needs, and creating a solution that flows naturally from your goals. My Aim is not just to help you cross the borders but to open doors to a future where your ambition has no boundaries. Without a doubt, your career is my top priority, and your success motivates me.',
      imageUrl: { employeeImage: '/images/aboutUs/team-members/Krishna Parekh.svg', backgroundColor: '#F8A985' },
    },
    {
      employeeName: 'Rachitta Jhaveri',
      employeeRole: 'LANGUAGE TRAINER',
      employeeDescription:
        'Myself Rachita.My journey into teaching English for exams like IELTS, PTE, TOEFL, CELPIP, and spoken English was quite unexpected which began due to a fortunate accident that led me to discover my true calling in education. I find immense joy in helping students navigate through the hurdles of language learning. Whether it\'s decoding complex grammar rules or mastering conversational English, I\'m here to guide students through every step of the way. It\'s my goal to not just improve students\' test performance but to empower them with language skills that will shape their future endeavors and enhance their lives in meaningful ways.',
      imageUrl: { employeeImage: '/images/aboutUs/team-members/Rachhitta.svg', backgroundColor: '#2993a5' },
    },
    {
      employeeName: 'Darshinee Desai',
      employeeRole: 'LANGUAGE TRAINER',
      employeeDescription:
        'I am a science graduate with a marketing twist and an avid teaching enthusiast. I thrive on connecting with individuals, delving into their perspectives, and aiding them on their exam journeys. What once started as a hobby has blossomed into a fulfilling profession.\n\nA firm believer in embracing the best and being prepared for the worst. For me, success isn\'t an alternative; it\'s a blend of hard work and smart strategies.Beyond the hustle, I find solace in reading novels, the rhythm of music, the serenity of long walks, and cherishing moments with family and friends.\n\nReady to explore, learn, and conquer challenges together!',
      imageUrl: { employeeImage: '/images/aboutUs/team-members/Darshinee Desai.svg', backgroundColor: '#00aba3' },
    },
    {
      employeeName: 'Nishi Chawla',
      employeeRole: 'CLIENT ACCOUNT MANAGER',
      employeeDescription:
        'Meet Ms. Nishi Chawla, our Client Account Manager at Root On Immigration. As an MBA graduate, Nishi is your dedicated guide through the Canadian immigration journey. As a Trained Professional in Study Visa , Work permits, LMIA, and PR, she provides personalized support from onboarding to visa success.\n\nNishi simplifies immigration complexities, ensuring a stress-free process. Her dedication goes beyond account management; she\'s genuinely invested in your success. With a friendly demeanor, Nishi is ready to address your queries, ensuring a pleasant and successful immigration experience. Your Canadian dream starts with Nishi by your side.',
      imageUrl: { employeeImage: '/images/aboutUs/team-members/Nishi.svg', backgroundColor: '#C45F77' },
    },
    {
      employeeName: 'Anjali Uttamchandani',
      employeeRole: 'CLIENT ACCOUNT MANAGER',
      employeeDescription:
        'Greetings! I\'m Anjali Uttamchandani, your dedicated Case Officer. Bringing five years of dynamic expertise working outside India, I am thrilled to have recently joined the Root on Immigration Firm With a fervent belief in the transformative power of immigration, I specialize in handling the application process to make the submission process easy and efficient.\n\nMy journey in this field is driven by a commitment to turn challenges into opportunities. Navigating the intricate web of immigration processes, I provide personalized solutions with a keen eye for detail. Every client has a unique story, and I am honored to play a role in shaping their path to a brighter future.\n\nAt Rooton Immigration firm, we don\'t just handle the Immigration process; we build bridges to new beginnings. Join us on this expedition, and let\'s make your immigration journey a seamless and successful adventure.',
      imageUrl: { employeeImage: '/images/aboutUs/team-members/Anjali Uttamchandani.svg', backgroundColor: '#FC616A' },
    },
    {
      employeeName: 'Nikita Motirade',
      employeeRole: 'CLIENT ACCOUNT MANAGER',
      employeeDescription:
        'I am Nikita Motirade, an MBA-educated professional and dedicated Client Account Manager at Root On Immigration Consultants Firm. With unwavering commitment, I will guide you through every step of your immigration journey, serving as not just a facilitator but as your partner in turning your aspirations into reality. From our first conversation to securing your visa, my role extends beyond routine assistance. I am here to provide personalized support and guidance, ensuring each step is seamlessly tailored to your unique needs. As your advocate within Root On, I am passionate about delivering a client-centric experience. I understand your individual requirements and leverage my MBA expertise to make your immigration process not just a formality, but a personalized and gratifying endeavor.',
      imageUrl: { employeeImage: '/images/aboutUs/team-members/Nikita.svg', backgroundColor: '#2B5073' },
    },
    {
      employeeName: 'Deepanshi Arora',
      employeeRole: 'CLIENT ACCOUNT MANAGER',
      employeeDescription:
        'Hi! I am Deepanshi Arora, an MBA graduate and I take immense pride in serving as a Client Account Manager at Root On Immigration Consultancy Firm. My role revolves around fostering seamless communication with our valued clients and guiding them through the intricacies of the immigration process.\n\nAs a dedicated professional, I am committed to ensuring a smooth and transparent journey for our clients. From assisting with the preparation of applications to overseeing their timely submission and acquiring Canadian Visa, my goal is to provide a hassle-free experience. I understand the importance of addressing the unique needs of each client, and I am here to offer personalized support at every step of their immigration journey.',
      imageUrl: { employeeImage: '/images/aboutUs/team-members/Deepanshi.svg', backgroundColor: '#00aba3' },
    },
    {
      employeeName: 'Mehul Goswami',
      employeeRole: 'CLIENT ACCOUNT MANAGER',
      employeeDescription:
        'Hello, I\'m Mehul Goswami, honored to serve as a Client Account Manager at this esteemed organization for the past two years. With a solid foundation in Diploma in Aviation, Hospitality, and Travel Management, I\'ve accumulated over 5 years of invaluable experience in the hospitality industry.Transitioning seamlessly into the immigration sector, I have spent the last two years navigating a myriad of cases involving multiple academic backlogs, educational gaps, and refusals from various countries.My unique blend of hospitality expertise and a deep understanding of immigration intricacies enables me to approach client cases with a holistic perspective. Beyond my role, I\'ve successfully facilitated open work permit applications in diverse scenarios, demonstrating my commitment to providing comprehensive solutions. With a meticulous adherence to all policies and a dedication to transparency at every step, I am fully committed to our shared goals and the success of our clients.',
      imageUrl: { employeeImage: '/images/aboutUs/team-members/Mehul Goswami-01.svg', backgroundColor: '#2993a5' },
    },
    {
      employeeName: 'Yash Gohil',
      employeeRole: 'MARKETING SPECIALIST',
      employeeDescription:
        'I am Yash Gohil, a passionate Marketing Specialist at Root On Immigration Consultants. For the past year, I have been dedicating my skills and expertise to this dynamic field, employing a range of marketing strategies to boost our consultancy\'s visibility and reach. My role involves innovating and adapting to the ever-changing marketing landscape, ensuring that potential clients are effectively connected with the services we offer. Through my efforts, I aim to significantly contribute to shaping the brand\'s presence in a competitive market, showcasing my ability to excel in the challenging and exciting world of marketing.',
      imageUrl: { employeeImage: '/images/aboutUs/team-members/Yash final-01.svg', backgroundColor: '#C45F77' },
    },
  ],
};

/* What We Value Section */
export const WHAT_WE_VALUE_SECTION = {
  ourValuesHeading: 'What we value',
  ourValuesDescription:
    'Our mission is to inspire, challenge, and guide clients in finding their true immigration needs, offering customer-centric, goal-based solutions. We aim to be the most valued immigration firm for our customers, providing unwavering support in their journey towards a better future.',
  companyValues: [
    {
      key: 'Customer Obsession',
      iconComponent: CustomerObsessionIcon,
      value: 'We obsess over customer success and so, start with the customer, then work for the business.',
      position: 1,
    },
    {
      key: 'Quality Service',
      iconComponent: QualityServiceIcon,
      value: 'We strive to provide outstanding and unsurpassed service to our customers.',
      position: 2,
    },
    {
      key: 'A Will To Win',
      iconComponent: WinningWillIcon,
      value: 'With a strong will to succeed. We are constantly ready for new challenges.',
      position: 3,
    },
    {
      key: 'Personal Accountability',
      iconComponent: PersonalAccountabilityIcon,
      value: 'We are personally accountable for delivering on our commitments.',
      position: 4,
    },
    {
      key: 'Open-Mindedness',
      iconComponent: OpenMindednessIcon,
      value: 'We strive to adapt, improve and innovate in the services we offer.',
      position: 5,
    },
    {
      key: 'Integrity and Respect',
      iconComponent: IntegrityRespectIcon,
      value: 'We treat our customers, colleagues, and partners with respect.',
      position: 6,
    },
  ],
};

/* Book an appointment Section */
export const BOOK_APPOINTMENT_CONTENT = {
  contentText: 'Book an Appointment',
};
