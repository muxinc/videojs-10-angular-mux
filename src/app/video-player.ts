import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal } from '@angular/core';

// Each import registers one custom element. This component is rendered inside
// `@defer`, so Angular puts this file and Video.js in a lazy chunk.
import '@videojs/html/video/player';
import '@videojs/html/video/skin';
import '@videojs/html/media/mux-video';
import '@videojs/html/extensions/mux-data';

@Component({
  selector: 'app-video-player',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <video-player>
      <video-skin style="display: block; aspect-ratio: 16 / 9">
        <mux-video
          [source]="{ playbackId: playbackId() }"
          playsinline
          crossorigin="anonymous"
          (play)="paused.set(false)"
          (pause)="paused.set(true)"
        ></mux-video>
        <mux-data [attr.metadata-video-title]="title()" [attr.metadata-viewer-user-id]="viewerUserId()"></mux-data>
      </video-skin>
    </video-player>

    <p>{{ paused() ? 'Paused' : 'Playing' }}</p>
  `,
})
export class VideoPlayer {
  readonly playbackId = input.required<string>();
  readonly title = input('');
  readonly viewerUserId = input('');

  protected readonly paused = signal(true);
}
