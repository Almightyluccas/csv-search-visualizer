import cachetools
import pandas as pd
from typing import Optional
from fastapi import APIRouter, HTTPException
from data_processor import fetch_data, search_data_with_cache


router = APIRouter()


@router.get('/csv/columns')
async def get_csv_columns(data_url: str):
    try:
        data_set = pd.read_csv(data_url)
        return data_set.columns.tolist()
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Failed to read columns. File not found")


@router.get('/csv/search')
async def search_data_from_csv(
        data_url: str,
        search_criteria: Optional[str] = None,
        search_parameter: Optional[str] = None,
):
    try:
        data_set = pd.read_csv(data_url)

        if search_parameter is None and search_criteria is None:
            return data_set.to_dict(orient='records')

        if search_criteria.lower() not in data_set.columns.str.lower():  # Case-insensitive comparison
            raise InvalidSearchCriteria(search_criteria)

        cached_data = search_data_with_cache(data_set, search_criteria, search_parameter)
        if cached_data is not None:
            return cached_data

        fetched_data = fetch_data(data_url, search_criteria, search_parameter)  # Modified parameter name
        return fetched_data
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Failed to search data. File not found")


@router.get('/csv/interactive-map')
def generate_interactive_map(data_url: str):

    data = pd.read_csv(data_url)
    state_zip_user_count = data.groupby(["state", "zip"]).size().reset_index(name="user_count")

    state_data = []
    for state, group in state_zip_user_count.groupby("state"):
        zip_data = []
        for index, row in group.iterrows():
            zip_data.append({"zip": row["zip"], "user_count": row["user_count"]})
        state_data.append({"state": state, "zip_data": zip_data})

    return {"state_data": state_data}

