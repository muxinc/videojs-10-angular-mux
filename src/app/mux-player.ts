import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  OnDestroy,
  signal,
  viewChild,
  type AfterViewInit,
} from '@angular/core';

// Side-effect imports register the custom elements. Because this component is
// only rendered inside an `@defer` block, Angular puts this file (and Video.js)
// in a lazy chunk that is downloaded the first time the player is shown.
import '@videojs/html/video/player';
import '@videojs/html/video/skin';
import '@videojs/html/media/mux-video';
import '@videojs/html/extensions/mux-data';

import type { VideoPlayerElement } from '@videojs/html/video';

@Component({
  selector: 'app-mux-player',
  // Tells Angular that unknown tags like <video-player> are custom elements.
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <video-player #player [attr.content-title]="title()">
      <video-skin style="display: block; aspect-ratio: 16 / 9">
        <!-- Object values are bound as properties, not attributes. -->
        <mux-video [source]="{ playbackId: playbackId() }" playsinline crossorigin="anonymous"></mux-video>
        <mux-data [attr.metadata-video-title]="title()" [attr.metadata-viewer-user-id]="viewerUserId()"></mux-data>
      </video-skin>
    </video-player>

    <p>State from the player store: <strong>{{ paused() ? 'Paused' : 'Playing' }}</strong></p>
  `,
})
export class MuxPlayer implements AfterViewInit, OnDestroy {
  readonly playbackId = input.required<string>();
  readonly title = input('');
  readonly viewerUserId = input('');

  protected readonly paused = signal(true);

  // Fully typed: no `any`, no type errors from the package's declarations.
  private readonly player = viewChild.required<ElementRef<VideoPlayerElement>>('player');
  private unsubscribe = () => {};

  ngAfterViewInit() {
    const store = this.player().nativeElement.store;
    const sync = () => this.paused.set(store.paused);

    sync();
    this.unsubscribe = store.subscribe(sync);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
