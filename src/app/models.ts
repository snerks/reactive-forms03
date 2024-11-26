export interface ShowsInfo {
  lastUpdated: Date;
  shows: Show[];
}

export interface Show {
  id?: string;
  eventIdBts?: string;
  addedDate?: Date;
  isSoldOut: boolean;
  isCancelled: boolean;

  onSaleDate?: Date;

  priceText?: string;

  date: Date;
  venue: string;

  artists: Artist[];

  notes?: string;

  detailsUri?: string;
}

export interface Artist {
  name: string;
  stageTime?: string;

  videoUrl?: string;
}

export interface VenueBts {
  id: number;
  name: string;
  nameRaw: string;
}
