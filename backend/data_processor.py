from typing import Optional
import cachetools
import pandas as pd

data_cache = cachetools.TTLCache(maxsize=10000, ttl=3600)


def fetch_data(data_set: pd.DataFrame, search_criteria: str, search_parameter: str) -> list[dict[str, str]]:
    filtered_data = data_set[data_set[search_criteria].astype(str) == search_parameter]
    if not filtered_data.empty:
        return filtered_data.to_dict(orient='records')
    return []


def search_data_with_cache(data_set: pd.DataFrame, search_criteria: str, search_parameter: str) \
        -> Optional[list[dict[str, str]]]:
    cache_key = (search_criteria, search_parameter)
    cache_key_str = str(cache_key)

    if cache_key_str in data_cache:
        return data_cache[cache_key_str]

    fetched_data = fetch_data(data_set, search_criteria, search_parameter)
    if fetched_data:
        data_cache[cache_key_str] = fetched_data
        return fetched_data

    return None
