const { WebhookClient, MessageEmbed } = require("discord.js");
const errors = require("./src/errors");
const util = require("./src/util");
require("dotenv").config();

module.exports = async (app) => {
 app.post("/v1/api", async (req, res) => {
  req.query;
  const webhook_color = req.query.color || "#4f545c";
  const title = req.query.title;
  const description = req.query.description;
  const timestamp = req.query.timestamp;
  const webhook_username = req.query.username || "Webhook.js";
  const footer = req.query.footer;
  if(title && title.length >= 256) {
   res.status(422);
   return res.send(errors.title_too_long())
  }
  if(footer && footer.length >= 2048) {
   res.status(422);
   return res.send(errors.footer_too_long())
  }
  if(webhook_username && webhook_username.length >= 16) {
   res.status(422);
   return res.send(errors.username_too_long())
  }
  if(description && description.length >= 4096) {
   res.status(422);
   return res.send(errors.description_too_long())
  }
  if(util.resolveColor(webhook_color) == 1) {
   res.status(422);
   return res.send(errors.invaild_color())
  };
  const webhook = new WebhookClient({ url: process.env.WEBHOOK });
  if (Object.keys(req.body).length >= 25) {
   res.status(422);
   return res.send(err_too_many_fields());
  } else if (Object.values(req.body).join("").toString().length >= 6000) {
   res.status(422);
   return res.send(errors.err_total_values_characters());
  }
  const embed = new MessageEmbed() // Prettier
   .setColor(webhook_color)
  Object.entries(req.body).forEach(([key, value]) => {
   if (key.length > 256) {
    res.status(422);
    return res.send(errors.err_fields_name());
   } else if (value.length > 1024) {
    res.status(422);
    return res.send(errors.err_fields_characters());
   }
   embed.addField(key, value.toString());
   if(title) embed.setTitle(title.toString());
   if(description) embed.setDescription(description.toString())
   if(timestamp) embed.setTimestamp(timestamp);
   if(footer) embed.setFooter(footer);
  });
  webhook.send({
   // Prettier
   username: webhook_username.toString(),
   embeds: [embed],
  });
  res.status(200);
  const success = {
   error: false,
   message: "Message successfully send!"
  }
  return res.send(success)
 });
};
