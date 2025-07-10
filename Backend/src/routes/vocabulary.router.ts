import express from "express";
import {postVocabulary} from "../Controllers/vocabulary.controller";

const router = express.Router();

router.post("/", postVocabulary)

export default router