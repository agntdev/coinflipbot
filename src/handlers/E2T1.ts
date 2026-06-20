import { Composer } from "grammy";
import type { Ctx } from "../bot.js";

const composer = new Composer<Ctx>();

composer.use(async (ctx, next) => {
  if (ctx.hasCommand("start") && ctx.message?.text?.startsWith("/start")) {
    await ctx.reply("Welcome! I am ready to help.\n\nAvailable commands:\n/start — Welcome message\n/help — This help text");
  }
  await next();
});

export default composer;