export type TwoD3DControlNetRequest = {
  seed: string;
  image_path: string;
  export_video: boolean;
  sample_steps: number;
  export_texmap: boolean;
  remove_background: boolean;
};

export type TwoD3DControlNetResponse = [string];
