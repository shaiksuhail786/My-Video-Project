
export enum AppState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum InputType {
  TEXT = 'text',
  FILE = 'file',
  URL = 'url',
}

export enum VideoLength {
  MEDIUM = 'medium',
  LONG = 'long',
}

export enum LoadingStep {
  ANALYZING = 'Analyzing Content...',
  WRITING_SCRIPT = 'Writing Script...',
  GENERATING_VISUALS = 'Generating Visuals...',
  RENDERING_VIDEO = 'Rendering Video...',
  DONE = 'Finalizing...',
}
