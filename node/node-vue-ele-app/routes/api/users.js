// @login & register
const express = require('express')
const router = express.Router();

// $route GET api/users/test
// @desc 返回的請求的json數據
// @access public
router.get("/test", (req, res) => {
    res.json({msg: "login works"});
})

module.exports = router;