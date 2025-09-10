import mongoose from "mongoose";

const ChangeTextModelSchema = new mongoose.Schema({
  heroSection: [
    {
      mainTitle: {
        type: String,
        default: "Building Tomorrow's Infrastructure Today"
      },
      heroDescription: {
        type: String,
        default: "Bhwaani Construction delivers quality, safety, and excellence across all projects."
      },
      heroYear: { type: Number, default: 1998 }
    }
  ],
  aboutUsSection: [
    {
      sectionTitle: { type: String, default: "About Us" },
      sectionSubTitle: {
        type: String,
        default: "Committed to excellence in construction"
      },
      subtitleYear: { type: Number, default: 1998 },
      sectionStoryTitle: { type: String, default: "Our Story" },
      storyParagraphFirst: {
        type: String,
        default: "Bhwaani Construction has been serving the nation with top-class infrastructure solutions."
      },
      storyParagraphSec: {
        type: String,
        default: "With decades of experience, we specialize in innovative, sustainable, and reliable construction projects."
      },
      experienceYear: { type: Number, default: 25 },
      completedProject: { type: Number, default: 500 },
      professionalTeam: { type: Number, default: 200 },
      industryAward: { type: Number, default: 15 }
    }
  ],
  serviceSection: {
    type: [
      new mongoose.Schema(
        {
          sectionTitle: {
            type: String,
            default: "Our Services"
          },
          sectionSubtitle: {
            type: String,
            default: "We offer a wide range of construction solutions"
          },
          services: {
            type: [
              new mongoose.Schema(
                {
                  id: { type: Number, default: 1 },
                  title: { type: String, default: "Industrial & Commercial Con." },
                  description: {
                    type: String,
                    default:
                      "Hands-on experience with Mivan board, Nova board, and RMD board formwork systems."
                  },
                  icon: { type: String, default: "Factory" }
                },
                { _id: false }
              )
            ],
            default: undefined // not strictly needed, Mongoose will use parent default
          }
        },
        { _id: false }
      )
    ],
    default: [
      {
        sectionTitle: "Our Services",
        sectionSubtitle: "We offer a wide range of construction solutions",
        services: [
          {
            id: 1,
            title: "Industrial & Commercial Con.",
            description:
              "Hands-on experience with Mivan board, Nova board, and RMD board formwork systems.",
            icon: "Factory"
          },
          {
            id: 2,
            title: "Modern Office Building",
            description:
              "Corporate headquarters with distinctive architectural cladding and advanced civil engineering.",
            icon: "Building"
          },
          {
            id: 3,
            title: "Fireproofing",
            description:
              "Comprehensive fireproofing solutions to protect structures and ensure compliance with safety standards.",
            icon: "Flame"
          },
          {
            id: 4,
            title: "Complete Solution",
            description:
              "Capable of delivering turnkey solutions from structure to final finishing, ensuring quality and timely completion.",
            icon: "House"
          },
          {
            id: 5,
            title: "Civil Works",
            description:
              "Complete civil engineering and construction services for foundations, infrastructure, and more.",
            icon: "Shovel"
          },
          {
            id: 6,
            title: "Finishing Works",
            description:
              "Lead an expert finishing team specialized in plastering, putty filling, and interior finishing works.",
            icon: "Sun"
          }
        ]
      }
    ]
  },

  projectSection: [
    {
      secTtileFirst: { type: String, default: "Featured" },
      secTitleSec: { type: String, default: "Projects" },
      secSubHeding: { type: String, default: "Discover our portfolio of successful construction projects." },
      secDataFirst: {
        id: { type: String, default: "secDataFirst" },
        title: { type: String, default: "Industrial & Commercial Construction" },
        category: { type: String, default: "Construction" },
        desc: { type: String, default: "Working from foundation with Joe-Group at 30+ floor building." },
        firstImage: {
          imageId: { type: String, default: "" },
          url: { type: String, default: "https://ik.imagekit.io/p66ljstle/BHCFamily/image1.jpg?updatedAt=1756549437991" }
        }
      },
      secDataSecond: {
        id: { type: String, default: "secDataSecond" },
        title: { type: String, default: "Modern Office Building" },
        category: { type: String, default: "Civil Works & Cladding" },
        desc: { type: String, default: "Corporate headquarters with distinctive architectural cladding and advanced civil engineering." },
        dataImage: {
          imageId: { type: String, default: "" },
          url: { type: String, default: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=800&q=80" }
        }
      },
      secDataThird: {
        id: { type: String, default: "secDataThird" },
        title: { type: String, default: "Complete Turnkey Solution" },
        category: { type: String, default: "Turnkey Projects" },
        desc: { type: String, default: "Capable of delivering turnkey solutions from structure to final finishing, ensuring quality and timely completion." },
        dataImage: {
          imageId: { type: String, default: "" },
          url: { type: String, default: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80" }
        }
      },
      secDataForth: {
        id: { type: String, default: "secDataForth" },
        title: { type: String, default: "Industrial Fireproofing" },
        category: { type: String, default: "Fireproofing" },
        desc: { type: String, default: "Comprehensive fireproofing solutions to protect structures and ensure compliance with safety standards." },
        dataImage: {
          imageId: { type: String, default: "" },
          url: { type: String, default: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?auto=format&fit=crop&w=800&q=80" }
        }
      },
      secDataFifth: {
        id: { type: String, default: "secDataFifth" },
        title: { type: String, default: "Finishing Works" },
        category: { type: String, default: "Finishing" },
        desc: { type: String, default: "Lead an expert finishing team specialized in plastering, putty filling, and interior finishing works." },
        dataImage: {
          imageId: { type: String, default: "" },
          url: { type: String, default: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=800&q=80" }
        }
      },
      secDataSixth: {
        id: { type: String, default: "secDataSixth" },
        title: { type: String, default: "Civil Works Development" },
        category: { type: String, default: "Civil Works" },
        desc: { type: String, default: "Complete civil engineering and construction services for foundations, infrastructure, and more." },
        dataImage: {
          imageId: { type: String, default: "" },
          url: { type: String, default: "https://images.unsplash.com/photo-1527596428173-1aa3d1bdaa3f?auto=format&fit=crop&w=800&q=80" }
        }
      }
    }
  ],
  clientSection: [
    {
      secTtileFirst: { type: String, default: "Our" },
      secTtileSecond: { type: String, default: "Clients" },
      subHeadings: { type: String, default: "Companies who trust our expertise and services" },
      clientDataFirst: {
        id: { type: String, default: "clientDataFirst" },
        title: { type: String, default: "Kean Corporation" },
        desc: { type: String, default: "BHAWANI CON. delivered our factory expansion project on time and within budget. Their attention to detail was impressive." },
        firstLogo: {
          fileId: { type: String, default: "" },
          url: { type: String, default: "https://ik.imagekit.io/p66ljstle/Construction%20Assets/KEAN-removebg-preview.png?updatedAt=1746793773995" }
        }
      },
      clientDataSec: {
        id: { type: String, default: "clientDataSec" },
        title: { type: String, default: "Shine Industries" },
        desc: { type: String, default: "We have worked with BHAWANI CON. on multiple projects. Their team consistently delivers quality work and innovative solutions." },
        firstLogo: {
          fileId: { type: String, default: "" },
          url: { type: String, default: "https://ik.imagekit.io/p66ljstle/Construction%20Assets/SHINE-removebg-preview.png?updatedAt=1746793772876" }
        }
      },
      clientDataThird: {
        id: { type: String, default: "clientDataThird" },
        title: { type: String, default: "Global Energy Ltd" },
        desc: { type: String, default: "The solar installation by BHAWANI CON. has significantly reduced our energy costs. Professional service from start to finish." },
        firstLogo: {
          fileId: { type: String, default: "" },
          url: { type: String, default: "https://ik.imagekit.io/p66ljstle/Construction%20Assets/GLOBAL-removebg-preview.png?updatedAt=1746793774405" }
        }
      },
      clientDataFourth: {
        id: { type: String, default: "clientDataFourth" },
        title: { type: String, default: "Metro Developments" },
        desc: { type: String, default: "BHAWANI CONs. civil works team provided exceptional service for our commercial development. Highly recommended." },
        firstLogo: {
          fileId: { type: String, default: "" },
          url: { type: String, default: "https://ik.imagekit.io/p66ljstle/Construction%20Assets/metro-removebg-preview.png?updatedAt=1746793772758" }
        }
      },
      clientDataFifth: {
        id: { type: String, default: "clientDataFifth" },
        title: { type: String, default: "InnoTech Systems" },
        desc: { type: String, default: "The fireproofing solution installed by BHAWANI CON. gives us peace of mind about our facility,s safety." },
        firstLogo: {
          fileId: { type: String, default: "" },
          url: { type: String, default: "https://ik.imagekit.io/p66ljstle/Construction%20Assets/inno-removebg-preview.png?updatedAt=1746793772843" }
        }
      }
    }
  ],
  contactSec: [
    {
      secTitleFirst: { type: String, default: "Get in" },
      secTtileSecond: { type: String, default: "Touch" },
      secSubHeading: { type: String, default: "Contact us for a free consultation about your project" },
      rightSideTitle: { type: String, default: "Contact Information" },
      rightSidePara: { type: String, default: "Feel free to reach out to us with any questions or inquiries about our construction services. Our team is available to provide you with the information you need." },
      phoneNoFirst: {
        firstNumberCountryCode: { type: String, default: "+91" },
        firstNumber: { type: String, default: "6200991725" }
      },
      phoneNoSec: {
        firstNumberCountryCode: { type: String, default: "+91" },
        firstNumber: { type: String, default: "9905019785" }
      },
      email: { type: String, default: "support@bhawaniconstruction.in" },
      officeTtile: { type: String, default: "Head Office Address" },
      headAddFirst: { type: String, default: "Mansurchak, Main Road,Begusarai" },
      headAddSec: { type: String, default: "Bihar India, 851128" },
      brachTitle: { type: String, default: "Branch Office Address" },
      brAddFirst: { type: String, default: "Near Hare Krishna Land" },
      brSecAdd: { type: String, default: "Juhu Mumbai 400049" },
      workinghrTitle: { type: String, default: "Working Hours" },
      fromWeekName: { type: String, default: "Monday" },
      toWeekName: { type: String, default: "Friday" },
      fromHour: { type: String, default: "8:00 AM" },
      toHour: { type: String, default: "6:00 PM" },
      weekendFirst: { type: String, default: "Saturday" },
      weekendFirstTimeFrom: { type: String, default: "9:00 AM" },
      weekendFirstTimeTo: { type: String, default: "3:00 PM" },
      weekendSecond: { type: String, default: "Closed" },
      weekendSecFromHour: { type: String, default: "00:00 AM" },
      weekendSecToHour: { type: String, default: "00:00 PM" }
    }
  ]

});
const ChangeDataModel = mongoose.model('ChangeDataModel', ChangeTextModelSchema);
export default ChangeDataModel;