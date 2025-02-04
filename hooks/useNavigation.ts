const useNavigation = () => {
  const menuItems = [
    { label: 'Flowers', href: '/flowers' },
    { label: 'Latest Sightings', href: '/latest-sightings' },
    { label: 'Favorites', href: '/favorites' },
  ];

  return { menuItems };
};

export default useNavigation;
