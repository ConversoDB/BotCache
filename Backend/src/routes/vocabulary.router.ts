import express from "express";
import {
    editVocabulary ,
    getVocabulary ,
    postVocabulary ,
    deleteVocabulary
} from "../Controllers/vocabulary.controller";

const router = express.Router();

router.post("/", postVocabulary)
router.patch("/:id", editVocabulary)
router.delete("/:id", deleteVocabulary)
router.get("/:email", getVocabulary)

export default router