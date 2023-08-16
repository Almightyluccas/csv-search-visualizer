import cachetools
import pandas as pd
from typing import Optional
from fastapi import APIRouter, HTTPException
from data_processor import fetch_data, search_data_with_cache

router = APIRouter()

dataset_url = 'https://media.githubusercontent.com/media/datablist/sample-csv-files/main/files/offers/offers-1000.csv'
initial_data_set = pd.read_csv(dataset_url)


@router.get('/csv/columns')
async def get_csv_columns(data_url: Optional[str] = dataset_url):
    try:
        data_set = initial_data_set if data_url == dataset_url else pd.read_csv(data_url)
        return data_set.columns.tolist()
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Failed to read columns. File not found")


@router.get('/csv/search')
async def search_data_from_csv(
        search_criteria: Optional[str] = None,
        search_parameter: Optional[str] = None,
        data_url: Optional[str] = dataset_url
):
    try:
        data_set = initial_data_set if data_url == dataset_url else pd.read_csv(data_url)

        if search_parameter is None and search_criteria is None:
            return data_set.to_dict(orient='records')

        if search_criteria not in data_set.columns:
            raise InvalidSearchCriteria(search_criteria)

        cached_data = search_data_with_cache(data_set, search_criteria, search_parameter)
        if cached_data is not None:
            return cached_data

        fetched_data = fetch_data(data_set, search_criteria, search_parameter)
        return fetched_data
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Failed to search data. File not found")
