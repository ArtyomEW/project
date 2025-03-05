from fastapi import Query


class PaginatedParams:
    def __init__(self, page_num: int = Query(1, ge=1), page_size: int = Query(100, ge=0)):
        self.start = (page_num - 1) * page_size
        self.end = self.start + page_size
           