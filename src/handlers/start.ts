import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { inlineKeyboard, inlineButton } from "../toolkit/index.js";

const composer = new Composer<Ctx>();

composer.command("start", async (ctx) => {
  const keyboard = inlineKeyboard([
    [inlineButton("Help", "help")],
  ]);
  await ctx.reply("Welcome! I am ready to help.", { reply_markup: keyboard });
});

composer.callbackQuery("help", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Available commands:\n/start — Welcome message\n/help — This help text");
});

export default composer;
