export interface PaginationDetails {
    pages: number;
    currentPage: number;
    total: number;
    nextPage: (count: number) => void;
}
