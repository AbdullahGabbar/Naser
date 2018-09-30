module.exports = function init(site) {


  const $safes_payments = site.connectCollection("safes_payments")
  

  site.on('[amount in] please add money to safe payments', function (info) {

    $safes_payments.add({
      sourceName : info.source,
      safe : info.safe,
      value : info.value,
      date : info.date,
      source : 'Amount In'
    })
  })
  site.on('[amount in] please delete row from safe payments', function (info) {
   
    $safes_payments.delete({
      sourceName : info.source,
      safe : info.safe,
      value : info.value,
      date : info.date,
      source : 'Amount In'
    })
})

site.on('[amount out] please add money to safe payments' , function (info) {
  $safes_payments.add({
    sourceName : info.source,
    safe : info.safe,
    value : info.value,
    date : info.date,
    source : 'Amount Out'
  })

})

site.on('[amount out] please delete row from safe payments', function (info) {
   
  $safes_payments.delete({
    sourceName : info.source,
    safe : info.safe,
    value : info.value,
    date : info.date,
    source : 'Amount Out'
  })

  
})


site.on('[employee discount] please add money to safe payments', function (info) {

  $safes_payments.add({
    sourceName : info.eng,
    safe : info.safe,
    value : info.value,
    date : info.date,
    source : 'Employee Discount'
  })
})
site.on('[employee discount] please delete row from safe payments', function (info) {
 
  $safes_payments.delete({
    sourceName : info.eng,
    safe : info.safe,
    value : info.value,
    date : info.date,
    source : 'Employee Discount'
  })

})

site.on('[employee offer] please add money to safe payments', function (info) {

$safes_payments.add({
  sourceName : info.eng,
  safe : info.safe,
  value : info.value,
  date : info.date,
  source : 'Employee Offer'
})
})
site.on('[employee offer] please delete row from safe payments', function (info) {

$safes_payments.delete({
  sourceName : info.eng,
  safe : info.safe,
  value : info.value,
  date : info.date,
  source : 'Employee Offer'
})

})

  site.get({
    name: "safes_payments",
    path: __dirname + "/site_files/html/index.html",
    parser: "html",
    compress: false
  })


  site.post("/api/safes_payments/all", (req, res) => {
    let response = {}
    response.done = false
    
    let where = req.body.where || {}

    if (where.date) {
      let d1 = site.toDate(where.date)
      let d2 = site.toDate(where.date)
      d2.setDate(d2.getDate() + 1)
      where.date = {
        '$gte': d1,
        '$lt': d2
      }
    }
    
    if(where['source']) {
      where['source'] = new RegExp(where['source'] , 'i')
    }

    $safes_payments.findMany({
      select: req.body.select || {},
      where: req.body.where,
      sort : {id : -1}
    }, (err, docs) => {
      if (!err) {
        response.done = true
        response.list = docs
        
      } else {
        response.error = err.message
      }
      res.json(response)
    })
  })



 


 


}