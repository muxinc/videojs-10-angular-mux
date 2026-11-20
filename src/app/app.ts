import { Component } from '@angular/core';
import { VideoPlayer } from './video-player';

@Component({
  selector: 'app-root',
  imports: [VideoPlayer],
  template: `
    <main>
      <h1>Video.js 10 + Mux in Angular</h1>
      <p>
        Video.js is not in the main bundle. Open the Network tab, then click the button: the player chunk
        loads only when the video is shown.
      </p>

      @defer (on interaction) {
        <app-video-player
          playbackId="BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM"
          title="Tea and Cookies"
          viewerUserId="user-24601"
        />
      } @placeholder {
        <button type="button">Load video</button>
      } @loading (minimum 200ms) {
        <p>Loading player…</p>
      }
    </main>
  `,
  styles: `
    main { max-width: 800px; margin: 2rem auto; font-family: system-ui, sans-serif; padding: 0 1rem; }
    button { font: inherit; padding: 0.5rem 1rem; cursor: pointer; }
  `,
})
export class App {}
