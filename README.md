# Video.js 10 + Mux in Angular

Plays a Mux video in Angular with [Video.js 10](https://videojs.org) and loads the player only when it is shown.

[Open in CodeSandbox](https://codesandbox.io/p/github/muxinc/videojs-10-angular-mux)

## How it works

- `src/app/mux-player.ts` imports the Video.js elements it uses (`@videojs/html/video/player`, `@videojs/html/video/skin`, `@videojs/html/media/mux-video` and `@videojs/html/extensions/mux-data`) and adds `CUSTOM_ELEMENTS_SCHEMA`. The elements are typed, so `ElementRef<VideoPlayerElement>` gives typed access to the player store.
- `src/app/app.ts` renders that component inside `@defer`. Angular puts the component and Video.js in a lazy chunk that loads only when the user clicks **Load video**.
- `<mux-video>` takes the Mux source object through a property binding: `[source]="{ playbackId }"`.
- `<mux-data>` turns on Mux Data monitoring. It reads `metadata-*` attributes such as `metadata-video-title` and `metadata-viewer-user-id`.

## Run locally

```bash
npm install
npm start
```

Then open http://localhost:4200.
