const AI_BOT_PATTERN =
  /GPTBot|ChatGPT-User|OAI-SearchBot|PerplexityBot|Perplexity-User|Google-Extended|ClaudeBot|anthropic-ai|CCBot/i;

export function isAiBotUserAgent(userAgent: string | null): boolean {
  if (!userAgent) {
    return false;
  }

  return AI_BOT_PATTERN.test(userAgent);
}

export function hashIpForLog(ip: string | null): string | null {
  if (!ip) {
    return null;
  }

  let hash = 0;
  for (let i = 0; i < ip.length; i += 1) {
    hash = (hash << 5) - hash + ip.charCodeAt(i);
    hash |= 0;
  }

  return `ip_${Math.abs(hash).toString(16)}`;
}
