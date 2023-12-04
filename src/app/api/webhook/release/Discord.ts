export async function SendEmbed(
  webhookUrl: string,
  data: {
    title?: string;
    description?: string;
    url?: string;
    timestamp?: Date;
    color?: number;
    tagId?: string;
  },
) {
  const embed = {
    title: data.title,
    description: data.description,
    url: data.url,
    timestamp: data.timestamp,
    color: data.color,
  };
  const body: {
    embeds: {
      title?: string;
      description?: string;
      url?: string;
      timestamp?: Date;
      color?: number;
    }[];
    content?: string;
  } = {
    embeds: [embed],
  };

  if (data.tagId) {
    body["content"] = `<@&${data.tagId}>`;
  }

  await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
