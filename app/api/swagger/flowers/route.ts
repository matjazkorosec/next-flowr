import { NextRequest, NextResponse } from 'next/server';

const flowers = [
  {
    id: 'bdd68375-206c-46f8-878a-5c2bdefed86e',
    name: 'African Blood Lily',
    latinName: 'Scadoxus multiflorus',
    genus: 'Blood Lilies',
    pictureUrl: null,
    authorId: '59864750-f6d4-42bd-aa5c-8476bc9b750f',
    sightingsNum: 0,
  },
  {
    id: '3c277192-c5fa-4bff-9b0d-19bc887b3179',
    name: 'Flower number 1',
    latinName: 'Flos 3c277192-c5fa-4bff-9b0d-19bc887b3179',
    genus: null,
    pictureUrl: null,
    authorId: '5f3bf07e-d9fc-4808-bdd8-745e11b3a13a',
    sightingsNum: 0,
  },
  {
    id: '4f890faa-1e91-4cb0-9ef3-de40ba310b59',
    name: 'Flower number 2',
    latinName: 'A nothero thingo',
    genus: null,
    pictureUrl: null,
    authorId: null,
    sightingsNum: 0,
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const nameFilter = searchParams.get('name') || '';
  const latinNameFilter = searchParams.get('latinName') || '';
  const genusFilter = searchParams.get('genus') || '';
  const authorIdFilter = searchParams.get('authorId') || '';

  const filteredFlowers = flowers.filter((flower) => {
    return (
      (!nameFilter ||
        flower.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (!latinNameFilter ||
        flower.latinName
          .toLowerCase()
          .includes(latinNameFilter.toLowerCase())) &&
      (!genusFilter ||
        (flower.genus &&
          flower.genus.toLowerCase().includes(genusFilter.toLowerCase()))) &&
      (!authorIdFilter || flower.authorId === authorIdFilter)
    );
  });

  const total = filteredFlowers.length;
  const start = (page - 1) * limit;
  const paginatedFlowers = filteredFlowers.slice(start, start + limit);

  paginatedFlowers.sort((a, b) => a.name.localeCompare(b.name));

  return NextResponse.json({
    items: paginatedFlowers,
    order: [['name', 'ASC']],
    filters: {
      name: nameFilter,
      latinName: latinNameFilter,
      genus: genusFilter,
      authorId: authorIdFilter,
    },
    total,
    page,
    limit,
  });
}
