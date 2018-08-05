/*
  * DESC: Development environment configurations
*/

module.exports = {
  // enable logging for development
  logging: true,
  seed: true,
  db: { // For mysql 
    // url: 'mongodb://localhost/jalexb_db'
    host: 'localhost',
    username: 'jbryant',
    password: 'letmein123'
  }
}