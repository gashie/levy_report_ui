const { Router } = require("express");
const { authenticate } = require("../../middleware/protect");

const {
  RenderElevy,
  AllElevy,
  ReconElevy
} = require("../../controllers/apps/elevy");

const {
  RenderLogin,
  UserLogin,
  UserLogout,
} = require("../../controllers/apps/login/");

const router = Router();

router.use(function (req, res, next) {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

router.get("/",authenticate, RenderElevy);
router.get("/allrecords",authenticate,AllElevy);
router.get("/recon",authenticate,ReconElevy);
router.post("/allrecords",authenticate,AllElevy);
router.post("/recon",authenticate,ReconElevy);
router.get("/login", RenderLogin);
router.post("/login", UserLogin);
router.get("/logout", UserLogout);
router.post("/",RenderElevy);

module.exports = router;
