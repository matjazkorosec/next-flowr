'use client';

import bgrSearch from '@/assets/icon/search.svg';

const HeroSearch = () => {
  return (
    <form method="post" className="form-search">
      <fieldset>
        <label>
          <input
            type="text"
            className="search-field"
            placeholder="Looking for something specific?"
          />
        </label>
        <input
          type="submit"
          className="search-icon"
          style={{ backgroundImage: `url(${bgrSearch.src})` }}
        />
      </fieldset>
    </form>
  );
};

export default HeroSearch;
