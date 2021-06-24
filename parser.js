const command = /^acg/

function parse(text, sender) {
	console.log(text)
	console.log(sender)
	if (command.test(text)) {
		console.log("ACG Started")
		// TODO: support more options
		return {
			command: "ACG",
		};
	}
	return {
		command: "NONE",
	}
}

module.exports = {
	parse,
}