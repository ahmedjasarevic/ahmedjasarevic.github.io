import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    python,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    amoviedatabase,
    kacunba,
    nutrilog,
    threejs,
    mysql,
    nextjs,
    django,
    wordpress,
    bootstrap,
    fiverr,
    politehnicki,
    teleteg,
    universVacancesIcon
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "projects",
      title: "Projects",
    },
    {
      id: "testimonials",
      title: "Testimonials",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "Frontend Developer",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "Freelancer",
      icon: creator,
    },
  ];
  

  const technologies = [
    {
      name: "HTML",
      icon: html,
      color: '#FF5733' 
    },
    {
      name: "CSS",
      icon: css,
      color: '#33FF57'
    },
    {
      name: "JavaScript",
      icon: javascript,
      color: '#3357FF' 
    },
    {
      name: "Python",
      icon: python,
      color: '#FF33A1'
    },
    {
      name: "React",
      icon: reactjs,
      color: '#A133FF'
    },
    {
      name: "NextJS",
      icon: nextjs,
      color: '#FF5733' 
    },
    {
      name: "NodeJS",
      icon: nodejs,
      color: '#33FFF1' 
    },
    {
      name: "MySQL",
      icon: mysql,
      color: '#F1FF33'
    },
    {
      name: "Django",
      icon: django,
      color: '#FF8F33' 
    },
    {
      name: "WordPress",
      icon: wordpress,
      color: '#33FF8F'
    },
    {
      name: "Figma",
      icon: figma,
      color: '#8F33FF' 
    },
    {
      name: "Git",
      icon: git,
      color: '#FF3333' 
    },
    {
      name: "Bootstrap",
      icon: bootstrap,
      color: '#33FF33' 
    },
  ];
  

  
  
  
  const experiences = [
    {
      title: "Freelance Web Developer",
      company_name: "Fiverr",
      company_url: "https://www.fiverr.com/",
      icon: fiverr,
      iconBg: "#383E56",
      date: "2022 - Present",
      points: [
        "Providing custom web scraping solutions using Python.",
        "Successfully completed over 15 projects with 5-star ratings.",
        "Developing websites using Django, WordPress, HTML, CSS, and JavaScript.",
        "Delivering high-quality results based on client requirements.",
      ],
    },
    {
      title: "Full Stack Developer",
      company_name: "Teleteg",
      company_url:"https://teleteg.com/",
      icon: teleteg, 
      iconBg: "#F1F1F1", 
      date: "2023 - 2024",
      points: [
        "Developed and enhanced Telegram Django/Python based search engine functionalities.",
        "Implemented payment methods and integrated secure payment gateways.",
        "Designed and managed a referral program to boost user engagement.",
        "Worked on UI/UX design to improve user experience and interface.",
      ],
    },
    {
      title: "Web Scraping Developer",
      company_name: "Univers Vacances",
      company_url: "https://www.univers-vacances.fr/",
      icon: universVacancesIcon,
      iconBg: "#383E56", 
      date: "2023 - Present",
      points: [
        "Developed and maintained web scraping scripts to retrieve hotel data from various sites including Booking.com.",
        "Implemented data extraction techniques to collect and process hotel information efficiently.",
        "Created and optimized scripts for automated data collection and integration into databases.",
        "Ensured data accuracy and reliability for client reporting and analysis.",
      ],
    },
    {
      title: "Software Engineering",
      company_name: "Politehnicki fakultet Zenica",
      icon: politehnicki,
      company_url: "https://ptf.unze.ba/en/",
      iconBg: "#F1F1F1",
      date: "2023 - Present",
      points: [
        "Studying and applying advanced web development techniques.",
        "Participating in university projects focused on technology and innovation.",
      ],
    },
  ];
  
  
  const testimonials = [
    {
      testimonial:
        "We needed help with an urgent task. After Ahmed applied, we explained him the requirements. He as able to show us the Proof of Concepts in early stages that boosted our confidence. He was able to deliver as per our expectations and helped us achieve our goals in time. His communication was clear and good. His technical expertise is fantastic. He is responsive, responsible and hard-working. Our team is highly satisfied by his deliverables and would highly recommend him. ",
      name: "fiverrg",
      company: "Fiverr",
    },
    {
      testimonial:
        "Ahmed put a lot of effort in this job and although the job was not successfully completed on the first try, Ahmed was very kind throughout the process and took his time to revise so that we ended up with a result that I am satisfied with.",
      name: "johanneslange",
      company: "Fiverr",
    },
    {
      testimonial:
        "I recently worked with Ahmedjasarevic on a project, and I am thrilled with the results. Ahmed showcased a remarkable level of professionalism, expertise, and attention to detail. They delivered exceptional work within the agreed-upon timeframe and maintained excellent communication throughout. I highly recommend ahmedjasarevic for any project and look forward to working with them again in the future",
      name: "pcnprotocol",
      company: "Fiverr",
    },
  ];
  
  const projects = [
    {
      "name": "Kacun",
      "description": "Website dedicated to the association of beekeepers and honey producers in Bosnia and Herzegovina. It provides information about beekeeping practices, honey varieties, and promotes local honey products.",
      "tags": [
        {
          "name": "wordpress",
          "color": "blue-text-gradient"
        },
        {
          "name": "elementor",
          "color": "green-text-gradient"
        },
        {
          "name": "seo",
          "color": "pink-text-gradient"
        }
      ],
      image: kacunba,
      website_link: "https://kacun.ba/",
    }, 
    {
      name: "A Movie Database",
      description:
        "A web application that allows users to browse and search for movies, view movie details and ratings, and leave reviews.",
      tags: [
        {
          name: "django",
          color: "blue-text-gradient",
        },
        {
          name: "python",
          color: "green-text-gradient",
        },
        {
          name: "bootstrap",
          color: "pink-text-gradient",
        },
      ],
      image: amoviedatabase,
      source_code_link: "https://github.com/ahmedjasarevic/a-movie-database",
    },
    {
      name: "NutriLog",
      description:
        "NutriLog is a web application that helps users find the calorie content and nutritional values of various foods",
      tags: [
        {
          name: "django",
          color: "blue-text-gradient",
        },
        {
          name: "chart.js",
          color: "green-text-gradient",
        },
        {
          name: "api-ninjas",
          color: "pink-text-gradient",
        },
      ],
      image: nutrilog,
      source_code_link: "https://github.com/ahmedjasarevic/NutriLog",
    }
  ];
  
  export { services, technologies, experiences, testimonials, projects };