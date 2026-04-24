export function getDashboardSnapshot(userId: string) {
  const normalizedUserId = userId.trim();
  const idLength = normalizedUserId.length;

  return {
    userId: normalizedUserId,
    metrics: {
      profileCompletionPercent: Math.min(100, 60 + (idLength % 40)),
      newMatches: idLength % 7,
      unreadMessages: idLength % 5,
    },
    quickActions: ['complete_profile', 'review_matches', 'reply_messages'],
  };
}
