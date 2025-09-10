import ChangeDataModel from "../Model/AllTypeModel.js";
import imagekit, { uploadImage } from "../Config/Imagekit.js";
import { apiResponse, errors } from "../Config/GlobalErrorHandler.js";
import { LogError } from "../Config/GlobalLogging.js";

const getOrCreateDoc = async () => {
  let doc = await ChangeDataModel.findOne();
  if (!doc) {
    doc = await ChangeDataModel.create({
      heroSection: [{}],        // <- default object for heroSection
      aboutUsSection: [{}],     // <- same for other sections
      serviceSection: [{}],
      projectSection: [{}],
      clientSection: [{}],
      contactSec: [{}]
    });
  } else {
    // Ensure arrays have at least one object to hold defaults
    if (!doc.heroSection || doc.heroSection.length === 0) doc.heroSection = [{}];
    if (!doc.aboutUsSection || doc.aboutUsSection.length === 0) doc.aboutUsSection = [{}];
    if (!doc.serviceSection || doc.serviceSection.length === 0) doc.serviceSection = [{}];
    if (!doc.projectSection || doc.projectSection.length === 0) doc.projectSection = [{}];
    if (!doc.clientSection || doc.clientSection.length === 0) doc.clientSection = [{}];
    if (!doc.contactSec || doc.contactSec.length === 0) doc.contactSec = [{}];
    await doc.save();
  }
  return doc;
};

// -----------------Hero Section---------------------------
export const updateHeroSectionData = async (req, res) => {
  try {

    const { mainTitle, heroDescription, heroYear } = req.body;

    const doc = await getOrCreateDoc();

    if (!doc) {
      // this should never happen with getOrCreateDoc, but just in case:
      return errors.notFound("Failed to get or create ChangeData document");
    }

    if (!Array.isArray(doc.heroSection)) {
      return errors.badRequest("Invalid data structure: heroSection is missing");
    }


    const hero = doc.heroSection[0] || {};


    if (mainTitle !== undefined) hero.mainTitle = mainTitle;
    if (heroDescription !== undefined) hero.heroDescription = heroDescription;
    if (heroYear !== undefined) hero.heroYear = Number(heroYear);

    doc.heroSection[0] = hero;

    const saved = await doc.save();
    if (!saved) {
      return errors.conflict("Failed to save updated hero section");
    }
    return apiResponse(res, 200, "Data Updated Successfully", {
      mainTitle: hero.mainTitle,
      heroDescription: hero.heroDescription,
      heroYear: hero.heroYear
    });
  } catch (error) {
    LogError("Update Hero section Data", error.message);
    return errors.serverError(res, "Error updating profile");
  }
}

export const getHeroSectionData = async (req, res) => {
  try {
    const doc = await getOrCreateDoc();
    // console.log('herosection data in controller',doc.heroSection[0]);
    return apiResponse(res, 200, "Data fetched successfully", doc.heroSection[0]);
  } catch (error) {
    LogError("Get Hero section Data", error);
    return errors.serverError(res, error.message);
  }
};

// ----------------About Section--------------------------

export const updateAboutUsSectionData = async (req, res) => {
  try {
    // console.log('geeting data in controller', req.body);
    const {
      sectionTitle, sectionSubTitle, subtitleYear,
      sectionStoryTitle, storyParagraphFirst, storyParagraphSec,
      experienceYear, completedProject, professionalTeam, industryAward
    } = req.body;

    const doc = await getOrCreateDoc();
    if (!Array.isArray(doc.aboutUsSection)) return errors.badRequest(res, "aboutUsSection missing");

    const about = doc.aboutUsSection[0] || {};

    if (sectionTitle) about.sectionTitle = sectionTitle;
    if (sectionSubTitle) about.sectionSubTitle = sectionSubTitle;
    if (subtitleYear !== undefined) about.subtitleYear = Number(subtitleYear);
    if (sectionStoryTitle) about.sectionStoryTitle = sectionStoryTitle;
    if (storyParagraphFirst) about.storyParagraphFirst = storyParagraphFirst;
    if (storyParagraphSec) about.storyParagraphSec = storyParagraphSec;
    if (experienceYear !== undefined) about.experienceYear = Number(experienceYear);
    if (completedProject !== undefined) about.completedProject = Number(completedProject);
    if (professionalTeam !== undefined) about.professionalTeam = Number(professionalTeam);
    if (industryAward !== undefined) about.industryAward = Number(industryAward);

    doc.aboutUsSection[0] = about;
    const saved = await doc.save();
    if (!saved) return errors.conflict(res, "Failed to save aboutUsSection");
    // console.log('about data saved in controller', saved);
    return apiResponse(res, 200, "About Us Section updated successfully", about);
  } catch (error) {
    LogError("Update About Us Section", error);
    return errors.serverError(res, error.message);
  }
};

