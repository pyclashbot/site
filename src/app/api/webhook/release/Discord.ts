export async function SendEmbed(
  webhookUrl: string,
  data: {
    title?: string;
    description?: string;
    url?: string;
    timestamp?: Date;
    color?: number;
  }
) {
  const embed = {
    title: data.title,
    description: data.description,
    url: data.url,
    timestamp: data.timestamp,
    color: data.color,
  };

  await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      embeds: [embed],
    }),
  });
}
