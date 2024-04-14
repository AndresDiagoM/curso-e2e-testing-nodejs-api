const env = process.env.NODE_ENV || 'dev'
const envStage = {
  'dev': '.env',
  'e2e': '.env.e2e',
}

if (envStage[env]) {
  require('dotenv').config({ path: envStage[env] })
}

const config = {
  env,
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD
}

console.log('ENV:', env, '\ndbUrl:', config.dbUrl)

module.exports = { config }
