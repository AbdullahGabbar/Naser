var isite = require("../isite")

const site = isite({
  port: 44444,
  name: "CRM",
  dir: __dirname + "/site_files",
  savingTime: 10,
  cache: {
    enabled: true
  },
  security: {
    db: "crm_naser_security"
  },
  session: {
    db: "crm_naser_sessions"
  },
  mongodb: {
    db: "crm_naser",
    limit : 50
  }
})

site.var("full-url", "http://127.0.0.1:44444")
site.require(__dirname + "/lib/routing")
site.require(__dirname + "/apps/static/app.js")
site.require(__dirname + "/apps/security/app.js")
site.require(__dirname + "/apps/notifications/app.js")

site.require(__dirname + "/apps/goves/app.js")
site.require(__dirname + "/apps/cities/app.js")
site.require(__dirname + "/apps/towns/app.js")
site.require(__dirname + "/apps/regions/app.js")
site.require(__dirname + "/apps/tickets/app.js")
site.require(__dirname + "/apps/tickets_slides/app.js")
site.require(__dirname + "/apps/customers/app.js")
site.require(__dirname + "/apps/companies/app.js")
site.require(__dirname + "/apps/companies_categories/app.js")
site.require(__dirname + "/apps/companies_devices/app.js")
site.require(__dirname + "/apps/devices_models/app.js")
site.require(__dirname + "/apps/categories/app.js")
site.require(__dirname + "/apps/sub_categories/app.js")
site.require(__dirname + "/apps/facilities_codes/app.js")
site.require(__dirname + "/apps/companies_employees/app.js")
site.require(__dirname + "/apps/damages/app.js")
site.require(__dirname + "/apps/jobs/app.js")
site.require(__dirname + "/apps/employees_degrees/app.js")
site.require(__dirname + "/apps/employees_insurances/app.js")
site.require(__dirname + "/apps/employees/app.js")
site.require(__dirname + "/apps/departments/app.js")
site.require(__dirname + "/apps/stores/app.js")
site.require(__dirname + "/apps/unemployees_insurances/app.js")
site.require(__dirname + "/apps/unemployees_mobiles/app.js")
site.require(__dirname + "/apps/maritals_status/app.js")
site.require(__dirname + "/apps/insurances_slides/app.js")
site.require(__dirname + "/apps/trees_accounting/app.js")
site.require(__dirname + "/apps/militaries_status/app.js")
site.require(__dirname + "/apps/unemployees/app.js")
site.require(__dirname + "/apps/spare_parts/app.js")
site.require(__dirname + "/apps/employees_mobiles/app.js")
site.require(__dirname + "/apps/mobiles_slides/app.js")
site.require(__dirname + "/apps/amounts_in/app.js")
site.require(__dirname + "/apps/amounts_out/app.js")


site.run()
