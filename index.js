const {
  connect,
  groupAutoreply
} = require('./bot.js');

const { parse } = require('./parser.js');

const { processCommand } = require('./executor.js');

const process = async (text, sender) => {
  const config = parse(text, sender);
  const message = await processCommand(config);
  return message;
}

;(async () => {
  await connect()
  //autoreply(tex2png)
  groupAutoreply(process)
})()