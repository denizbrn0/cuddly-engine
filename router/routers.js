const express = require("express");
const router = express.Router();
var conn = require("../baglanti.js");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/Images"));
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/countdown", (req, res) => {
  if (req.query.url) {
    var query = `SELECT * FROM url WHERE url_id="${req.query.url}"`;
    conn.query(query, (err, result) => {
      if (err) throw err;
      var session_id = result[0].session_id;
      var query = `SELECT * FROM genel WHERE session_id="${session_id}"`;
      conn.query(query, (err, result) => {
        if (err) throw err;
        if (result[0].isTarih) {
          res.render("countdown", {
            layout: false,
            tarih: result[0].tarih,
            saat: result[0].saat,
            url_id: req.query.url,
          });
        } else {
          res.redirect("/?url=" + req.query.url);
        }
      });
    });
  } else {
    res.render("404", { layout: false });
  }
});

router.post("/countdown", (req, res) => {
  if (req.body.isTime == 0) {
    var query = `SELECT * FROM url WHERE url_id="${req.body.url_id}"`;
    conn.query(query, (err, result) => {
      if (err) throw err;
      var session_id = result[0].session_id;
      var query = `UPDATE genel SET isTarih=0 WHERE session_id="${session_id}"`;
      conn.query(query, (err, result) => {
        if (err) throw err;
        res.redirect("/?url=" + req.body.url_id);
      });
    });
  }
});

router.get("/ayarlar", (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    res.redirect("/login");
  }

  res.render("main");
});

router.get("/galeri-ayarlari", (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    res.redirect("/login");
  }
  var query = `SELECT * FROM galeri WHERE session_id="${req.oidc.user.sub}"`;
  conn.query(query, (err, result) => {
    if (err) throw err;

    var resimler = result[0].resimler.split(",");
    var basliklar = result[0].basliklar.split(",");

    res.render("galeri-ayarlari", { resimler: resimler, basliklar: basliklar });
  });
});

router.post("/galeri-ayarlari", upload.single("resim"), (req, res) => {
  var query = `SELECT * FROM galeri WHERE session_id="${req.oidc.user.sub}"`;
  conn.query(query, (err, result) => {
    if (err) throw err;
    var resimler = result[0].resimler.split(",");
    var basliklar = result[0].basliklar.split(",");

    basliklar[req.body.index] = req.body.baslik;
    if (req.file) {
      if (resimler[req.body.index].split("/")[1] == "Images") {
        fs.unlink(
          path.join(__dirname, `../public/${resimler[req.body.index]}`),
          (err) => {
            if (err) throw err;
            console.log("path/file.txt was deleted");
          }
        );
      }

      resimler[req.body.index] = "/Images/" + req.file.filename;
    }

    var query = `UPDATE galeri SET resimler="${resimler.toString()}",basliklar="${basliklar.toString()}" WHERE session_id="${
      req.oidc.user.sub
    }"`;

    conn.query(query, (err, result) => {
      if (err) throw err;
      res.redirect("/galeri-ayarlari");
    });
  });
});

router.get("/mektup-ayarlari", (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    res.redirect("/login");
  }

  var query = `SELECT * FROM mektup WHERE session_id="${req.oidc.user.sub}"`;
  conn.query(query, (err, result) => {
    if (err) throw err;

    var yazi = result[0].yazi;
    var yazar = result[0].yazar;

    res.render("mektup-ayarlari", { yazi: yazi, yazar: yazar });
  });
});

router.post("/mektup-ayarlari", (req, res) => {
  var yazi = req.body.yazi;
  var yazar = req.body.yazar;

  query = `UPDATE mektup SET yazi="${yazi}",yazar="${yazar}" WHERE session_id="${req.oidc.user.sub}"`;

  conn.query(query, (err, req, result) => {
    if (err) throw err;

    console.log("updated");
  });

  res.redirect("/mektup-ayarlari");
});

router.get("/mektup", (req, res) => {
  if (req.query.url) {
    var query = `SELECT session_id FROM url WHERE url_id="${req.query.url}"`;
    conn.query(query, (err, result) => {
      var session_id = result[0].session_id;
      query = `SELECT * FROM genel WHERE session_id="${session_id}"`;
      conn.query(query, (err, result) => {
        if (err) throw err;
        if (result[0].isTarih) {
          res.redirect("/countdown?url=" + req.query.url);
        } else {
          if (result.length != 0) {
            query = `SELECT * FROM mektup WHERE session_id="${session_id}"`;
            conn.query(query, (err, result) => {
              if (result.length != 0) {
                var yazi = result[0].yazi;
                var yazar = result[0].yazar;
                res.render("mektup", {
                  layout: false,
                  yazi: yazi,
                  yazar: yazar,
                  url_id: req.query.url,
                });
              } else {
                res.redirect("/404");
              }
            });
          } else {
            res.redirect("/404");
          }
        }
      });
    });
  } else {
    res.redirect("/404");
  }
});

