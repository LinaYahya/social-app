const { getRoomChatMsgs } = require('../../database/queries/msgQueries');

exports.getMsgs = async (req, res, next) => {
  try {
    const { chatID, start } = req.params;
    const data = await getRoomChatMsgs(chatID, start);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};
