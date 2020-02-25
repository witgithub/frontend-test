export interface Sort {
    sortKey: string;
    direction: SortDirections;
}

export enum SortDirections {
    DESC = 'desc',
    ASC = 'asc',
}
