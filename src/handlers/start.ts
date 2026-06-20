import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { inlineKeyboard, inlineButton } from "../toolkit/index.js";

const composer = new Composer<Ctx>();

composer.command("start", async (ctx) => {
  const keyboard = inlineKeyboard([
    [inlineButton("Help", "help")],
  ]);
  await ctx.reply("Welcome! Commands: /flip /flip3 /help", { reply_markup: keyboard });
});

composer.callbackQuery("help", async (ctx) => {
  await ctx.answerCallbackQuery().catch(() => {});
  await ctx.reply("Available commands:\n/start — Welcome message\n/flip — Flip a coin\n/flip3 — Flip three coins\n/help — This help text");
});

export default composer;
