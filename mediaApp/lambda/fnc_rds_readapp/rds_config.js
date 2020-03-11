const rds_config={
    rds_host : process.env.rds_host,
    rds_port : process.env.rds_port,
    db_username : process.env.db_username,
    db_password : process.env.db_password,
    db_name : process.env.db_name
}
module.exports = rds_config;
