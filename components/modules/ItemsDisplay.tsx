'use client';

import TempPhoto from '@/assets/flower.jpg';
import Image from 'next/image';
import StarIcon from '@/assets/icon/star.svg';
import StarIconActive from '@/assets/icon/star-active.svg';
import { useState } from 'react';
import useFlowers from '@/hooks/useFlowers';
import { Flower } from '@/types/flower';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserStore } from '@/store/userStore';

const ItemsDisplay = () => {
  const [isFavorite, setIsFavorite] = useState<Record<string, boolean>>({});
  const { flowers, loading } = useFlowers();
  const { user } = useUserStore();

  const handleStarClick = (id: string) => {
    setIsFavorite((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <section className="items-display">
        <div className="adapt">
          <ul className="item-list">
            {Array.from({ length: 4 }).map((_, index) => (
              <li key={`skeleton-${index}`}>
                <Skeleton role="status" className="w-full h-[337px]" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className="items-display">
      <div className="adapt">
        <ul className="item-list">
          {flowers.map((flower: Flower) => (
            <li key={flower.id}>
              <figure>
                <Image
                  src={flower.pictureUrl || TempPhoto.src}
                  alt={flower.name}
                  width={270}
                  height={337}
                  style={{ width: '100%', height: 'auto' }}
                  priority
                />
                <div className="figcaption">
                  <h3>{flower.name}</h3>
                  <p>{flower.latinName}</p>
                  <span className="sightings-count">
                    {flower.sightingsNum} sightings
                  </span>
                </div>
              </figure>
              {user && (
                <button
                  className={`star ${isFavorite[flower.id] ? 'favorite' : ''}`}
                  onClick={() => handleStarClick(flower.id)}
                >
                  <span
                    style={{
                      backgroundImage: `url(${
                        isFavorite[flower.id]
                          ? StarIconActive.src
                          : StarIcon.src
                      })`,
                    }}
                  >
                    <span className="sr-only">
                      {isFavorite[flower.id]
                        ? 'Remove favorite'
                        : 'Make favorite'}
                    </span>
                  </span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ItemsDisplay;
