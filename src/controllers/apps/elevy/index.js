const axios = require("axios");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const asynHandler = require("../../../middleware/async");
const page = "Home";

exports.oLDRenderElevy = asynHandler(async (req, res) => {
  console.log(req.ip);
  var dateNow= new Date();  
  var firstDate = new Date().toISOString().slice(0, 10)
  var lastDate = new Date().toISOString().slice(0, 10)

  //new Date(dateNow.getFullYear(), dateNow.getMonth(), 1).toJSON().slice(0,10);   //begining of the month
  // var lastDate = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0).toJSON().slice(0,10);   ///LAST Date of the month


  let StartDate = req.body.StartDate || firstDate;
  console.log(firstDate,lastDate);
  let EndDate = req.body.EndDate || lastDate;

  try {
    let { data } = await axios.post("https://elevyapi.calbankgh.com/ELevyAPI/Report/GetConfirmations", {
      StartDate,
      EndDate,
    });

   
    const TransferAmount = data.Data
  .map(item => item.TransferAmount)
  .reduce((prev, curr) => prev + curr, 0);
  console.log(TransferAmount);

  const TaxableAmount = data.Data
  .map(item => item.TaxableAmount)
  .reduce((prev, curr) => prev + curr, 0);
  console.log(TaxableAmount);

  const ElevyAmount = data.Data
  .map(item => item.ElevyAmount)
  .reduce((prev, curr) => prev + curr, 0);
  console.log(ElevyAmount);
   
    
    res.render("apps/elevy/home/", {
      pageData: page,
      pageIndex: "Elevy",
      count:data.Data.length,
      firstDate :StartDate,
      lastDate :EndDate,
      home: true,
      user: req.session,
      data: data.Data,
      TransferAmount,
      TaxableAmount,
      layout: "elevy.hbs",
      ElevyAmount
    });
  } catch (error) {
    req.flash("error_msg", "Invalid Data");
    return res.redirect("/");
  }

  const calculateSum = (obj, field) => obj
  .map(items => items.attributes[field])
  .reduce((prev, curr) => prev + curr, 0);
});
exports.RenderElevy = asynHandler(async (req, res) => {
  console.log(req.ip);
  var dateNow= new Date();  
  var firstDate = new Date().toISOString().slice(0, 10)
  var lastDate = new Date().toISOString().slice(0, 10)

  //new Date(dateNow.getFullYear(), dateNow.getMonth(), 1).toJSON().slice(0,10);   //begining of the month
  // var lastDate = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0).toJSON().slice(0,10);   ///LAST Date of the month


  let StartDate = req.body.StartDate || firstDate;
  console.log(firstDate,lastDate);
  let EndDate = req.body.EndDate || lastDate;

  try {
    let { data } = await axios.post("https://elevyapi.calbankgh.com/ELevyAPI/Report/AllConfirm", {
      StartDate,
      EndDate,
    });

   
    const TransferAmount = data.Data
  .map(item => item.TransferAmount)
  .reduce((prev, curr) => prev + curr, 0);
  console.log(TransferAmount);

  const TaxableAmount = data.Data
  .map(item => item.TaxableAmount)
  .reduce((prev, curr) => prev + curr, 0);
  console.log(TaxableAmount);

  const ElevyAmount = data.Data
  .map(item => item.ElevyAmount)
  .reduce((prev, curr) => prev + curr, 0);
  console.log(ElevyAmount);
   
    
    res.render("apps/elevy/home/", {
      pageData: page,
      pageIndex: "Elevy",
      count:data.Data.length,
      firstDate :StartDate,
      lastDate :EndDate,
      home: true,
      user: req.session,
      data: data.Data,
      TransferAmount,
      TaxableAmount,
      layout: "elevy.hbs",
      ElevyAmount
    });
  } catch (error) {
    req.flash("error_msg", "Invalid Data");
    return res.redirect("/");
  }

  const calculateSum = (obj, field) => obj
  .map(items => items.attributes[field])
  .reduce((prev, curr) => prev + curr, 0);
});

