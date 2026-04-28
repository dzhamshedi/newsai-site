window.NEWSAI_DIGEST = {
  dateLabel: "28 апреля 2026",
  label: "Ежедневный выпуск",
  title: "GPT-5.5 возглавил рейтинг, DeepSeek вернулся",
  summary:
    "Три крупных релиза за неделю: OpenAI выпустила новый флагман, DeepSeek представил двухуровневую архитектуру V4, Kimi K2.6 стал лидером среди открытых весов.",
  caption: "Artificial Analysis Intelligence Index, апрель 2026",
  sources: ["Artificial Analysis", "OpenAI", "DeepSeek", "Moonshot AI"],
  radar: [
    { value: "3", label: "новых флагманских модели за 7 дней" },
    { value: "#1", label: "позиция GPT-5.5 в Intelligence Index по версии Artificial Analysis" },
    {
      value: "39%",
      label: "уровень галлюцинаций у Kimi K2.6 — один из лучших показателей среди открытых моделей"
    }
  ],
  lead: {
    topic: "research",
    source: "Artificial Analysis",
    readTime: "4 мин",
    title: "DeepSeek вернулся: V4 Pro вышел на второе место среди открытых моделей",
    summary:
      "DeepSeek представил V4 Pro и V4 Flash с новой архитектурой — первой за год. V4 Pro (1.6T параметров / 49B активных) занял второе место в Intelligence Index среди открытых весов, уступив только Kimi K2.6. Лицензия MIT, контекст 1M токенов.",
    url: "https://artificialanalysis.ai/articles/deepseek-is-back-among-the-leading-open-weights-models-with-v4-pro-and-v4-flash",
    image:
      "https://cdn.sanity.io/images/6vfeftx9/articles/aadc4fa5504c006df460651facc31b795af3e501-1376x1376.jpg?w=1200&auto=format",
    imageAlt: "DeepSeek V4 Pro и V4 Flash"
  },
  items: [
    {
      topic: "products",
      source: "Artificial Analysis",
      title: "GPT-5.5 — новый лидер среди всех AI-моделей",
      summary:
        "OpenAI выпустила GPT-5.5 с пятью уровнями усилий (от non-reasoning до xhigh). Модель возглавила Intelligence Index, обогнав Anthropic и Google на 3 пункта. Токен-потребление сократилось на 40%, но цена за токен выросла вдвое.",
      url: "https://artificialanalysis.ai/articles/openai-gpt5-5-is-the-new-leading-AI-model",
      image:
        "https://cdn.sanity.io/images/6vfeftx9/articles/606ad7d19ef51ffd764b6283ee2349cfcae902ab-1600x900.jpg?w=900&auto=format",
      imageAlt: "OpenAI GPT-5.5"
    },
    {
      topic: "research",
      source: "Artificial Analysis",
      title: "Kimi K2.6: лучший открытый вес с низким уровнем галлюцинаций",
      summary:
        "Moonshot AI выпустила Kimi K2.6 — MoE-модель с 1T параметрами / 32B активными. Ключевое преимущество: галлюцинации всего 39% против 94–96% у новых моделей DeepSeek. Поддерживает изображения и видео, контекст 256K.",
      url: "https://artificialanalysis.ai/articles/kimi-k2-6-the-new-leading-open-weights-model",
      image:
        "https://cdn.sanity.io/images/6vfeftx9/articles/a6f78acdd98559ee315f95e21e6accaec46d145f-1374x1374.jpg?w=900&auto=format",
      imageAlt: "Kimi K2.6"
    },
    {
      topic: "market",
      source: "Artificial Analysis",
      title: "Стоимость запуска топ-моделей: от $67 до $4800 за один бенчмарк",
      summary:
        "Frontier-модели всё дороже: запуск Claude Opus 4.7 стоит $4811, GPT-5.5 (xhigh) — около $3600, DeepSeek V4 Pro — $1071. Открытые веса остаются в разы дешевле: gpt-oss-120B — $67, DeepSeek V3.2 — $71.",
      url: "https://artificialanalysis.ai/articles/deepseek-is-back-among-the-leading-open-weights-models-with-v4-pro-and-v4-flash",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Графики стоимости AI-моделей"
    },
    {
      topic: "research",
      source: "Artificial Analysis",
      title: "Галлюцинации: GPT-5.5 знает больше, но врёт чаще",
      summary:
        "GPT-5.5 показал рекордную точность знаний (57%), но галлюцирует в 86% случаев когда не знает ответа. Opus 4.7 врёт лишь в 36% случаев. DeepSeek V4 Pro и Flash — в 94–96%. Галлюцинации остаются главным нерешённым вопросом.",
      url: "https://artificialanalysis.ai/articles/openai-gpt5-5-is-the-new-leading-AI-model",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Визуализация нейросети"
    }
  ],
  signals: [
    {
      title: "Открытые веса догоняют закрытые модели",
      summary:
        "Kimi K2.6 и DeepSeek V4 Pro вплотную приближаются к GPT-5.5 и Claude Opus 4.7 по Intelligence Index. Разрыв в 3 пункта — минимальный за всю историю."
    },
    {
      title: "Агентические бенчмарки выходят в центр оценки",
      summary:
        "GDPval-AA (реальные рабочие задачи) и tau-Bench становятся основным критерием сравнения моделей. Чистая точность на тестах больше не достаточна."
    },
    {
      title: "Галлюцинации — следующий ключевой фронт конкуренции",
      summary:
        "Разрыв между моделями по проценту галлюцинаций огромен: от 34% у MiniMax до 96% у DeepSeek V4 Flash. Это станет главным параметром выбора для продуктовых команд."
    }
  ]
};
