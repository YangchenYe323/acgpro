const { Bot } = require('mirai-js');

const bot = new Bot();

async function connect() {
	// TODO: use config file
	const server = {
		baseUrl: 'http://0.0.0.0:8080',
		authKey: 'INITKEY8jsKxgDE',
		qq: '1320117484',
	};
	await bot.open(server);
	console.log(`connected to mirai-api-http at ${server.baseUrl}`);
}

// 监听群消息
function groupAutoreply (process) {
  bot.on('GroupMessage', async ({ messageChain, sender }) => {
		// TODO: use config file
		console.log(sender.group.id)
		if (sender.group.id !== 213695572 && sender.group.id !== 227989879) return
    const msg = messageChain[messageChain.length-1]
    if (!msg || msg.type !== 'Plain') return
    const message = await process(msg.text, sender)
    if (message) {
      bot.sendMessage({
        group: sender.group.id,
        //quote: messageChain[0].id,
        message
      }).catch(console.error)
    }
  })
  console.log('group autoreply is listening...')
}

module.exports = {
	connect,
	groupAutoreply,
}