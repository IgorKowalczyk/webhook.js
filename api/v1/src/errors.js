module.exports.err_fields_name = () => {
 return {
  error: true,
  message: "Too many characters in field name! Max: 256",
  error_code: 422,
 };
};

module.exports.err_fields_characters = () => {
 return {
  error: true,
  message: "Too many characters in field value! Max: 1024",
  error_code: 422,
 };
};

module.exports.err_total_values_characters = () => {
 return {
  error: true,
  message: "Too many characters in all fields values! Max: 6000",
  error_code: 422,
 };
};

module.exports.err_too_many_fields = () => {
 return {
  error: true,
  message: "Too many fields! Max: 25",
  error_code: 422,
 };
};

module.exports.invaild_color = () => {
 return {
  error: true,
  message: "Invaild embed color!",
  error_code: 422,
 };
}

module.exports.title_too_long = () => {
 return {
  error: true,
  message: "Title too long! Max: 256",
  error_code: 422,
 };
}

module.exports.description_too_long = () => {
 return {
  error: true,
  message: "Description too long! Max: 4096",
  error_code: 422,
 };
}

module.exports.username_too_long = () => {
 return {
  error: true,
  message: "Username too long! Max: 16",
  error_code: 422,
 };
}

module.exports.footer_too_long = () => {
 return {
  error: true,
  message: "Footer too long! Max: 2048",
  error_code: 422,
 };
}

module.exports.invaild_timestamp = () => {
 return {
  error: true,
  message: "Invaild timestamp!",
  error_code: 422,
 };
}