import express from 'express';
import path from "path";
import {fileURLToPath } from "url";

const router = express.Router();

router.get('/', function (req, res, next) {
	res.sendFile(path.join(fileURLToPath(path.dirname(import.meta.url)), '../public'))
});

export default router;
