const generateReport = useCallback(async () => {
  if (!authKeyInput.trim()) {
    setAiError('Введите ключ авторизации GigaChat (client_id:client_secret)');
    return;
  }

  const { start, end } = getDateRange(aiPeriod);
  const filteredReports = reports.filter(r => {
    const d = new Date(r.date);
    return d >= start && d <= end;
  });

  if (filteredReports.length === 0) {
    setAiError('За выбранный период нет отчётов.');
    setAiSummary('');
    return;
  }

  const title = getReportTitle(aiPeriod, start, end);
  setAiReportTitle(title);

  const reportText = filteredReports.map(r => {
    const emp = employees.find(e => e.id === r.employeeId);
    return `${emp ? emp.name : 'Сотрудник'}: ${r.hours}ч — ${r.comment} (дата: ${new Date(r.date).toLocaleDateString('ru')})`;
  }).join('\n');

  const prompt = `Ты — руководитель отдела. Проанализируй ежедневные отчёты сотрудников за период и составь аналитическую сводку.
${title}

Данные отчётов:
${reportText}

Требования к сводке:
1. Сгруппируй задачи по логическим направлениям (например: "Документооборот и СЭД", "Проекты и цифровая трансформация", "Техническая поддержка", "Информационная безопасность", "Прочее").
2. В каждом блоке опиши конкретные измеримые результаты: количество выполненных задач, объём в часах, сроки, достижения, проблемы.
3. Не переписывай отчёты, а обобщай и анализируй.
4. Выдели общий объём работы и ключевые результаты за период.
5. Ответ — на русском языке, без повторения инструкций.`;

  setIsAiLoading(true);
  setAiError('');
  try {
    // Получаем токен
    const accessToken = await getAccessToken(authKeyInput.trim());

    // Теперь запрос к чат-модели
    const res = await fetch('https://gigachat.devices.sberbank.ru/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        model: 'GigaChat:latest',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4,
        max_tokens: 1500
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Ошибка API (${res.status})`);
    }

    const data = await res.json();
    const summary = data.choices?.[0]?.message?.content || 'Пустой ответ от модели.';
    setAiSummary(summary);
  } catch (error) {
    setAiError(`Ошибка: ${error.message}`);
    setAiSummary('');
  } finally {
    setIsAiLoading(false);
  }
}, [authKeyInput, aiPeriod, reports, employees]);