export const getAboutUsSectionData = async (req, res) => {
  try {
    const doc = await getOrCreateDoc();
    return apiResponse(res, 200, "About Us Section fetched successfully", doc.aboutUsSection[0]);
  } catch (error) {
    LogError("Get About Us Section", error);
    return errors.serverError(res, error.message);
  }
};

/* ------------------- SERVICE SECTION ------------------- */
export const updateServiceSectionData = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const doc = await getOrCreateDoc();
    if (!doc) return errors.notFound(res, "Document not found");

    if (!Array.isArray(doc.serviceSection) || !doc.serviceSection[0]?.services) {
      return errors.badRequest(res, "Service Section not found");
    }


    const serviceList = doc.serviceSection[0].services;
    const service = serviceList.find(s => s.id === parseInt(id));
    if (!service) return errors.notFound(res, `Service with id ${id} not found`);

    if (updateData.firstImage && typeof updateData.firstImage === "string") {
      updateData.firstImage = { imageId: "", url: updateData.firstImage };
    }

    Object.assign(service, updateData);

    const saved = await doc.save();
    if (!saved) return errors.conflict(res, "Failed to update service item");

    return apiResponse(res, 200, "Service Item Updated", service);
  } catch (error) {
    LogError("Update Service Section", error);
    return errors.serverError(res, error.message);
  }
};

export const getServiceSection = async (req, res) => {
  try {
    const doc = await getOrCreateDoc();
    return apiResponse(res, 200, "Service Section fetched", doc.serviceSection[0]);
  } catch (error) {
    LogError("Get Service Section", error);
    return errors.serverError(res, "Error fetching Service Section");
  }
};

/* ------------------- PROJECT SECTION ------------------- */

export const updateProjectSectionItem = async (req, res) => {
  try {
    const { sectionId } = req.params;  // e.g., "secDataFirst"
    const updateData = req.body;

    const doc = await getOrCreateDoc();
    if (!doc) return errors.notFound(res, "Document not found");

    const project = doc.projectSection[0];
    if (!project) return errors.notFound(res, "Project section missing");

    // Check if section exists
    if (project[sectionId] === undefined) {
      return errors.notFound(res, `Project section '${sectionId}' not found`);
    }

    // Merge update data into the section
    Object.assign(project[sectionId], updateData);

    doc.markModified(`projectSection.0.${sectionId}`);

    const saved = await doc.save();
    if (!saved) return errors.conflict(res, "Failed to update project section");

    return apiResponse(res, 200, "Project Section Updated", project[sectionId]);

  } catch (error) {
    LogError("Update Project Section", error);
    return errors.serverError(res, error.message);
  }
};

// export const updateProjectImage = async (req, res) => {
//   try {
//     console.log("Request params:", req.params);
//     console.log("Uploaded file:", req.file);

//     const subsectionId = req.params.subsectionId; // e.g., 'secDataSixth'
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ message: "File required" });
//     }

//     // Get or create the main document
//     const doc = await getOrCreateDoc();
//     if (!doc) return res.status(404).json({ message: "Document not found" });

//     // Access projectSection[0] which contains all subsections
//     const projectSectionObj = doc.projectSection[0].toObject();
//     console.log("Project section object:", projectSectionObj);

//     // Find the subsection by matching id
//     let subsection;
//     let subsectionKey;
//     for (const key of Object.keys(projectSectionObj)) {
//       // Skip any non-subsection keys if needed
//       if (!projectSectionObj[key].id) continue;

//       console.log("Checking key:", key, "value.id:", projectSectionObj[key].id);

//       if (projectSectionObj[key].id === subsectionId) {
//         subsection = projectSectionObj[key];
//         subsectionKey = key;
//         break;
//       }
//     }

//     if (!subsection) {
//       console.log("Subsection not found for id:", subsectionId);
//       return res.status(404).json({ message: "Subsection not found" });
//     }

//     console.log("Found subsection:", subsectionKey, subsection);