router.get("/", (req, res) => {
  if (req.query.url) {
    var query = `SELECT session_id FROM url WHERE url_id="${req.query.url}"`;
    conn.query(query, (err, result) => {
      var session_id = result[0].session_id;
      query = `SELECT * FROM genel WHERE session_id="${session_id}"`;
      conn.query(query, (err, result) => {
        if (err) throw err;
        if (result[0].isTarih) {
          res.redirect("/countdown?url=" + req.query.url);
        } else {
          if (result.length != 0) {
            query = `SELECT * FROM genel WHERE session_id="${session_id}"`;
            conn.query(query, (err, result) => {
              if (result.length != 0) {
                var galeriBaslik = result[0].galeriBaslik;
                var galeriAciklama = result[0].galeriAciklama;
                var yaziBaslik = result[0].yaziBaslik;
                var yaziAciklama = result[0].yaziAciklama;
                res.render("mainpage", {
                  layout: false,
                  galeriBaslik: galeriBaslik,
                  galeriAciklama: galeriAciklama,
                  yaziBaslik: yaziBaslik,
                  yaziAciklama: yaziAciklama,
                  url_id: req.query.url,
                });
              } else {
                res.redirect("/404");
              }
            });
          } else {
            res.redirect("/404");
          }
        }
      });
    });
  } else {
    res.redirect("/404");
  }
});

router.get("/galeri", (req, res) => {
  if (req.query.url) {
    var query = `SELECT session_id FROM url WHERE url_id="${req.query.url}"`;
    conn.query(query, (err, result) => {
      var session_id = result[0].session_id;
      query = `SELECT * FROM genel WHERE session_id="${session_id}"`;
      conn.query(query, (err, result) => {
        if (err) throw err;
        if (result[0].isTarih) {
          res.redirect("/countdown?url=" + req.query.url);
        } else {
          if (result.length != 0) {
            query = `SELECT * FROM galeri WHERE session_id="${session_id}"`;
            conn.query(query, (err, result) => {
              if (result.length != 0) {
                var resimler = result[0].resimler.split(",");
                var basliklar = result[0].basliklar.split(",");
                res.render("gallery", {
                  layout: false,
                  resimler: resimler,
                  basliklar: basliklar,
                  url_id: req.query.url,
                });
              } else {
                res.redirect("/404");
              }
            });
          } else {
            res.redirect("/404");
          }
        }
      });
    });
  } else {
    res.redirect("/404");
  }
});

router.get("/genel-ayarlar", (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    res.redirect("/login");
  }

  var query = `SELECT * FROM genel WHERE session_id="${req.oidc.user.sub}"`;
  conn.query(query, (err, result) => {
    if (err) throw err;

    var yaziBaslik = result[0].yaziBaslik;
    var galeriBaslik = result[0].galeriBaslik;
    var galeriAciklama = result[0].galeriAciklama;
    var yaziAciklama = result[0].yaziAciklama;
    var anaResim = result[0].anaResim;
    var tarih = result[0].tarih;
    var saat = result[0].saat;
    var isTarih = result[0].isTarih;

    res.render("genel", {
      yaziBaslik: yaziBaslik,
      galeriBaslik: galeriBaslik,
      yaziAciklama: yaziAciklama,
      galeriAciklama: galeriAciklama,
      anaResim: anaResim,
      isTarih: isTarih,
      tarih: tarih,
      saat: saat,
    });
  });
});

router.post("/genel-ayarlar", upload.single("anaResim"), (req, res) => {
  if (req.body.check) {
    var yaziBaslik = req.body.yaziBaslik;
    var galeriBaslik = req.body.galeriBaslik;
    var yaziAciklama = req.body.yaziAciklama;
    var galeriAciklama = req.body.galeriAciklama;

    query = `UPDATE genel SET yaziBaslik="${yaziBaslik}",galeriBaslik="${galeriBaslik}",galeriAciklama="${galeriAciklama}",yaziAciklama="${yaziAciklama}" WHERE session_id="${req.oidc.user.sub}"`;

    conn.query(query, (err, req, result) => {
      if (err) throw err;

      console.log("updated");
    });

    res.redirect("/genel-ayarlar");
  } else {
    var query = `SELECT * FROM genel WHERE session_id="${req.oidc.user.sub}"`;
    conn.query(query, (err, result) => {
      if (err) throw err;

      var anaResim = result[0].anaResim;
      fs.unlink(path.join(__dirname, `../Images/${anaResim}`), (err) => {
        if (err) throw err;
        console.log("path/file.txt was deleted");
      });
    });

    var anaResim = req.file.filename;
    query = `UPDATE genel SET anaResim="${anaResim}" WHERE session_id="${req.oidc.user.sub}"`;
    conn.query(query, (err, req, result) => {
      if (err) throw err;

      console.log("updated");
    });
    res.redirect("/genel-ayarlar");
  }
});

router.post("/genel-tarih", (req, res) => {
  var isTarih = 0;
  var tarih = req.body.tarih;
  var saat = req.body.saat;
  if (req.body.isTarih) {
    isTarih = 1;
  }
  console.log(isTarih);
  var query = `UPDATE genel SET tarih="${tarih}",isTarih="${isTarih}",saat="${saat}" WHERE session_id="${req.oidc.user.sub}"`;
  conn.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.redirect("/genel-ayarlar");
  });
});

router.get("/sayfa-bilgileri", (req, res) => {
  var query = `SELECT * FROM url WHERE session_id="${req.oidc.user.sub}"`;
  conn.query(query, (err, result) => {
    res.render("sayfa-bilgileri", {
      link: "http://localhost:8080?url=" + result[0].url_id,
    });
  });
});

router.get("*", (req, res) => {
  res.status(404).render("404", { layout: false });
});

module.exports = router;
