from fastapi import HTTPException


class InvalidSearchCriteria(HTTPException):
    def __init__(self, search_criteria):
        super().__init__(status_code=400, detail=f"Invalid search criteria: {search_criteria}")


class DataNotFound(HTTPException):
    def __init__(self):
        super().__init__(status_code=404, detail="Data not found")
