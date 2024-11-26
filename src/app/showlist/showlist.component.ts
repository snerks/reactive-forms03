import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import * as moment from 'moment';
import { Show, ShowsInfo } from '../models';
import { ShowService } from '../show.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-showlist',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './showlist.component.html',
  styleUrl: './showlist.component.css',
})
export class ShowlistComponent implements OnInit {
  showsInfo: ShowsInfo | null = null;

  artistsSearchTerm?: string;

  showPastEvents?: boolean;

  thresholdInDays?: number;

  constructor(
    private showService: ShowService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.thresholdInDays = +(this.route.snapshot.paramMap.get('days') || 0);

    this.getShowsInfo();
  }

  getShowsInfo(): void {
    this.showService
      .getShowsInfo()
      .subscribe((showsInfo) => (this.showsInfo = showsInfo));
  }

  get inDateRangeShows(): Show[] {
    const shows = this.showsInfo?.shows || [];

    if (this.showPastEvents) {
      return shows;
    }

    const results = shows.filter(this.dateRangeShowFilter);

    return results;
  }

  dateRangeShowFilter = (show: Show) => {
    const currentDateTime = new Date();

    let willShowEvent = false;

    if (this.showPastEvents) {
      willShowEvent = true;
    } else {
      const eventDate = new Date(show.date);
      const eventDateEndOfDay = moment.default(eventDate).endOf('day');

      const isPastEvent = eventDateEndOfDay.isBefore(currentDateTime);

      willShowEvent = !isPastEvent;
    }

    return willShowEvent;
    // tslint:disable-next-line:semicolon
  };

  get inThresholdShows(): Show[] {
    const results = this.inDateRangeShows.filter((show) =>
      this.isRecentlyAdded(show, this.thresholdInDays)
    );

    return results;
  }

  get artistFilterShows(): Show[] {
    //     const results = this.inDateRangeShows.filter(show => {
    const results = this.inThresholdShows.filter((show) => {
      if (!this.artistsSearchTerm) {
        return true;
      }

      const showArtistsText = show.artists.reduce(
        (previousArtistsResult, currentArtist, currentArtistIndex) => {
          const currentArtistText = currentArtist.name;

          return currentArtistIndex === 0
            ? currentArtistText
            : previousArtistsResult + ' ' + currentArtistText;
        },
        ''
      );

      return (
        showArtistsText
          .toLowerCase()
          .indexOf(this.artistsSearchTerm.toLowerCase()) > -1
      );
    });

    return results;
  }

  getEventIdBtsForUrl(show: Show): string {
    if (!show) {
      return '';
    }

    if (!show.eventIdBts) {
      return '';
    }

    return show.eventIdBts.toString().trim();
  }

  get sortedShows(): Show[] {
    const results = this.artistFilterShows.sort((lhs: Show, rhs: Show) => {
      const lhsDate = new Date(lhs.date);
      const rhsDate = new Date(rhs.date);

      const result = lhsDate.getTime() - rhsDate.getTime();

      return result;
    });

    return results;
  }

  getAddedInThresholdShows(thresholdInDays = 0): Show[] {
    if (!this.showsInfo) {
      return [];
    }

    return this.showsInfo.shows.filter((show) => {
      return this.isRecentlyAdded(show, thresholdInDays);
    });
  }

  isRecentlyAdded = (show: Show, thresholdInDays = 0) => {
    if (!show.addedDate) {
      return false;
    }

    if (thresholdInDays <= 0) {
      return true;
    }

    const addedDate = new Date(show.addedDate);
    const currentDate = new Date();

    const millisecondsSinceAdded = currentDate.getTime() - addedDate.getTime();

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const thresholdInMilliseconds = thresholdInDays * millisecondsPerDay;

    const result = millisecondsSinceAdded < thresholdInMilliseconds;

    return result;

    // tslint:disable-next-line:semicolon
  };

  get allShows(): Show[] {
    if (!this.showsInfo) {
      return [];
    }

    return this.showsInfo.shows;
  }

  get addedTodayShows(): Show[] {
    if (!this.showsInfo) {
      return [];
    }

    return this.showsInfo.shows.filter((show) => {
      return this.isRecentlyAdded(show, 1);
    });
  }

  get addedWithin3DaysShows(): Show[] {
    if (!this.showsInfo) {
      return [];
    }

    return this.showsInfo.shows.filter((show) => {
      return this.isRecentlyAdded(show, 3);
    });
  }

  get addedWithin7DaysShows(): Show[] {
    if (!this.showsInfo) {
      return [];
    }

    return this.showsInfo.shows.filter((show) => {
      return this.isRecentlyAdded(show, 7);
    });
  }
}