exports.AllElevy = asynHandler(async (req, res) => {
  console.log(req.ip);
  var dateNow= new Date();  
  var firstDate = new Date().toISOString().slice(0, 10)
  var lastDate = new Date().toISOString().slice(0, 10)

  //new Date(dateNow.getFullYear(), dateNow.getMonth(), 1).toJSON().slice(0,10);   //begining of the month
  // var lastDate = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0).toJSON().slice(0,10);   ///LAST Date of the month


  let StartDate = req.body.StartDate || firstDate;
  console.log(firstDate,lastDate);
  let EndDate = req.body.EndDate || lastDate;

  try {
    let { data } = await axios.post("https://elevyapi.calbankgh.com/ELevyAPI/Report/AllRecord", {
      StartDate,
      EndDate,
    });


    console.log(data.Data);
    const TransferAmount = data.Data
  .map(item => item.TransferAmount)
  .reduce((prev, curr) => prev + curr, 0);
  console.log(TransferAmount);

  const TaxableAmount = data.Data
  .map(item => item.TaxableAmount)
  .reduce((prev, curr) => prev + curr, 0);
  console.log(TaxableAmount);

  const ElevyAmount = data.Data
  .map(item => item.ElevyAmount)
  .reduce((prev, curr) => prev + curr, 0);
  console.log(ElevyAmount);
   
    
    res.render("apps/elevy/home/all.hbs", {
      pageData: page,
      pageIndex: "Elevy",
      count:data.Data.length,
      firstDate :StartDate,
      lastDate :EndDate,
      home: true,
      user: req.session,
      data: data.Data,
      TransferAmount,
      TaxableAmount,
      layout: "elevy.hbs",
      ElevyAmount
    });
  } catch (error) {
    req.flash("error_msg", "Invalid Data");
    return res.redirect("/");
  }

  const calculateSum = (obj, field) => obj
  .map(items => items.attributes[field])
  .reduce((prev, curr) => prev + curr, 0);
});

exports.ReconElevy = asynHandler(async (req, res) => {

  var firstDate = new Date().toISOString().slice(0, 10)
  var lastDate = new Date().toISOString().slice(0, 10)

  //new Date(dateNow.getFullYear(), dateNow.getMonth(), 1).toJSON().slice(0,10);   //begining of the month
  // var lastDate = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0).toJSON().slice(0,10);   ///LAST Date of the month


  let StartDate = req.body.StartDate || firstDate;
  console.log(firstDate,lastDate);
  let EndDate = req.body.EndDate || lastDate;

  try {
    let { data } = await axios.post("https://elevyapi.calbankgh.com/ELevyAPI/Report/AllConfirm", {
      StartDate,
      EndDate,
    });

   
    const TransferAmount = data.Data
  .map(item => item.TransferAmount)
  .reduce((prev, curr) => prev + curr, 0);
  console.log(TransferAmount);

  const TaxableAmount = data.Data
  .map(item => item.TaxableAmount)
  .reduce((prev, curr) => prev + curr, 0);
  console.log(TaxableAmount);

  const ElevyAmount = data.Data
  .map(item => item.ElevyAmount)
  .reduce((prev, curr) => prev + curr, 0);
  console.log(ElevyAmount);
   
    
    res.render("apps/elevy/home/recon.hbs", {
      pageData: page,
      pageIndex: "Elevy",
      count:data.Data.length,
      firstDate :StartDate,
      lastDate :EndDate,
      home: true,
      user: req.session,
      data: data.Data,
      TransferAmount,
      TaxableAmount,
      layout: "elevy.hbs",
      ElevyAmount
    });
  } catch (error) {
    req.flash("error_msg", "Invalid Data");
    return res.redirect("/");
  }

  const calculateSum = (obj, field) => obj
  .map(items => items.attributes[field])
  .reduce((prev, curr) => prev + curr, 0);
});