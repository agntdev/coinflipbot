import { Composer } from "grammy";
import type { Ctx } from "../bot.js";

const composer = new Composer<Ctx>();

composer.command("start", async (ctx) => {
  await ctx.reply("Welcome! I am ready to help.\n\nAvailable commands:\n/start — Welcome message\n/help — This help text");
});

export default composer;