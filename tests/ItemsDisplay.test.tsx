import { render, screen } from '@testing-library/react';
import ItemsDisplay from '@/components/modules/ItemsDisplay';
import useFlowers from '@/hooks/useFlowers';
import { useUserStore } from '@/store/userStore';

jest.mock('@/hooks/useFlowers', () => jest.fn());
jest.mock('@/store/userStore', () => ({
  useUserStore: jest.fn(),
}));

const mockFlowers = [
  { id: '1', name: 'Roza', sightingsNum: 2 },
  { id: '2', name: 'Kopriva', sightingsNum: 4 },
];

const mockUser = {
  id: '1',
  firstName: 'Mat',
  lastName: 'Kor',
  email: '',
  dateOfBirth: '',
  sightingsNum: 0,
  pictureUrl: '',
};

describe('ItemsDisplay Component', () => {
  beforeEach(() => {
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
      logout: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should display flowers when data is loaded', () => {
    (useFlowers as jest.Mock).mockReturnValue({
      flowers: mockFlowers,
      loading: false,
    });

    render(<ItemsDisplay />);

    expect(screen.getByText('Roza')).toBeInTheDocument();
    expect(screen.getByText('Kopriva')).toBeInTheDocument();
    expect(screen.getByText('2 sightings')).toBeInTheDocument();
    expect(screen.getByText('4 sightings')).toBeInTheDocument();
  });

  it('Should display skeletons during loading', () => {
    (useFlowers as jest.Mock).mockReturnValue({
      flowers: [],
      loading: true,
    });

    render(<ItemsDisplay />);

    const skeletons = screen.getAllByRole('status');
    expect(skeletons).toHaveLength(4);
  });

  it('Should display favorite button when user is logged in', () => {
    (useFlowers as jest.Mock).mockReturnValue({
      flowers: mockFlowers,
      loading: false,
    });

    render(<ItemsDisplay />);

    const favoriteButtons = screen.getAllByRole('button', {
      name: /make favorite/i,
    });
    expect(favoriteButtons).toHaveLength(2);
  });

  it('Should hide favorite button when user is logged out', () => {
    (useFlowers as jest.Mock).mockReturnValue({
      flowers: mockFlowers,
      loading: false,
    });

    (useUserStore as unknown as jest.Mock).mockReturnValue({
      user: null,
      logout: jest.fn(),
    });

    render(<ItemsDisplay />);

    const favoriteButtons = screen.queryAllByRole('button', {
      name: /make favorite/i,
    });
    expect(favoriteButtons).toHaveLength(0);
  });

  it('Should match the snapshot for loaded flowers', () => {
    (useFlowers as jest.Mock).mockReturnValue({
      flowers: mockFlowers,
      loading: false,
    });

    const { container } = render(<ItemsDisplay />);
    expect(container).toMatchSnapshot();
  });

  it('Should match the snapshot for no user logged in', () => {
    (useFlowers as jest.Mock).mockReturnValue({
      flowers: mockFlowers,
      loading: false,
    });

    (useUserStore as unknown as jest.Mock).mockReturnValue({
      user: null,
      logout: jest.fn(),
    });

    const { container } = render(<ItemsDisplay />);
    expect(container).toMatchSnapshot();
  });
});