//     // Delete previous image from ImageKit if exists
//     if (subsection.dataImage?.imageId) {
//       try {
//         await imagekit.deleteFile(subsection.dataImage.imageId);
//         console.log("Previous image deleted:", subsection.dataImage.imageId);
//       } catch (err) {
//         console.warn("Failed to delete previous image:", err.message);
//       }
//     }

//     // Upload new image to ImageKit
//     let imageData;
//     try {
//       imageData = await uploadImage(file.path, file.originalname);
//       console.log("Image uploaded:", imageData);
//     } catch (err) {
//       console.error("ImageKit upload error:", err);
//       return res.status(500).json({ message: "Image upload failed", error: err });
//     }

//     // Update subsection image
//     subsection.dataImage = {
//       imageId: imageData.fileId,
//       url: imageData.url
//     };

//     // Save the updated document
//     await doc.save();
//     console.log("Document saved after image update");

//     return res.status(200).json({
//       message: "Subsection image updated successfully",
//       data: subsection
//     });
//   } catch (error) {
//     console.error("Error updating project subsection image:", error);
//     return res.status(500).json({ message: "Server error", error });
//   }
// };
export const updateProjectImage = async (req, res) => {
  try {
    console.log("Request params:", req.params);
    console.log("Uploaded file:", req.file);

    const subsectionId = req.params.subsectionId; // e.g., 'secDataSixth'
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "File required" });
    }

    // Get or create the main document
    const doc = await getOrCreateDoc();
    if (!doc) return res.status(404).json({ message: "Document not found" });

    // Access projectSection[0] which contains all subsections
    const projectSectionObj = doc.projectSection[0];
    console.log("Project section object:", projectSectionObj);
    const subsection = projectSectionObj[subsectionId];
    // Find the subsection by matching id
    if (!subsection) {
      console.log("Subsection not found for id:", subsectionId);
      return res.status(404).json({ message: "Subsection not found" });
    }

    console.log("Found subsection:", subsection);

    // Delete previous image from ImageKit if exists
    if (subsection.dataImage?.imageId) {
      try {
        await imagekit.deleteFile(subsection.dataImage.imageId);
        console.log("Previous image deleted:", subsection.dataImage.imageId);
      } catch (err) {
        console.warn("Failed to delete previous image:", err.message);
      }
    }

    // Upload new image to ImageKit
    let imageData;
    try {
      imageData = await uploadImage(file.path, file.originalname);
      console.log("Image uploaded:", imageData);
    } catch (err) {
      console.error("ImageKit upload error:", err);
      return res.status(500).json({ message: "Image upload failed", error: err });
    }

    // Update subsection image
    subsection.dataImage = {
      imageId: imageData.fileId,
      url: imageData.url
    };

    // Save the updated document
    await doc.save();
    console.log("Document saved after image update");

    return res.status(200).json({
      message: "Subsection image updated successfully",
      data: subsection
    });
  } catch (error) {
    console.error("Error updating project subsection image:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getProjectSection = async (req, res) => {
  try {
    const doc = await getOrCreateDoc();
    return apiResponse(res, 200, "Project Section fetched", doc.projectSection[0]);
  } catch (error) {
    LogError("Get Project Section", error);
    return errors.serverError(res, "Error fetching Project Section");
  }
};

/* ------------------- CLIENT SECTION ------------------- */

export const updateClientSectionById = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const { updateData, file } = req.body;
    // sectionId = id of the clientData (e.g. "clientDataFirst")
    // updateData = object with fields to update (title, desc, etc.)
    // file = optional file object with base64 data for upload

    if (!sectionId) return errors.badRequest(res, "sectionId is required");

    const doc = await getOrCreateDoc();
    if (!doc) return errors.notFound(res, "Document not found");

    if (!Array.isArray(doc.clientSection) || doc.clientSection.length === 0) {
      return errors.badRequest(res, "clientSection missing");
    }

    const clientSection = doc.clientSection[0]; // we only have one main clientSection object

    // find the clientData field that matches sectionId
    const clientKeys = [
      "clientDataFirst",
      "clientDataSec",
      "clientDataThird",
      "clientDataFourth",
      "clientDataFifth"
    ];

    let foundKey = null;
    for (const key of clientKeys) {
      if (clientSection[key] && clientSection[key].id === sectionId) {
        foundKey = key;
        break;
      }
    }

    if (!foundKey) {
      return errors.notFound(res, `No client data found for id ${sectionId}`);
    }

    // Handle Image Upload
    if (file && file.url && file.fileId) {
      // if old fileId exists, delete it
      const oldFileId = clientSection[foundKey].firstLogo?.fileId;
      if (oldFileId) {
        try {
          await imagekit.deleteFile(oldFileId);
        } catch (e) {
          LogError("ImageKit Delete Old File", e.message);
        }
      }

      // upload new file
      const uploaded = await imagekit.upload({
        file: file.base64 || file, // base64 or file path
        fileName: `${sectionId}_${Date.now()}.png`,
      });

      clientSection[foundKey].firstLogo = {
        fileId: uploaded.fileId,
        url: uploaded.url
      };
    }

    // merge other updates (title, desc, etc.)
    Object.assign(clientSection[foundKey], updateData);

    doc.clientSection[0] = clientSection;

    const saved = await doc.save();
    if (!saved) return errors.conflict(res, "Failed to update client section");

    return apiResponse(res, 200, "Client Section Updated", clientSection[foundKey]);
  } catch (error) {
    LogError("Update Client Section By ID", error.message);
    return errors.serverError(res, "Error updating Client Section");
  }
};

