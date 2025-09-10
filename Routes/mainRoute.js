import express from 'express';
import multer from "multer";
import { getAboutUsSectionData, getClientSection, getContactSection, getHeroSectionData, getProjectSection, getServiceSection, updateAboutUsSectionData, updateClientImage, updateClientSectionById, updateContactSection, updateHeroSectionData, updateProjectImage, updateProjectSectionItem, updateServiceSectionData } from '../Controller/Updateontroller.js';

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.put('/update-hero-section', updateHeroSectionData);
router.get('/get-hero-section-data', getHeroSectionData);

router.put('/update-about-section', updateAboutUsSectionData);
router.get('/get-about-section-data', getAboutUsSectionData);

router.put('/update-service-section/:id', updateServiceSectionData);
router.get('/get-service-section-data', getServiceSection);

router.put('/update-project-section/:sectionId', updateProjectSectionItem);
router.post('/update-project-section-image/:subsectionId',upload.single("file"), updateProjectImage);
router.get('/get-project-section-data', getProjectSection);

router.put('/update-client-section/:sectionId', updateClientSectionById);
router.post('/update-client-section-image/:subsectionId',upload.single("file"), updateClientImage);
router.get('/get-client-section-data', getClientSection);

router.put('/update-contact-section', updateContactSection);
router.get('/get-contact-section-data', getContactSection);

export default router;