import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

interface TimelineSlide {
  id: number;
  imageSrc: string;
  title: string;
  captionTitle: string;
  description: string;
}

@Component({
  selector: 'app-button-page',
  standalone: true, // Ensuring clean standalone configuration
  imports: [CommonModule],
  templateUrl: './button-page.html',
  styleUrl: './button-page.css',
})
export class ButtonPage {
  // Grab a direct reference to the track element from the DOM
  @ViewChild('sliderTrack') sliderTrack!: ElementRef;

  slides: TimelineSlide[] = [
    {
      id: 1,
      imageSrc: 'assets/images/pt1.jpg',
      title: 'Pinatubo Pre-1991',
      captionTitle: 'The Dormant Peak',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.'
    },
    {
      id: 2,
      imageSrc: 'assets/images/pt2.jpg', 
      title: 'Pinatubo Timeline',
      captionTitle: 'The Eruption',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.'
    },
    {
      id: 3,
      imageSrc: 'assets/images/pt3.jpg',
      title: 'Pinatubo Caldera',
      captionTitle: 'The Present Day',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.'
    }
  ];

  // NOTE: Your array has 3 elements. Arrays are 0-indexed, so the center card is index 1.
  activeIndex: number = 1;

  /**
   * Runs continuously while scrolling. Detects which polaroid element is closest 
   * to the physical center line of the slider container.
   */
  onTrackScroll(event: Event): void {
    const track = event.target as HTMLElement;
    const cards = track.querySelectorAll('.polaroid-card');
    
    // Determine the exact horizontal center line of the container view track
    const trackCenter = track.getBoundingClientRect().left + (track.offsetWidth / 2);

    let closestIndex = this.activeIndex;
    let minDistance = Infinity;

    cards.forEach((cardElement, i) => {
      const card = cardElement as HTMLElement;
      // Get the current dynamic center point of this polaroid on screen
      const cardCenter = card.getBoundingClientRect().left + (card.offsetWidth / 2);
      const distanceFromCenter = Math.abs(trackCenter - cardCenter);

      if (distanceFromCenter < minDistance) {
        minDistance = distanceFromCenter;
        closestIndex = i;
      }
    });

    // Only trigger a change detection update if a new slide crosses the center threshold
    if (this.activeIndex !== closestIndex) {
      this.activeIndex = closestIndex;
    }
  }

  setActiveCard(index: number, event: MouseEvent): void {
    this.activeIndex = index;
    (event.currentTarget as HTMLElement).scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }
}