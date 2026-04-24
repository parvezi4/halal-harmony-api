type SearchProfile = {
  id: string;
  displayName: string;
  ageRangeLabel: string;
  city: string;
  practicingLevel: string;
};

const SEARCH_INDEX: SearchProfile[] = [
  {
    id: 'mem_001',
    displayName: 'Amina R',
    ageRangeLabel: '25-30',
    city: 'London',
    practicingLevel: 'Practicing',
  },
  {
    id: 'mem_002',
    displayName: 'Yusuf K',
    ageRangeLabel: '30-35',
    city: 'Birmingham',
    practicingLevel: 'Very practicing',
  },
  {
    id: 'mem_003',
    displayName: 'Maryam S',
    ageRangeLabel: '28-32',
    city: 'Manchester',
    practicingLevel: 'Moderate',
  },
];

export function searchProfiles(rawQuery: string) {
  const query = rawQuery.trim().toLowerCase();

  const results = SEARCH_INDEX.filter((profile) => {
    return (
      profile.displayName.toLowerCase().includes(query) ||
      profile.city.toLowerCase().includes(query) ||
      profile.practicingLevel.toLowerCase().includes(query)
    );
  });

  return {
    query: rawQuery.trim(),
    total: results.length,
    results,
  };
}