export const updateClientImage = async (req, res) => {
  try {
    console.log("Request params:", req.params);
    console.log("Uploaded file:", req.file);

    const subsectionId = req.params.subsectionId; // e.g., 'secDataSixth'
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "File required" });
    }

    // Get or create the main document
    const doc = await getOrCreateDoc();
    if (!doc) return res.status(404).json({ message: "Document not found" });

    // Access projectSection[0] which contains all subsections
    const projectSectionObj = doc.clientSection[0];
    console.log("Project section object:", projectSectionObj);
    const subsection = projectSectionObj[subsectionId];
    // Find the subsection by matching id
    if (!subsection) {
      console.log("Subsection not found for id:", subsectionId);
      return res.status(404).json({ message: "Subsection not found" });
    }

    console.log("Found subsection:", subsection);

    // Delete previous image from ImageKit if exists
    if (subsection.dataImage?.imageId) {
      try {
        await imagekit.deleteFile(subsection.dataImage.imageId);
        console.log("Previous image deleted:", subsection.dataImage.imageId);
      } catch (err) {
        console.warn("Failed to delete previous image:", err.message);
      }
    }

    // Upload new image to ImageKit
    let imageData;
    try {
      imageData = await uploadImage(file.path, file.originalname);
      console.log("Image uploaded:", imageData);
    } catch (err) {
      console.error("ImageKit upload error:", err);
      return res.status(500).json({ message: "Image upload failed", error: err });
    }

    // Update subsection image
    subsection.dataImage = {
      imageId: imageData.fileId,
      url: imageData.url
    };

    // Save the updated document
    await doc.save();
    console.log("Document saved after image update");

    return res.status(200).json({
      message: "Subsection image updated successfully",
      data: subsection
    });
  } catch (error) {
    console.error("Error updating project subsection image:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getClientSection = async (req, res) => {
  try {
    const doc = await getOrCreateDoc();
    return apiResponse(res, 200, "Client Section fetched", doc.clientSection[0]);
  } catch (error) {
    LogError("Get Client Section", error.message);
    return errors.serverError(res, "Error fetching Client Section");
  }
};


/* ------------------- CONTACT SECTION ------------------- */
export const updateContactSection = async (req, res) => {
  try {
    const updateData = req.body;

    // Get main document or create default if none exists
    const doc = await getOrCreateDoc();
    if (!doc) return errors.notFound(res, "Document not found");

    // Check if contactSec exists & is an array
    if (!Array.isArray(doc.contactSec)) {
      return errors.badRequest(res, "contactSec missing");
    }

    // Get the first contact section object safely
    const contact = doc.contactSec[0] || {};

    // Merge the incoming update data into existing contact section
    Object.assign(contact, updateData);

    // Save updated section back to the document
    doc.contactSec[0] = contact;
    const saved = await doc.save();
    if (!saved) return errors.conflict(res, "Failed to update Contact Section");

    return apiResponse(res, 200, "Contact Section Updated", contact);
  } catch (error) {
    LogError("Update Contact Section", error);
    return errors.serverError(res, "Error updating Contact Section");
  }
};

export const getContactSection = async (req, res) => {
  try {
    const doc = await getOrCreateDoc();
    if (!doc) return errors.notFound(res, "Document not found");

    return apiResponse(res, 200, "Contact Section fetched", doc.contactSec[0]);
  } catch (error) {
    LogError("Get Contact Section", error);
    return errors.serverError(res, "Error fetching Contact Section");
  }
};